const { response } = require('express');
const { v4: uuidv4 } = require('uuid');
const path = require ('path');

const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuarios');
const hospital = require('../models/hospital');
const medico = require('../models/medico');
// const fileUpload = require('express-fileupload');


const { actualizarImagen } = require('../helpers/actualizar-imagen');
const fs = require('fs');

const fileUpload = async (req, res = reponse) =>{
    const tipo = req.params.tipo;
    const id   = req.params.id;

    //Validar tipo
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if(!tiposValidos.includes(tipo)){
        return res.status(400).json({
            ok: true,
            msg: "Indicar para cual tipo {hospitales, medicos, usuarios} "
        });    
    }

    //Validar que exista un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json(
            {
                ok: false,
                msg: "No hay imagen"
            }
        );
    }

    //Procesar la imagen
    const file = req.files.imagen;
    console.log(file);
    const nombreCortado = file.name.split('.');
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    //Validar extensión
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];
    if( !extensionesValidas.includes( extensionArchivo )){
        return res.status(400).json({
            ok: false,
            msg: "No es una extensión permitida"
        });
    }

    //Generar el nombre del archivo 
    const nombreAchivo = `${ uuidv4() }.${ extensionArchivo }`;

    // Path para guardar imagen
    const path = `./uploads/${ tipo }/${ nombreAchivo }`;
    //Mover la imagen 
    // Use the mv() method to place the file somewhere on your server
    file.mv(path, function(err){
        if( err ){
            console.log({err:err});
            return res.status(500).json({
                    ok: false,
                    msg: "error al cargar la imagen"
                })
        }
    });

    //Actualizar base de datos
    actualizarImagen( tipo, id, nombreAchivo );

    res.json({
        ok: true,
        msg: "Archivo cargado al servidor",
        nombreAchivo
    });
}

const retornaImagen = (req, res = response) => {
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const pathImg = path.join( __dirname, `../uploads/${ tipo }/${ foto }` );
    
    //Imagen no existe
    if( fs.existsSync( pathImg ) ){
        res.sendFile( pathImg );
    }else{
        const pathImg = path.join( __dirname, `../uploads/no_existe.jpg` );
        res.sendFile( pathImg );
    }

}

module.exports = {
    fileUpload,
    retornaImagen
};