require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require('./database/config');

// Crea el servidor express
const app = express();

//Configura CORS
app.use(cors());


//Base de datos
dbConnection();

console.log(process.env);

//Rutas
app.get( '/', (request, response) =>{
    response.json({
        ok: true,
        data: "HOlis"
    });
});

app.listen( process.env.PORT, () => {
    console.log("Servidor corriendo en el puerto " + process.env.PORT);
});