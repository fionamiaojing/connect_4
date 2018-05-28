const express = require('express');
const bodyParser =  require('body-parser');
const http = require('http');
const db = require('./databases/index');

//creating server
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static('public'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendfile('./public/index.html');
    res.end();
})

app.post('/history', (req, res) => {
    let record = req.body;
    record.createdAt = new Date();
    db.save(record)
    .then(() => res.sendStatus(201))
    .catch(() => res.sendStatus(500));
    
})

app.get('/history', (req, res) => {
    db.load(30).then((records) => {
        res.status(200);
        res.send(records)
    })
    // res.status(200);
    // res.send(records);
})

app.get('/favicon.ico', (req, res) => res.status(204));


const server = http.createServer(app);
server.listen(3000);
