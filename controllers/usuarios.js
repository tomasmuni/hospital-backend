const Usuario = require('../models/usuario');
const { response } = require('express');
const { generateJWT } = require('../helpers/jwt')

const bcrypt = require('bcryptjs')

const getUsuarios = async(req,res = response) => {

    const _desde = Number(req.query.desde) || 0;
    try {

    const [usuarios, total] = await Promise.all([
            Usuario
                .find({}, 'nombre email role google img')
                .skip(_desde)
                .limit(5),
            Usuario.countDocuments()
        ]);

        res.status(200).json({
            ok: true,
            usuarios,
            total
        });
        
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
    
};

const setUsuarios = async (req,res) => {

    const { email, password } = req.body;

    try {

        const existeUsuario = await Usuario.findOne({ email});

        if (existeUsuario) {
            return  res.status(400).json(
                {
                    ok: false, 
                    msg: 'El usuario ya se encuentra registrado.'
                });
        }
        const usuario = new Usuario(req.body);

        //Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password);

        await usuario.save();

        var token = await generateJWT(usuario.id);

        res.status(200).json(
            {
                ok: true, 
                usuario,
                token
            });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }

    
};

const updateUsuarios = async (req, res = response) => {
    
    //Validar token y usuario
    const _id = req.params.id
     try {

        const _usuario = await Usuario.findById(_id);

        if (!_usuario) {
            return  res.status(404).json(
                {
                    ok: false, 
                    msg: 'El usuario no existe.'
                });
        }

        //Actualizar usuario
        const {password, google, email, ...campos} = req.body;


        if (email !== _usuario.email) {

            const existeUsuario = await Usuario.findOne({email});

            if (existeUsuario) {
                return  res.status(400).json(
                    {
                        ok: false, 
                        msg: 'El email ya se encuentra registrado.'
                    });
            }
        }

        if (!_usuario.google) campos.email = email;

        const camposActualizados = await Usuario.findByIdAndUpdate(_id,campos, { new: true});

        res.json({
            ok: true,
            usuario: camposActualizados
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
        
    }
}

const deleteUsuario = async (req, res = response) => {

    try {
        
        const _id = req.params.id;

        const _user = await Usuario.findById(_id);

        if (!_user) {
           res.status(404).json({
               ok: false,
               msg: 'User not found.'
           })
        }
        await Usuario.findByIdAndDelete(_id);

        res.status(200).json({
            ok: true,
            msg: 'Usuario eliminado.'
        })

    } catch (error) {
        console.log(error);
        res.status(400).json({
            ok: false,
            msg: 'Error Inesperado'
        });
    }
}
module.exports = {
    getUsuarios,
    setUsuarios,
    updateUsuarios,
    deleteUsuario,
}