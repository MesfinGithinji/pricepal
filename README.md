## Overview
Welcome to PriceDropp, your ultimate solution for effortlessly monitoring product prices on Amazon! PriceDropp is not just a tool; it's your trusty companion in the world of online shopping. Imagine having a personal assistant dedicated to keeping an eye on the products you love, ensuring you never miss a great deal again.

PriceDropp, is ingeniously crafted to seamlessly extract product details from Amazon. Using cutting-edge web scraping technology,comprehensive data is gathered, storing it securely in a MongoDB database. But PriceDropp is more than just a data collector—it's your vigilant watchdog, ready to notify you via email whenever there's a change in your favorite product's details.

Crafted with Next.js and Tailwind CSS, the interface boasts intuitive features. You can effortlessly search for products, delve into intricate details, and even subscribe to real-time updates.

PriceDropp isn't just a tool; it's your passport to intelligent and effortless online shopping.  

## Technologies and Frameworks

```markdown
- Next.js: A powerful React framework used for building dynamic web applications, handling both frontend and backend functionalities seamlessly.

- TypeScript: An advanced and statically typed superset of JavaScript, ensuring robust and error-free code.

- Mongoose: A flexible Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying database interactions and schema management.

- Axios: A promise-based HTTP client for efficient browser and Node.js communication, essential for making HTTP requests and fetching data.

- Nodemailer: A Node.js module facilitating effortless email sending, crucial for notifying users about updates and changes.

- Cheerio: A lightning-fast server-side implementation of jQuery, enabling seamless HTML parsing for efficient data extraction.

- Tailwind CSS: A utility-first CSS framework that accelerates custom design creation, ensuring visually appealing and responsive interfaces.

- React Responsive Carousel: A lightweight React component, perfect for creating visually engaging carousels and image sliders.

- Google Fonts: A rich library of licensed font families, enhancing your application's typography with diverse and appealing font styles.
```
## Installation

Follow these steps to install and run the project:

1. Clone the repository

    Open your terminal and run the following command to clone the repository:

    git clone https://github.com/MesfinGithinji/pricepal.git

2. Navigate to the project directory

    cd pricepal

3. Install Node.js

    The project requires Node.js to run. If you don't have it installed, you can download it from here.

4. Install the required packages

    The project requires several packages to be installed. Run the following command to install them:

    npm i

5. Install the required fonts

    The project requires the "font-inter" and "font-spaceGrotesk" fonts to be available. You can download them from Google Fonts.

6. Set up the environment variables

    The project requires the MONGODB_URI environment variable to be defined. You can do this in a .env file in the root of your project:

    MONGODB_URI=your_mongodb_uri

7. Start the server

    Run the following command to start the server:

    npm run start

Now, you should be able to access the project at http://localhost:3000.

