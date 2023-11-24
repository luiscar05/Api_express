import { Router } from "express";
import  * as Index  from "../controllers/index.controller.js";
import { validadToken } from "../controllers/autenticacion.controller.js";

const indexRouter = Router()

indexRouter.get("/",Index.RenderLogin);
indexRouter.get("/home",validadToken,Index.abrirhome)

export default indexRouter