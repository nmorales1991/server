const mongoose = require('mongoose')

let Schema = mongoose.Schema

let marcasSchema = new Schema({//crear nuevo esquema para mongoDB
    nombre_marca:{
        type:String,
        required: [true,'El nombre es necesario']
    }
})

module.exports = mongoose.model('Marcas',marcasSchema)