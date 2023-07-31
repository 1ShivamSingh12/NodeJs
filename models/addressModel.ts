import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db";

enum address_type {
  HOME = "home",
  WORK = "work",
  DEFAULT = "default",
}

export class Address extends Model {
  public id!: number;
  public user_id!: number;
  public street1!: string;
  public street2!: string;
  public landmark!: number;
  public city!: string;
  public state!: string;
  public address_type!: address_type;
  public zip_code!: bigint;
}

Address.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
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
        address_type.HOME,
        address_type.WORK,
        address_type.DEFAULT
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
    modelName: "Address",
  }
);
