const express = require('express');
const mongoose = require('mongoose');
const Personal = require('../DB/Personal');
const route = express.Router();

route.post('/', async (req,res)=>{
    const{nome,celular,email,nascimento,instagram,facebook,cref,foco,especializacao,faixaEtaria} = req.body;
    let personal = {};
    personal.nome = nome;
    personal.celular = celular;
    personal.email = email;
    personal.nascimento = nascimento;
    personal.instagram = instagram;
    personal.facebook = facebook;
    personal.cref = cref;
    personal.foco = foco;
    personal.especializacao = especializacao;
    personal.faixaEtaria = faixaEtaria;
    let personalModel = new Personal(personal);
    await personalModel.save();
    res.json(personalModel);
});

module.exports = route;

