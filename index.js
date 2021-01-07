
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


//Directorio public
app.use( express.static('public'));

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/search', require('./routes/search'));
app.use('/api/uploads', require('./routes/uploads'));

app.listen(process.env.PORT, ()=> {
    console.log('servidor corriendo puerto ', process.env.PORT)
});

//Username
//usr: mean_user 
//psw: FmGE6J04y5fAHiLJ