
const express = require('express');
const { dbconnection } = require('./database/config');
require('dotenv').config();
const cors = require('cors')

// servidor
const app = express();

//CORS
app.use(cors());

//Lectura y Parseo de body
app.use(express.json());

//Base de datos
dbconnection();

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo puerto ', process.env.PORT)
});

//Username
//usr: mean_user 
//psw: FmGE6J04y5fAHiLJ