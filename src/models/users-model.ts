import { CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from "./client";

export class User extends Model {
    declare username: string;
    declare email: string;
    declare rooms: number[];
    declare chores: number[];
}

User.init({
    username: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    email: {
        type: DataTypes.STRING,
    },
    rooms: {
        type: DataTypes.ARRAY(DataTypes.INTEGER.UNSIGNED)
    },
    chores: {
        type: DataTypes.ARRAY(DataTypes.INTEGER.UNSIGNED)
    }
}, {
    sequelize
});
