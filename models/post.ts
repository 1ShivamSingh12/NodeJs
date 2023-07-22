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

export const postData = mongoose.model('Posts' , post)


