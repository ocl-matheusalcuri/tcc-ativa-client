const express = require('express');
const mongoose = require('mongoose');
const Treino = require('../DB/Treino');
const route = express.Router();

route.post('/', async (req,res)=>{
    const{alunoId,personalId,nome,descricaoTreino} = req.body;
    let treino = {};
    treino.alunoId = alunoId;
    treino.personalId = personalId;
    treino.nome = nome;
    treino.descricaoTreino = descricaoTreino;
    let treinoModel = new Treino(treino);
    await treinoModel.save();
    res.json(treinoModel);
});

module.exports = route;

