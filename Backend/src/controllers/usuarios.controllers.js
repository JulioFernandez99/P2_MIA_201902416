
const registroUser = async (req, res) => {
    
    const { nombre, apellido, email, password } = req.body;
    // un res.json de los datos que se reciben
    res.json({
        status: true,
        message: 'Usuario creado',
        data: {
            nombre: nombre,
            apellido: apellido,
            email: email,
            password: password
        }
    });
};

module.exports = {
    registroUser
};