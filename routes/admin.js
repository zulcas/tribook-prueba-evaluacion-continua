//Rutas de usuario admin

const express = require('express');
const router = express.Router();

//Importar controladores de controllers/admin.js
const adminControllers = require('../controllers/admin.js');

//Endpoint admin mostrar la home
router.get('/', adminControllers.getApartments);

//Endpoint admin que permite mostrar un formulario para añadir un nuevo apartamento
router.get('/apartment/new-apartment', adminControllers.getNewApartmentForm); //aqui no le ponemos admin pq lo vamos a hacer en app.js 

//Enpoint admin que permite captar datos formulario para añadir un nuevo apartamento
router.post('/apartment/new-apartment', adminControllers.postNewApartment);

module.exports = router;
