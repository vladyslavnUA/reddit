// require libraries and middleware
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');

dotenv.config({ path: '.env' });
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Set db
require('./data/reddit-db');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// controllers
// const homeController = require('./controllers/home')(app);
require('./controllers/posts')(app);
require('./controllers/comments.js')(app);

// Add after body parser initialization!
app.use(expressValidator());

// views
app.listen(3000, () => {
    console.log('Reddit JS listening on port localhost:3000!');
});

module.exports = app;