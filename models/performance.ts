import mongoose from "mongoose";

const Wickets = new mongoose.Schema({
    player_id : {
      type: mongoose.Schema.Types.ObjectId,
      ref: "player",
    },
  });
  
const performance = new mongoose.Schema({

    match_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "match",
      },

    player_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "player",
    },
    Runs: {
      type: Number,
      default:0
  
    },
    bowlsPlayed: {
      type: Number,
      default:0
  
    },
    fours: {
      type: Number,
      default:0
  
    },
    Six: {
      type: Number,
      default:0
  
    },
    out_by: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "player",
      required:false
    },
    balls: {
      type: Number,
      default:0
      
    },
    runsGiven: {
      type: Number,
      default:0
  
    },
    wickets: [Wickets],
  });
  

export const performanceData = mongoose.model("Performance", performance);
