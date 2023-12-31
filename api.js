import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors"
import usuarioRoute from './routers/usuario.route.js';
import juegoRoute from './routers/juego.route.js';
import AlquilerRouter from './routers/alquiler.route.js';
import ourRoute from './routers/autenticacion.route.js';
import indexRouter from './routers/index.router.js';
const app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(cors())

app.set('view engine','ejs');
app.set('views', './views');

app.use(express.static('./public'));

app.use('/usuarios',usuarioRoute);
app.use('/juego',juegoRoute);
app.use('/alquiler',AlquilerRouter);
app.use('/autenticacion',ourRoute);
app.use(indexRouter)

let port=3000
app.listen(port,()=>{
  console.log("Servidor ejecutando en el puerto "+port);
});
