
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
    const match = await bcrypt.compare(password, result.password);
    if (!match) {
        return res.json({
            status: false,
            error: "La contraseña es incorrecta"
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