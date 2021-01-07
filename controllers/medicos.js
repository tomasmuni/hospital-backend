const { response } = require("express");
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    try {
        
        const medicos = await Medico.find().
                            populate('usuario', 'nombre img').
                            populate('hospital', 'nombre');
        
        res.status(200).json({
            ok: true,
            medicos
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

const createMedico = async(req, res = response) => {

    console.log(req.body);
    const { nombre, hospitalId } = req.body;
    try {
        
        const _medico = new Medico({
            hospital: hospitalId,
            nombre: nombre,
            usuario: req.id
        })
        console.log(_medico);
        const newMedico = await _medico.save();

        res.status(200).json({
            ok: true,
            medico: newMedico
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

const updateMedico = (req, res = response) => {

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

const deleteMedico = (req, res = response) => {

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

module.exports = {
     deleteMedico,
     createMedico,
     getMedicos,
     updateMedico
}