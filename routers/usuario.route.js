import {Router} from 'express';
import { listarUsuario,buscarUsuario,guardarUsuario, eliminarUsuario,actualizarUsuario} from '../controllers/usuario.controller.js';
import { validadToken } from '../controllers/autenticacion.controller.js';

const usuarioRoute=Router();
usuarioRoute.get('/listar',validadToken,listarUsuario);
usuarioRoute.post('/buscarUsuario/:id',buscarUsuario);
usuarioRoute.post('/registrar',guardarUsuario);
usuarioRoute.delete('/eliminar/:id',eliminarUsuario);
usuarioRoute.put('/actualizar/:id',actualizarUsuario);

export default  usuarioRoute;