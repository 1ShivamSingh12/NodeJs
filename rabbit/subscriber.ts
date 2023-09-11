import amqp from "amqplib";
import mongoose from "mongoose";
import { matchData } from "../models/matchModel";
import { MatchSummaryEntity } from "../entity/matchSummaryEntity";

export const subscribe = async () => {
  try {
    const connection = await amqp.connect("amqp://localhost");
    const channel = await connection.createChannel();

    const queueName = "Score_Summary";

    await channel.assertQueue(queueName, { durable: false });

    console.log(`Waiting for messages in ${queueName}. To exit, press CTRL+C`);

    channel.consume(
      queueName,
      async (msg: any) => {
        if (msg !== null) {
          console.log("Received Score:", msg.content.toString());

          let message = msg.content.toString();
          let data = JSON.parse(message);
          
          let findballs = await matchData.aggregate([
            {
              $match: {
                currentBatting: new mongoose.Types.ObjectId(data.battingTeam),
              },
            },
            {
              $project: {
                currentlyBatting: {
                  $cond: {
                    if: {
                      $eq: [
                        "$teamA.team_id",
                        new mongoose.Types.ObjectId(data.battingTeam),
                      ],
                    },
                    then: "$teamA",
                    else: "$teamB",
                  },
                },
              },
            },
          ]);

          try {
            if (data) {
              await MatchSummaryEntity.insertMany(
                [
                  {
                    match_id: new mongoose.Types.ObjectId(data.match_id),
                    Commentary: {
                      Ball: findballs[0].currentlyBatting.balls_played,
                      description: data.title,
                    },
                  },
                ],
                {}
              );
            }
          } catch (error) {
            console.log(error);
          }
        }
      },
      { noAck: true }
    );
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
