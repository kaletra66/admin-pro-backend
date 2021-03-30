require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require('./database/config');
const { json } = require('express');

// Crea el servidor express
const app = express();

//Configura CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());


//Base de datos
dbConnection();

console.log(process.env);

//Rutas
app.use( '/api/usuarios', require('./routes/usuarios'));
app.use( '/api/login', require('./routes/auth'));

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
});