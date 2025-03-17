import userModel from "../models/user.model.js";
import { addUsersToProject, createProject, getAllProjectByUserId,deleteProject, getAdmin, getProjectByID } from "../services/project.service.js";
import {validationResult} from 'express-validator';
import { createRoom, deleteRoom } from "../services/room.service.js";

export const createProjectController=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {name}=req.body;
        const loggedInUser=await userModel.findOne({email:req.user.email});
        const userId=loggedInUser._id;
        const newProject=await createProject({name,userId:[userId]});
        await createRoom({projectId:newProject._id});
        res.status(201).json(newProject);
    } catch (error) {
        console.log(error)
        res.status(400).json(error.message);
    }
}

export const getAllProject=async (req,res)=>{
    try {
        const loggedInUser=await userModel.findOne({
            email:req.params.email
        });
        const allUserProjects=await getAllProjectByUserId({userId:loggedInUser});
        return res.status(200).json({projects:allUserProjects});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message});
    }
}

export const deleteProjectController=async (req,res)=>{
    try {
        const projectId=req.params.projectId;
        const admin=await getAdmin({projectId});
        const user=await userModel.findOne({_id:admin});
        const user_email=user.email;
        if(req.user.email==user_email){
            await deleteProject({projectId});
            await deleteRoom({projectId});
        }
        else{
            return res.status(401).json({message:"You can't delete"})
        }
        return res.status(200).json({message:'project deleted'});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message});
    }
}

export const addUserToProject=async (req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    }
    try {
        const {projectId,users}=req.body;
        const loggedInUser=await userModel.findOne({email:req.user.email});
        const project=await addUsersToProject({projectId,users,userId:loggedInUser});
        return res.status(200).json({project,});
    } catch (error) {
        console.log(error);
        res.status(400).json({error:error.message})
    }
}

export const getProjectById=async (req,res)=>{
    const {projectId}=req.params;
    try {
        const project=await getProjectByID({projectId});
        return res.status(200).json({project})
    } catch (error) {
        console.log(error)
        return res.status(400).json({error:error.message});
    }
}

export const updateFileTree=async (req,res)=>{
    const fileTree=req.body.fileTree;
    try {
        const project=await getProjectByID({projectId:req.params.projectId});
        project.fileTree=fileTree;
        await project.save();
    } catch (error) {
        console.log(error);
        return res.status(400).json({error:error.message});
    }
}