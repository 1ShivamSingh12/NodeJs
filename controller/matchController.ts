import { Context } from "koa";
import { publisher } from "../rabbit/publisher";
import { matchService } from "../service/match.service";
import { MatchEntity } from "../entity/matchEntity";
import { PlayerEntity } from "../entity/playerEntity";

export class match {


  static createMatch = async (ctx: Context) => {
    try {

      const response = await matchService.createMatch()

      ctx.status = 200;
      ctx.response.body = response;

    } catch (error) {
      throw (ctx.response = error);
    }
  };

  static matchUpdate = async (ctx: Context) => {
    try {
      let requestBody: any = ctx.request.body;
      requestBody["match_id"] = ctx.params.id;

      let teamBatting = await MatchEntity.findById(
        ctx.params.id,
        {
          currentBatting: 1,
          _id: 0,
        },
        {}
      );

      requestBody["battingTeam"] = teamBatting.currentBatting;

      let teamToUpdate = await MatchEntity.find(
        {
          "teamA.team_id": teamBatting.currentBatting,
        },
        {},
        {}
      );

      if (requestBody.ball && !requestBody.noBall && !requestBody.wide) {
        console.log("no no ball znd wide");

        if (teamToUpdate.length == 1) {
          let updated = await MatchEntity.findByIdAndUpdate(
            ctx.params.id,
            {
              $inc: {
                "teamA.Runs": requestBody.Runs || 0,
                "teamA.balls_played": requestBody?.ball || 0,
                "teamA.wickets": requestBody.wicket || 0,
                "teamB.balls": requestBody.ball || 0,
              },
            },
            {}
          );
        } else {
          let updated = await MatchEntity.findByIdAndUpdate(
            ctx.params.id,
            {
              $inc: {
                "teamB.Runs": requestBody.Runs || 0,
                "teamB.balls_played": requestBody?.ball || 0,
                "teamB.wickets": requestBody.wicket || 0,
                "teamA.balls": requestBody.ball || 0,
              },
            },
            {}
          );
        }
      } else if (requestBody.noBall > 0 || requestBody.wide > 0) {
        console.log("no ball or wide");

        if (teamToUpdate.length == 1) {
          await MatchEntity.findByIdAndUpdate(
            ctx.params.id,
            {
              $inc: {
                "teamA.Extras.wide": requestBody.wide || 0,
                "teamA.Extras.noBalls": requestBody.noBall || 0,
              },
            },
            {}
          );

          let updated = await MatchEntity.findByIdAndUpdate(
            ctx.params.id,
            {
              $inc: {
                "teamA.Runs": requestBody.Runs || 0,
              },
            },
            {}
          );
        } else {
          await MatchEntity.findByIdAndUpdate(
            ctx.params.id,
            {
              $inc: {
                "teamB.Extras.wide": requestBody.wide || 0,
                "teamB.Extras.noBalls": requestBody.noBall || 0,
              },
            },
            {}
          );

          let updated = await MatchEntity.findByIdAndUpdate(
            ctx.params.id,
            {
              $inc: {
                "teamB.Runs": requestBody.Runs || 0,
              },
            },
            {}
          );
        }
      }
      let data = await matchService.performance(requestBody);

      if (data == "Success") {
        console.log("success");

        const [batterName, bowlerName] = await Promise.all([
          PlayerEntity.findById(
            requestBody.batterId,
            {
              Name: 1,
            },
            {}
          ),
          PlayerEntity.findById(
            requestBody.bowlerId,
            {
              Name: 1,
            },
            {}
          ),
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
    } catch (error) {


    }
  };
}
