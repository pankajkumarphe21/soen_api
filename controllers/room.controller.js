import roomModel from "../models/room.model.js";
import userModel from "../models/user.model.js";
import { generateResult } from "../services/ai.service.js";

export const getAllMessages=async (req,res)=>{
    const room=await roomModel.findOne({projectId:req.params.projectId}).populate("messages.userId");
    if(!room){
        return res.status(200).json();
    }
    return res.status(200).json(room.messages);
};

export const sendMessage=async (req,res)=>{
    const room=await roomModel.findOne({projectId:req.params.projectId});
    const user=await userModel.findOne({_id:req.body._id});
    let output=null;
    if(req.body.message.includes('@ai')){
        const message=await generateResult(req.body.message);
        room.messages.push({userId:user._id,text_message:req.body.message,createdAt:Date.now()});
        output=message;
        room.messages.push({userId:user._id,text_message:message,createdAt:Date.now(),category:'ai'});
    }
    else{
        output=req.body.message
        room.messages.push({userId:user._id,text_message:req.body.message,createdAt:Date.now()});
    }
    await room.save();
    return res.status(200).json(output);
}