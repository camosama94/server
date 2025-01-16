//ENV
require('dotenv').config

const express = require('express');
const app = express();
const port = process.env.PORT || 80;
//const port = 8099;

app.use(express.static('public'));
//contenido raiz no se muestra

//POST
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.post('/factorial', (req,res) => {
    const numero = req.body.numero;
    if(numero === undefined || isNaN(numero)){
        return res.status(400).send('Número no válido')
    }

    const factorial = (n) => {
        if(n === 0) return 1;
        return n * factorial(n - 1);
    }

    const resultado = factorial(Number(numero));
    res.send(`El factorial de ${numero} es ${resultado}`)
})


//***************************//
app.get('/', (req,res) => {
    res.send('Bienvenidos a mi aplicación');
});

app.get('/saludo', (req,res) => {
    const nombre = req.query.nombre || 'invitado';
    const contrasena = req.query.contrasena || "";
    res.send(`Hola ${nombre} ${contrasena}`);
})

app.get('/precios', (req,res) => {
    res.send('<h1>Precios</h1><hr><p>Ordenador:1000€</p></hr>');
})

app.get('*', (req,res) => {
    res.sendFile(__dirname + '/public/404.html');
})

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});