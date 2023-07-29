import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

export class Images extends Model {
  public id!: number;
  public product_id!: number;
  public images!: Blob;
}

Images.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey:true
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    images: {
      type: DataTypes.BLOB("long"),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Images",
  }
);

// export default Sessions;

// Sessions.sync().then(() => {
//     console.log('Sequelize models synchronized');
//   }).catch((err:Error) => {
//     console.error('Sequelize sync error:', err);
//   });
