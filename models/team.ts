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





//  {
//     "Name":"Rohit Sharma",
//     "Age":37,
//     "Country":"India",
//     "performance":{
//         "Matches":0,
//         "Runs":0,
//         "Centuries":0,
//         "Half_Century":0,
//         "Overs_Bowled":0,
//         "Total_Wickets":0,
//         "Best_Figure":0
//     }
// }

