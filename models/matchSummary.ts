import mongoose from "mongoose";


const Commentary = new mongoose.Schema({
    Ball : {
      type:Number,
      default:0,
      
    },

    description:{
        type:String,
    }
  });
  


const Match_Summary = new mongoose.Schema({

    match_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Match'
    },

    Commentary : Commentary
});


export const match_Summary = mongoose.model("Match_Commentary", Match_Summary);
