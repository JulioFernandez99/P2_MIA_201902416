
const {insertData} = require('../config/db.mongo');
const {getData} = require('../config/db.mongo');
const bcrypt = require('bcrypt');


const registro = async (req, res) => {
    // se obtienen los datos del body
    const { nombre, usuario ,foto,email ,password, conf_password } = req.body;
    // un res.json de los datos que se reciben
    if (password !== conf_password) {
        return res.json({
            status: false,
            message: 'Las contraseñas no coinciden',
        });
    };

    const resultData=await getData('Usuarios',{usuario:usuario});
    if(resultData instanceof Error){
        return res.json({
            status:false,
            error:"Error al obtener datos de la base de datos"
        });
    }

    if (resultData!=null){
        return res.json({
            status:false,
            error:"El usuario ya existe"
        });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const result = await insertData('Usuarios', 
        {   
            nombre,
            usuario,
            foto,
            email,
            password:hashedPassword,
            viajesComprados: [],
            autosAlquilados: [],
            rol: 'usuario'
        }
    );
    
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al registrar usuario en la base de datos',
            data: {
                nombre: nombre,
                usuario: usuario,
                foto: foto,
                email: email,
                password: password,
                conf_password: conf_password
            }
        });
    }

    return res.json({
        status: true,
        message: 'Usuario registrado correctamente en la base de datos',
        data: result
    });

};

const registroViaje = async (req, res) => {
    
    const { nombreAgencia, ciudadOrigen, ciudadDestino, diasDeVuelo, precioDeVuelo} = req.body;
    res.json({
        status: true,
        message: 'Viaje registrado correctamente',
        data: {
            nombreAgencia: nombreAgencia,
            ciudadOrigen: ciudadOrigen,
            ciudadDestino: ciudadDestino,
            diasDeVuelo: diasDeVuelo,
            precioDeVuelo: precioDeVuelo
        }
    });
};

const registroAutos = async (req, res) => {
    
    const { nombreAgencia, marca, placa, modelo, precio, ubicacion} = req.body;
    res.json({
        status: true,
        message: 'Auto registrado correctamente',
        data: {
            nombreAgencia: nombreAgencia,
            marca: marca,
            placa: placa,
            modelo: modelo,
            precio: precio,
            ubicacion: ubicacion
        }
    });
};

const registroRecepcionistas = async (req, res) => {
    
    const { nombre, usuario, foto, correo, password, conf_password} = req.body;
    if (password !== conf_password) {
        return res.json({
            status: false,
            message: 'Las contraseñas no coinciden',
        });
    };

    const resultData=await getData('Usuarios',{usuario:usuario});
    if(resultData instanceof Error){
        return res.json({
            status:false,
            error:"Error al obtener datos de la base de datos"
        });
    }

    if (resultData!=null){
        return res.json({
            status:false,
            error:"La recepcionista ya existe"
        });
    }
    
    const result = await insertData('Usuarios', 
        {   
            nombre,
            usuario,
            foto,
            correo,
            password,
            rol: 'recepcionista'
            
        }
    );
    
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al registrar la recepcionista en la base de datos',
            data: {
                nombre: nombre,
                usuario: usuario,
                foto: foto,
                email: email,
                password: password,
            }
        });
    }

    return res.json({
        status: true,
        message: 'La recepcionista se registro correctamente en la base de datos',
        data: result
    });
};

module.exports = {
    registro,
    registroViaje,
    registroAutos,
    registroRecepcionistas
};