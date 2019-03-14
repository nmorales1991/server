const mongoose = require('mongoose')

let Schema = mongoose.Schema

let ventasDetalleSchema = new Schema({
    idventa_ventadetalle:{
        type:Schema.Types.ObjectId,
        ref:'Ventas',
        required: true
    },
    id_productodetalle:{
        type:Schema.Types.ObjectId,
        ref:'Producto',
        required: true
    },
    cantidad_producto:{
        type:Number,
        required: true
    },
    subtotal_producto:{
        type:Number,
        required: true
    },
    precio_normal:{
        type:Number,
        required: true
    },
    prefio_oferta:{
        type:Number,
        default:0
    },
    descuento_producto:{
        type:Number,
        default: 0
    },
    total_producto:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('VentasDetalle',ventasDetalleSchema)