const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    try {
    
        const hospitales = await Hospital.find().populate('usuario', 'nombre img');
        
        res.status(200).json({
            ok: true,
            hospitales
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

const createHospital = async(req, res = response) => {

    const _id = req.id;
    const _hospital = new Hospital(
        {
            usuario: _id,
            ...req.body
        });

    try {
        
        const newHosp = await _hospital.save();

        res.status(200).json({
            ok: true,
            hospital: newHosp
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

const updateHospital = (req, res = response) => {

    try {
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

const deleteHospital = (req, res = response) => {

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
    deleteHospital,
    createHospital,
    getHospitales,
    updateHospital
}