import{pool}from"../database/conexion.js";

export const RenderLogin = async(req,res)=>{
    try {
        return res.render('login.ejs')
    } catch (error) {
        return res.estatus(400).json({message: "error en el servidor"+ error})
    }
}
export const abrirhome = async(req,res)=>{
    try {
        return res.render('home.ejs')
    } catch (error) {
        return res.estatus(400).json({message: "error en el servidor"+ error})
    }
}