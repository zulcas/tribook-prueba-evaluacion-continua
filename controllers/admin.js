const Apartment = require("../models/aparments.model");
const Pselect = require('pselect.js');


//Function to display homepage
const getApartments = async(req, res)=>{
    try {
        // Get all apartment data from the database
        const apartmentsData = await Apartment.find({});
        // Render the page and pass the apartments data
        res.render('home.ejs', {
            apartmentsData : apartmentsData
        });
    } catch (error) {
        console.error("Error fetching apartments data:", error);
        res.status(500).send("Server Error");
    }
}

//Función para mostrar enpoint de añadir apartamento
const getNewApartmentForm = (req, res)=>{
    res.render('new-apartment.ejs');
}
//Función para enviar datos form newApartment a BD
const postNewApartment = async(req, res)=>{
    try {
        //Transform province and municipalities code to words 
        let province = Pselect.provincesData.find(element => element.id ==req.body.province);
        let municipality = Pselect.municipesData.find(element => element.id ==req.body.city);
        console.log('Esto es la provincia', province);
        console.log('Esto es la ciudad', municipality);

    
        await Apartment.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price, 
            size: req.body.meters,
            rooms: req.body.rooms, 
            beds: req.body.beds, 
            bathrooms: req.body.bathrooms,
            maxPeople: req.body.maxPeople, 
            mainPhoto: req.body.mainPhoto,
            optionalPhotos: req.body.optionalPhotos,
            rules: req.body.rules, 
            services: req.body.services, 
            address:{
                street: req.body.street, 
                province:{
                    id: province.id, 
                    name: province.nm
                }, 
                city: {
                    id: municipality.id, 
                    name: municipality.nm
                }, 
                postalCode: req.body.postalCode, 
                gps: {
                    latitude: req.body.latitude, 
                    longitude: req.body.longitude
                }
            }
        });
        res.send('Apartamaneto creado');
        
    } catch (error) {
        res.render('404.ejs')
        
    }
    
    
}
//Exponemos funciones admin.js
module.exports = {
    getNewApartmentForm, 
    postNewApartment, 
    getApartments
}