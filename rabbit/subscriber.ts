import amqp from 'amqplib';

export const subscribe = async() => {
  try {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    const queueName = 'Score_Summary';

    await channel.assertQueue(queueName, { durable: false });

    console.log(`Waiting for messages in ${queueName}. To exit, press CTRL+C`);

    channel.consume(queueName, (message:any) => {
      if (message !== null) {
        console.log('Received Score:', message.content.toString());
        channel.ack(message);
      }
    });
  } catch (error) {
    console.error('Error occurred:', error);
  }
}

