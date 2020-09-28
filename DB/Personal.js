const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const personal = new mongoose.Schema({
    password: {
        type:String
    },    
    nome: {
        type:String
    },
    celular: {
        type:String
    },
    email: {
        type:String
    },
    nascimento: {
        type:String
    },
    instagram: {
        type:String
    },
    facebook: {
        type:String
    },
    cref: {
        type:Number
    },
    foco: {
        type:String
    },
    especializacao: {
        type:String
    },
    faixaEtaria: {
        type:String
    }
});

module.exports = Personal = mongoose.model('personal',personal);