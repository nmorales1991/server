const mongoose = require('mongoose')

let Schema = mongoose.Schema

let stockSchema = new Schema({//crear nuevo esquema para mongoDB
    cantidad:{
        type:Number,
        required: true
    },
    idproducto_historial:{//este nombre se usará en el routes para el populate
        type:Schema.Types.ObjectId,
        ref:'Producto',//nombre de la colección con la cual se hará el populate
        required: true
    },
    tipo_movimiento:{//este nombre se usará en el routes para el populate
        type:Schema.Types.ObjectId,
        ref:'TipoStock',//nombre de la colección con la cual se hará el populate
        required: true
    },
    fechareg_historial:{
        type:Date,
        default:Date.now
    }
})

module.exports = mongoose.model('Stock',stockSchema)