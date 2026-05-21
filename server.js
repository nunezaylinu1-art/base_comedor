const express = require('express');
const path = require('path');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const menuRoutes = require('./routes/menu');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended:true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/auth', authRoutes);
app.use('/menu', menuRoutes);
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/login.html'));
});

app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${process.env.PORT}`);
});

const bodyParser = require('body-parser');
require('dotenv').config();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));



app.listen(process.env.PORT, () => {
    console.log(`Servidor ejecutándose en puerto ${process.env.PORT}`);
});





const mysql = require('mysql2');


const bcrypt = require('bcrypt');


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// CONEXION MYSQL
const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Aylin1234@',
    database: 'base_comedor'
});

conexion.connect((error) => {

    if(error){
        console.log('Error conexión MySQL:', error);
    }else{
        console.log('Conectado a MySQL');
    }

});