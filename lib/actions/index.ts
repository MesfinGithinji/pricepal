"use server"

import { revalidatePath } from "next/cache";
import { connectToDB } from "../mongoose";
import { scrapeAmazonProduct } from "../scrapper";
import { getAveragePrice, getHighestPrice, getLowestPrice } from "../utils";
import Product from "../models/product.model";
import { User } from "@/types";
import { generateEmailBody, sendEmail } from "../nodemailer";

export async function scrapeAndStoreProduct(productUrl : string){
    if (!productUrl) return;

    try {
        //lest implement db storage of scapped data here and we begin with our db connection
        connectToDB();

        //the scrapped product via the url is done here using the scrapeAmazonProduct function
        const scrapeProduct = await scrapeAmazonProduct(productUrl);
        //if there is no scrapped product then simply return
        //if it is there then go ahead and store the details in the database
        if (!scrapeProduct) return ;

        let product = scrapeProduct;

        //find a product based on its url that has already been scrapped
        const existingProduct = await Product.findOne({url: scrapeProduct.url});

        //if the price already exists lets update the price history
        //next we update the data object with the updated price
        if (existingProduct){
            const updatedPriceHistory:any = [
                ...existingProduct.priceHistory,
                {price: scrapeProduct.currentPrice}
            ]

            product = {
                ...scrapeProduct,
                priceHistory: updatedPriceHistory,
                lowestPrice: getLowestPrice(updatedPriceHistory),
                highestPrice: getHighestPrice(updatedPriceHistory),
                averagePrice: getAveragePrice(updatedPriceHistory),
            }
        }

        //create a new product in the DB if it doesnt exist
        const newProduct = await Product.findOneAndUpdate(
            { url: scrapeProduct.url },
            product,
            { upsert: true, new: true }
          );
        
        revalidatePath(`/products/${newProduct._id}`);

    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`);
    }
}

//this function allows us to fetch all the deatails of our stored product
// and display them on our page upfront
export async function getProductById(productId: string) {
    try {
        connectToDB(); 
        const product = await Product.findOne({_id: productId});
        if (!product) return null;

        return product;
    } catch (error) {
        console.log(error)
    }
}

export async function getAllproducts() {
    try {

        connectToDB();
        const products = await Product.find();
        return products;

    } catch (error) {
        console.log(error);
    }
    
}

export async function getSimilarProducts(productId: string) {
    try {
      connectToDB();
  
      const currentProduct = await Product.findById(productId);
  
      if(!currentProduct) return null;
  
      const similarProducts = await Product.find({
        _id: { $ne: productId },
      }).limit(3);
  
      return similarProducts;
    } catch (error) {
      console.log(error);
    }
  }

export async function addUserEmailToProduct(productId: string, userEmail: string) {
    try {
      //check for which product we are sending the email get productbyid
      const product = await Product.findById(productId);
  
      if(!product) return;
  
      const userExists = product.users.some((user: User) => user.email === userEmail);
  
      if(!userExists) {
        product.users.push({ email: userEmail });
  
        await product.save();
  
        const emailContent = await generateEmailBody(product, "WELCOME");
  
        await sendEmail(emailContent, [userEmail]);
      }
    } catch (error) {
      console.log(error);
    }
  }