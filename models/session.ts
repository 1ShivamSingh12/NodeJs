import mongoose from "mongoose";

const Session = new mongoose.Schema({
    session_id:{
        type:String,
        
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    device_type:{
        type:String,
    },
    device_id:{
        type:String,
    },
})

export const SessionData = mongoose.model('Sessions' , Session)