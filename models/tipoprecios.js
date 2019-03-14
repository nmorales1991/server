const mongoose = require('mongoose')

let Schema = mongoose.Schema

let tipoprecioSchema = new Schema({
    nombre_tipoprecio:{
        type:String,
        required: true
    },
    id_tipoprecio:{
        type:Number,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model('TipoPrecios',tipoprecioSchema)