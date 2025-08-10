import mongoose,{Schema} from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const userSchema = new Schema({
    username:{
        required:true,
        type:String,
        unique:true,
        lowercase: true,
        trim: true,


    },
    email:{
        required:true,
        type:String,
        unique:true,
        lowercase: true,
        trim: true,
    },
    fullname:{
        required:true,
        type:String,
        unique:true,
        index: true,
        trim: true,
    },
        avator:{
        required:true,       //coloudinary url
        type:String,
    },
         CoverImage:{
        required:true,       //coloudinary url
    },
      watchHistory:[
      {
        required:true,       //coloudinary url
        type:Schema.Types.ObjectId,
        ref:"Video"
    }],
    password:{
        required:true,
        type:[true,`password is required`],
    },
    refreshToken:{
        type:String,
    },
    

},
{
    timestamps: true

},
)

export const User = mongoose.model("User", userSchema)