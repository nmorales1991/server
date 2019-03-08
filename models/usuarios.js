const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

let Schema = mongoose.Schema


let usuarioSchema = new Schema({
    nombre_usuario:{
        type:String,
        required: [true,'El nombre es necesario']
    },
    apaterno_usuario:{
        type:String,
        required: [true, 'El apellido paterno es necesario']
    },
    amaterno_usuario:{
        type:String,
        required:[true, 'El apellido materno es necesario']
    },
    email_usuario:{
        type:String,
        required: [true,'El correo es necesario']
    },
    rut_usuario:{
        type:String,
        required:[true,'El rut es necesario'],
        unique:true
    },
    clave_usuario:{
        type:String,
        required:[true,'La clave es necesaria']
    },
    perfil_usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Perfil',//nombre de la colección con la cual se hará el populate
        required: [true, 'El perfil es necesario']
    }
})

usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.clave_usuario;

    return userObject
}

usuarioSchema.plugin(uniqueValidator, {message:'{PATH} debe de ser único'})
module.exports = mongoose.model('Usuarios',usuarioSchema)