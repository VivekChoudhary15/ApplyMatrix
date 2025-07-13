import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import './config/instrument.js'
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



