//! Aca se configura el servidor de express

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');


const app = express(); //esto crea un objeto del servidor de express
const routesAdmin = require('./routes/admin.routes');
const routesLogin = require('./routes/login.routes');

//? =================================================Settings=================================================
app.use(cors({
    origin: '*',
    methods: 'GET, POST, PUT, DELETE',
    allowedHeaders: 'Content-Type, Authorization'
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({ limit: '100mb', extended: true }));
app.use(morgan('dev'));


//^ =================================================Routes=================================================
app.get('/' , (req , res)=>{
   res.json(
    {
        status:true,
        message:"Welcome to the API"
    });
});

//* Rutas de usuarios

app.use('/admin', routesAdmin);
app.use('/login', routesLogin);



module.exports = app;