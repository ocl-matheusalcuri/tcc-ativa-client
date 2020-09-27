const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const aluno = new mongoose.Schema({
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
    hrAtiva: {
        type:String
    },
    saude: {
        type:String
    },
    prepFisico: {
        type:String
    },
    objetivo: {
        type:String
    },
    personalId:{
        type: Schema.Types.ObjectId, 
        ref: 'Personal'
    }
      
});

module.exports = Aluno = mongoose.model('aluno',aluno);