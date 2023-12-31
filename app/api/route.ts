import { NextResponse } from "next/server";

import { getLowestPrice, getHighestPrice, getAveragePrice, getEmailNotifType } from "@/lib/utils";
import { connectToDB } from "@/lib/mongoose";
import Product from "@/lib/models/product.model";
import { scrapeAmazonProduct } from "@/lib/scrapper";
import { generateEmailBody, sendEmail } from "@/lib/nodemailer";

export const maxDuration = 5; // function can run for a maximum of 300 seconds
export const dynamic = "force-dynamic"; //route segment config disabling all caching of fetch requests and always revalidating
export const revalidate = 0;

export async function GET(request: Request) {
  try {
    connectToDB();

    const products = await Product.find({});

    if (!products) throw new Error("No product fetched");

    /**
     * First we begin by scrapping the latest product and updating the database
     * 
     */
    const updatedProducts = await Promise.all(
      products.map(async (currentProduct) => {
        // call the Scrape product function here
        const scrapedProduct = await scrapeAmazonProduct(currentProduct.url);

        if (!scrapedProduct) return;

        const updatedPriceHistory = [
          ...currentProduct.priceHistory,
          {
            price: scrapedProduct.currentPrice,
          },
        ];

        const product = {
          ...scrapedProduct,
          priceHistory: updatedPriceHistory,
          lowestPrice: getLowestPrice(updatedPriceHistory),
          highestPrice: getHighestPrice(updatedPriceHistory),
          averagePrice: getAveragePrice(updatedPriceHistory),
        };

        // Update Products in DB
        const updatedProduct = await Product.findOneAndUpdate(
          {
            url: product.url,
          },
          product
        );
        /**
         * next we check the status of each product first we check the prices and do a comparison
         * This is what the user needs so as to be able to make a purchase
         */
        const emailNotifType = getEmailNotifType(
          scrapedProduct,
          currentProduct
        );

        if (emailNotifType && updatedProduct.users.length > 0) {
          const productInfo = {
            title: updatedProduct.title,
            url: updatedProduct.url,
          };
          // Construct emailContent which includes the tracked prices
          const emailContent = await generateEmailBody(productInfo, emailNotifType);
          // Get array of all users who tracked that particular product 
          const userEmails = updatedProduct.users.map((user: any) => user.email);
          // Send the final email notification to all of them
          await sendEmail(emailContent, userEmails);
        }

        return updatedProduct;
      })
    );

    return NextResponse.json({
      message: "Ok",
      data: updatedProducts,
    });
  } catch (error: any) {
    throw new Error(`Failed to get all products: ${error.message}`);
  }
}