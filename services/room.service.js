import roomModel from "../models/room.model.js";
import mongoose from "mongoose";

export const createRoom=async({projectId})=>{
    if (!projectId) {
        throw new Error("projectId is required")
    }

    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error("Invalid projectId")
    }
    try {
        const room=await roomModel.create({projectId});
        return room;
    } catch (error) {
        throw new Error(error.message)
    }
}