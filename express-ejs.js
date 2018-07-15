const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();

// setup body parsers
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// view engine setup
app.set('views', path.join(__dirname, 'templates'));
app.set('view engine', 'ejs');


//css
app.use(express.static(path.join(__dirname, 'public')));

let saveData;
let freeId = 9;
    fs.readFile('./teammates.json', (err, data) => {
        if (err) throw err;
        saveData = JSON.parse(data).teammates;

    });


const router = express.Router();
/* GET users listing. */
router.get('/', function(req, res, next) {
    // fs.readFile('./teammates.json', (err, data) => {
    //     if (err) throw err;
        res.render('team', {teammates:saveData});
    // });
});

//request:delete
router.delete('/delete/:id', (req, res) => {
    saveData = saveData.filter(function(item) {
      return item.id != req.params.id;
    });
    res.send();
});
//add
router.post('/', (req, res) => {
    console.log(req.body);
    let newStudent = {id: freeId++, firstName: req.body.firstname, lastName: req.body.lastname};
   saveData = [...saveData, newStudent];
   res.send(newStudent);

});
//edit
router.post('/edit/:id', (req, res) => {
        saveData.forEach(function(item) {
        if(item.id == req.params.id){
            item.lastName = req.body.lastname;
            item.firstName = req.body.firstname;
            console.log('Edit'+req.body.lastname);
        }
    });
    res.send();
});

let port = 3000;
app.use('/', router);

app.set('port', port);
const http = require('http');
let server = http.createServer(app);

server.listen(port);