import session from 'express-session';
import Store from 'connect-session-sequelize';
import sequelize from './sequelize';

let Storage = Store(session.Store);
let store = new Storage({
    db: sequelize
});

export default store;
