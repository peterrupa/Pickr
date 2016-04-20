import express from 'express';
import session from 'express-session';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import sequelize from './tools/sequelize';
import store from './tools/store';

import student from './routes/student';
import sample from './routes/sample';
import account from './routes/account';
import activity from './routes/activity';
import classRoute from './routes/class';
import volunteer from './routes/volunteer';

export var sessionId;
let app = express();

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
    saveUninitialized: true,
    name: 'C0oK13_M0NZt3R',
    cookie: {
        path: '/',
        httpOnly: false,
        secure: false, // set "true" if https
        maxAge: 1000 * 60 * 60 * 5, // 5 hours
        domain: 'localhost'
    }
}));

app.use((req, res, next) => {
    req.key = req.session.id;
    next();
});

app.use('/api/student', student);
app.use('/api/sample', sample);
app.use('/api/account', account);
app.use('/api/class', activity);
app.use('/api/account/', classRoute);
app.use('/api/class', student);
app.use('/api/volunteer', volunteer);

// gets the session for the client side to use
app.get('/api/whoami', (req, res) => {
    res.send(req.key);
});

// 404 for api
app.get('/api/*', (req, res) => {
    res.sendStatus(404);
});

// send routing to client
app.use('*', (req, res, next) => {
    //req.session.id = req.key;
    sessionId = req.session.id;
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
    if (req.originalUrl === '/class/'+req.session.key) {
        return next();
    } else {
        res.redirect('/class/'+req.session.key);
    }

},
(req, res, next) => {
    res.sendFile(__dirname + '/src/index.html');
});

store.sync({force: false});

export default app;
