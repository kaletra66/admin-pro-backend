const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuarios');
const hospital = require('../models/hospital');
const medico = require('../models/medico');

const busqueda = async (req, res = reponse) =>{
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');

    const [ usuarios, medicos, hospitales ] = await Promise.all([
        Usuario.find({nombre: regex}),
        medico.find({nombre: regex}),
        hospital.find({nombre: regex}),
    ]);
    

    res.json({
        ok: true,
        usuarios, 
        medicos, 
        hospitales
    });
}

const getDocumentosColeccion = async (req, res = reponse) =>{

    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex = new RegExp( busqueda, 'i');
    let data = [];

    switch (tabla) {
        case 'medicos':
            data = await medico .find({nombre: regex})
                                .populate('usuario', 'nombre img')
                                .populate('hospital', 'nombre img');
            break;
        case 'hospitales':
            data = await hospital.find({nombre: regex})
                                 .populate('usuario', 'nombre img');
            break;
        case 'usuarios':
            data = await Usuario.find({nombre: regex});
            break;
        default:
            return res.status(400).json({
                ok: true,
                msg: "indica una tabla"
            });
            break;
    }

    res.json({
        ok: true,
        data
    });

    res.json({
        ok: true,
        msg: "Buscando papa" + busqueda
    });
}

module.exports = {
    busqueda,
    getDocumentosColeccion,
};