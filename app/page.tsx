import React from 'react'

import Image from "next/image"
import Searchbar from './components/Searchbar'
import HeroCarousel from './components/HeroCarousel'


const Home = () => {
  return (
    <>
      <section className="px-6 md:px:-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justofy-center">
            <p className="small-text"> 
            Begin the Ultimate Shopping Expereince
            <Image
              src="/assets/icons/arrow-right.svg"
              alt="arrow-right"
              width={16}
              height={16}
            />
            </p>
            <h1 className="head-text">
              Save Money and Time using
               <span className="text-primary"> PriceDropp</span>
            </h1>
            <p className="mt-6">
              Are you tired on missing out on terrific deals on your favourite products ?
              Well, PriceDropp saves you the trouble through a powerful platform that helps you keep track of great deals on your favourite products and never miss out on a great deal ever again.
              All from the comfort of your device.
            </p>

            <Searchbar/>
          </div>

          <HeroCarousel/>
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {['Iphone 14 Pro', 'Books','Sneakers'].map
            ((product) => (
              <div>{product}</div>
            ))}
        </div>
      </section>
    </>
  )
}

export default Home
