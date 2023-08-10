import { ObjectId } from "mongodb";
import mongoose from "mongoose";

enum playerRole {
  BATSMAN = "batsman",
  BOWLER = "bowler",
}

const Extra = new mongoose.Schema({
  wide : {
    type:Number,
    default:0
  },
  noBalls:{
    type:Number,
    default:0
  },
});


const team = new mongoose.Schema({
  team_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  },
  Runs: {
    type: Number,
    default:0
  },
  wickets: {
    type: Number,
    default:0
  },
  balls: {
    type: Number,
    default:0
  },
  balls_played: {
    type: Number,
    default:0
  },
  Extras:Extra ,
});


const Match = new mongoose.Schema({
  teamA: team,

  teamB: team,

  date: {
    type: Date,
    required: true,
  },
  venue: {
    type: String,
    required: true,
  },

  currentBatting: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "team",
  },
});

export const matchData = mongoose.model("Matches", Match);

