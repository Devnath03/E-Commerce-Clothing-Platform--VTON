 import validator from "validator";
 import bcrypt from "bcrypt";
 import jwt from 'jsonwebtoken'
 import Usermodel from "../models/userModel.js";
import { json } from "express";
 
 const createToken = (id) => {

        return jwt.sign({id}, process.env.JWT_SECRET) 
            // expiresIn: 3 * 24 * 60 * 60
        
 }

// Route for user login
 const loginUser = async (req,res) => {

    try{
        const {email, password} = req.body;

        // checking user exists or not
        const user = await Usermodel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User not found or exists"})
        }
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({success:true,token})

        }else{
            res.json({success:false,message:"Invalid Credentials"})
        }

    }catch (error){

        console.log(error)
        res.json({success:false, message:error.message})
    }
 }

 // Route for user registration  
 const registerUser = async (req,res) => {
    
     try{
         const {name, email, password} = req.body;

         // checking user alrady exists or not
         const  exists = await Usermodel.findOne({email});
        
         if(exists){
             return res.json({success:false,message:"User already exists"})
         }
         // validation email & format strong password
         if (!validator.isEmail(email)){
             return res.json({success:false,message:"Invalid Email Address"})
         }
         if (password.length < 8){
             return res.json({success:false,message:"Enter a Strong Password"})
         }
       
         // Hashing Password
         const salt = await bcrypt.genSalt(10)   
         const hashedPassword = await bcrypt.hash(password, salt)

         const newUser = new Usermodel({
             name,
             email,
             password: hashedPassword
         })

         const user = await newUser.save()

         const token = createToken(user._id)

         res.json({success:true,token})


     } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})

 }
 }

 //Route For Admin Login
 const adminLogin = async (req,res) => {
    
    try{
        const {email, password} = req.body
        if(email == process.env.ADMIN_EMAIL && password == process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET);
            return res.json({success:true, token})
        }else{
            return res.json({success:false, message:"Invalid Credentials"})
        }
        
    }catch (error){

        console.log(error)
        res.json({success:false, message:error.message})
    } 
 }



 export {loginUser, registerUser, adminLogin}