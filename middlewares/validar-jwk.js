const { response } = require("express");
const jwt = require("jsonwebtoken");

const validarJWT = (req, res = response, next) =>{
    //Leer token
    const token = req.header( 'x-token' );
    console.log(token);


if(!token){
    return res.status(401).json({
        ok:false,
        msg: "no tienes acceso"
    })
}

try {
    const { u_id }  = jwt.verify( token, process.env.JWT_SECRET);
    req.u_id = u_id;
} catch (error) {
    return res.status(401).json({
        ok:false,
        msg: "TOKEN  no valido"
    })
}

    next();
}


module.exports={
    validarJWT
}