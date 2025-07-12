import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import './config/instrument.js' // Sentry initialization
import * as Sentry from '@sentry/node'
import { clerkWebhook } from './controllers/webhooks.js'
import userRoutes from './routes/userRoutes.js'
import companyRoutes from './routes/companyRoutes.js'
import connectCloudinary from './config/cloudinary.js'
import './config/multer.js'
import { Webhook } from 'svix'
import jobRoutes from './routes/jobRoutes.js'
import {clerkMiddleware} from '@clerk/express'
import bodyParser from 'body-parser'

dotenv.config()
// Initialize express
const app = express()

// Connect to MongoDB
await connectDB()
await connectCloudinary()

// Webhook route for Clerk
// This must be before app.use(express.json()) to receive the raw body
// app.post('/webhooks', bodyParser.raw({ type: 'application/json' }), 
// async function (req, res) {
//   try{
//     const payloadString = req.body.toString()
//     const svixHeaders = req.headers

//     const webhook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

//     const evt = webhook.verify(payloadString, svixHeaders)

//     const {id, ...attributes} = evt.data

//     const eventType = evt.type

//     if (eventType === 'user.created') {
//       const userData = {
//         _id: id,
//         email: attributes.email_addresses[0].email_address,
//         name: `${attributes.first_name} ${attributes.last_name}`,
//         image: attributes.image_url || '',
//         resume: ''
//       }
//       await User.create(userData)
//       console.log('User created:', userData)
//     }
//     res.status(200).json({ success: true, message: 'Webhook received' });
  
//   }catch (error) {
//     console.error('Error processing Clerk webhook:', error);
//     res.json({ success: false, message: error.message });
//   }
// }
// )
app.post('/webhooks', bodyParser.raw({ type: 'application/json' }), clerkWebhook)
// Middleware
app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

// Routes
app.get('/', (req, res) => {
  res.send('API is running')
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});

app.use('/api/company', companyRoutes)
app.use('/api/jobs', jobRoutes)
app.use('/api/users', userRoutes)

// Port
const PORT = process.env.PORT || 5000

// Sentry error handling middleware
Sentry.setupExpressErrorHandler(app)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})



