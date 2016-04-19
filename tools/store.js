import session from 'express-session';
import Store from 'express-sequelize-session';
import sequelize from './sequelize';

let Storage = Store(session.Store);
let store = new Storage(sequelize, 'http_session_table');

export default store;
