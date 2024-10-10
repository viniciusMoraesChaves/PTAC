const express = require("express");
const path = require('path');
const app = express();

//interpreta JSON
app.use(express.json());

//arquivos estáticos da pasta 'public'
app.use(express.static('public'));

//rota para acessar /day
app.get('/day', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/day.html'));
});

app.get('/tasks',(req,res)=>{
    res.sendFile(path.join(__dirname, 'public/tasks.html'));
});

app.get('/news', (req,res)=>{
    res.sendFile(path.join(__dirname,'public/news.html'));
});


const materias = [
    {
        dia: "Segunda",
        materia: [
            { nome: "Organização de Sistemas de Computadores", state: "(Teórico)" },
            { nome: "Cálculo", state: "(Teórico)" },
            { nome: "Organização de Sistemas de Computadores", state: "(Prático)" },
        ]
    },
    {
        dia: "Terça",
        materia: [
            { nome: "Cálculo", state: "(Teórico)" },
            { nome: "Robótica Computacional", state: "(Teórico)" },
            { nome: "Cálculo", state: "(Prático)" },
        ]
    },
    {
        dia: "Quarta",
        materia: [
            { nome: "Organização de Sistemas de Computadores", state: "(Teórico)" },
            { nome: "Desenvolvimento Web", state: "(Teórico)" },
            { nome: "Desenvolvimento Web", state: "(Prático)" },
        ]
    },
    {
        dia: "Quinta",
        materia: [
            { nome: "Teologia e Fenômeno humano", state: "(Teórico)" },
            { nome: "Robótica Computacional", state: "(Prático)" },
        ]
    },
    {
        dia: "Sexta",
        materia: [
            { nome: "Desenvolvimento Web", state: "(Teórico)" },
        ]
    },
];

//retorna as matérias de um dia específico com metodo post
app.post("/Day", (req, res) => {
    const { dia } = req.body;

    // Verificação se o valor de 'dia' foi enviado corretamente
    console.log("Dia recebido no servidor:", dia);  // Verifica o valor de 'dia' no servidor

    if (!dia) {
        return res.status(400).json({ message: "Dia não enviado corretamente" });
    }

    // Normaliza o valor de 'dia' (evita problemas com maiúsculas/minúsculas)
    const normalizedDay = dia.trim().toLowerCase();
    const dayData = materias.find(materia => materia.dia.toLowerCase() === normalizedDay);

    if (dayData) {
        res.json(dayData);
    } else {
        res.status(404).json({ message: "Day not found" });
    }
});

app.listen(3000, function () {
    console.log("Servidor rodando na porta 3000");
});
