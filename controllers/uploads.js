const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");
const path = require('path');
const fs = require('fs');




const fileUpload = async (req, res = response) => {

    const _tipo = req.params.tipo;
    const _id = req.params.id;
    const updloadValid = ['medicos','usuarios','hospitales'];


    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'Seleccone un archivo'
        });
      }

    if ( !updloadValid.includes(_tipo)) {

        return res.status(400).json({
            ok: false,
            msg: 'Los tipos tienen que ser merdicos/usuarios/hospitales.'
        });
    }

      // Procesar imagen

      const file = req.files.imagen;
      const nombreSplited = file.name.split('.');
      const fileExt = nombreSplited[nombreSplited.length -1];

      // Extenciones validas

      const validExt = ['jpg', 'jpeg', 'gif', 'png'];
      if ( !validExt.includes(fileExt)) {

        return res.status(400).json({
            ok: false,
            msg: 'La extencion de la imagen no es valida (jpg/jpeg/png/gif)'
        });
    }

    //Generar nombre archivo
    const nombreArchivo = `${ uuidv4() }.${ fileExt }`;

    const _path = `./uploads/${ _tipo }/${ nombreArchivo }`;

    file.mv(_path, (err) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                ok: false,
                msg: 'Error al cargar el fichero'
            });
        }

        // return res.send('File uploaded!');
    });

    await actualizarImagen(_tipo, _id, nombreArchivo);
    return res.status(200).json({
        ok: true,
        msg: 'Archivo subido',
        nombreArchivo
    });

}

const getImagen = async (req, res = response) => {
    
    const _tipo = req.params.tipo;
    const _foto = req.params.id;

    const pathImg = path.join(__dirname, `../uploads/${ _tipo }/${ _foto }`);
    console.log(pathImg)
    if(fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-image-found.png`);
        res.sendFile(pathImg);
    }

}

module.exports = {
    fileUpload,
    getImagen
}