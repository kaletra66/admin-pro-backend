const { response } = require('express');
const Usuario = require('../models/usuarios');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

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

const googleSign = async ( req, res = response ) => {
    const googleToken = req.body.token;
    try {
        const { name, email, picture } = await googleVerify( googleToken );

        //
        const usuarioDB = await Usuario.findOne( { email });
        let usuario;

        
        if(!usuarioDB){
            //Si el usuario no existe antes en nuestra DB
            usuario = new Usuario({
                nombre: name,
                email,
                password: "---",
                img: picture,
                google: true
            });
        }else{
            //Solo Si el usuario existe en nuestra DB
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = "---";
        }
        
        console.log({ usuario : usuario });
        //Guardar en base de datos
        await usuario.save();

        //Generar JWT
        const token = await generarJWT( usuarioDB.id );

        res.json({
            ok: true,
            token,
        });
    } catch (error) {
        console.log(error)
        res.status(401).json({
            ok: false,
            msg: "TOKEN no es correcto"
        });
    }
}

module.exports = {
    login,
    googleSign,
};