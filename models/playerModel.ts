import mongoose from "mongoose";

enum playerRole {
  BATSMAN = "batsman",
  BOWLER = "bowler",
}


const performance = new mongoose.Schema({
    Matches:{
        type: Number, 
    },
    Runs:{
        type:Number
    },
    Centuries:{
        type:Number
    },
    Half_Century:{
        type:Number
    },
    Overs_Bowled:{
        type:Number
    },
    Total_Wickets:{
        type:Number
    },
    Best_Figure:{
        type:String
    }

}) 

const Player = new mongoose.Schema({
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  },
  profilePic: {
    type: Buffer,
  },
  Name: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },

  Country: {
    type: String,
    required: true,
  },

  Role: {
    type: String,
    enum: Object.values(playerRole),
    required: true,
  },

  performance:performance
});

export const playerData = mongoose.model("Players", Player);
