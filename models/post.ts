import mongoose from "mongoose";

const tags = new mongoose.Schema({

    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
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
    likesCount:{
        type:Number
    },
    commentCount:{
        type:Number
    },
})

const postData = mongoose.model('instagramUsers' , post)

export default postData

