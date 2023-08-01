"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class Category extends sequelize_1.Model {
}
exports.Category = Category;
Category.init({
    id: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    parent_id: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: true
    },
    category_name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    category_image: {
        type: sequelize_1.DataTypes.BLOB('long'),
        allowNull: false,
        unique: true,
    },
}, {
    sequelize: db_1.sequelize,
    modelName: "Category",
});
// Sessions.belongsTo(Users, { foreignKey: 'userId' });
// Users.hasMany(Sessions,{ foreignKey: 'userId' })
// export default Sessions;
// Sessions.sync().then(() => {
//     console.log('Sequelize models synchronized');
//   }).catch((err:Error) => {
//     console.error('Sequelize sync error:', err);
//   });
