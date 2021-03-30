const jwt = require("jsonwebtoken");
const generarJWT = ( u_id ) =>{
    return new Promise((resolve, reject) => {
        
        const payload = { //cualquier dato menos el sensible
            u_id
        };
        
        jwt.sign(payload,process.env.JWT_SECRET, { expiresIn: '12h' }, (err, token) => {
            if(err){
                console.log(err);
                reject('No se pudo generar el JWT');
            }else{
                console.log(token);
                resolve( token );
            }
        });
    });
}

module.exports= {
    generarJWT,
}