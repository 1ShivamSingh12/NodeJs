import mongoose from "mongoose";

const user = new mongoose.Schema({
    name:{
        type:String
    },
    username:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    Bio:{
        type:String
    },
    followerList:{
        type:Number
    },
    followingList:{
        type:Number
    }
})

const userData = mongoose.model('instagramUsers' , user)

export default userData

