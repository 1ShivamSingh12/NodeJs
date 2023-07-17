import mongoose from "mongoose";

const action = new mongoose.Schema({
    likes:{
        ref:'likes'
    },

    comments:{
        ref:'comment'
    }
});

const actions = mongoose.model('instagramUsers' , action)

export default actions