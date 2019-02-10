const mongoose = require('mongoose')

let Schema = mongoose.Schema

let categoriaSchema = new Schema({//crear nuevo esquema para mongoDB
    nombre_categoria:{
        type:String,
        required: [true,'El nombre es necesario']
    },
    descripcion_categoria:{
        type:String,
    }
})

module.exports = mongoose.model('Categorias',categoriaSchema)