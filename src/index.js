//require(`dotenv`).config({path: `./env`})
import dotenv from "dotenv";
import { app } from "./app.js";

import connectdb from "./db/index.js";

dotenv.config({
  path: "./.env"
})
connectdb()
.then(()=>{
  app.listen(process.env.PORT || 8000, ()=>{
    console.log(`server is runnng on port ${process.env.PORT}`);
    
  }

  )
})
.catch((err)=>{
  console.log("Mongodb connection failed ! ! !",err);
  
})





























/*
import express from "express"
const app = express()

(async ()=>{
  try{
     await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
       app.on("error",(error) => {
        console.log("error ",error);
        throw err
       })

       app.listen(process.env.PORT,()=>{
        console.log(`App is lstening on ${process.env.PORT}`);
        
       })
    }
  catch(error){
      console.log("ERROR: " ,error);
       throw err
  }
})()*/