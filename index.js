
const express = require('express');
const { dbconnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

// servidor
const app = express();

//CORS
app.use(cors());

//Base de datos
dbconnection();

//Username
//usr: mean_user 
//psw: pmJNBBBAktmFHBsy

app.get('/', (req,res) => {

    res.status(200).json({ok: true, msg:'Servidor escuchando'})

});
app.listen(process.PORT, ()=> {
    console.log('servidor corriendo puerto ', process.env.PORT)
});