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
        type:String
    }

}) 

const comment = new mongoose.Schema({
    post_id:{

    },

    user_id:{
        type:String
    },

    comment_description:{
        type:String
    },

    comment_reply:comment_reply,
    
    comment_likes:{
        type:Number
    }

});


const commentData = mongoose.model('instagramUsers' , comment)

export default commentData