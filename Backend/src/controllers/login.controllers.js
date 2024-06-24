
const {getData} = require('../config/db.mongo');

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
            error:"El usuario no existe"
        });
    }

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