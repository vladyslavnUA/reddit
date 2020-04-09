// require libraries and middleware
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const dotenv = require('dotenv');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// controllers
// const homeController = require('./controllers/home')(app);
const postsController = require('./controllers/posts.js')(app);

// Add after body parser initialization!
app.use(expressValidator());

// views
app.get('/', (req, res) => res.render('home'));
app.get('/posts/new', (req, res) => res.render('posts-new'));


app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});