import mongoose from "mongoose";

const team = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
 
});

export const teamData = mongoose.model("Teams", team);
