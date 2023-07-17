import mongoose from "mongoose";

const tags = new mongoose.Schema({
    name:{
        type:String
    },

    user_id:{

    }
});


const post = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },

    image:{
        type:String
    },
    tags:tags,

    description:{
        type:String
    },
    likes:{
        type:String
    },
    comments:{
        type:String
    },
})

const postData = mongoose.model('instagramUsers' , post)

export default postData

