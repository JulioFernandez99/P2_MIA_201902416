
const {insertData} = require('../config/db.mongo');
const {getData} = require('../config/db.mongo');
const {getViajes} = require('../config/db.mongo');
const {eliminarUsuario} = require('../config/db.mongo');
const {insertViajes} = require('../config/db.mongo');
const {insertAutos} = require('../config/db.mongo');
const {appendToViajes} = require('../config/db.mongo');
const {appendToAutos} = require('../config/db.mongo');
const {getUsuarios} = require('../config/db.mongo');
const {aceptarViajes} = require('../config/db.mongo');
const {aceptarAutos} = require('../config/db.mongo');
const {uploadFile2} = require('../config/bucket');

const {getAutos} = require('../config/db.mongo');

const registro = async (req, res) => {
    // se obtienen los datos del body
    

    const { path,nombre, usuario ,foto,email ,password, conf_password } = req.body;
    //al inicio del path agregar el nombre de usuario
    pathnw=usuario+'-'+path;
    await uploadFile2(pathnw, foto);
    const ruta_aws = `https://bucket-jf.s3.amazonaws.com/${pathnw}`;
    console.log('Ubicacion de la imagen: ', ruta_aws);
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

    // const saltRounds = 10;
    // const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
    const result = await insertData('Usuarios', 
        {   
            nombre,
            usuario,
            foto:ruta_aws,
            email,
            password:password,
            viajesComprados: [],
            autosComprados: [],
            viajesNoAprobados:[],
            autosNoAprobados:[],
            rol: 'usuario',
            viajesPendientes:false
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
    
    const result = await insertViajes('Viajes',
        {
            nombreAgencia,
            ciudadOrigen,
            ciudadDestino,
            diasDeVuelo,
            precioDeVuelo,
            aprobado: false
        }
    );

    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al registrar el viaje en la base de datos',
            data: {
                nombreAgencia: nombreAgencia,
                ciudadOrigen: ciudadOrigen,
                ciudadDestino: ciudadDestino,
                diasDeVuelo: diasDeVuelo,
                precioDeVuelo: precioDeVuelo
            }
        });
    }

    return res.json({
        status: true,
        message: 'Viaje registrado correctamente',
        data: result
    });
};

const registroAutos = async (req, res) => {
    
    const { nombreAgencia, marca, placa, modelo, precio, ubicacion} = req.body;
    const result = await insertAutos('Autos',
        {
            nombreAgencia,
            marca,
            placa,
            modelo,
            precio,
            ubicacion
        }
    );

    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al registrar el auto en la base de datos',
            data: {
                nombreAgencia: nombreAgencia,
                marca: marca,
                placa: placa,
                modelo: modelo,
                precio: precio,
                ubicacion: ubicacion
            }
        });
    }

    return res.json({
        status: true,
        message: 'Auto registrado correctamente',
        data: result
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

const registroAdmin = async (req, res) => {
    // se obtienen los datos del body
    

    const { path,nombre, usuario ,foto,email ,password, conf_password } = req.body;
    pathnw=usuario+'-'+path;
    await uploadFile2(pathnw, foto);
    const ruta_aws = `https://bucket-jf.s3.amazonaws.com/${pathnw}`;
    console.log('Ubicacion de la imagen: ', ruta_aws);
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

    // const saltRounds = 10;
    // const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
    const result = await insertData('Usuarios', 
        {   
            nombre,
            usuario,
            foto:ruta_aws,
            email,
            password:password,
            viajesComprados: [],
            autosAlquilados: [],
            rol: 'admin'
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


const deleteUsuario = async (req, res) => {
    const { usuario } = req.body;

   


    const resultData=await getData('Usuarios',{usuario:usuario});
    if(resultData instanceof Error){
        return res.json({
            status:false,
            error:"Error al obtener datos de la base de datos"
        });
    }

    if (resultData==null){
        return res.json({
            status:false,
            error:"El usuario no existe"
        });
    }

    const result = await eliminarUsuario('Usuarios', { usuario: usuario });
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al eliminar usuario en la base de datos',
            data: {
                usuario: usuario
            }
        });
    }

    return res.json({
        status: true,
        message: 'Usuario eliminado correctamente en la base de datos',
        data: result
    });
}

const viajes = async (req, res) => {
    const result = await getViajes('Viajes');
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al obtener los viajes de la base de datos',
        });
    }

    return res.json({
        status: true,
        message: 'Viajes obtenidos correctamente',
        viajes: result
    });


}

const autos = async (req, res) => {

    const result = await getAutos('Autos');
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al obtener los autos de la base de datos',
        });
    }

    return res.json({
        status: true,
        message: 'Autos obtenidos correctamente',
        autos: result
    });

}


const appendViajes = async (req, res) => {
    const { usuario, viajes } = req.body;
    const result = await appendToViajes(usuario, viajes);
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al agregar el viaje al usuario en la base de datos',
        });
    }

    return res.json({
        status: true,
        message: 'Viaje agregado correctamente al usuario'
    });
};
  
const appendAutos = async (req, res) => {
    
    const { usuario, autos } = req.body;
    
    const result = await appendToAutos(usuario, autos);
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al agregar el auto al usuario en la base de datos',
        });
    }
    
    return res.json({
        status: true,
        message: 'Auto agregado correctamente al usuario'
    });
};

const getUsers = async (req, res) => {
    const result = await getUsuarios('Usuarios');
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al obtener los usuarios de la base de datos',
        });
    }

    return res.json({
        status: true,
        message: 'Usuarios obtenidos correctamente',
        usuarios: result
    });

}

const confirmaViajes = async (req, res) => {
    const { usuarios } = req.body;
    console.log("Array de usuarios ----->", usuarios);
    const result = await aceptarViajes(usuarios);
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al aceptar los viajes del usuario',
        });
    }

    return res.json({
        status: true,
        message: 'Viajes aceptados correctamente',
        usuarios: result
    });

}


confirmarAutos = async (req, res) => {
    const { usuarios } = req.body;
    console.log("Array de usuarios ----->", usuarios);
    const result = await aceptarAutos(usuarios);
    if (result instanceof Error) {
        return res.json({
            status: false,
            message: 'Error al aceptar los autos del usuario',
        });
    }

    return res.json({
        status: true,
        message: 'Autos aceptados correctamente',
        usuarios: result
    });

}

module.exports = {
    registro,
    registroViaje,
    registroAutos,
    registroRecepcionistas,
    registroAdmin,
    deleteUsuario,
    viajes,
    appendViajes,
    getUsers,
    confirmaViajes,
    autos,
    appendAutos,
    confirmarAutos
};