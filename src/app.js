const express = require('express');
const session = require('express-session');
require('./db/mongoose');
const path = require('path');
const hbs = require('hbs');
const http = require('http');

//routers
const media_router = require('./routers/media');
const user_router = require('./routers/user');
const session_router = require('./routers/session');
const admin_router = require('./routers/admin');
const site_router = require('./routers/site');
const doctor_router = require('./routers/doctor');
const appointment_router = require('./routers/appointment');

const app = express();
const sess = {
    secret: 'my_session_secret',
    cookie: {
        _expires: 1000 * 60 * 60 * 24 * 7 //week
    }
};

if(app.get('env') === 'production'){
    app.set('trust proxy', 1); // trust first proxy
    sess.cookie.secure = true; // serve secure cookies
};

//Define paths for Express config
const public_path = path.join(__dirname, '../public');
const node_modules_path = path.join(__dirname, '../node_modules')
const views_path = path.join(__dirname, '../templates/views');
const partials_path = path.join(__dirname, '../templates/partials');

//Setup Handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);

app.use(express.static(__dirname + '/public'));

//use express-session
app.use(session(sess));

//automaticaly pass 'request' as json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Setup static directory to serve
app.use(express.static(public_path));
app.use('/node_modules', express.static(node_modules_path));

// routers
app.use(media_router);
app.use(user_router);
app.use(session_router);
app.use(admin_router);
app.use(site_router);
app.use(doctor_router);
app.use(appointment_router);

const server = http.createServer(app);

module.exports = {app, server};