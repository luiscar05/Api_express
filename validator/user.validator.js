import { check } from 'express-validator';

export  const ValidatorUser=[
    check("correo","El correo es incorrecto !!").isEmail(),
    check("nombres","El nombre es requerido y tiene un Maximo de 50 caracteres").isLength({max:50}).notEmpty(),
    check("rol","Rol Incorrecto").isIn(['administrador','usuario'])
]