import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'

//configure .env
dotenv.config()

//rest object
const app=express()

//rest api
app.get('/',(req,res)=>{
    res.send('<h1>welcome to ecommerce app</h1>')
})

//PORT
const PORT=process.env.PORT ||8080;

//listen
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white);
})