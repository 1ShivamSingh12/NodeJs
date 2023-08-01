"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Images = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Images extends sequelize_1.Model {
}
exports.Images = Images;
Images.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    product_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
    },
    images: {
        type: sequelize_1.DataTypes.BLOB("long"),
        allowNull: false,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Images",
});
// export default Sessions;
// Sessions.sync().then(() => {
//     console.log('Sequelize models synchronized');
//   }).catch((err:Error) => {
//     console.error('Sequelize sync error:', err);
//   });
