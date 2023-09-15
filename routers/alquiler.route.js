import { Router } from "express";
import{RegistrarAlquiler,ListarAlquilados,ListarReservados,ListarDisponibles,ListarAlquiler,EntregarJuego}from'../controllers/alquiler.controller.js';
import { validadToken } from '../controllers/autenticacion.controller.js';

const AlquilerRouter=Router();
AlquilerRouter.post("/Registrar",RegistrarAlquiler);
AlquilerRouter.get("/Prestamos",validadToken,ListarAlquilados);
AlquilerRouter.get("/Reservados",validadToken,ListarReservados);
AlquilerRouter.get("/Devueltos",validadToken,ListarDisponibles);
AlquilerRouter.post("/Buscar/:id",ListarAlquiler);
AlquilerRouter.put("/Entregar/:id",validadToken,EntregarJuego);
export default AlquilerRouter;
