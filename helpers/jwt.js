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

module.exports = {
    generateJWT
}