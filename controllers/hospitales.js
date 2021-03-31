const { response } = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');

const getHospitales = async (req, res = reponse) =>{

    const hospital = await Hospital .find()
                                    .populate('usuario', 'nombre img');

    res.json({
        ok: true,
        hospital
    });
}

const postHospitales = async (req, res = reponse) =>{
    const u_id = req.u_id;
    const hospital = new Hospital( { usuario: u_id, ...req.body } );
    try {
        const hospitalDB = await hospital.save();
        console.log(hospitalDB);
        res.json({
            ok: true,
            msg: 'postHospitales',
            hospital: hospitalDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema con crear un hospital'
        });
    }
}

const putHospitales = async (req, res = reponse) =>{
    // const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        msg: 'putHospitales'
    });
}

const deleteHospitales = async (req, res = reponse) =>{
    // const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({
        ok: true,
        msg: 'deleteHospitales'
    });
}

module.exports = {
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales,
};