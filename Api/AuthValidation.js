const Aluno = require('../DB/Aluno');
const Personal = require('../DB/Personal');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const express = require('express');
const route = express.Router();


route.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const aluno = await Aluno.findOne({email}, {email: 1, nome: 1, password: 1, temFoto: 1});
    const personal = await Personal.findOne({email}, {email: 1, nome: 1, password: 1, temFoto: 1});

    if(aluno) {
        const match = await bcrypt.compare(password, aluno.password);
        if(match) {
            aluno.password = undefined;
            return res.json({
                user: {nome: aluno.nome, email: aluno.email, _id: aluno._id, temFoto: aluno.temFoto || false},
                type: "aluno",
                token: jwt.sign(aluno.toJSON(), 'segredo')
            })
        } else {
            return res.send('Deu ruim!');
        }
    } else if(personal) {
        const match = await bcrypt.compare(password, aluno.password);

        if(match) {
            personal.password = undefined;
            return res.json({
                user: {nome: personal.nome, email: personal.email, _id: personal._id, temFoto: personal.temFoto},
                type: "personal",
                token: jwt.sign(personal.toJSON(), 'segredo')
            })
        } else {
            return res.send('Deu ruim!');
        }
    }
})

module.exports = route;