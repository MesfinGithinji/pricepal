"use server"

import { scrapeAmazonProduct } from "../scrapper";

export async function scrapeAndStoreProduct(productUrl : string){
    if (!productUrl) return;

    try {
        //the scrapped product via the url is done here using the scrapeAmazonProduct function
        const scrapeProduct = await scrapeAmazonProduct(productUrl);
    } catch (error: any) {
        throw new Error(`Failed to create/update product: ${error.message}`);
    }
}