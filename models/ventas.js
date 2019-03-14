const mongoose = require('mongoose')

let Schema = mongoose.Schema


let ventasSchema = new Schema({
    total_venta:{
        type:Number,
        required: [true,'El total es necesario']
    },
    vuelto_venta:{
        type:Number,
        default:0
    },
    paga_con:{
        type:Number,
        default:0
    },
    fecha_cierre:{
        type:Date,
        required:true
    },
    forma_pago:{
        type: Schema.Types.ObjectId,
        ref: 'FormaPago',
        required: [true, 'La forma de pago es necesaria']
    },
    usuarioreg_venta:{
        type: Schema.Types.ObjectId,
        ref: 'Usuarios',
        required: true
    },
    fechareg_venta:{
        type:Date,
        default: Date.now
    }
})


module.exports = mongoose.model('Ventas',ventasSchema)