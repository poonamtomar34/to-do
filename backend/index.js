const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const connectDB=require('./connection/connect')
const feedbackRouter=require('./routes/PendingRoute')
const express=require('express')

const app=express()

connectDB()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use('/api/v1', feedbackRouter)
app.listen(5000,()=>{
    console.log('server is running!')
})