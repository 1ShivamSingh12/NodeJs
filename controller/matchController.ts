import { Context } from "koa";
import { ObjectId } from "mongodb";
import { matchData } from "../models/matchModel";
import { playerData } from "../models/playerModel";
import { publisher } from "../rabbit/publisher";
import { matchUpdates } from "../service/match.service";

export class match {
  static createMatch = async (ctx: Context) => {
    let createMatch = await matchData.insertMany([
      {
        teamA: {
          team_id: new ObjectId("64cc910cde9efedc577a2e97"),
          Extras: {},
        },
        teamB: {
          team_id: new ObjectId("64cc9230de9efedc577a2e99"),
          Extras: {},
        },
        date: new Date(),
        venue: "Mumbai",
        currentBatting: new ObjectId("64cc9230de9efedc577a2e99"),
        performance: [],
      },
    ]);
  };

  static matchUpdate = async (ctx: Context) => {
    try {
      let requestBody: any = ctx.request.body;
      requestBody["match_id"] = ctx.params.id;

      let teamBatting = await matchData.findById(ctx.params.id, {
        currentBatting: 1,
        _id: 0,
      });

      requestBody["battingTeam"] = teamBatting.currentBatting;

      let teamToUpdate = await matchData.find({
        "teamA.team_id": teamBatting.currentBatting,
      });

      if (requestBody.ball && !requestBody.noBall) {
        if (teamToUpdate.length == 1) {
          let updated = await matchData.findByIdAndUpdate(ctx.params.id, {
            $inc: {
              "teamA.Runs": requestBody.Runs || 0,
              "teamA.balls_played": requestBody?.ball || 0,
              "teamA.wickets": requestBody.wicket || 0,
              "teamB.balls": requestBody.ball || 0,
            },
          });
        } else {
          let updated = await matchData.findByIdAndUpdate(ctx.params.id, {
            $inc: {
              "teamB.Runs": requestBody.Runs || 0,
              "teamB.balls_played": requestBody?.ball || 0,
              "teamB.wickets": requestBody.wicket || 0,
              "teamA.balls": requestBody.ball || 0,
            },
          });
        }
      } else {
      }
      let data = await matchUpdates.performance(requestBody);

      if (data == "Success") {
        console.log("success");

        const [batterName, bowlerName] = await Promise.all([
          playerData.findById(requestBody.batterId, {
            Name: 1,
          }),
          playerData.findById(requestBody.bowlerId, {
            Name: 1,
          }),
        ]);

        let payload = {
          Batsman: batterName.Name,
          Bowler: bowlerName.Name,
          Runs: requestBody.Runs || 0,
          wicket: requestBody.wicket || 0,
          match_id: ctx.params.id,
          battingTeam: requestBody.battingTeam,
        };

        let publishedData = publisher.matchSummary(payload);
      }
    } catch (error) {}
  };

  static wicketUpdate = async (ctx: Context) => {
    console.log(ctx.request.body);
  };
}
