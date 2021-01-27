const { response } = require("express");
const Hospital = require('../models/hospital');

const getHospitales = async(req, res = response) => {

    const _desde = Number(req.query.desde) || 0;
    try {
    
        const [hospitales, total] = await Promise.all([
            Hospital
                .find()
                .populate('usuario', 'nombre img'),
            Hospital.countDocuments()
        ]);
        
        res.status(200).json({
            ok: true,
            hospitales,
            total
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

const updateHospital = async (req, res = response) => {

    const hospitalId = req.params.id;
    const usuarioId = req.id;
    try {

        const _hospitalDB = await Hospital.findById(hospitalId);

        if (!_hospitalDB) {

            return res.status(404).json({
                ok:false,
                msg: 'El hospital no existe'
            })
        }

        const editHospital = {
            ...req.body,
            usuario: usuarioId

        }

       const hospitalResponse =  await Hospital.findByIdAndUpdate(hospitalId, editHospital, {new: true});

       res.status(200).json({
           ok: true,
           hospital: hospitalResponse
       })
        
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

const deleteHospital = async(req, res = response) => {

    const hospitalId = req.params.id;
    try {

        const _existHospital = await Hospital.findById(hospitalId);

        if (!_existHospital) {
            return res.status(404).json({
                ok: false,
                msg: 'El hospital que intenta eliminar no existe.'
            });
        }
        await Hospital.findByIdAndDelete(hospitalId);

        return res.status(200).json({
            ok: true,
            msg: 'El hospital fue eliminado.'
        })
        
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