import mongoose from "mongoose";
import { performanceData } from "../models/performance";

export class performance {
  static performance = async (data: any) => {
    let findPlayer1 = await performanceData.find({
      player_id: data.batterId,
    });
    let findPlayer2 = await performanceData.find({
      player_id: data.bowlerId,
    });

    if (findPlayer1.length == 0 && findPlayer2.length == 0) {
      await performanceData.insertMany([
        {
          match_id: new mongoose.Types.ObjectId(data.params),
          player_id: new mongoose.Types.ObjectId(data.batterId),
        },
        {
          match_id: new mongoose.Types.ObjectId(data.params),
          player_id: new mongoose.Types.ObjectId(data.bowlerId),
        },
      ]);
    } else if (findPlayer1.length == 0) {
      await performanceData.insertMany([
        {
          match_id: new mongoose.Types.ObjectId(data.params),
          player_id: new mongoose.Types.ObjectId(data.batterId),
        },
      ]);
    } else if (findPlayer2.length == 0) {
      await performanceData.insertMany([
        {
          match_id: new mongoose.Types.ObjectId(data.params),
          player_id: new mongoose.Types.ObjectId(data.bowlerId),
        },
      ]);
    }
  };

  return: any
}
