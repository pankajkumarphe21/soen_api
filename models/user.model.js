import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        trim:true,
        unique:true,
        required:true,
        lowercase:true,
        minLength:[6,'Email must be atleast 6 characters long'],
        maxLength:[50,'Email must not be more than 50 characters long']
    },
    password:{
        type:String,
        select:false
    }
})

userSchema.statics.hashPassword=async (password)=>{
    return await bcrypt.hash(password,10)
}

userSchema.methods.validPassword=async (password,userpassword)=>{
    return await bcrypt.compare(password,userpassword);
}

userSchema.methods.generateJWT=(email)=>{
    return jwt.sign({email},process.env.JWT_SECRET,{expiresIn:'24h'})
}

const User=mongoose.model('user',userSchema)

export default User;