import { Router } from "express";
import{RegistrarAlquiler,ListarAlquilados,ListarReservados,ListarDisponibles,ListarAlquiler,EntregarJuego}from'../controllers/alquiler.controller.js';


const AlquilerRouter=Router();
AlquilerRouter.post("/Registrar",RegistrarAlquiler);
AlquilerRouter.get("/alquileres/Prestamos",ListarAlquilados);
AlquilerRouter.get("/alquileres/Reservados",ListarReservados);
AlquilerRouter.get("/alquileres/Devueltos",ListarDisponibles);
AlquilerRouter.post("/Listar/:id",ListarAlquiler);
AlquilerRouter.put("/Entregar/:id",EntregarJuego);
export default AlquilerRouter;
