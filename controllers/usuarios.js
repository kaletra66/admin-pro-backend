const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuarios');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (request, res) =>{
    const desde = Number(request.query.desde) || 0;
    // const usuarios = await Usuario  .find({}, 'nombre email role google')
    //                                 .skip( desde )
    //                                 .limit( 5 );

    // const total = await Usuario.count();


    const [ usuarios, total ] = await Promise.all([
        Usuario
                .find({}, 'nombre email role google img')
                .skip( desde )
                .limit( 5 ),
        Usuario.countDocuments()    
    ]);
                                    
    res.json({
        ok: true,
        usuarios,
        u_id : request.u_id,
        total
    });
}

const postUsuario = async (request, res = response) =>{
    const { email, password } = request.body;
    
    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail) {
            return res.status(400).json({
                ok:false,
                msg: "el correo ya existe"
            });
        }

        const usuario = new Usuario(request.body);

        //Cifrar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        //Guardar usuario
        await usuario.save();

        //GEnerar token
        const token = await generarJWT( usuario.id );

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado, checa los logs"
        });
    }
}

const putUsuario = async (req, res = response) => {

    const u_id = req.params.id;

    try {

        const existe_usuario_db = await Usuario.findById( u_id );

        if(!existe_usuario_db){
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }
        //Actualización
        const {password, google, email, ...campos} = req.body;

        if(existe_usuario_db !== email){
            const existe_email = await Usuario.findOne({ email });
            if(existe_email){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese correo"
                });
            }
        }
        campos.email = email

        const usuarioActualizado = await Usuario.findOneAndUpdate( u_id, campos, {new: true});
        // const usuarioActualizado = await Usuario.findOneAndUpdate( u_id, campos);

        res.json({
            ok: true,
            usuarioActualizado
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"error inesperado en el PUT"
        });
    }
}

const deleteUsuario = async (req, res) =>{
    const u_id = req.params.id;

    try {

        const existe_usuario_db = await Usuario.findById( u_id );
        if(!existe_usuario_db){
            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        await Usuario.findByIdAndDelete(u_id);

        res.json({
            ok: true,
            msg: "Usuario eliminado"
        });
        
    } catch (error) {
        console.log(error)
        res.json({
            ok: false,
            msg: "Error al borrar"
        });
    }

}

module.exports = {
    getUsuarios,
    postUsuario,
    putUsuario,
    deleteUsuario,
};