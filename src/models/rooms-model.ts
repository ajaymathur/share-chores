import { CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from './client';

export class Rooms extends Model {
    declare id: CreationOptional<number>;
    declare name: string;
    declare members: string[];
    declare chores: number[];
    declare admin: string;
}

Rooms.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name:  {
        type: DataTypes.STRING
    },
    members: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    },
    chores: {
        type: DataTypes.ARRAY(DataTypes.INTEGER.UNSIGNED)
    },
    admin: {
        type: DataTypes.STRING
    }
}, {
    sequelize
});
