import mongoose from "mongoose";

const Session = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user' 
    },
    session_id:{
        type:String,  
    },
    device_type:{
        type:String,
    },
    device_id:{
        type:String,
    },
})

export const SessionData = mongoose.model('Sessions' , Session)