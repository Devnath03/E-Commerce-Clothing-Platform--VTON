 import mongoose from "mongoose";

 const productSchema = new mongoose.Schema({

    name: {type: String, required:true },
    description: {type: String, required:true },
    price: {type: Number, required:true },
    image: {type: Array, required:true },
    category: {type: String, required:true },
    subCategory: {type: String, required:true },
    bestseller: { type: Boolean, default: false },
    sizes: { type: [String], default: [] },
    date: { type: Date, default: Date.now },
   //  size: {type: Array, required:true },
   //  beastseller: {type: Boolean },
   //  date: { type: Date, default: Date.now },

 })

 const productModel = mongoose.models.product || mongoose.model("product", productSchema);

  export default productModel