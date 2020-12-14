const Usuario = require('../models/usuario');
const { response } = require('express');
const bcrypt = require('bcryptjs');
const { generateJWT } = require('../helpers/jwt')



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

module.exports = {
    login,
}
