const { response } = require('express');
const bcrypt = require('bcryptjs');
const Medico = require('../models/medico');
const { generarJWT } = require('../helpers/jwt');

const getMedicos = async (req, res = reponse) =>{
    const medico = await Medico .find()
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre');
    res.json({
        ok: true,
        medico
    });
}

const postMedicos = async (req, res = reponse) =>{
    const u_id = req.u_id;
    const medico = new Medico( { usuario: u_id, ...req.body } );
    try {
        console.log(medico);
        const medicoDB = await medico.save();
        console.log(medicoDB);
        res.json({
            ok: true,
            msg: 'postMedicos',
            hospital: medicoDB
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hubo un problema con crear un medico'
        });
    }
}

const putMedicos = async (req, res = reponse) =>{
    const id = req.params.id;
    const u_id = req.u_id;
    try {
        const medico = await Medico.findById( id );
        if( !medico ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe el medico'
            });    
        }
        const cambiosMedico = {
            ...req.body,
            usuario:u_id
        }
        const medicoActualizado = await Medico.findByIdAndUpdate( id, cambiosMedico, { new:true });
        res.json({
            ok: true,
            msg: 'putMedicos',
            medicoActualizado
        });    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'putMedicos'
        });
    }
}

const deleteMedicos = async (req, res = reponse) =>{
    const id = req.params.id;
    try {
        await Medico.findByIdAndDelete( id );
        res.json({
            ok: true,
            msg: 'Medico Eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: true,
            msg: 'deleteMedicos'
        });
    }
}

module.exports = {
    getMedicos,
    postMedicos,
    putMedicos,
    deleteMedicos,
};