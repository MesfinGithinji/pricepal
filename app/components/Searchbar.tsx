"use client"
import { scrapeAndStoreProduct } from '@/lib/actions';
import { scrapeAmazonProduct } from '@/lib/scrapper';
import React, { FormEvent } from 'react'
import { useState } from 'react';

//function that returns a boolean value to tell us if the url provided is valid
const isValidAmazonProductURL = (url: string) => {
  try{
    const parsedURL = new URL(url); //parse the url first
    const hostname = parsedURL.hostname; //parse the hostname of that url
    //we need to check if the url the user has entered has anything like amazon.com 
    if (hostname.includes('amazon.com') ||
        hostname.includes('amazon.') ||
        hostname.includes('amazon'))
        {
          return true;
        }
  } catch (error){
    return false;
  }

}

const Searchbar = () => {
    //keep track of the url property using useState
    const [searchPrompt, setSearchPrompt]= useState('');

    //new useState field to handle what happens after the link is clicked
    const [isLoading,setIsLoading] = useState(false);

    //we have to turn this into a client side rendered component
    // also handle the event once submit is triggered
    const handleSubmit = async (event: FormEvent<HTMLFormElement>)=> {
      event.preventDefault();//prevent default behaviour of browser once its submitted

      const isValidLink = isValidAmazonProductURL(searchPrompt);
      if (!isValidLink) return alert("Please Provide a valid Link/URL");

      try{
        setIsLoading(true);

        //implement scrapping the product page
        const product = await scrapeAndStoreProduct(searchPrompt);
        
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }

    }

  return (
    <form className="flex flex-wrap gap-4 mt-12" 
    onSubmit={handleSubmit}>
        <input
            type="text"
            value={searchPrompt}  
            onChange={(e) => setSearchPrompt(e.target.value)} //keep track of the input value within our state
            placeholder="Enter link to your desired product"
            className="searchbar-input"
        />
        <button 
          type="submit" 
          className="searchbar-btn"
          disabled={searchPrompt === ''} //if its an empty string , disable the empty string
        >
          {isLoading ? 'Searching ... ': 'Search'}
        </button>
    </form>
  )
}

export default Searchbar