import mongoose from 'mongoose';

//variable to check pour db connection status
let isConnected = false;

export const connectToDB =async () => {
    /**
     * First we need to set mongoose strict mode 
     * so as to prevent unknown field queries
     * 
     * Next we need to check if we have a mongoDB URI(connection to our DB)
     * 
     * Next we check if we already have an existing connection then use the existing connection
     */
    mongoose.set('strictQuery',true);

    if (!process.env.MONGODB_URI) return console.log('MONGODB_URI is not defined');

    if (isConnected) return console.log('=> using existing databse connection');

    // what if we are not connected but we do have a URI
    try {
        //accept the URI of the DB we want to connect to
        await mongoose.connect(process.env.MONGODB_URI)
        //updated our connection state variable
        isConnected = true; 
        console.log("MongoDB Connection Successful");

    } catch (error) {
        console.log(error);
    }


}