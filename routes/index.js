//Rutas "publicas" app

const express = require("express");
const router = express.Router(); //Nuevo objeto enrutador (sirve para crear rutas escalable)

//importamos todos los controladores de controllers/index.js
const indexControllers = require('../controllers/index.js')


//Home view (apartments list)
router.get('/', indexControllers.getApartments);
//Home apartment search
router.get('/search', indexControllers.filterApartments);
//Apartments detail views
router.get('/apartment/:id', indexControllers.getApartmentDetails);


// Tenemos que exportar estas rutas para que sean usadas en app.js
module.exports = router;