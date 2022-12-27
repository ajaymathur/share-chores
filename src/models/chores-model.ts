import { CreationAttributes, CreationOptional, DataTypes, Model } from "sequelize";
import sequelize from './client';

export class Chores extends Model{
    declare id: CreationOptional<number>;
    declare title: string;
    declare category: string;
    declare createdBy: string;
    declare room: number;
    declare assignee: string;
}

Chores.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING
    },
    category: {
        type: DataTypes.STRING
    },
    createdBy: {
        type: DataTypes.STRING
    },
    room: {
        type: DataTypes.STRING
    },
    assignee: {
        type: DataTypes.STRING
    }
}, {
    sequelize
});
