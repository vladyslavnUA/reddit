// require libraries
const express = require('express');

const app = express();

// middleware
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
});