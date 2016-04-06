import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import student from './routes/student';
import sample from './routes/sample';
import account from './routes/account';
import activity from './routes/activity';
import classRoute from './routes/class';

let app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname+"/public"));
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api/student', student);
app.use('/api/sample', sample);
app.use('/api/account', account);
app.use('/api/class', activity);
app.use('/api/class', classRoute);
app.use('/api/class', student);

// 404 for api
app.get('/api/*', (req, res) => {
    res.sendStatus(404);
})

// send routing to client
app.get('*', (req, res) => {
    res.sendFile(__dirname + '/src/index.html');
});

export default app;	
