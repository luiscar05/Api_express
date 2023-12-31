import {Router} from "express";
import{listarJuego,buscarJuego,guardarJuego,eliminarJuego,actualizarJuego,cargarImagen} from '../controllers/juego.controller.js';
import { validadToken } from '../controllers/autenticacion.controller.js';

const juegoRoute=Router();
juegoRoute.get('/listar',listarJuego);
juegoRoute.get('/buscar/:id',buscarJuego);
juegoRoute.post('/registrar',cargarImagen,guardarJuego);
juegoRoute.delete('/eliminar/:id',eliminarJuego);
juegoRoute.put('/actualizar/:id',actualizarJuego);

export default juegoRoute;