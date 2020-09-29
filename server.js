const express = require('express');
const connectDB = require('./DB/Connection');
const authMiddleware = require('./authValidation');
const cors = require('cors');
const app = express();

app.use(cors());

connectDB();
app.use(express.json({extended:false}));


app.use('/api', require('./api/AuthValidation'));

app.use(authMiddleware);
app.use('/api/alunoModel', require('./api/Aluno'))
app.use('/api/personalModel', require('./api/Personal'))
app.use('/api/treinoModel', require('./api/Treino'))
const Port = process.env.Port || 3001;

app.listen(Port,()=>console.log('Server started'));
