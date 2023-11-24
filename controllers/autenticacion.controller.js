import{pool}from"../database/conexion.js";
import  Jwt  from "jsonwebtoken";


export const ValidarUsuario = async  (req,res)=>{
    try { 
        let{correo,password}=req.body; 
        console.log(correo)
        console.log(password)
        let sql=`select idusuario,nombres,rol from usuarios where correo='${correo}' and password='${password}' `;
        const[Rows]=await pool.query(sql);
        if(Rows.length>0){
            let token=Jwt.sign({User:Rows}, process.env.AUT_SECRET ,{expiresIn:process.env.AUT_EXPIRE})
            return res.status(200).json({"status":200,data:Rows,"token":token, message:"Usuario Autorizado"})
        }else{
            return res.status(401).json({
                                "status":401,
                                "message":" usuario no encontrado"
                                });
        }   
    } catch (error) {
        res.status(500).json({message:`error en el sistema ${error}`})
    } 
    

}

export const validadToken=async(req,res,next)=>{
    let token_usuario=req.headers['token'];
    if (!token_usuario) {
        return res.status(401).json({message:"Se requiere el token"})
    }else{
        const decoded=Jwt.verify(token_usuario,process.env.AUT_SECRET,(error,decoded)=>{
            if (error) {
                return res.status(401).json({message:"Token invalido",autorizado:false})
            }else{
                /* return res.status(200).json({message:"Token Autorizado",autorizado:true}) */
                next();
            }
        })
    }
}