const { Schema, model} = require('mongoose');

const UsuariosSchema = Schema({
    nombre:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        require: true,
        default: 'USER_ROLE'
    },
    google:{
        type: Boolean,
        default: false
    }
});

UsuariosSchema.method('toJSON', function(){
    const {__v, _id, password, ...object} = this.toObject();
    object.u_id = _id;
    return object;
})

module.exports = model( 'Usuario', UsuariosSchema);