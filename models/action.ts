import mongoose from "mongoose";

const action = new mongoose.Schema({
    likes:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'likes'

    },

    comments:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }
});

const actions = mongoose.model('instagramUsers' , action)

export default actions