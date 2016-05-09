import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import sequelize from './tools/sequelize';
import referer from './tools/referer';
import auth from './tools/authentication';

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

let app = express();
const paths = ['/signup$', '/#$', '/$', '/login$', '/forgotpassword$', '/reset/'];
const unauth_paths = new RegExp( '(' + paths.join('|') + ')');

app.set('view engine', 'ejs');

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
        maxAge: 600000 * 60 * 5 //Not sure now
    }
}));

app.use(express.static(__dirname+"/public"));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/account',   referer,           account);
app.use('/api/sample',    referer,           sample);
app.use('/api/student',   referer,   auth,   student);
app.use('/api/class',     referer,   auth,   activity);
app.use('/api/account/',  referer,   auth,   classRoute);
app.use('/api/class',     referer,   auth,   student);
app.use('/api/volunteer', referer,   auth,   volunteer);

// 404 for api
app.get('/api/*', (req, res) => {
    res.sendStatus(404);
});

// send routing to client
app.use('*', (req, res, next) => {
    if (req.session.key) {
        return next();
    }
    if ((unauth_paths).test(req.originalUrl)) {
        res.sendFile(__dirname + '/src/index.html');
    } else {
        res.redirect('/');
    }

},
(req, res, next) => {
    if (!unauth_paths.test(req.originalUrl)) {
        return next();
    }
    else {
        res.redirect('/class');
    }
},
(req, res, next) => {
    res.sendFile(__dirname + '/src/index.html');
});

export default app;
