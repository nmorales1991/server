const mongoose = require('mongoose')

let Schema = mongoose.Schema

let tipostockSchema = new Schema({
    nombre_tipostock:{
        type:String,
        required: true
    },
    id_tipostock:{
        type:Number,
        required:true,
        unique:true
    }
})

module.exports = mongoose.model('TipoStock',tipostockSchema)