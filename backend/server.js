import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import connectDB from './config/mongodb.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRoute.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

dotenv.config();

connectCloudinary();
// App Config
const app = express();
const port = process.env.PORT || 4000;
connectDB();

// Middlewares
app.use(express.json());
app.use(cors());

// API Endpoints
app.use('/api/user', userRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);

// Verify email environment variables
if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.error(" ERROR: Missing EMAIL_USER or EMAIL_PASS in .env file");
  process.exit(1);
}

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email
    pass: process.env.EMAIL_PASS, // App password (if using Gmail)
  },
});

// Newsletter Subscription API
app.post('/api/newsletter/subscribe', async (req, res) => {
  const { email } = req.body;

  if (!email || !email.includes('@')) {
    return res.status(400).json({ message: 'Invalid email address' });
  }

  // Email content
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Welcome to Clothing E-commerce Platform!',
    html: `
      <h2>Thank You for Subscribing!</h2>
      <p>You're now part of our Clothing platform newsletter. Stay tuned for exclusive updates and offers.</p>
      <p>Best Regards,<br>Project Manager<br>Devnath Jayasekara</p>
    `,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}`);
    res.json({ message: 'Subscription successful! Confirmation email sent.' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ message: 'Failed to send email. Please try again.' });
  }
});

// Order Confirmation Email API
app.post('/api/sendOrderEmail', async (req, res) => {
  const { items, address, amount } = req.body;

  if (!items || !address || !amount) {
    return res.status(400).json({ message: 'Missing order details' });
  }

  const emailContent = `
    <h2>Order Confirmation</h2>
    <p>Thank you for your order!</p>
    <h3>Order Details:</h3>
    <ul>
      ${items.map(item => `
        <li>${item.name} - Size: ${item.size} - Quantity: ${item.quantity} - Price: $${item.price}</li>
      `).join('')}
    </ul>
    <h3>Shipping Address:</h3>
    <p>${address.firstName} ${address.lastName}<br>
    ${address.street}<br>
    ${address.city}, ${address.state} ${address.zipcode}<br>
    ${address.country}<br>
    Phone: ${address.phone}</p>
    <h3>Total Amount: $${amount}</h3>
    <p>We will notify you once your order has been shipped.</p>
    <p>Best regards,<br>Clothing E-commerce Team</p>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: address.email,
    subject: 'Order Confirmation - Clothing E-commerce',
    html: emailContent,
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log(`Order confirmation email sent to ${address.email}`);
    res.json({ message: 'Order confirmation email sent.' });
  } catch (error) {
    console.error('Error sending order email:', error);
    res.status(500).json({ message: 'Failed to send order email. Please try again.' });
  }
});

// API Routes
app.get('/', (req, res) => {
  res.send('API working');
});

app.listen(port, () => console.log(`Server started on PORT: ${port}`));



// import express from 'express'
// import cors from 'cors'
// import dotenv from 'dotenv'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'
// import productRouter from './routes/productRoute.js'
// import cartRouter from './routes/cartRoute.js'
// import orderRouter from './routes/orderRoute.js'

// dotenv.config()

// connectCloudinary()
// // App Config
// const app = express()
// const port = process.env.PORT || 4000
// connectDB()


// // Middlewares
// app.use(express.json())
// app.use(cors())


// // API Endpoints
// app.use('/api/user', userRouter)
// app.use('/api/product', productRouter)
// app.use('/api/cart', cartRouter)
// app.use('/api/order', orderRouter)

// // API Routes
// app.get('/',(req,res)=> { res.send("API working")})

// app.listen(port, ()=> console.log('Server Started on PORT : '+ port))

// import express from 'express'
// import cors from 'cors'
// import 'dotenv/config'
// import { connect } from 'mongoose'
// import connectDB from './config/mongodb.js'
// import connectCloudinary from './config/cloudinary.js'
// import userRouter from './routes/userRoute.js'

// // App config
// const app = express()   
// const port = process.env.PORT || 9000
// connectDB()
// connectCloudinary()

// // Middleware
// app.use(express.json()) 
// app.use(cors())

// // API endpoints
// app.use('/api/user', userRouter)

// // API routes
// app.get('/', (req, res) =>{res.send('API Working')})
// app.listen(port, ()=> console.log('Server started on port : '+ port))