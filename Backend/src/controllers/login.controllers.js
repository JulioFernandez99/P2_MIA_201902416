
const login=async(req,res)=>{
    const {user,password}=req.body;
    if(user==""||password==""){
        return res.json({
            status:false,
            message:"Verifique los campos"
        });
    }else{
        res.json({
            status:true,
            message:"Bienvenido",
            data:{
                user:user,
                password:password
            }
        });
    }
};


module.exports={
    login
};