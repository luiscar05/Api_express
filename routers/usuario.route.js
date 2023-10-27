import {Router} from 'express';
import { listarUsuario,buscarUsuario,guardarUsuario, eliminarUsuario,actualizarUsuario} from '../controllers/usuario.controller.js';
import { validadToken } from '../controllers/autenticacion.controller.js';
import{ValidatorUser}from "../validator/user.validator.js"

const usuarioRoute=Router();
usuarioRoute.get('/listar',listarUsuario);
usuarioRoute.post('/buscar/:id',buscarUsuario);
usuarioRoute.post('/registrar',ValidatorUser,guardarUsuario);


usuarioRoute.delete('/eliminar/:id',validadToken,eliminarUsuario);
usuarioRoute.put('/actualizar/:id',validadToken,actualizarUsuario);

export default  usuarioRoute;