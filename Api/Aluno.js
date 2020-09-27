const express = require('express');
const mongoose = require('mongoose');
const Aluno = require('../DB/Aluno');
const route = express.Router();

route.post('/', async (req,res)=>{
    const{personalId,nome,celular,email,nascimento,hrAtiva,saude,prepFisico,objetivo} = req.body;
    let aluno = {};
    aluno.nome = nome;
    aluno.celular = celular;
    aluno.email = email;
    aluno.nascimento = nascimento;
    aluno.hrAtiva = hrAtiva;
    aluno.saude = saude;
    aluno.prepFisico = prepFisico;
    aluno.objetivo = objetivo;
    aluno.personalId = personalId;
    let alunoModel = new Aluno(aluno);
    await alunoModel.save();
    res.json(alunoModel);
});

module.exports = route;

