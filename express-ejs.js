const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');

// const pug = require('pug');
// // Compile the source code
// const compiledFunction = pug.compileFile('./templates/team.pug');

//css
app.use(express.static(path.join(__dirname, 'public')));

//request:delete
app.get('/delete/:surname', (req, res) => {
    result = result.filter(function(item) {
      return item.surname != req.params.surname;
    });
    res.redirect('/');
});


//request:create



//request:add


const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
    fs.readFile('./teammates.json', (err, data) => {
        if (err) throw err;
        res.render('team', JSON.parse(data));
    });
});

router.get('/new', function(req, res, next) {
    fs.readFile('./teammates.json', (err, data) => {
        if (err) throw err;
        res.render('team-new', JSON.parse(data));
    });
});

let port = 3000;
app.use('/', router);

app.set('port', port);
const http = require('http');
let server = http.createServer(app);

server.listen(port);