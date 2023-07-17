import mongoose from "mongoose";

enum FollowAction {
    ACCEPTED = 'accepted',
    REJECTED = 'reject',
    PENDING  ='pending',
    BLOCKED = 'block'

  }

const followData = new mongoose.Schema({
    sender_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'post' 
    },
    receiver_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User' 
    },

    status:{
    type:Object.values(FollowAction)
    },
});


const follow = mongoose.model('FollowerManagemnet' , followData)

export default follow