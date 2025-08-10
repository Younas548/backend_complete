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

userSchema.pre("save" ,async function (next) {
    if (!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password,10)
    next()
})

userSchema.method.isPasswordCorrect = async function (password){
   return await bcrypt.compare(password,this.password)
}

userSchema.method.generateAccessToken = function (){
    return jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullname: this.username

    },
    process.env.ACCESS_TOKEN_SECRET,
    {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.method.generateRefreshToken = function (){
    return jwt.sign({
        _id: this._id,
        
    },
    process.env.REFRESH_TOKEN_EXPIRY,
    {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}





export const User = mongoose.model("User", userSchema)