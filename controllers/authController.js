const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');

const createUser = async (req, res = response ) => {
    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({email});
        if(existEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }
        const user = new User(req.body);
        //Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);
        await user.save();
        const token = await generateJWT(user.id);

        res.status(200).json({
            ok: true,
            user,
            token
        });

    }catch( exception ) {
        console.log(exception);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
    
}

const login = async (req, res = response ) => {
    const { email, password } = req.body;

    try {
        const userDB = await User.findOne({email});
        if(!userDB) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no encontrado'
            });
        }

        const validPassword = bcrypt.compareSync( password, userDB.password );
        if( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password is required'
            });
        }

        const token = await generateJWT(userDB.id);

        res.status(200).json({
            ok: true,
            userDB,
            token
        });

    }catch( exception ) {
        console.log(exception);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

const renewToken = async (req, res = response ) => {

    try {
        const uuid = req.uuid;
        const token = await generateJWT(uuid);
        const userDB = await User.findById(uuid);

        res.status(200).json({
            ok: true,
            userDB,
            token
        });

    }catch( exception ) {
        console.log(exception);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    createUser,
    login,
    renewToken
}