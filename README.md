# MIA | Proyecto 2 
## AVICAR

# 📋 Indice

- [Indice](#Indice)
- [Información](#Información)
- [Manual de usuario](#Manual-de-usuario)
    - [Archivos](#Archivos)
    - [Editar](#Editar)
    - [Consolas](#Consolas)
    - [Ejecutar](#Ejecutar)
- [Manual técnico](#Manual-técnico)
    - [Gramatica](#Gramatica)
    - [Herramientas utilizadas](#Herramientas-utilizadas)

# Información
“AviCar” es el sistema que se desarrollará para el gestionamiento de viajes de todo turista
alrededor del mundo; con el fin de garantizar una completa y agradable experiencia en época
de post pandemia. La finalidad es centralizar los datos y que el cliente haga la menor
cantidad de validaciones al momento de planificar su viaje.


# Manual de usuario
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




## Archivos
Se cuenta con la opción de cargar archivos y guardar el archivo.

<div align="center">
    <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/COMPI2-P1/blob/main/Files/Archivo.png" style="width:10rem"></a>
</div>

## Editar
Es la opción habilita la opción de escribir y/o modificar el texto en el área de código para su análisis.

<div align="center">
    <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/COMPI2-P1/blob/main/Files/Editor.png" style="width:25rem"></a>
</div>

## Consolas
Se puede ver tanto la salida del código en consola,el listado de los errores y la tabla de simbolos.
<div align="center">
    <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/COMPI2-P1/blob/main/Files/Consola.png" style="width:30rem"></a>
</div>
<div align="center">
    <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/COMPI2-P1/blob/main/Files/Errores.png" style="width:30rem"></a>
</div>
<div align="center">
    <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/COMPI2-P1/blob/main/Files/TablaSimbolos.png" style="width:30rem"></a>
</div>



## Ejecutar
Ejecuta el código escrito en el área de código.
<div align="center">
    <a href="" target="_blank"><img src="https://github.com/JulioFernandez99/COMPI2-P1/blob/main/Files/Consola.png" style="width:30rem"></a>
</div>

# Manual técnico

Para la realización de este proyecto se utilizó el lenguaje de programación Python, el cual nos permite realizar el análisis léxico, sintáctico y semántico del lenguaje OLCScript. Para la realización de la interfaz gráfica se utilizó TKinter.

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
