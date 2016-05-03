import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import uuid from 'uuid';
import sequelize from './tools/sequelize';
import store from './tools/store';

import student from './routes/student';
import sample from './routes/sample';
import account from './routes/account';
import activity from './routes/activity';
import classRoute from './routes/class';
import volunteer from './routes/volunteer';

export var sessionId, sessionKey;
let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors({
    origin: true,
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders: ['Content-Type'],
    credentials: true
}));

app.use(session({
    secret: 'PUT01SL0V3_PUT01SL1F3',
    store: store,
    resave: false,
    saveUninitialized: true,
    genid: function(req){
        return uuid.v4()
    },
    cookie: {
        httpOnly: false,
        secure: false, // set "true" if https
        maxAge: 1000 * 60 * 60 * 5
    }
}));

app.use((req, res, next) => {
    sessionKey = req.session.key;
    req.key = req.session.key;
    next();
});

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
    sessionId = req.session.id;
    console.log("This is the session id: " + sessionId);
    // console.log("This is the session key: " + req.key);
    if (req.session && req.session.key) {
        return next();
    }
    if (req.originalUrl in {'/signup':'', '/register':'', '/#':'', '/':'', '/login':''}) {
        res.sendFile(__dirname + '/src/index.html');
    } else {
        res.redirect('/');
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

store.sync({force: false});

export default app;
