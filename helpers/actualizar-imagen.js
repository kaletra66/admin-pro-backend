const fs = require('fs');

const Usuario = require('../models/usuarios');
const Hospital = require('../models/hospital');
const Medico = require('../models/medico');

const borrarImagen = ( pathViejo ) => {
    if( fs.existsSync( pathViejo ) ){
        //Borrar la imagen anterior
        fs.unlinkSync( pathViejo );
    }
}

const actualizarImagen = async ( tipo, id, nombreAchivo ) => {
    
    let pathViejo = "";
    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            
            if( !medico ){
                console.log("No se encontró un médico");
                return false;
            }

            pathViejo = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathViejo);
            
            medico.img = nombreAchivo;
            await medico.save();
            return true;

            break;
        case 'hospitales':

            const hospital = await Hospital.findById(id);
            
            if( !hospital ){
                console.log("No se encontró un médico");
                return false;
            }

            pathViejo = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathViejo);
            
            hospital.img = nombreAchivo;
            await hospital.save();
            return true;
        
            break;
        case 'usuarios':
            
            const usuario = await Usuario.findById(id);
            
            if( !usuario ){
                console.log("No se encontró un médico");
                return false;
            }

            pathViejo = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathViejo);
            
            usuario.img = nombreAchivo;
            await usuario.save();
            return true;

            break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen,
}