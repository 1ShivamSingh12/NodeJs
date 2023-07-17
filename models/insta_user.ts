import mongoose from "mongoose";

const user = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    bio:{
        type:String
    },
    followerCount:{
        type:Number
    },
    followingCount:{
        type:Number
    },
    profilePic:{
        type:String
    },
    postCount:{
        type:String
    }
})

const userData = mongoose.model('instagramUsers' , user)

export default userData

