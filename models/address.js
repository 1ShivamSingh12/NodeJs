'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Address.init({
    user_id: DataTypes.INTEGER,
    street1: DataTypes.STRING,
    street2: DataTypes.STRING,
    landmark: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    address_type: DataTypes.ENUM,
    zip_code: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Address',
  });
  return Address;
};