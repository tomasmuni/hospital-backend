const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt');
const { verify } = require('../helpers/google-verify');



const login = async(req,res = response) =>  {

    try {
        
        const { email, password} = req.body;

        const _usuario = await Usuario.findOne({email});

        if (!_usuario) {
            return res.status(500).json(
                {
                    ok: false,
                    msg: 'El usuario o la contraseña no es correcta.'
                }
            );
        }

        const validPassword = bcrypt.compareSync(password, _usuario.password);

        if (!validPassword) {
            return res.status(500).json(
                {
                    ok: false,
                    msg: 'El usuario o la contraseña no es correcta.'
                }
            );
        }

        //generar Token
        var token = await generateJWT(_usuario.id);

        res.json({
            ok: true,
            token
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Login fail.'
        })
    }
};

const googleSignIn = async (req, res = response) => {

    
    try {
        const _token = req.body.token;
        var {name, email, picture } = await verify(_token);

        usuarioDB = await Usuario.findOne({email});
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }
        console.log(usuarioDB)
        await usuario.save();

        //generar Token
        var token = await generateJWT(usuario.id);


        res.status(200).json({
            token
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }
    
}

module.exports = {
    login,
    googleSignIn
}
