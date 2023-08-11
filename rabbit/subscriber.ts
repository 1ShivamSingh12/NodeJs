import amqp from "amqplib";
import { match_Summary } from "../models/matchSummary";
import mongoose from "mongoose";

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
          console.log('Received Score:', msg.content.toString());

          // let message = msg.content.toString();
          // let data = JSON.parse(message);
          // let summaryData = await match_Summary.find({
          //   match_id: new mongoose.Types.ObjectId(data.match_id),
          // });

          // console.log(summaryData.length);
  

          // if (summaryData.length >=1 ) {
          //   await match_Summary.insertMany([
          //     {
          //       match_id: new mongoose.Types.ObjectId(data.match_id),
          //       Commentary: {
          //         description: data.title,
          //       },
          //     },
          //   ]);

          
          // } else {
          //   await match_Summary.insertMany([
          //     {
          //       match_id: new mongoose.Types.ObjectId(data.match_id),
          //       Commentary: {
      
          //         description: data.title,
          //       },
          //     },
          //   ]);
          // }
        }
      },
      { noAck: true }
    );
  } catch (error) {
    console.error("Error occurred:", error);
  }
};
