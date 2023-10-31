import axios from "axios";
import * as cheerio from 'cheerio';
import { extractPrice } from "../utils";

//scraping functionality handled with this function
export async function scrapeAmazonProduct(url:string) {
    //first we check if a url actually exists
    if (!url) return ;

    /** 
     * next we will use brightdata scrapping functionality
     * First step is to set up the BrightData proxy configuration using env variables 
     * for the credentials
    */

    /**
     * curl --proxy brd.superproxy.io:22225 --proxy-user brd-customer-hl_ccba8448-zone-unblocker:rfl55oa3g76n -k https://lumtest.com/myip.json
     */
    const username = String(process.env.BRIGHT_DATA_USERNAME);
    const password = String(process.env.BRIGHT_DATA_PASSWORD);
    
    //define the port number that we will use to access our bright data config
    const port = 22225
    //generate a random session number
    const session_id = (1000000 * Math.random()) | 0;
    //additional options object
    const options = {
        auth : {
            username: `${username}-session-${session_id}`,
            password,
        },
        host: 'brd.superproxy.io',
        port,
        rejectUnauthorized: false,
    }

    try {
        /**
         * Here is where we fetch the product page
         * First we will get the response from the page using Axios for our API call
         * Then we will use Cheerio to parse through the HTML content we have scrapped
         */
        const response = await axios.get(url, options);
        
        const $ = cheerio.load(response.data);
        //extract the data using cheerio
        const title = $('#productTitle').text().trim();

        //lets get the current price on offer due to promotions/deals
        const currentPrice = extractPrice(
            //get relevant class names and IDs to return data
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base')
        );
        //get original price for the product we are tracking
        const originalPrice = extractPrice(
            //get relevant class names and IDs to return data
            $('.priceToPay span.a-price-whole'),
            $('a.size.base.a-color-price'),
            $('.a-button-selected .a-color-base')
        )
        console.log({title} , {currentPrice} , {originalPrice});

    } catch (error :any) {
        throw new Error(`Failed to Scrape Requested Product: ${error.message}`)
    }
}
