//Importamos variable Apartment
const Apartment = require("../models/aparments.model");

/**Crear un conjunto de funciones para dar respuesta a nuestras rutas */


//1) Mostramos la home
const getApartments = async(req, res) =>{
    try {
        const apartmentsData = await Apartment.find({});

        res.render('home.ejs', {
            apartmentsData,
        });     
    } catch (error) {
        res.render('404.ejs');
        
    }  
};

//2) Single apartment detail view

const getApartmentDetails = async(req, res)=>{
    try {
        const {id} = req.params;
        const apartmentData = await Apartment.findById(id); 
        console.log(apartmentData);
        res.render("apartment.ejs", {
            apartmentData,
        });
        
    } catch (error) {
        res.render('404.ejs');    
    }

}

//3) Filter apartments from Home view

const filterApartments = async(req,res)=>{
    try{
        //Parser query strings from the form
        const {destination, checkin, checkout, maxPrice, people} = req.query;
    

        //Get data from database depending on parameters (checkin and checkout fields are mandatory)
        const query = {};
        query.checkin = new Date(checkin);
        query.checkout = new Date(checkout);
        if(destination){
            query['address.city.name'] = destination;
        }
        if(maxPrice){
            query.price = {$lte: maxPrice}
        }
        if(people){
            query.people = {$lte: people}
        }
        //Database consult
        //const apartmentsData = await Apartment.find(query);
        console.log(query)

        //Show view with apartments filter
        // res.render('home.ejs', {
        //     apartments
        // });
        res.send('Todo ha ido bien')



    } catch(error){
        res.render('404.ejs')
    }
}

module.exports = {
    getApartments, 
    getApartmentDetails, 
    filterApartments
}