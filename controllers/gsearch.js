const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');



const getAllBystr = async(req,res = response) =>  { 

    try {
        const searchSTR = req.params.busqueda;
        
        const regEx = new RegExp(searchSTR,'i');

        const [usuarios, medicos, hospitales ] = await Promise.all([
             Usuario.find({ nombre: regEx}),
             Medico.find({ nombre: regEx}),
             Hospital.find({ nombre: regEx})
        ]);
        console.log(usuarios,medicos,hospitales);
        res.status(200).json({
            ok: true,
            usuarios,
            medicos,
            hospitales
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.'
        })
    }
}


const getCollectionBystr = async(req,res = response) =>  { 

    try {
        const searchSTR = req.params.busqueda;
        const tablaSTR = req.params.tabla;
        let data = [];
        const regEx = new RegExp(searchSTR,'i');

        switch (tablaSTR) {
            case 'medicos':
                data = await Medico.find({ nombre: regEx})
                                    .populate('usuario', 'nombre img')
                                    .populate('hospital', 'nombre');
                break;
            case 'hospitales':
                data = await Hospital.find({ nombre: regEx})
                                    .populate('usuario', 'nombre img');
                break;
            case 'usuarios':
                data = await Usuario.find({ nombre: regEx});
                break;
        
            default:
                return res.status(400).json({
                    ok: false,
                    msg: 'Las colecciones tienen que ser medicos/hospitales/usuarios'
                })
                break;
        }
        
        res.status(200).json({
            ok: true,
            response: data
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
    getAllBystr,
    getCollectionBystr
}