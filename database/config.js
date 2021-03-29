require('dotenv').config();
const mongoose = require('mongoose');
const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN,
        {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("Conexión lograda");
    } catch(error){
        console.log(error);
        throw new Error(" Error al iniciar la DB, ver logs");
    }
}

module.exports = {
    dbConnection
}