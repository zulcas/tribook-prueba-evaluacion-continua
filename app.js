//Importar módulos terceros
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');//Gestión variables de entorno
dotenv.config();

//Importar rutas general users y admin users
const indexRoutes = require('./routes/index');
const adminRoutes = require('./routes/admin');

//Creamos instancia servidor express y definimos variable PORT
const app = express();
const PORT = process.env.PORT || 3000;


//middleware Express
app.use(express.urlencoded({ extended: true })); //Peticiones POST
app.use(express.static('public')); //Peticiones GET a los recursos de carpeta 'public'
app.use(morgan('tiny'));//Loguear peticiones cliente (morgan)

//Motor plantillas ejs
app.set('view engine', 'ejs');

//Añadimos rutas users y admin.
app.use('/', indexRoutes); //user rutas no tienen un prefijado en su url
app.use('/admin', adminRoutes); //admin users urls tienen que estar precedidas por /admin

//Connexión base de datos
async function connectDB(){
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Conectado a la base de datos")
}

connectDB().catch(err => console.log(err));

//Levantamos servidor
app.listen(process.env.PORT, (req, res) => {
    console.log("Servidor escuchando correctamente en el puerto " + PORT);
});