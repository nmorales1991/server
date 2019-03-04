const mongoose = require('mongoose')

let Schema = mongoose.Schema

let formapagoSchema = new Schema({
    nombre_formapago:{
        type:String,
        required: [true,'El nombre es necesario']
    }
})

module.exports = mongoose.model('FormaPago',formapagoSchema)