import mongoose from "mongoose";



const comment_reply = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post' 
    },
    reply_desc:{
        type:String
    },
    reply_likes:{
        type:Number
    }

}) 

const comment = new mongoose.Schema({
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post'    
    },

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    comment_description:{
        type:String
    },
    
    comment_likes:{
        type:Number
    },

    comment_reply:comment_reply,
    

});


const commentData = mongoose.model('instagramUsers' , comment)

export default commentData