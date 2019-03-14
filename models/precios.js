const mongoose = require('mongoose')

let Schema = mongoose.Schema

let preciosSchema = new Schema({//crear nuevo esquema para mongoDB
    precio_historial:{
        type:Number,
        required: [true,'El precio es necesario']
    },
    porcentaje_descuentohistorial:{
        type:Number,
    },
    desde_descuentohistorial:{
        type:Date,
    },
    hasta_descuentohistorial:{
        type:Date,
    },
    idproducto_historial:{//este nombre se usará en el routes para el populate
        type:Schema.Types.ObjectId,
        ref:'Producto',//nombre de la colección con la cual se hará el populate
        required: [true, 'El producto es necesario']
    },
    idtipoprecio_historial:{//este nombre se usará en el routes para el populate
        type:Schema.Types.ObjectId,
        ref:'TipoPrecios',//nombre de la colección con la cual se hará el populate
        required: [true, 'El tipo es necesario']
    }
})

module.exports = mongoose.model('Precios',preciosSchema)