const mongoose = require('mongoose')

let Schema = mongoose.Schema

let tipopilasSchema = new Schema({//crear nuevo esquema para mongoDB
    tipo_pila:{
        type:String,
        required: [true,'El tipo es necesario']
    }
})

module.exports = mongoose.model('Pilas',tipopilasSchema)