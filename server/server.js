import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js'
import connectCloudinary from './configs/cloudinary.js'
import userRouter from './routes/userRoutes.js'

const app = express()

// Vercel does NOT allow top-level await (Serverless)
// Wrap it inside an async IIFE
;(async () => {
  await connectCloudinary()
})()

app.use(cors())
app.use(express.json())
app.use(clerkMiddleware())

app.get('/', (req, res) => res.send('Server is Live!'))

app.use(requireAuth())

app.use('/api/ai', aiRouter)
app.use('/api/user', userRouter)

// ❌ REMOVE app.listen()
// app.listen(PORT, ()=> console.log(`Server is running on ${PORT}`));

// ✅ EXPORT the app for Vercel serverless function
export default app;
