const { response } = require('express');
const bcrypt = require('bcryptjs');
const Hospital = require('../models/hospital');
const { generarJWT } = require('../helpers/jwt');
const hospital = require('../models/hospital');

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
    const id = req.params.id;
    const u_id = req.u_id;
    try {
        const hospital = await Hospital.findById( id );
        if( !hospital ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el hospital'
            });    
        }
        const cambiosHospital = {
            ...req.body,
            usuario:u_id
        }
        const hospitalActualizado = await Hospital.findByIdAndUpdate( id, cambiosHospital, { new:true });
        res.json({
            ok: true,
            msg: 'putHospitales',
            hospitalActualizado
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'putHospitales'
        });
    }
}

const deleteHospitales = async (req, res = reponse) =>{
    const id = req.params.id;
    const u_id = req.u_id;
    try {
        await Hospital.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Hospital Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'putHospitales'
        });
    }
}

module.exports = {
    getHospitales,
    postHospitales,
    putHospitales,
    deleteHospitales,
};