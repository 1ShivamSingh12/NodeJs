import mongoose from "mongoose";

const likes = new mongoose.Schema({
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post' 
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },
});


export const likesdata = mongoose.model('PostsLikes' , likes)

