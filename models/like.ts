import mongoose from "mongoose";

const likes = new mongoose.Schema({
    post_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post' 
    },

    like_count:{
        type:Number
    },

});


const likesdata = mongoose.model('instagramUsers' , likes)

export default likesdata