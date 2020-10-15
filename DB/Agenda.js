const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const agenda = new mongoose.Schema({
    professorId: {
        type: Schema.Types.ObjectId,
        ref: 'Personal'
    },
    nome: {
        type: String
    },
    data: {
        type: String
    },
});

module.exports = Agenda = mongoose.model('agenda', agenda);