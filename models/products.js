'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Products.init({
    owner_id: DataTypes.INTEGER,
    category_id: DataTypes.INTEGER,
    address_id: DataTypes.INTEGER,
    bidder_id: DataTypes.INTEGER,
    image_id: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.BIGINT,
    latestBid: DataTypes.BIGINT
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};