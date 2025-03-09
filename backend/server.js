import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

dotenv.config()

connectCloudinary()
// App Config
const app = express()
const port = process.env.PORT || 4000
connectDB()


// Middlewares
app.use(express.json())
app.use(cors())


// API Endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/order', orderRouter)

// API Routes
app.get('/',(req,res)=> { res.send("API working")})

app.listen(port, ()=> console.log('Server Started on PORT : '+ port))

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