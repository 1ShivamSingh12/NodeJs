import { createClient } from "redis";


const Sequelize = require("sequelize");

export const sequelize = new Sequelize("olx_demo", "postgres", "shivam123", {
  host: "localhost",
  dialect: "postgres",
});

export const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};


export const client = createClient();
client.on("error", (err:Error) => console.log("Redis Client Error", err));

