import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";


export class Category extends Model {
  public id!: number;
  public category_name!: string;
  public category_image!: Blob;
}

Category.init(
  {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    category_image: {
      type: DataTypes.BLOB,
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    modelName: "Category",
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
