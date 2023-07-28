import { Model, DataTypes
 } from "sequelize";
import { sequelize } from "../config/db";


export class Sessions extends Model {
  public id!: number;
  public user_id!: number;
  public sessionId!: string;
  public deviceType!: string;
}

Sessions.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    deviceType: {
      type: DataTypes.STRING,
      allowNull: false,
    },

  },

  {
    sequelize,
    modelName: "Sessions",
  }
);

// Users.sync()
//   .then(() => {
//     console.log("Sequelize models synchronized");
//   })
//   .catch((err: Error) => {
//     console.error("Sequelize sync error:", err);
//   });
