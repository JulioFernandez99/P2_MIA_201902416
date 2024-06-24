
const registro = async (req, res) => {
    
    const { nombre, usuario ,foto,email ,password, conf_password } = req.body;
    // un res.json de los datos que se reciben
    if (password !== conf_password) {
        return res.json({
            status: false,
            message: 'Las contraseñas no coinciden',
            data: {
                nombre: nombre,
                usuario: usuario,
                foto: foto,
                email: email,
                password: password,
                conf_password: conf_password
            }
        });
    };

    res.json({
        status: true,
        message: 'Usuario registrado correctamente',
        data: {
            nombre: nombre,
            usuario: usuario,
            foto: foto,
            email: email,
            password: password,
            conf_password: conf_password
        }
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

module.exports = {
    registro,
    registroViaje
};