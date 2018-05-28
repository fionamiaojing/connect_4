const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/connect4');
mongoose.connection.once('open', (err) => {
    console.log('Mongoose Connection is up');
});

let gameRecordSchema = mongoose.Schema({
    players: Array,
    winner: String,
    boards: Array,
    createdAt: Date
})

let GameRecord = mongoose.model('GameRecord', gameRecordSchema);

const save = (record) => {
    return GameRecord.create(record);
}

const load = (limit) => {
    return GameRecord
    .find()
    .limit(limit)
    .sort('-createdAt')
    .exec()
}

module.exports = {
    save: save,
    load: load
}