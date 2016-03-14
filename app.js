import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Sequelize from 'sequelize';
import store from 'express-sequelize-session';
let Store = store(session.Store);
import student from './routes/student';
import sample from './routes/sample';
import user from './routes/user';

let env     = process.env.NODE_ENV || 'development';
let config  = require(__dirname + '/config/config.json')[env];
let app = express();
let sequelize = new Sequelize(config.database, config.username, config.password, config);

app.set('view engine', 'ejs');

app.use(session({
	name: 'sid',
    secret: 'PUT01SL0V3_PUT01SL1F3',
    store: new Store(sequelize),
    resave: false,
    saveUninitialized: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/student', student);
app.use('/api/sample', sample);

// send routing to client
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

export default app;