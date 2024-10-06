const {Schema, model} = require('mongoose');

const apartmentSchema = new Schema({
    title: {
        type: String,
        maxLength: 50,  
        require: true
    }, 
    description:{
        type: String, 
        maxLength: 500, 
        require:true
    },
    price: {
        type: Number, 
        require: true,
        min:0
    }, 
    size:{
        type: Number, 
        require: true, 
        min:1
    }, 
    rooms:{
        type: Number, 
        require: true, 
        min:1
    },
    beds:{
        type: Number, 
        require: true, 
        min:1
    }, 
    bathrooms:{
        type: Number, 
        require: true, 
        min:1
    },
    maxPeople:{
        type: Number,
        require: true,
        min:1

    },
    mainPhoto:{
        type: String, 
        require: true, 
        match: [/^https?:\/\/[\w\-\.]+(\.[a-z]{2,})+([\/\w\-.]+)?(\?[;&a-z\d%_.~+=-]*)?$/i, "URL not valid"]//Mirar string de validacion para urls
    }, 
    optionalPhotos:{
        type: [String], 
        validate: {
            validator: function(array) {
              // Validar que el array no tenga más de 3 elementos
              return array.length <= 3;
            },
            message: 'El máximo de fotos opcionales es 3.'
          }
    },
    rules:{
        type:String, 
        maxLength:500,
        require:true 
    },
    address:{
        street: {
            type: String, 
            require: true 
        }, 
        province: {
            id:{
                type: Number, 
                require: true
            }, 
            name:{
                type: String, 
                require: true
            } 
        }, 
        city:{
            id:{
                type: Number, 
                require: true
            }, 
            name:{
                type: String, 
                require: true
            } 
        }, 
        postalCode:{
            type: String, 
            require:true, 
            match: [/^\d{5}$/, 'El código postal debe contener 5 dígitos']
        }, 
        gps:{
            latitude:{
                type: Number, 
                require: true, 
                match: [/^(\+|-)?(?:90(?:\.0+)?|[1-8]?\d(?:\.\d+)?)$/, 'Latitud inválida. Debe estar entre -90 y 90']
            }, 
            longitude:{
                type: Number, 
                require: true, 
                match: [/^(\+|-)?(?:180(?:\.0+)?|1[0-7]\d(?:\.\d+)?|[1-9]?\d(?:\.\d+)?)$/, 'Longitud inválida. Debe estar entre -180 y 180']
            }
        }

    }, 
    services:{
        type: [String], 
        require: true
    }, 
    datesReserved:{
        type: [Date]
    }
})

const Apartment = model('apartment', apartmentSchema); //Creamos modelo (clase) (forma de comunicarnos con base de datos para hacer operaciones tipicas)

//Exponemos apartment
module.exports = Apartment;