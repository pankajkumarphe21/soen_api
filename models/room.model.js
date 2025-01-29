import mongoose from 'mongoose';

const roomSchema = new mongoose.Schema({
    projectId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'project',
        required: true
    },
    messages: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'user',
                required: true
            },
            category:{
                type:String,
                default:'user'
            },
            text_message: {
                type: String,
                required: true
            },
            createdAt: {
                type: Date,
                default: Date.now
            }
        }
    ] 
});

const Room = mongoose.model('room', roomSchema);

export default Room;
