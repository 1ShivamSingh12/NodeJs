import amqp from "amqplib";

export class publisher {
  static matchSummary = async (data: any) => {
    console.log(data);

    try {
      const connection = await amqp.connect("amqp://localhost");

      const channel = await connection.createChannel();

      const queueName = "Score_Summary";

      let Summary = {

        title: `${data.Bowler} to ${data.Batsman} ${data.Runs} Run`,
        match_id: data.match_id

      } 

      await channel.assertQueue(queueName, { durable: false });
      channel.sendToQueue(queueName, Buffer.from(JSON.stringify(Summary)));

      console.log(` Summary sent : ${JSON.stringify(Summary)}`);

      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500);

    } catch (error) {
      console.error("Error occurred:", error);
    }
  };
}
