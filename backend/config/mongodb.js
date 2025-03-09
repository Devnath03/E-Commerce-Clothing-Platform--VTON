import  mongoose  from "mongoose";

// Access the .env file
import dotenv from 'dotenv';
dotenv.config();
const connectDB = async () => {

    mongoose.connection.on('connected', () => {

        console.log("MongoDB is connected");

    })

    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`)

}

export default connectDB;


// import mongoose from "mongoose";

// const connectDB = async () => {

// mongoose.connection.on('connected', () => {
//     console.log("MongoDB is connected");
// })


// await mongoose.connect('${process.env.MONGODB_URI}/e-commerce')

// }

// export default connectDB;