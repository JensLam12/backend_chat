const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next) => {
    const token = req.header('x-token');
    
    try{
        if( !token) {
            return res.status(401).json({
                ok: false,
                msg: `No hay un token en la request`
            });
        }

        const { uuid } = jwt.verify(token , process.env.JWT_KEY );
        req.uuid = uuid;

        next();
    }catch(exception) {
        return res.status(401).json({
            ok: false,
            msg: `Token invalido`
        });
    }
}

module.exports = {
    validateJWT
}