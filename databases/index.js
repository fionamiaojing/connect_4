const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/connect4');
mongoose.connection.once('open', (err) => {
    console.log('Mongoose Connection is up');
});

let gameRecordSchema = mongoose.Schema({
    players: Array,
    winner: String,
    createdAt: Date
})

