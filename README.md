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

## Gramatica

Gramatica utilizada con atlr4 para la realización del analizador sintáctico.

<details>
<summary>Gramtica</summary>
    
    init            : instrucciones

    instrucciones    : instrucciones instruccion
    
    instrucciones    : instruccion 
    
    instruccion      : imprimir PUNTOCOMA
                            | declaracion PUNTOCOMA
                            | asignacion PUNTOCOMA
                            | if_instr 
                            | if_else_instr 
                            | if_elseif_instr 
                            | if_elseif_else_instr
                            | for_instr
                            | while_instr
                            | switch_instr
                            | llamada_funcion_nativa PUNTOCOMA
                            | funcion_instr  
                            | call_funcion_instr PUNTOCOMA
                            | interface_instr
                            | delaracion_struct
                            | return_instr
                            | break_instr                        
                                 
    tipodeclaracion : LET
                | VAR
                | CONST
    
    lista_corchetes : lista_corchetes CORCHETEI CORCHETED 
                    | CORCHETEI CORCHETED CORCHETEI CORCHETED'''
     
    tipovar : NUMBER
                | FLOAT
                | STRING
                | BOOLEAN
                | CHAR
                | NUMBER CORCHETEI CORCHETED
                | FLOAT CORCHETEI CORCHETED
                | STRING CORCHETEI CORCHETED
                | BOOLEAN CORCHETEI CORCHETED
                | CHAR CORCHETEI CORCHETED
    
                | NUMBER lista_corchetes
                | FLOAT lista_corchetes
                | STRING lista_corchetes
                | BOOLEAN lista_corchetes
                | CHAR lista_corchetes
    
    listaExpresiones :  listaExpresiones COMA expresion
                        | expresion
                        
    arraylist : CORCHETEI listaExpresiones CORCHETED
        
    arraylist : CORCHETEI CORCHETED
    
    expresion : arraylist
    
    declaracion : tipodeclaracion ID DOSPUNTOS tipovar IGUAL expresion
    
    declaracion : tipodeclaracion ID IGUAL expresion
    
    declaracion : tipodeclaracion ID DOSPUNTOS tipovar
        
    asignacion : ID IGUAL expresion
    
    asignacion : ID CORCHETEI expresion CORCHETED IGUAL expresion
    
    asignacion : ID pos_matriz IGUAL expresion
    
    asignacion : ID AUMENTO expresion 
                      | ID DECREMENTO expresion  
    
    listaIf :  listaIf elseIF
                        | elseIF
     
    elseIF : ELSE if_instr
        
    if_instr           : IF PARENI expresion PAREND LLAVEI instrucciones LLAVED
    
    if_else_instr      : IF PARENI expresion PAREND LLAVEI instrucciones LLAVED ELSE LLAVEI instrucciones LLAVED
     
    if_elseif_instr   : IF PARENI expresion PAREND LLAVEI instrucciones LLAVED listaIf
     
    if_elseif_else_instr   : IF PARENI expresion PAREND LLAVEI instrucciones LLAVED listaIf ELSE LLAVEI instrucciones LLAVED
    
    actualizacion        : ID INCREMENTOFOR
    
    actualizacion        : ID DECREMENTOFOR     
    
    for_instr        : FOR PARENI declaracion PUNTOCOMA expresion PUNTOCOMA actualizacion PAREND LLAVEI instrucciones LLAVED
    
    for_instr        : FOR PARENI tipodeclaracion ID OF ID PAREND LLAVEI instrucciones LLAVED
    
    while_instr        : WHILE PARENI expresion PAREND LLAVEI instrucciones LLAVED
    
    listaCases : listaCases case
                        | case
    
    case : CASE expresion DOSPUNTOS instrucciones
        
    case : DEFAULT DOSPUNTOS instrucciones
    
    switch_instr        : SWITCH PARENI expresion PAREND LLAVEI listaCases LLAVED
    
    nativa_sin_parametros :     POP PARENI PAREND
                                      | JOIN PARENI PAREND
                                      | TSTRING PARENI PAREND
                                      | LC PARENI PAREND
                                      | UC PARENI PAREND
                                      | LENGTH
                                      
    llamada_funcion_nativa :    PUSH
                              | INDEXOF
    
    llamada_funcion_nativa :    expresion PUNTO nativa_sin_parametros
    
    llamada_funcion_nativa :    expresion PUNTO llamada_funcion_nativa PARENI listaExpresiones PAREND
    
    llamada_funcion_nativa :    TYPEOF expresion
    
    expresion : llamada_funcion_nativa
    
    expresion : TOINT PARENI expresion PAREND
    
    expresion : TOFLOAT PARENI expresion PAREND
        
    parametros_funcion : parametros_funcion COMA parametro_funcion
                        | parametro_funcion
    
    parametro_funcion : ID DOSPUNTOS tipovar
    
    parametro_funcion : ID DOSPUNTOS tipovar CORCHETEI  CORCHETED
    
    call_funcion_instr      : ID PARENI PAREND
        
    call_funcion_instr      : ID PARENI listaExpresiones PAREND
    
    funcion_instr      : FUNCTION ID PARENI parametros_funcion  PAREND LLAVEI instrucciones LLAVED
    
    
    funcion_instr      : FUNCTION ID PARENI PAREND LLAVEI instrucciones LLAVED
    
    interface_instr : INTERFACE ID LLAVEI interface_params PUNTOCOMA LLAVED
    
    interface_params : interface_params PUNTOCOMA ID DOSPUNTOS tipovar
                            | ID DOSPUNTOS tipovar
    
    delaracion_struct : expresion PUNTO expresion IGUAL expresion PUNTOCOMA
        
    expresion : expresion PUNTO expresion
        
    return_instr     : RETURN expresion PUNTOCOMA
                            | RETURN PUNTOCOMA
    
    break_instr     : BREAK PUNTOCOMA
    
    expresion : call_funcion_instr
    
    expresion : expresion MAS expresion
                      | expresion MENOS expresion
                      | expresion POR expresion
                      | expresion DIVIDIDO expresion
                      | expresion MOD expresion
        
    expresion : expresion MENORQ expresion
                      | expresion MAYORQ expresion
                      | expresion MAYORIGUALQ expresion
                      | expresion MENORIGUALQ expresion
                      | expresion IGUALIGUAL expresion
                      | expresion DIFERENTE expresion            
    
    expresion : expresion AND expresion
                      | expresion OR expresion
                      | NOT expresion
    
    expresion : PARENI expresion PAREND
    
    expresion    : ENTERO
        
    expresion    : DECIMAL
        
    expresion : FALSE
    
    expresion : TRUE
    
    expresion    : CADENA
    
    expresion    : CARACTER
    
    expresion    : ID
    
    expresion    : VACIO
    
    pos_matriz : pos_matriz CORCHETEI expresion CORCHETED
                        | CORCHETEI expresion CORCHETED CORCHETEI expresion CORCHETED
    
    expresion : ID pos_matriz
    
    expresion : ID CORCHETEI expresion CORCHETED
    
    expresion : MENOS expresion %prec UMENOS'
        t[0] = ExpresionNegativo(t[2])
        


</details>

## Herramientas utilizadas

- Python
- TKinter
- PLY
