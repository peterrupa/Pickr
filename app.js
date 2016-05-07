import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import compression from 'compression';
import sequelize from './tools/sequelize';
import referer from './tools/referer';

import redis from 'redis';
const client = redis.createClient();

import connect from 'connect-redis';
const redisStore = connect(session);

import student from './routes/student';
import sample from './routes/sample';
import account from './routes/account';
import activity from './routes/activity';
import classRoute from './routes/class';
import volunteer from './routes/volunteer';

//add all paths that do not need authentication here
const paths = ['/signup$', '/#$', '/$','/login$',
               '/forgotpassword$', '/reset'];
const unauthPaths = new RegExp( '(' + paths.join('|') + ')');

let app = express();
app.set('view engine', 'ejs');

app.use(helmet());
app.use(session({
    secret: 'PUT01SL0V3_PUT01SL1F3',
    resave: false,
    saveUninitialized: false,
    store: new redisStore({
        host: 'localhost',
        port: 6379,
        client: client,
        ttl :  260
    }),
    cookie: {
        httpOnly: false,
        secure: false, // set "true" if https
        maxAge: 1000 * 60 * 60 * 5 // 5 hours
    }
}));

app.use(express.static(__dirname+"/public"));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());

//checks if api is accessed directly using browser or res client
app.use('/api/*', referer);

app.use('/api/student', student);
app.use('/api/sample', sample);
app.use('/api/account', account);
app.use('/api/class', activity);
app.use('/api/account/', classRoute);
app.use('/api/class', student);
app.use('/api/volunteer', volunteer);

// 404 for api
app.get('/api/*', (req, res) => {
    res.sendStatus(404);
});

// send routing to client
app.use('*', (req, res, next) => {

    if (typeof req.session !== 'undefined' &&
        typeof req.session.key !== 'undefined') {
        return next();
    }
    if ((unauthPaths).test(req.originalUrl)) {
        res.sendFile(__dirname + '/src/index.html');
    } else {
        res.redirect('/');
    }

},
(req, res, next) => {

    if (!(unauthPaths).test(req.path)) {
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
