const mongoose = require('mongoose')

let Schema = mongoose.Schema

let subcategoriaSchema = new Schema({//crear nuevo esquema para mongoDB
    nombre_subcategoria:{
        type:String,
        required: [true,'El nombre es necesario']
    },
    descripcion_subcategoria:{
        type:String,
    },
    id_categoria:{//este nombre se usará en el routes para el populate
        type:Schema.Types.ObjectId,
        ref:'Categorias',//nombre de la colección con la cual se hará el populate
        required: [true, 'La categoría es necesaria']
    }
})

module.exports = mongoose.model('Subcategorias',subcategoriaSchema)