const mongoose = require('mongoose')

let Schema = mongoose.Schema

let codigoSchema = new Schema({
    codigo:{
        type: String,
        required: true,
        unique: true
    },
    estado_codigo:{
        type: Number,
        default: 1
    }
})

module.exports = mongoose.model('Codigos',codigoSchema)