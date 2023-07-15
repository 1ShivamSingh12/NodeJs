import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../config/db';

class Follower_Management extends Model {

    public following_id!: number;
    public follower_id!: number;
}

Follower_Management.init(
    {
        following_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

        follower_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },

    },
    {
        sequelize,
        modelName: 'Follower_Management',
    }
);

export default Follower_Management;