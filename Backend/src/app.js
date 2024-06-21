//! Aca se configura el servidor de express

const express = require('express');
//const cors = require('cors');


const app = express(); //esto crea un objeto del servidor de express

//? =================================================Settings=================================================
//app.use(cors());
app.use(express.json({limit: '50mb'}));


//^ =================================================Routes=================================================
app.get('/' , (req , res)=>{
   res.json(
    {
        status:true,
        message:"Welcome to the API"
    });
});


module.exports = app;