const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const fs = require ('fs');

const borrarImagen = (path) => {

    if (fs.existsSync(path)) {
        fs.unlinkSync(path)
    }
}


const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let imagenAntigua;
    switch (tipo) {
        case 'medicos':
            const medico = Medico.findById(id);
            if (!medico) {
                console.log('El medico no existe')
                return false
            }
            imagenAntigua =  `/uploads/medicos/${ medico.img }`;
           
            borrarImagen(imagenAntigua);
            medico.img = nombreArchivo;
            await medico.save();
            return true;

        break;
        case 'usuarios':

            const usuario = Usuario.findById(id);
            if (!usuario) {
                console.log('El medico no existe')
                return false
            }
            
            imagenAntigua =  `/uploads/usuarios/${ usuario.img }`;
           
            borrarImagen(imagenAntigua);
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
        break;
        case 'hospitales':

            const hospital = Hospital.findById(id);
            if (!hospital) {
                console.log('El medico no existe')
                return false
            }
            
            imagenAntigua =  `/uploads/hospitales/${ hospital.img }`;
           
            borrarImagen(imagenAntigua);
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        
        break;
    
        default:
            break;
    }

}

module.exports = {
    actualizarImagen
}