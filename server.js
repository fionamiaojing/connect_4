const express = require('express');
const bodyParser =  require('body-parser');
const http = require('http');

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

app.post('/history', (req, res) => {
    
})

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.sendfile('./public/index.html');
    res.end();
})

app.get('/favicon.ico', (req, res) => res.status(204));


const server = http.createServer(app);
server.listen(3000);
