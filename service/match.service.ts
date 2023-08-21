import { playerData } from "../models/playerModel";
import { matchData } from "../models/matchModel";
import { performanceData } from "../models/performance";
import mongoose from "mongoose";

export class matchUpdates {
  static performance = async (data: any) => {
    console.log(data);

    try {
      let player_team = await playerData.findById(data.batterId, {
        team_id: 1,
        _id: 0,
      });

      let findPlayer1 = await performanceData.find({
        player_id: data.batterId,
      });
      let findPlayer2 = await performanceData.find({
        player_id: data.bowlerId,
      });

      if (findPlayer1.length == 0 && findPlayer2.length == 0) {
        await performanceData.insertMany([
          {
            match_id: new mongoose.Types.ObjectId(data.match_id),
            player_id: new mongoose.Types.ObjectId(data.batterId),
          },
          {
            match_id: new mongoose.Types.ObjectId(data.match_id),
            player_id: new mongoose.Types.ObjectId(data.bowlerId),
          },
        ]);
      } else if (findPlayer1.length == 0) {
        await performanceData.insertMany([
          {
            match_id: new mongoose.Types.ObjectId(data.match_id),
            player_id: new mongoose.Types.ObjectId(data.batterId),
          },
        ]);
      } else if (findPlayer2.length == 0) {
        await performanceData.insertMany([
          {
            match_id: new mongoose.Types.ObjectId(data.match_id),
            player_id: new mongoose.Types.ObjectId(data.bowlerId),
          },
        ]);
      }

      try {
        if (player_team.team_id.equals(data.battingTeam)) {
          console.log("batter");

          await performanceData.updateOne(
            { player_id: data.batterId },
            {
              $inc: {
                Runs: data.Runs || 0,
                bowlsPlayed: data.ball || 0,
                fours: data.four || 0,
                Six: data.Six || 0,
              },
            }
          );
        }

        await performanceData.updateOne(
          { player_id: data.bowlerId },
          {
            $inc: {
              balls: data.ball || 0,
              runsGiven: data.Runs || 0,
            },
          }
        );

        if (data.wicket != 0) {
          await performanceData.updateOne(
            { player_id: data.bowlerId },
            {
              $push: { wickets: { player_id: data.batterId } },
            }
          );
        }
      } catch (error) {
        return error;
      }
      return "Success";
    } catch (error) {
      return error;
    }
  };
}
