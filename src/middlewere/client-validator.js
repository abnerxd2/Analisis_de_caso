import {validarCampos} from "../middlewere/validar-campos.js"
import {clientNameExists}from "../helpers/db-validator.js"
import { body, param } from "express-validator";


export const addClientes = [

    
    body("name").notEmpty().withMessage("El nombre De la empresa es requerido"),
    body("puntuacion").notEmpty().withMessage("La puntuacion de la empresa es nesesaria"),
    body("trajectory").notEmpty().withMessage("Los anios ed trayectoruia de la empresa son requeridos "),
    body("category").notEmpty().withMessage("La categoria de la empresa es necesaria "),
    body("name").custom(clientNameExists),
   
]
