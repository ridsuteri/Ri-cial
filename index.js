const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();

const port = 8000;

const expressLayouts = require('express-ejs-layouts');
const db = require('./config/mongoose');
// used for passport js
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const passportJWT = require('./config/passport-jwt-strategy');
const { initialize } = require('passport');
const MongoStore = require('connect-mongo')(session);
const sassMiddleware = require('node-sass-middleware');
const flash = require('connect-flash');
require('dotenv').config();
const customMware = require('./config/middleware');
const passportGoogle = require('./config/passport-google-oauth2-strategy');

// setup chat server to be used with socket.io
const chatServer = require('http').Server(app);
const chatSockets = require('./config/chat_sockets').chatSockets(chatServer);
chatServer.listen(5000);
console.log('chat server is listening on port 5000');

// extract styles and scripts from sub pages to layouts
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);

app.use(sassMiddleware({
    src: './assets/scss',
    dest: './assets/css',
    debug: true,
    outputStyle: "expanded",
    prefix: '/css'
}));
app.use(express.urlencoded());
app.use(cookieParser());
app.use(expressLayouts);
app.use(express.static('./assets'));

// make the uploads available to the browser
app.use('/uploads', express.static(__dirname + '/uploads'));

app.set('view engine', 'ejs');
app.set('views', './views');

// mongo store is used to store session cookie in the db
app.use(session({
    name: 'ricial',
    // TODO change secret befor deployment in production mode
    secret: 'blahsomething',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },
    store: new MongoStore({
        mongooseConnection: db,
        autoRemove: 'disabled'
    },
        function (err) {
            console.log(err || 'connect mongodb ok');
        }
    )
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);
// routes
app.use('/', require('./routes/index'));

app.listen(port, function (err) {
    if (err) {
        // interpolation used..
        console.log(`Error running the Server ${err}`);
    }

    console.log(`Server is running on port: ${port}`);
});