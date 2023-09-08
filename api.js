import express from 'express';
import bodyParser from 'body-parser';
import usuarioRoute from './routers/usuario.route.js';
import juegoRoute from './routers/juego.route.js';
import AlquilerRouter from './routers/alquiler.route.js';
import ourRoute from './routers/autenticacion.route.js';
const app =express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.set('view engine','ejs');
app.set('views', './views');

app.use(express.static('./public'));


app.get('/documents',(req,res)=>{
  res.render('index.ejs');
});

app.use('/usuarios',usuarioRoute);
app.use('/juego',juegoRoute);
app.use('/Aquiler',AlquilerRouter);
app.use("/Aut",ourRoute);

app.listen(3000,()=>{
  console.log("Servidor ejecutando en el puerto 3000");
});
