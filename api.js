import express from 'express';
import body_parser from 'body-parser';
import usuarioRoute from './routers/usuario.route.js';
import juegoRoute from './routers/juego.route.js';
import AlquilerRouter from './routers/alquiler.route.js';
const app =express();
/* app.use(express.json()); */
app.use(body_parser.json());
app.use(body_parser.urlencoded({extended:false}));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/usuarios',usuarioRoute);
app.use('/juego',juegoRoute);
app.use('/Aquiler',AlquilerRouter);
app.set('view engine','ejs');
app.set('views', './views');
app.use(express.static('./public'));


app.get('/documents',(req,res)=>{
  res.render('index.ejs');
});
app.listen(3000,()=>{
  console.log("Servidor ejecutando en el puerto 3000");
});
