import mongoose from "mongoose";

enum ActionPost {
    LIKE = 'LIKE',
    cOMMENT = 'comment',
    
  }

const action = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    type:Object.values(ActionPost)
});

const actions = mongoose.model('instagramUsers' , action)

export default actions