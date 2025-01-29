import projectModel from "../models/project.model.js";
import mongoose from "mongoose";

export const createProject=async ({
    name,
    userId
})=>{
    if(!name){
        throw new Error("Name is required")
    }
    if(!userId){
        throw new Error("User is required")
    }
    try {
        const project=await projectModel.create({name,users:[userId]});
        return project;
    } catch (error) {
        throw new Error(error.message)
    }
}

export const getAllProjectByUserId=async ({userId}) => {
    if(!userId){
        throw new Error('UserId is required')
    }
    const allUserProjects=await projectModel.find({users:userId})
    return allUserProjects;
}

export const addUsersToProject=async ({projectId,users,userId}) => {
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }

    if (!users) {
        throw new Error("users are required")
    }

    if (!Array.isArray(users) || users.some(userId => !mongoose.Types.ObjectId.isValid(userId))) {
        throw new Error("Invalid userId(s) in users array")
    }

    if (!userId) {
        throw new Error("userId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("Invalid userId")
    }


    const project = await projectModel.findOne({
        _id: projectId
    })

    if (!project) {
        throw new Error("User not belong to this project")
    }
    users.forEach((user)=>{
        let temp=project.users.filter((userTemp)=>{
            return userTemp.toString()==user
        })
        if(temp.length===0){
            project.users.push(user)
        }
    })
    await project.save();
    return project;
}

export const getProjectByID=async ({projectId})=>{
    if (!projectId) {
        throw new Error("projectId is required")
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }
    const project=await projectModel.findOne({_id:projectId}).populate('users');
    return project;
};