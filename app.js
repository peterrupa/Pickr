import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import Store from 'express-sequelize-session';

import sequelize from './tools/sequelize';
import student from './routes/student';
import sample from './routes/sample';
import account from './routes/account';
let app = express();
let store = Store(session.Store);

app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
    secret: 'PUT01SL0V3_PUT01SL1F3',
    store: store,
    resave: false,
    rolling: true,
    saveUninitialized: false,
    name: 'C0oK13_M0NZt3R',
    cookie: {
        path: '/',
        httpOnly: false,
        secure: false, // set "true" if https
        maxAge: 1000 * 60 * 60 * 5, // 5 hours
        domain: 'localhost'
    }
}));

app.use('/api/student', student);
app.use('/api/sample', sample);
app.use('/api/account', account);

// send routing to client
app.use('*', (req, res, next) => {

    if (req.session && req.session.key) {
        return next();
    }
    if (req.originalUrl in {'/signup':'', '/register':'', '/#':'', '/':'', '/login':''}) {
        res.sendFile(__dirname + '/src/index.html');
    } else {
        res.redirect('/login');
    }

},
(req, res, next) => {

    if (!(req.path in {'/signup':'', '/register':'', '/#':'', '/':'', '/login':''})) {
        return next();
    }
    if (req.originalUrl === '/class') {
        return next();
    } else {
        res.redirect('/class');
    }

},
(req, res, next) => {
    res.sendFile(__dirname + '/src/index.html');
});

export default app;
