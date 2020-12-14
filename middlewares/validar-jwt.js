const { response } = require("express");
const jwt = require('jsonwebtoken')


const validarJWT = (req, res = response, next) => {

    const token = req.header('x-token');
    console.log(token);

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

module.exports = {
    validarJWT
}