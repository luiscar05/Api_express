import {Router} from 'express';
import { listarUsuario,buscarUsuario,guardarUsuario, eliminarUsuario,actualizarUsuario} from '../controllers/usuario.controller.js';
import { validadToken } from '../controllers/autenticacion.controller.js';
import{ValidatorUser}from "../validator/user.validator.js"

const usuarioRoute=Router();
usuarioRoute.get('/listar',listarUsuario);
usuarioRoute.get('/buscar/:id',buscarUsuario);
usuarioRoute.post('/registrar',ValidatorUser,guardarUsuario);


usuarioRoute.delete('/eliminar/:id',eliminarUsuario);
usuarioRoute.put('/actualizar/:id',actualizarUsuario);

export default  usuarioRoute;