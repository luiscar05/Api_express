import{pool}from"../database/conexion.js";
import multer from "multer";
const storage=multer.diskStorage(
    {
        destination:function(req,img,cb){
            cb(null,'public/img');
        },
        filename:function(req,img,cb){
            cb(null,img.originalname);
        }
    }
);
const upload=multer({storage:storage});
export const cargarImagen=upload.single('img');

export const listarJuego=async(req,res)=>{

    try{
        const[result]=await pool.query ('select * from juegos');
        res.status(200).json(result);

    }catch(err){
        res.status(500).json({ Massage:'error en listarJuego:'+err});
    }
}
export const buscarJuego=async(req,res)=>{

    try{
        let id=req.params.id;
        const[result]=await pool.query('select * from  juegos where idjuego= '+id);
        res.status(200).json(result);

    }catch(err){
        res.status(500).json({ Massage:'error en buscarJuego:'+err});
    }
}

export const guardarJuego = async(req,res)=>{
    try {
        let {nombre,descripcion,precio}=req.body;
        let imagen=req.file.originalname;
        let sql=`insert into juegos(nombre,descripcion,imagen,precio)
                 values('${nombre}','${descripcion}','${imagen}','${precio}')`;
        const[rows]=await pool.query(sql);
    
    
    if(rows.affectedRows>0){
        res.status(200).json({
                              "status":200,
                              "message":"Se registro con exito el juego"
                             });
    }else{
        res.status(401).json({
                              "status":401,
                              "message":" No se registro el juego"
                            });
    }   
    } catch (error) {
        res.status(500).json({
                                "status":500,
                                  "message":"Error en la ejecución : "+error
          });
    }
   
}
export const eliminarJuego =async(req,res)=>{
    try {
        let id=req.params.id;
    let sql=`delete from juegos where idjuego=${id}`;
    const[rows] = await pool.query(sql);
    if(rows.affectedRows>0){
        res.status(200).json({"status": 200,"message":"Se elimino el juego con exito!!"});
    }else{
        res.status(401).json({"status": 401,"message":"No se elimino el juego!!"});
    } 
    } catch (error) {
        res.status(500).json({"status":500,"message":"Error en el servidor "+error})
    }
   
}
export const actualizarJuego=async(req,res)=>{
    try {
        let id=req.params.id;
        let {nombre,descripcion,precio}=req.body;
        let sql = `UPDATE juegos SET nombre='${nombre}', descripcion='${descripcion}', precio='${precio}' WHERE idjuego=${id}`;

        const[rows]=await pool.query(sql);

        if(rows.affectedRows>0){
            res.status(200).json({
                                "status":200,
                                "message":"Se actualizo con exito el Juego"
                                });
        }else{
            res.status(401).json({
                                "status":401,
                                "message":" No se actualizo el Juego"
                                });
        }   
    } catch (error) {
        res.status(500).json({
                                "status":500,
                                  "message":"Error en la ejecución : "+error
          });
    }
}