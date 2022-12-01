const jwt = require('jsonwebtoken');

const validateJWT = ( req, res, next) => {
    const token = req.header('x-token');
    
    try{
        if( !token) {
            return res.status(401).json({
                ok: false,
                msg: `There aren't token in request`
            });
        }

        const { uuid } = jwt.verify(token , process.env.JWT_KEY );
        req.uuid = uuid;

        next();
    }catch(exception) {
        return res.status(401).json({
            ok: false,
            msg: `Invalid token`
        });
    }
}

module.exports = {
    validateJWT
}