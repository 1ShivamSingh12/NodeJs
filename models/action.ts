import mongoose from "mongoose";

enum ActionPost {
    LIKE = 'like',
    comment_replyOMMENT = 'comment',
  }

const action = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    type:Object.values(ActionPost)
});

export const actions = mongoose.model('actions' , action)
