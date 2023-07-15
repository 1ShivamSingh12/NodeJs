import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

export class User extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!:String
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        
      },
  },

  {
    sequelize,
    modelName: 'User',
  }
);

// export default User;

 // User.sync().then(() => {
  //     console.log('Sequelize models synchronized');
  //   }).catch((err:Error) => {
  //     console.error('Sequelize sync error:', err);
  //   });
  
