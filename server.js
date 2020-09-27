const express = require('express');
const connectDB = require('./DB/Connection');
const app = express();

connectDB();
app.use(express.json({extended:false}));

app.use('/api/alunoModel', require('./Api/Aluno'))
app.use('/api/personalModel', require('./Api/Personal'))
app.use('/api/treinoModel', require('./Api/Treino'))
const Port = process.env.Port || 3001;

app.listen(Port,()=>console.log('Server started'));
