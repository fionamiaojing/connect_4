const express = require('express');
const bodyParser =  require('body-parser');
const https = require('https');

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

const server = https.createServer(app);
server.listen(3000);
