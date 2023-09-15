import { Router } from "express";
import{RegistrarAlquiler,ListarAlquilados,ListarReservados,ListarDisponibles,ListarAlquiler,EntregarJuego}from'../controllers/alquiler.controller.js';
import { validadToken } from '../controllers/autenticacion.controller.js';

const AlquilerRouter=Router();
AlquilerRouter.post("/Registrar",validadToken,RegistrarAlquiler);
AlquilerRouter.get("/Prestamos",ListarAlquilados);
AlquilerRouter.get("/Reservados",ListarReservados);
AlquilerRouter.get("/Devueltos",ListarDisponibles);
AlquilerRouter.post("/Buscar/:id",ListarAlquiler);
AlquilerRouter.put("/Entregar/:id",validadToken,EntregarJuego);
export default AlquilerRouter;
