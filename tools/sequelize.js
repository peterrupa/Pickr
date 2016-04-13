import Sequelize from 'sequelize';
import configObj from '../config/config.json';

let env       = process.env.NODE_ENV || 'development';
let config    = configObj[env];
let sequelize;

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    sequelize = new Sequelize(config.database, config.username, config.password, config);
}

export default sequelize;
