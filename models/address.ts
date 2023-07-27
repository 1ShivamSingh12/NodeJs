import { Model, DataTypes, IntegerDataType } from "sequelize";
import { sequelize } from "../config/db";

enum addressEnum {
  WORK = "work",
  HOME = "home",
  DEFAULT = "default",
}

export class Address extends Model {
  public id!: number;
  public user_id!: number;

  public street1!: string;
  public street2!: string;
  public landmark!: string;
  public city!: string;
  public state!: string;
  public address_type!: addressEnum;
  public zip_code!: number;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    street1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    street2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    landmark: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    state: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    address_type: {
      type: DataTypes.ENUM(
        addressEnum.WORK,
        addressEnum.HOME,
        addressEnum.DEFAULT
      ),
      allowNull: false,
    },

    zip_code: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },

  {
    sequelize,
    modelName: "Users",
  }
);

// Users.sync()
//   .then(() => {
//     console.log("Sequelize models synchronized");
//   })
//   .catch((err: Error) => {
//     console.error("Sequelize sync error:", err);
//   });
