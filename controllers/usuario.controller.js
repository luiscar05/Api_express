import{pool}from"../database/conexion.js"
import { validationResult } from "express-validator";
export const listarUsuario=async(req,res)=>{

    try{
        const[result]=await pool.query('select * from usuarios');
        res.status(200).json(result);

    }catch(err){
        res.status(500).json({ Massage:'error en listarUsuario:'+err});
    }
}
export const buscarUsuario=async(req,res)=>{

    try{
        let id=req.params.id;
        const[result]=await pool.query('select * from  usuarios where idusuario= '+id);
        res.status(200).json(result);

    }catch(err){
        res.status(500).json({ Massage:'error en buscarUsuario:'+err});
    }
}

export const guardarUsuario = async(req,res)=>{
    try {
        let error = validationResult(req)
        if (!error.isEmpty()) {
           return res.status(401).json(error)
        }
        let {nombres,direccion,telefono,correo,rol,password}=req.body;
        let sql=`insert into usuarios(nombres,direccion,telefono,correo,rol,password)
                 values('${nombres}','${direccion}','${telefono}','${correo}','${rol}','${password}')`;
        const[rows]=await pool.query(sql);
    
    
    if(rows.affectedRows>0){
        res.status(200).json({
                              "status":200,
                              "message":"Se registro con exito el usuario"
                             });
    }else{
        res.status(401).json({
                              "status":401,
                              "message":" No se registro el usuario"
                            });
    }   
    } catch (error) {
        res.status(500).json({
                                "status":500,
                                  "message":"Error en la ejecución : "+error
          });
    }
   
}
export const eliminarUsuario =async(req,res)=>{
    try {
        let id=req.params.id;
    let sql=`delete from usuarios where idusuario=${id}`;
    const[rows] = await pool.query(sql);
    if(rows.affectedRows>0){
        res.status(200).json({"status": 200,"message":"Se elimino el usuario con exito!!"});
    }else{
        res.status(401).json({"status": 401,"message":"No se elimino el usuario!!"});
    } 
    } catch (error) {
        res.status(500).json({"status":500,"message":"Error en el servidor "+error})
    }
   
}
export const actualizarUsuario=async(req,res)=>{
    try {
        let id=req.params.id;
        let {nombres,direccion,telefono,correo,rol}=req.body;
        let sql = `UPDATE usuarios SET nombres='${nombres}', direccion='${direccion}', telefono='${telefono}', correo='${correo}' WHERE idusuario=${id}`;

        const[rows]=await pool.query(sql);

        if(rows.affectedRows>0){
            res.status(200).json({
                                "status":200,
                                "message":"Se actualizo con exito el usuario"
                                });
        }else{
            res.status(401).json({
                                "status":401,
                                "message":" No se actualizo el usuario"
                                });
        }   
    } catch (error) {
        res.status(500).json({
                                "status":500,
                                  "message":"Error en la ejecución : "+error
          });
    }
}