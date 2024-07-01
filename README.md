# MIA | Proyecto 2 
## ✈️ AVICAR ✈️

# 📋 Indice

- [Información](#Información)
- [Manual de usuario](#Manual-de-usuario)
    - [Login](#Login)
    - [Dashboard administrador](#DashBoard_administrador)
- [Manual técnico](#Manual-técnico)
    - [Gramatica](#Gramatica)
    - [Herramientas utilizadas](#Herramientas-utilizadas)

# 📝 Información
“AviCar” es el sistema que se desarrollará para el gestionamiento de viajes de todo turista
alrededor del mundo; con el fin de garantizar una completa y agradable experiencia en época
de post pandemia. La finalidad es centralizar los datos y que el cliente haga la menor
cantidad de validaciones al momento de planificar su viaje.


# 👤 Manual de usuario
Para este proyecto existen tres tipos de usuarios:

- Turista: Toda persona que desea hacer un viaje a cualquier parte del mundo,
puede visualizar todos los vuelos en la página de inicio y si desea; realizar la reservación
de un boleto de avión, así como, el alquiler de un automóvil al momento de llegar a su
destino.

- Recepcionista: Este usuario será el encargado de aprobar o rechazar la
solicitud de vuelo y renta del automóvil de los usuarios que lo soliciten. (Este tipo de
usuario únicamente podrá aceptar o rechazar las solicitudes de los usuarios turistas).

- Administrador: Este usuario será el único usuario que podrá agregar o
eliminar usuarios turista o recepcionista, podrá revisar el historial de vuelos de cada
usuario turista y agregar o eliminar viajes y automóviles.

Si desea ingresar a la pagina princiap del proyecto debera ir al siguiente enlace: http://52.207.224.130/inicio

Seguido a ello se deplegara la pagina de inicio donde puede visualizar toda la informacion de avicar y tambien las opciones disponibles.

### Login
Aca debe de ingresar su user y password, si no cuenta con uno, debe solicitar a un administrador que lo registre. Si ya cuenta con un usuario, aca podra realizar la reserva
de viajes y autos. Y el historial de los mismos.

<details>
<summary>Login</summary>
     <div align="center">
        <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/P2_MIA_201902416/blob/main/FilesReportes/login.png" style="width:50rem"></a>
    </div>
</details>

<details>
<summary>Dashboard usuario</summary>
     <div align="center">
        <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/P2_MIA_201902416/blob/main/FilesReportes/dashUsuarioViajes.png" style="width:50rem"></a>
    </div>
</details>

### DashBoard administrador
Este usuario tiene las opciones de agregar viajes, usuarios,autos y eliminarlos.

<details>
<summary>Dashboard admin</summary>
     <div align="center">
        <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/P2_MIA_201902416/blob/main/FilesReportes/dashAdmin.png" style="width:50rem"></a>
    </div>
</details>

<details>
<summary>Registro usuarios</summary>
     <div align="center">
        <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/P2_MIA_201902416/blob/main/FilesReportes/registroUsuario.png" style="width:50rem"></a>
    </div>
</details>


<details>
<summary>Registro viajes</summary>
     <div align="center">
        <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/P2_MIA_201902416/blob/main/FilesReportes/registroViajes.png" style="width:50rem"></a>
    </div>
</details>


<details>
<summary>Registro autos</summary>
     <div align="center">
        <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/P2_MIA_201902416/blob/main/FilesReportes/registroAuto.png" style="width:50rem"></a>
    </div>
</details>

<details>
<summary>Eliminar usuarios</summary>
     <div align="center">
        <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/P2_MIA_201902416/blob/main/FilesReportes/deleteUusario.png" style="width:50rem"></a>
    </div>
</details>




# 🖥️ Manual técnico
Este proyecto se desarrolo en diferentes modulos. Por una parte se desarrolo el backend,el frontend y la base de datos. Tambien se utilizaron servicios de amazon para el despliegue de la aplicacion y el amacenamiento de las foto de cada usuario.

### Tecnologias
Para el desarrolo de estre proyecto se utilizaron varias tecnologias:
- nodeJs: para la ejecucion de js en el servidor.
- mongoDB: para el dasarrolo de la base de datos.
- docker: para crear el servicio de ejecucion del proyecto.
- ec2: para el despliegue de la aplicacion.
- s3: bucket para almacenamiento de fotos.


### Backend
Para el desarrolo de este, se utilizo nodejs y es aca donde se desarrolla la API para todas las funcionalidades del proyecto.

- Configuracion del servidor: aca se declaran las variables necesarias para iniciar el servidor, una de las partes mas importantes es la variable app ya que crea una instacia de express (el servidor), tambien se declaran el limite del json que podria recibir el servidor, aca tambien es donde se inicializan los cors, que seran necesarios para la conexion con el frontend.

  <details>
        <summary>Condiguracion del servidor</summary>
      
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
            app.use(express.json({limit: '500mb'}));
            app.use(express.urlencoded({ limit: '500mb', extended: true }));
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
    </details>

- Inicio del servidor: aca se inicia el servidor en el puerto definido por las variables de entorno.

   <details>
        <summary>Inicio del servidor</summary>

        //! Aca se arranca el servidor de express
        const app = require('./app');
        require('dotenv').config();
        
        const PORT = process.env.PORT || 3000;
        
        app.listen(PORT, () => {
            console.log(`Servidor corriendo en http://localhost:${PORT}`)
        })

    </details>   

   <details>
        <summary>Variables de entorno</summary>

        PORT='3000'


        # CONFIGURACION DE MONGO
        MONGO_USER='root'
        MONGO_PASSWORD='M1A2024.'
        MONGO_HOST='192.168.0.8'
        MONGO_PORT='27017'
        MONGO_DATABASE='BD1'
        #52.207.224.130
        #
        
        # CONFIGURACION DE BUCKET DE AWS
        BUCKET_USER_ID = 'AKIAZI2LH6SONAQDJYGJ'
        BUCKET_USER_SECRET = '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'
        BUCKET_NAME = 'bucket-jf'
        BUCKET_REGION = 'us-east-1'
        
    </details>   

### Rutas
Aca se declaran todos los endpoints de la API.

<details>
        <summary>Enpoints administrador</summary>

             const {Router} = require('express');
            const {check} = require('express-validator');
            const dotenv = require('dotenv');
            dotenv.config();
            
            const router = Router();
            const adminController = require('../controllers/admin.controllers');
            const validateAtributes = require('../middleware/validate.Atributes');
            
            router.get('/' , (req , res)=>{
                res.json(
                {
                    status:true,
                    message:"Welcome to the API of admin"
                });
            });
            
            router.post('/registro/usuario', [
                check('path', 'El id es obligatorio').not().isEmpty(),
                check('foto', 'El id es obligatorio').not().isEmpty(),
                check('nombre', 'El id es obligatorio').not().isEmpty(),
                check('usuario', 'El usuario es obligatorio').not().isEmpty(),
                check('foto', 'La foto es obligatoria').not().isEmpty(),
                check('email', 'El correo es obligatorio').not().isEmpty(),
                check('password', 'La contraseña es obligatoria').not().isEmpty(),
                check('conf_password', 'La confirmacion de la contraseña es obligatoria').not().isEmpty(),
                validateAtributes
            ], adminController.registro);
            
            router.post('/registro/viaje', [
                check('nombreAgencia', 'El id es obligatorio').not().isEmpty(),
                check('ciudadOrigen', 'El usuario es obligatorio').not().isEmpty(),
                check('ciudadDestino', 'La foto es obligatoria').not().isEmpty(),
                check('diasDeVuelo', 'El correo es obligatorio').not().isEmpty(),
                check('precioDeVuelo', 'La contraseña es obligatoria').not().isEmpty(),
                validateAtributes
            ], adminController.registroViaje);
            
            router.post('/registro/auto', [
                check('nombreAgencia', 'El id es obligatorio').not().isEmpty(),
                check('marca', 'El usuario es obligatorio').not().isEmpty(),
                check('placa', 'La foto es obligatoria').not().isEmpty(),
                check('modelo', 'El correo es obligatorio').not().isEmpty(),
                check('precio', 'La contraseña es obligatoria').not().isEmpty(),
                check('ubicacion', 'La contraseña es obligatoria').not().isEmpty(),
                validateAtributes
            ], adminController.registroAutos);
            
            router.post('/registro/recepcionista', [
                check('nombre', 'El id es obligatorio').not().isEmpty(),
                check('usuario', 'El usuario es obligatorio').not().isEmpty(),
                check('foto', 'La foto es obligatoria').not().isEmpty(),
                check('correo', 'El correo es obligatorio').not().isEmpty(),
                check('password', 'La contraseña es obligatoria').not().isEmpty(),
                check('conf_password', 'La contraseña es obligatoria').not().isEmpty(),
                validateAtributes
            ], adminController.registroRecepcionistas);
            
            router.post('/registro/admin', [
                check('nombre', 'El id es obligatorio').not().isEmpty(),
                check('usuario', 'El usuario es obligatorio').not().isEmpty(),
                check('foto', 'La foto es obligatoria').not().isEmpty(),
                check('email', 'El email es obligatorio').not().isEmpty(),
                check('password', 'La contraseña es obligatoria').not().isEmpty(),
                check('conf_password', 'La contraseña es obligatoria').not().isEmpty(),
                validateAtributes
            ], adminController.registroAdmin);
            
            router.post('/deleteUsuario', [
                check('usuario', 'El usuario es obligatorio').not().isEmpty(),
                validateAtributes
            ], adminController.deleteUsuario);
            
            router.post('/registro/viaje', [
                check('nombreAgencia', 'El id es obligatorio').not().isEmpty(),
                check('ciudadOrigen', 'El usuario es obligatorio').not().isEmpty(),
                check('ciudadDestino', 'La foto es obligatoria').not().isEmpty(),
                check('diasDeVuelo', 'El correo es obligatorio').not().isEmpty(),
                check('precioDeVuelo', 'La contraseña es obligatoria').not().isEmpty(),
                validateAtributes
            ], adminController.registroViaje);
            
            
            router.post('/viajes', adminController.viajes);
            
            router.post('/autos', adminController.autos);
            
            router.post('/asignar/viajes', adminController.appendViajes);
            
            router.post('/asignar/autos', adminController.appendAutos);
            
            router.post('/aceptar/viajes', adminController.confirmaViajes);
            
            router.post('/aceptar/autos', adminController.confirmarAutos);
            
            router.get('/getUsers', adminController.getUsers);
            
            module.exports = router;
</details>  

<details>
        <summary>Endpoints login</summary>
    
            const {Router} = require('express');
            const {check} = require('express-validator');
            const dotenv = require('dotenv');
            dotenv.config();
            
            
            const router = Router();
            const loginController = require('../controllers/login.controllers');
            const loginValidates = require('../middleware/login.validates');
            
            router.post('/' , [
                check('user', 'El user es obligatorio').not().isEmpty(),
                check('password', 'La contraseña es obligatoria').not().isEmpty(),
                loginValidates
            ], loginController.login);
            
            module.exports = router;
         
</details>  


### Controladores
Aca se ubican todas las funciones que utilizara cada endpoint


<details>
        <summary>Controlador admin</summary>

        
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
                
                const { path,nombre, usuario, foto, correo, password, conf_password} = req.body;
                pathnw=usuario+'-'+path;
                await uploadFile2(pathnw, foto);
                const ruta_aws = `https://bucket-jf.s3.amazonaws.com/${pathnw}`;
                console.log('Ubicacion de la imagen: ', ruta_aws);
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
                        foto:ruta_aws,
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
     
</details>   


<details>
        <summary>Controlador usuario</summary>

                    
            const {getData} = require('../config/db.mongo');
            const bcrypt = require('bcrypt');
            
            const login=async(req,res)=>{
                const {user,password}=req.body;
                
                //obtener datos de la base de datos
                const result=await getData('Usuarios',{usuario:user});
                if(result instanceof Error){
                    return res.json({
                        status:false,
                        error:"Error al obtener datos de la base de datos"
                    });
                }
            
                //Verificar si el usuario existe
                if(result==null){
                    return res.json({
                        status:false,
                        error:"No hay ningún usuario con este nombre de usuario"
                    });
                }
            
                //Verificar si la contraseña es correcta
                 //Verificar si la contraseña es correcta
                 if(result.password!=password){
                    return res.json({
                        status:false,
                        error:"La contraseña es incorrecta"
                    });
                }
            
                //Si todo es correcto
                return res.json({
                    status:true,
                    data:result
                });
            
            
                
            
            
            
            };
            
            
            
            
            module.exports={
                login
            };
     
</details>   



### Middleware's
Aca se encuentran las funciones para verificacion de campos que consumen los controladores.

<details>
        <summary>Middleware login</summary>
    
        const {validationResult} = require('express-validator');

        const loginValidates = (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()){
                return res.status(400).json(errors);
            }
            next();
        }
        
        module.exports = loginValidates;
                 
</details>   

<details>
        <summary>Middleware validacion de atributos</summary>

             const {validationResult} = require('express-validator');
            
            const validateAtributes = (req, res, next) => {
                const errors = validationResult(req);
                if (!errors.isEmpty()){
                    return res.status(400).json(errors);
                }
                next();
            }
            
            module.exports = validateAtributes;

</details>   


### Base de datos
En la base de datos realizada con mongo se utiliza para guardar toda la informacion de la apliacion. Para ello se crearon funciones asincronas para conectarse a la base de datos. Cabe mencionar que esta base de datos es no relacional

<details>
        <summary>Configuracion y funciones de la DB</summary>

            const { MongoClient} = require('mongodb');
            require('dotenv').config();
            
            const {
                MONGO_USER,
                MONGO_PASSWORD,
                MONGO_HOST,
                MONGO_DATABASE,
                MONGO_PORT,
            } = process.env;
            
            
            const uri = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}`;
            
            //const uri = `mongodb://root:M1A2024.@localhost:27017`;
            
            const insertData = async(database, data) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection(database);
                    const result = await coleccion.insertOne(data);
                    return result;
                } catch (error) {
                    console.error('Error insertData: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            };
            
            const insertViajes = async(database, data) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Viajes');
                    const coleccion = dbmongo.collection(database);
                    const result = await coleccion.insertOne(data);
                    return result;
                }
                catch (error) {
                    console.error('Error insertData: ', error);
                    return error;
                }
                finally {
            
                    await mongoClient.close();
                }
            };
            
            const insertAutos = async(database, data) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Autos');
                    const coleccion = dbmongo.collection(database);
                    const result = await coleccion.insertOne(data);
                    return result;
                }
                catch (error) {
                    console.error('Error insertData: ', error);
                    return error;
                }
                finally {
            
                    await mongoClient.close();
                }
            }
            
            // Funcion para obtener datos de la base de datos por atributo usuario
            const getData = async(database, data) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection(database);
                    const result = await coleccion.findOne(data);
                    return result;
                } catch (error) {
                    console.error('Error getData: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            };
            
            const appendToViajes = async (username, newViaje) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection('Usuarios');
                    result2 = null;
                    
                    if (newViaje?.length || 0  > 0) {
                        for (let i = 0; i < newViaje?.length || 0; i++) {
            
                            //verificar si el viaje ya existe en viajesNoAprobados o viajesComprados,si existe continuar con el siguiente viaje
                            const resultData = await getData('Usuarios', { usuario: username });
                            if (resultData instanceof Error) {
                                return res.json({
                                    status: false,
                                    message: 'Error al obtener datos de la base de datos',
                                });
                            }
                            if (resultData == null) {
                                return res.json({
                                    status: false,
                                    message: 'El usuario no existe',
                                });
            
                            }
            
                            if (resultData.viajesNoAprobados?.length || 0 > 0) {
                                for (let j = 0; j < resultData.viajesNoAprobados?.length || 0; j++) {
                                    if (resultData.viajesNoAprobados[j].ciudadOrigen == newViaje[i].ciudadOrigen && resultData.viajesNoAprobados[j].ciudadDestino == newViaje[i].ciudadDestino) {
                                        return res.json({
                                            status: false,
                                            message: 'El viaje ya existe en viajesNoAprobados',
                                        });
                                    }
                                }
                            }
            
                            if (resultData.viajesComprados?.length || 0 > 0) {
                                for (let j = 0; j < resultData.viajesComprados?.length || 0; j++) {
                                    if (resultData.viajesComprados[j].ciudadOrigen == newViaje[i].ciudadOrigen && resultData.viajesComprados[j].ciudadDestino == newViaje[i].ciudadDestino) {
                                        return res.json({
                                            status: false,
                                            message: 'El viaje ya existe en viajesComprados',
                                        });
                                    }
                                }
                            }
            
            
            
                            
                            
            
                            
            
            
            
                            // Busca el usuario y hacer append a 'newViaje'
                            const result = await coleccion.updateOne(
                                { usuario: username }, // filtro para buscar al usuario
                                { $push: { viajesNoAprobados: newViaje[i] } } // operador para hacer append al array 'viajes'
                            );  
                
                        }
                        //cambiar el atributo a viajesPendientes a true
                        const result2 = await coleccion.updateOne(
                            { usuario: username }, // filtro para buscar al usuario
                            { $set: { viajesPendientes: true } } // operador para hacer append al array 'viajes'
                        );
                    }
                    
                    
                    return result2;
                } catch (error) {
                    console.error('Error appendToViajes: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            };
            
            const appendToAutos = async (username, newAuto) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection('Usuarios');
                    result2 = null;
            
                    if (newAuto?.length || 0 > 0) {
                        for (let i = 0; i < newAuto?.length || 0; i++) {
            
                            //verificar si el auto ya existe en autosAlquilados,si existe continuar con el siguiente auto
                            const resultData = await getData('Usuarios', { usuario: username });
                            if (resultData instanceof Error) {
                                return res.json({
                                    status: false,
                                    message: 'Error al obtener datos de la base de datos',
                                });
                            }
                            if (resultData == null) {
                                return res.json({
                                    status: false,
                                    message: 'El usuario no existe',
                                });
            
                            }
            
                            if (resultData.autosNoAprobados?.length || 0 > 0) {
                                for (let j = 0; j < resultData.autosNoAprobados?.length || 0; j++) {
                                    if (resultData.autosNoAprobados[j].marca == newAuto[i].marca && resultData.autosNoAprobados[j].modelo == newAuto[i].modelo) {
                                        console.log('El auto ya existe en autosNoAprobados');
                                    }
                                }
                            }
            
                            
                            if (resultData.autosComprados && resultData.autosComprados.length > 0) {
                                for (let j = 0; j < resultData.autosComprados.length; j++) {
                                    if (resultData.autosComprados[j].placa == newAuto[i].placa) {
                                       console.log('El auto ya existe en autosComprados');
                                    }
                                }
                            }
                            
                            
            
            
                            // Busca el usuario y hacer append a 'newAuto'
                            const result = await coleccion.updateOne(
                                { usuario: username }, // filtro para buscar al usuario
                                { $push: { autosNoAprobados: newAuto[i] } } // operador para hacer append al array 'autosAlquilados'
                            );
            
                        }
                    }
            
                    
                    return result2;
                } catch (error) {
                    console.error('Error appendToAutos: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            };
            
            
            const appendToAutosAlquilados = async (username, newAuto) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection('Usuarios');
                    
                    // Busca el usuario y hace append a 'autosAlquilados'
                    const result = await coleccion.updateOne(
                        { usuario: username }, // filtro para buscar al usuario
                        { $push: { autosAlquilados: newAuto } } // operador para hacer append al array 'autosAlquilados'
                    );
                    
                    return result;
                } catch (error) {
                    console.error('Error appendToAutosAlquilados: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            };
            
            const eliminarUsuario = async (database, data) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection(database);
                    const result = await coleccion.deleteOne(data);
                    return result;
                } catch (error) {
                    console.error('Error eliminarUsuario: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            }
            
            const getUsuarios = async(database) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection(database);
                    const result = await coleccion.find().toArray();
                    return result;
                } catch (error) {
                    console.error('Error getUsuarios: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            };
            
            const getViajes = async(database) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Viajes');
                    const coleccion = dbmongo.collection(database);
                    const result = await coleccion.find().toArray();
                    return result;
                } catch (error) {
                    console.error('Error getViajes: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            };
            
            const getAutos = async(database) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Autos');
                    const coleccion = dbmongo.collection(database);
                    const result = await coleccion.find().toArray();
                    return result;
                } catch (error) {
                    console.error('Error getAutos: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            };
            
            
            // una funcion que verifique el atributo viajesPendientes y si es true, que liste los viajes de viajesComprados y que permita eliminarlo segun ciudadOrigen y ciudadDestino
            const eliminarViaje = async (username, ciudadOrigen, ciudadDestino) => {
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection('Usuarios');
                    
                    // Busca el usuario y obtener los viajes comprados y eliminar el viaje segun ciudadOrigen y ciudadDestino
                    const result = await coleccion.updateOne(
                        { usuario: username }, // filtro para buscar al usuario
                        { $pull: { viajesComprados: { ciudadOrigen: ciudadOrigen, ciudadDestino: ciudadDestino } } } // operador para eliminar un elemento del array 'viajesComprados'
                    );
                    
                    return result;
                } catch (error) {
                    console.error('Error eliminarViaje: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            }
            
            const eliminarAuto = async (username, marca, modelo) => {
            
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                try {
                    await mongoClient.connect();
                    const dbmongo = mongoClient.db('Usuarios');
                    const coleccion = dbmongo.collection('Usuarios');
                    
                    // Busca el usuario y obtener los autos alquilados y eliminar el auto segun marca y modelo
                    const result = await coleccion.updateOne(
                        { usuario: username }, // filtro para buscar al usuario
                        { $pull: { autosAlquilados: { marca: marca, modelo: modelo } } } // operador para eliminar un elemento del array 'autosAlquilados'
                    );
                    
                    return result;
                } catch (error) {
                    console.error('Error eliminarAuto: ', error);
                    return error;
                } finally {
                    await mongoClient.close();
                }
            
            }
            
            
            const aceptarViajes = async (viajes) => {
                //recorrer el array de viajes y hacer append a viajesComprados y eliminar de viajesNoAprobados
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                console.log('Viajes DB --> ', viajes);
                try{
            
                    //recorrer el array de viajes y hacer append a viajesComprados y eliminar de viajesNoAprobados
                    for(let i=0;i<viajes?.length || 0;i++){
                        let username = viajes[i].usuario;
                        let viaje = viajes[i];
            
                        
            
            
                        await mongoClient.connect();
                        const dbmongo = mongoClient.db('Usuarios');
                        const coleccion = dbmongo.collection('Usuarios');
                        const result = await coleccion.updateOne(
                            { usuario: username }, // filtro para buscar al usuario
                            { $push: { viajesComprados: viaje } } // operador para hacer append al array 'viajesComprados'
                        );
            
                        const result2 = await coleccion.updateOne(
                            { usuario: username }, // filtro para buscar al usuario
                            { $pull: { viajesNoAprobados: { ciudadOrigen: viaje.ciudadOrigen, ciudadDestino: viaje.ciudadDestino } } } // operador para eliminar un elemento del array 'viajesNoAprobados'
                        );
                        
            
            
            
                    }
                    
                    return {
                        status: true,
                        message: 'Viajes aceptados correctamente'
                    }
            
                }catch(error){
                    console.error('Error aceptarViajes: ', error);
                    return error;
                }
            
            
            }
            
            
            const aceptarAutos = async (autos) => {
                //recorrer el array de autos y hacer append a autosComprados y eliminar de autosNoAprobados
                console.log('uri', uri);
                const mongoClient = new MongoClient(uri);
                console.log('Autos DB --> ', autos);
                try{
            
                    //recorrer el array de autos y hacer append a autosComprados y eliminar de autosNoAprobados
                    for(let i=0;i<autos?.length || 0;i++){
                        let username = autos[i].usuario;
                        let auto = autos[i];
            
            
                        await mongoClient.connect();
                        const dbmongo = mongoClient.db('Usuarios');
                        const coleccion = dbmongo.collection('Usuarios');
                        const result = await coleccion.updateOne(
                            { usuario: username }, // filtro para buscar al usuario
                            { $push: { autosComprados: auto } } // operador para hacer append al array 'autosComprados'
                        );
            
                        const result2 = await coleccion.updateOne(
                            { usuario: username }, // filtro para buscar al usuario
                            { $pull: { autosNoAprobados: { marca: auto.marca, modelo: auto.modelo } } } // operador para eliminar un elemento del array 'autosNoAprobados'
                        );
            
                    }
            
                    return {
                        status: true,
                        message: 'Autos aceptados correctamente'
                    }
            
                }
                catch(error){
                    console.error('Error aceptarAutos: ', error);
                    return error;
                }
            }
            
            module.exports = {
                insertData,
                getData,
                appendToViajes,
                appendToAutosAlquilados,
                eliminarUsuario,
                getUsuarios,
                insertViajes,
                insertAutos,
                getViajes,
                aceptarViajes,
                getAutos,
                appendToAutos,
                aceptarAutos
            };
     
</details>   

### BUcket S3
Este servicio de amazon se utiliza para el almacenamiento de las fotos de cada usuario. Y el enlace que genera este mismo se almacena en el atributo *foto* de la base de datos.

<details>
        <summary>Configuracion de bucket</summary>

            const aws = require('aws-sdk');
            require('dotenv').config();
            
            const {
                BUCKET_USER_ID,
                BUCKET_USER_SECRET,
                BUCKET_NAME,
                BUCKET_REGION
            } = process.env;
            
            const uploadFile = async (req, res) => {
                const { path, imagen} = req.body;
                // 062620241234012340.jpg
                const buffer = new Buffer.from(path, 'base64');
                aws.config.update({
                    accessKeyId: BUCKET_USER_ID,
                    secretAccessKey: BUCKET_USER_SECRET,
                    region: BUCKET_REGION
                });
            
                const s3 = new aws.S3();
            
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: imagen,
                    Body: buffer,
                    ACL: 'public-read'
                };
            
                s3.putObject(params, (err, data) => {
                    if(err) {
                        console.error(err);
                        return res.status(500
                        ).send('Error al subir la imagen');
                    }
                    console.log(data);
                    return res.status(200).send('Imagen subida correctamente');
                });
            };
            
            const uploadFile2 = async (path, imagen) => {
                // 062620241234012340.jpg
                const buffer = new Buffer.from(imagen, 'base64');
                console.log('Bucket: ', BUCKET_USER_ID)
                const s3 = new aws.S3({
                    accessKeyId: BUCKET_USER_ID,
                    secretAccessKey: BUCKET_USER_SECRET,
                    ContentType: 'image/jpeg/png',
                    ACL: 'public-read',
                });
            
                const params = {
                    Bucket: BUCKET_NAME,
                    Key: path,
                    Body: buffer,
                };
            
                await s3.upload(params, function sync(err, data) {
                    if (err) {
                        console.log("Error", err);
                    } else {
                          
                        return data.Location;
                    }});  
            };
            
            
            module.exports = {
                uploadFile,
                uploadFile2
            };
         
</details>   

