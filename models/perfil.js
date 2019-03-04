const mongoose = require('mongoose')

let Schema = mongoose.Schema

let perfilSchema = new Schema({
    nombre_perfil:{
        type:String,
        required: [true,'El nombre es necesario']
    }
})

module.exports = mongoose.model('Perfil',perfilSchema)