const jwt = require('jsonwebtoken');

const generateJWT = (uuid) => {

    return new Promise( (resolve, reject) => {
        const payload = {
            uuid
        };
    
        jwt.sign( payload, process.env.JWT_KEY, {
            expiresIn: '12h'
        }, (err, token) => {
            if(err) {
                reject('No se pudo generar el JWT')
            }
            else {
                resolve(token);
            }
        })
    });
}

const validateJWT = (token = '') => {

    try{
        const { uuid } = jwt.verify(token , process.env.JWT_KEY );
        return [ true, uuid];
    }catch(exception) {
        return [false, null ];
    }
}

module.exports = {
    generateJWT,
    validateJWT
}