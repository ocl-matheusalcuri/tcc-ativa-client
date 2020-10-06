const express = require('express');
const mongoose = require('mongoose');
const Personal = require('../DB/Personal');
const route = express.Router();
mongoose.set('useFindAndModify', false);

route.get('/getAll', async (req, res) => {
    let aluno = await Personal.find().then((response) => {
        if (response.length != 0) {
            res.json(response);
        }
        else {
            res.status(404).send("Não existem personais cadastrados no banco");
        }
    });
});

route.get('/getById', async (req, res) => {
    const { userId } = req.query;
    await Personal.findById(userId).then((response) => {
        if (response != null) {
            const object = {...response, type: "personal"}
            return res.json(object);
        }
        else {
            res.status(404).send("Personal inexistente");
        }
    });
});

route.put('/editarPerfil', async (req, res) => {
    const { personalId, nome, celular, email, nascimento, instagram, facebook, cref, foco, especializacao, faixaEtaria } = req.body;
    let personal = await Personal.findById(personalId).then((response) => {
        if (response != null) {
            if (nome != "" && celular != "" && email != "" && nascimento != "" && instagram != "" && facebook != "" && cref != "" && foco != "" && especializacao != "" && faixaEtaria != "") {
                response.nome = nome;
                response.celular = celular;
                response.email = email;
                response.nascimento = nascimento;
                response.instagram = instagram;
                response.facebook = facebook;
                response.cref = cref;
                response.foco = foco;
                response.especializacao = especializacao;
                response.faixaEtaria = faixaEtaria;
            } else {
                res.status(400).send("Preencha todos os dados");
            }
            response.save();
            res.json(response);
        }
        else {
            res.status(404).send("Personal Inexistente");
        }
    });
});

route.delete('/deletarPerfil', async (req, res) => {
    const { personalId } = req.body;
    Personal.findByIdAndRemove(personalId).exec().then((response) => {
        if (response != null) {
            res.status(200).send("Perfil Excluido com Sucesso");
        }
        else {
            res.status(404).send("Perfil Inexistente");
        }
    });
});

module.exports = route;

