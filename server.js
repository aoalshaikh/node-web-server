const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

app.use((req, res, next) => {
    var now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((req, res, next) => {
//     res.render('maintenance', {
//         msg: 'we\'ll be right back'
//     });
// });

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');


hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        title: 'Home Page',
        welcomeMsg: 'Welcome to My Website'
    });
});

app.get('/about', (req, res) => {
   res.render('about.hbs', {
       title: 'About Page'
   });
});

app.listen(port, () => {
    console.log(`Server running on port:${port}`);
});