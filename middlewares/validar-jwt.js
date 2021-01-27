const { response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');


const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');

    if(!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene permisos para esta petición'
        })
    }
    try {
        
       const { id } =  jwt.verify(token, process.env.JWT_KEY);

       req.id = id;
       next();

    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'No tiene permisos para esta petición'
        })
    }
    
}

const validarAdmin = async (req, res = response, next) => {

    try {

        const usuarioId = req.id;
    
        const usuarioDB = await Usuario.findById(usuarioId);
    
        if (!usuarioDB)
            return res.status(500).json({
                ok: false,
                msg:"El usuario es inexistente"
            });
    
        if (usuarioDB.role !== 'ADMIN_ROLE')
            return res.status(403).json({
                ok: false,
                msg:"No tiene permiso para realizar esta petición."
            });
    
        next();

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Se produjo un error inesperado...'
        })
        
    }

}

const validarAdmin_perfil = async (req, res = response, next) => {

    try {

        const usuarioId = req.id;
        const paramsId = req.params.id
    
        const usuarioDB = await Usuario.findById(usuarioId);
    
        if (!usuarioDB)
            return res.status(500).json({
                ok: false,
                msg:"El usuario es inexistente"
            });
    
        if (usuarioDB.role === 'ADMIN_ROLE' || usuarioId === paramsId) {
            next();
        } else {
            return res.status(403).json({
                ok: false,
                msg:"No tiene permiso para realizar esta petición."
            });
        }
    

    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Se produjo un error inesperado...'
        })
        
    }

}

module.exports = {
    validarJWT,
    validarAdmin,
    validarAdmin_perfil
}