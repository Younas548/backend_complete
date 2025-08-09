import mongoose from "mongoose";
import { DB_NAME} from "./constants";
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
})()