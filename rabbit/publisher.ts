import amqp from "amqplib";

export class publisher {
  static matchSummary = async (data: any) => {
    console.log(data);

    try {
      const connection = await amqp.connect("amqp://localhost");

      const channel = await connection.createChannel();

      const queueName = "Score_Summary";

      let runSummary = {
        title: `${data.Bowler} to ${data.Batsman} ${data.Runs} Run `,
        match_id: data.match_id,
        battingTeam: data.battingTeam,
      };

      let wicketUpdateSummary = {
        title: `${data.Bowler} to ${data.Batsman} Wicket`,
        match_id: data.match_id,
        battingTeam: data.battingTeam,
      };

      await channel.assertQueue(queueName, { durable: false });

      if (data.wicket != 0) {
        channel.sendToQueue(
          queueName,
          Buffer.from(JSON.stringify(wicketUpdateSummary))
        );
        console.log(` Summary sent : ${JSON.stringify(wicketUpdateSummary)}`);
      } else {
        channel.sendToQueue(queueName, Buffer.from(JSON.stringify(runSummary)));
        console.log(` Summary sent : ${JSON.stringify(runSummary)}`);
      }

      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500);
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
}
