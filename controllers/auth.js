const { response } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const login = async (req, res = response) =>{
    const {email, password} = req.body;
    try {
        //Demorar el tiempo de la respuesta 1s
        const usuarioDB = await Usuario.findOne({email});
        //Verificar usuarioDB por email
        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: "Alguno de los datos proporcionados es incorrecto"
            });    
        }
        
        //Verificar la contraseña
        const validPassword = bcrypt.compareSync( password, usuarioDB.password);
        if(!validPassword){
            return res.status(404).json({
                ok: false,
                msg: "Alguno de los datos proporcionados es incorrecto"
            });    
        }
        
        //GEnerar token
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token
        });
        /**/        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "Hable con el administrador"
        });
    }
}

module.exports = {
    login,
};