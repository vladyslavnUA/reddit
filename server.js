// require libraries and middleware
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

dotenv.config({ path: '.env' });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set db
require('./data/reddit-db');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());
app.use(cookieParser());

var checkAuth = (req, res, next) => {
    console.log("----->  checking authetication <-----");
    if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
        req.user = null;
    } else {
        var token = req.cookies.nToken;
        var decodedToken = jwt.decode(token, { complete: true }) || {};
        req.user = decodedToken.payload;
    }
    
    next();
};
app.use(checkAuth);

// views
app.listen(3000, () => {
    console.log('Reddit JS listening on port localhost:3000!');
});

require('./controllers/posts')(app);
require('./controllers/comments.js')(app);
require('./controllers/auth.js')(app);

module.exports = app;