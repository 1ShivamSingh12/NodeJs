import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export class Sessions extends Model {
  public user_id!: number;
  public sessionId!: string;
  public deviceType!: string;
}

Sessions.init(
  {

    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey:true
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sessionId: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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

// Sessions.belongsTo(Users, { foreignKey: 'userId' });
// Users.hasMany(Sessions,{ foreignKey: 'userId' })

// export default Sessions;

// Sessions.sync().then(() => {
//     console.log('Sequelize models synchronized');
//   }).catch((err:Error) => {
//     console.error('Sequelize sync error:', err);
//   });
