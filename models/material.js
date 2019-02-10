const mongoose = require('mongoose')

let Schema = mongoose.Schema

let materialSchema = new Schema({//crear nuevo esquema para mongoDB
    nombre_material:{
        type:String,
        required: [true,'El nombre es necesario']
    }
})

module.exports = mongoose.model('Material',materialSchema)