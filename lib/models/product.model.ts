import mongoose from "mongoose";

/**
 * the schema for the data we are going to store
 * which include the parsed data for the product we are tracking
 */
const productSchema = new mongoose.Schema(
{
    url: { type: String, required: true, unique: true },
    currency: { type: String, required: true },
    image: { type: String, required: true },
    title: { type: String, required: true },
    currentPrice: { type: Number, required: true },
    originalPrice: { type: Number, required: true },
    priceHistory: [
        { 
        price: { type: Number, required: true },
        date: { type: Date, default: Date.now }
        },
    ],
    lowestPrice: { type: Number },
    highestPrice: { type: Number },
    averagePrice: { type: Number },
    discountRate: { type: Number },
    description: { type: String },
    category: { type: String },
    reviewsCount: { type: Number },
    isOutOfStock: { type: Boolean, default: false },
    users: [{email: { type: String, required: true}}], 
    default: [],
}, 
{ timestamps: true }
);

/**
 * Next we take the above schema and turn it into a model
 * The model is what we will use to create documents
 * If it doesnt exist create one based on the product schema
 */
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

//export the model
export default Product;
