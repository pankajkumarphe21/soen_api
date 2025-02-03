import userModel from "../models/user.model.js";
import { createUser, getAllUsers } from "../services/user.service.js";
import {validationResult} from 'express-validator'
import redisClient from '../services/redis.service.js'

export const createUserController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const user=await createUser(req.body);
        return res.status(200).json(user)
        const token=await user.generateJWT(req.body.email);
        delete user._doc.password
        res.status(201).json({user,token});
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const loginUserController=async(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    try {
        const {email,password}=req.body;
        const user=await userModel.findOne({email}).select('+password');
        if(!user){
            return res.status(401).json({
                errors:'Invalid Credentials'
            })
        }
        const isMatch=await user.validPassword(password,user.password);
        if(!isMatch){
            return res.status(401).json({
                errors:'Invalid Credentials'
            })
        }
        delete user._doc.password;
        const token=await user.generateJWT(email);
        return res.status(200).json({user,token})
    } catch (error) {
        res.status(400).send(error.message);
    }
}

export const profileController=async(req,res)=>{
    res.status(200).json({
        user:req.user
    })
}

export const logoutController=async(req,res)=>{
    try {
        const token=req.cookies.token || req.headers.authorization.split(' ')[1];
        redisClient.set(token,'logout','EX',60*60*24);
        res.status(200).json({
            message:'Logged out successfully'
        })
    } catch (error) {
        console.log(error)
        res.status(400).send(error.message);
    }
}

export const getAllUsersController=async (req,res)=>{
    try {
        const user=await userModel.findOne({email:req.user.email});
        const allUsers=await getAllUsers({userId:user._id});
        return res.status(200).json({users:allUsers});
    } catch (err) {
        console.log(err);
        return res.status(400).json({error:err.message})
    }
}
