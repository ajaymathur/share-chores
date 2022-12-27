import { Sequelize } from "sequelize";

export default new Sequelize('postgres', 'ajaymathur', '', {
    host: 'localhost',
    dialect: 'postgres',
    port: 5432
});


