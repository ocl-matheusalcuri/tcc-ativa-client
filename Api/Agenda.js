const express = require('express');
const mongoose = require('mongoose');
const Treino = require('../DB/Treino');
const Personal = require('../DB/Personal');
const Aluno = require('../DB/Aluno');
const Agenda = require('../DB/Agenda');
const route = express.Router();
mongoose.set('useFindAndModify', false);

route.get('/getAgenda', async (req, res) => {
    const { professorId } = req.body;
    let treino = await Agenda.find({ professorId }).then((response) => {
        if (response.length != 0) {
            res.json(response);
        }
        else {
            res.status(404).send("Não existem compromissos");
        }
    });
});

route.post('/cadastroAgenda', async (req, res) => {
    const { nome, professorId, data } = req.body;
    await Agenda.create({professorId, nome, data})
});

route.delete('/deletarAgenda', async (req, res) => {
    const { agendaId } = req.body;
    Treino.findByIdAndRemove(agendaId).exec().then((response) => {
        if (response != null) {
            res.status(200).send("Agenda Excluido com Sucesso");
        }
        else {
            res.status(404).send("Agenda Inexistente");
        }
    });
});

module.exports = route;

