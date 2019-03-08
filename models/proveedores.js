const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema

let proveedorSchema = new Schema({
    nombre_proveedor:{
        type:String,
        required:[true, 'El nombre es requerido']
    },
    rut_proveedor:{
        type:String,
        required:[true, 'El rut es requerido'],
        unique:true
    },
    giro_proveedor:{
        type:String,
        required:[true, 'El giro es requerido']
    },
    celular_proveedor:{
        type:String,
    },
    email_proveedor:{
        type:String,
    },
    direccion_proveedor:{
        type:String,
    },
    contacto_proveedor:{
        type:String,
    }

})

proveedorSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser único'})
module.exports = mongoose.model('Proveedor',proveedorSchema)