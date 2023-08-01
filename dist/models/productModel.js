"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Products = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Products extends sequelize_1.Model {
}
exports.Products = Products;
Products.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    owner_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    category_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    address_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    bidder_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: false,
    },
    latestBid: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Products",
});
