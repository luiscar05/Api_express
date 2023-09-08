import { Router } from "express";
import{ValidarUsuario}from "../controllers/autenticacion.controller.js";

const ourRoute=Router();
ourRoute.post("/Validar",ValidarUsuario);

export default ourRoute
