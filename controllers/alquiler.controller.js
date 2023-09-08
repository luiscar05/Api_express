import{pool}from"../database/conexion.js";

export const RegistrarAlquiler = async(req,res)=>{
    try {
        let { cantidad, nombreUsuario, nombreJuego, estado } = req.body;

        // Asegúrate de que los nombres de las columnas en las tablas sean correctos


        let idUsuario = `select idusuario from usuarios where nombres='${nombreUsuario}'`;
        const[iduser]=await pool.query(idUsuario)
        let idJuego = `select idjuego from juegos where nombre='${nombreJuego}'`;
        const[idjuego]=await pool.query(idJuego)


        if (estado==1 || estado===2) {
            let sql = `INSERT INTO alquiler (fecha_alquiler, cantidad, usuario, juego, estado) VALUES 
           (NOW(), '${cantidad}', (${idUsuario}), (${idJuego}), '${estado}')`;
            const[rows]=await pool.query(sql); 
            
            if(rows.affectedRows>0){
                res.status(200).json({
                                    "status":200,
                                    "message":"Se registro con exito el Alquiler"
                                    });
            }else{
                res.status(401).json({
                                    "status":401,
                                    "message":" No se registro el alquiler"
                                    });
            }   
        }else{
            res.json({
                "messege":`${nombreUsuario} el videojuego no esta disponible por favor registre otro estasdo (2 o 3)`
            })
        }

        

    } catch (error) {
        res.status(500).json({
            "status":500,
            "message":"Error en la ejecución : "+error
        });
    }
}
export const ListarAlquilados= async(req,res)=>{
    try{
        const[result]=await pool.query (`SELECT fecha_alquiler,cantidad,nombres as usuario ,nombre as juego, estado FROM alquiler join usuarios on idusuario=usuario join juegos on idjuego=juego where estado='prestamo'`);
        if (Array.isArray(result) && result.length == 0) {
            res.json({"Message":"No Se Encontraron Resultados"})
        }else{
            res.status(200).json(result);
        }
    }catch(err){
        res.status(500).json({ Massage:'error en listarJuego:'+err});
    }
}
export const ListarReservados= async(req,res)=>{
    try{
        const[result]=await pool.query (`SELECT fecha_alquiler,cantidad,nombres as usuario ,nombre as juego, estado FROM alquiler join usuarios on idusuario=usuario join juegos on idjuego=juego where estado='reserva'`);
        if (Array.isArray(result) && result.length == 0) {
            res.json({"Message":"No Se Encontraron Resultados"})
        }else{
            res.status(200).json(result);
        }
    }catch(err){
        res.status(500).json({ Massage:'error en listarJuego:'+err});
    }
}
export const ListarDisponibles= async(req,res)=>{
    try{
        const[result]=await pool.query (`SELECT fecha_alquiler,cantidad,nombres as usuario ,nombre as juego, estado FROM alquiler join usuarios on idusuario=usuario join juegos on idjuego=juego where estado='devolucion'`);
        console.log (result)
        if (Array.isArray(result) && result.length == 0) {
            res.json({"Message":"No Se Encontraron Resultados"})
        }else{
            res.status(200).json(result);
        }
        
        

    }catch(err){
        res.status(500).json({ Massage:'error en listarJuego:'+err});
    }
}
export const ListarAlquiler= async(req,res)=>{
    try{
        let id=req.params.id;
        const[result]=await pool.query('SELECT fecha_alquiler,cantidad,nombres as usuario ,nombre as juego, estado FROM alquiler join usuarios on idusuario=usuario join juegos on idjuego=juego where idalquiler= '+id);
        res.status(200).json(result);

    }catch(err){
        res.status(500).json({ Massage:'error en buscarJuego:'+err});
    }
}

export const EntregarJuego=async(req,res)=>{
    try {
        let id=req.params.id;
        let sqllite=`select estado from alquiler where usuario='${id}'`
        const[noo]=await pool.query(sqllite); 
        console.log(noo)
        let estadoP=noo[0].estado=='prestamo';
        let estodoR=noo[0].estado=='reserva';
        if (estadoP) {
            let sql = `UPDATE alquiler SET estado =3, fecha_devolucion = NOW() WHERE usuario=${id}`;
            const[rows]=await pool.query(sql);

            if(rows.affectedRows>0){
                res.status(200).json({
                                    "status":200,
                                    "message":"El juego fue devuleto con exito"
                                    });
            }else{
                res.status(401).json({
                                    "status":401,
                                    "message":" No se puedo devolver el juego"
                                    });
            }   
        }

        if (estodoR) {
            let sql = `UPDATE alquiler SET estado =2, fecha_devolucion = 'NOW()' WHERE usuario=${id}`;
            const[rows]=await pool.query(sql);

            if(rows.affectedRows>0){
                res.status(200).json({
                                    "status":200,
                                    "message":"El juego fue devuleto con exito"
                                    });
            }else{
                res.status(401).json({
                                    "status":401,
                                    "message":" No se puedo devolver el juego"
                                    });
            }   
        }
      

        
    } catch (error) {
        res.status(500).json({
                                "status":500,
                                  "message":"Error en la ejecución : "+error
          });
    }
}
