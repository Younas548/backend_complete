import mongoose from "mongoose";
import { DB_NAME } from "../constants";
import dotenv from "dotenv";

dotenv.config({
    path:`./env`
})

const connectdb = async () => {
    try{
        await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
        console.log(`\n mongodb connected ! ! DB HOST:${connectionInstance.connection.host}`);
        
    }
    catch(error){
        console.log("mongodb connection error" , error);
        process.exit(1)
    }
}

export default connectdb