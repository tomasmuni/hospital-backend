const { response } = require("express");
const { Mongoose } = require("mongoose");
const Medico = require('../models/medico');


const getMedicos = async(req, res = response) => {

    try {
        

        const [medicos, total] = await Promise.all([
            Medico.find().
                            populate('usuario', 'nombre img').
                            populate('hospital', 'nombre'),
            Medico.countDocuments()
        ]);

        res.status(200).json({
            ok: true,
            medicos,
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
const getMedicoById = async(req, res = response) => {

    try {
        
        const _id = req.params.id;

        const medico =  await Medico.findById(_id).
                            populate('usuario', 'nombre img').
                            populate('hospital', 'nombre img');

        
        res.status(200).json({
            ok: true,
            medico
        });
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
    const { nombre, hospital } = req.body;
    try {
        
        const _medico = new Medico({
            hospital: hospital,
            nombre: nombre,
            usuario: req.id
        })
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

const updateMedico = async(req, res = response) => {

    const _medicoId = req.params.id;

    try {
        const _medicoDB = await Medico.findById(_medicoId);

    if (!_medicoDB) {
        return res.status(404).json({
            ok: false,
            msg: 'El medico que intenta editar no se encuentra registrado.'
        })
    }

    const _editMedico = {
        ...req.body,
        usuario: req.id,
    }
    const updateMedico = await Medico.findByIdAndUpdate(_medicoId, _editMedico, {new: true});

    res.status(200).json({
        ok:true,
        medico: updateMedico
    })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        })
    }


}

const deleteMedico = async(req, res = response) => {

    try {

        const medicoId = req.params.id;

        const medicoDB = await Medico.findById(medicoId);

        if (!medicoDB) {

            return res.status(404).json({
                ok: false,
                msg: 'El medico que intenta eliminar no se encuentra registrado.'
            });
        }

        await Medico.findByIdAndDelete(medicoId);

        res.json({
            ok: true,
            msg: 'El medico fue eliminado.'
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
     deleteMedico,
     createMedico,
     getMedicos,
     updateMedico,
     getMedicoById
}