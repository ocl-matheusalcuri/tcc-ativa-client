const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Aluno = require('../DB/Aluno');
const Personal = require('../DB/Personal');
const route = express.Router();

mongoose.set('useFindAndModify', false);

route.get('/getAll', async (req, res) => {
    let aluno = await Aluno.find().then((response) => {
        if (response.length != 0) {
            res.json(response);
        }
        else {
            res.status(404).send("Não existem alunos cadastrados no banco");
        }
    });
});

route.get('/getById', async (req, res) => {
    const { alunoId } = req.body;
    let aluno = await Aluno.findById(alunoId).then((response) => {
        console.log(response);
        if (response != null) {
            res.json(response);
        }
        else {
            res.status(404).send("Aluno inexistente");
        }
    });
});

route.get('/getAlunosByPersonalId', async (req, res) => {
    const { personalId } = req.body;
    let aluno = await Aluno.find({ personalId: personalId }).then((response) => {
        if (response.length != 0) {
            res.json(response);
        }
        else {
            res.status(404).send("Não existem alunos para esse personal");
        }
    });
});

route.post('/cadastrarAluno', async (req, res) => {
    const { password, nome, celular, email, nascimento, hrAtiva, saude, prepFisico, objetivo } = req.body;
    await Aluno.find({ email: email }).then((response) => {
        if (response.length == 0) {
            let aluno = {};
            if (password != "" && nome != "" && celular != "" && email != "" && nascimento != "" && hrAtiva != "" && saude != "" && prepFisico != "" && objetivo != "") {

                bcrypt.hash(password, 10).then(hash => {

                    let encryptedPssword = hash;

                    aluno.password = encryptedPssword;
                    aluno.nome = nome;
                    aluno.celular = celular;
                    aluno.email = email;
                    aluno.nascimento = nascimento;
                    aluno.hrAtiva = hrAtiva;
                    aluno.saude = saude;
                    aluno.prepFisico = prepFisico;
                    aluno.objetivo = objetivo;
                    aluno.personalId = null;
                    let alunoModel = new Aluno(aluno);
                    alunoModel.save();
                    res.json(alunoModel);
                })
            } else {
                res.status(400).send("Preencha todos os dados");
            }
        }
        else {
            res.status(404).send("Esse aluno já possui um cadastro");
        }
    });
});

route.put('/editarPerfil', async (req, res) => {
    const { alunoId, nome, celular, email, nascimento, hrAtiva, saude, prepFisico, objetivo } = req.body;
    let aluno = await Aluno.findById(alunoId).then((response) => {
        if (response != null) {
            if (nome != "" && email != "" && nascimento != "" && hrAtiva != "" && saude != "" && prepFisico != "" && objetivo != "") {
                response.nome = nome;
                response.celular = celular;
                response.email = email;
                response.nascimento = nascimento;
                response.hrAtiva = hrAtiva;
                response.saude = saude;
                response.prepFisico = prepFisico;
                response.objetivo = objetivo;
            } else {
                res.status(400).send("Preencha todos os dados");
            }
            response.save();
            res.json(response);
        }
        else {
            res.status(404).send("Aluno Inexistente");
        }
    });
});

route.put('/incluirPersonal', async (req, res) => {
    const { alunoId, personalId } = req.body;
    let aluno = await Aluno.findById(alunoId).then((response) => {
        if (response != null) {
            if (personalId != null) {
                Personal.findById(personalId).then((responsePersonal) => {
                    if (responsePersonal != null) {
                        response.personalId = personalId;
                        response.save();
                        res.json(response);
                    } else {
                        res.status(404).send("Personal Inexistente");
                    }
                });
            }
            else {
                res.status(400).send("Selecione um Personal");
            }
        }
        else {
            res.status(404).send("Aluno Inexistente");
        }
    });
});

route.put('/removerPersonal', async (req, res) => {
    const { alunoId, personalId } = req.body;
    let aluno = await Aluno.findById(alunoId).then((response) => {
        if (response != null) {
            response.personalId = null;
            response.save();
            res.json(response);
        }
        else {
            res.status(404).send("Aluno Inexistente");
        }
    });
});

route.delete('/deletarPerfil', async (req, res) => {
    const { alunoId } = req.body;
    Aluno.findByIdAndRemove(alunoId).exec().then((response) => {
        if (response != null) {
            res.status(200).send("Perfil Excluido com Sucesso");
        }
        else {
            res.status(404).send("Perfil Inexistente");
        }
    });
});

module.exports = route;