const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let productoSchema = new Schema({
    stock: { type: Number, default: 0, required: true },
    nombre: { type: String, required: [true, "El nombre es requerido"] },
    nombre_corto: { type: String },
    modelo: { type: String },
    descripcion: { type: String },
    color: { type: String },
    a_pilas: { type: Boolean },
    incluye_pilas: { type: Boolean },
    cantidad_pilas: { type: Number },
    edad: { type: Number },
    material: { type: Schema.Types.ObjectId, ref: "Material" },
    genero: { type: Schema.Types.ObjectId, ref: "Generos" },
    tipo_pila: { type: Schema.Types.ObjectId, ref: "Pilas" },
    categoria: { type: Schema.Types.ObjectId, ref: "Categorias" },
    subcategoria: { type: Schema.Types.ObjectId, ref: "Subcategorias" },
    usuarioreg: { type: Schema.Types.ObjectId, ref: "Usuarios" },
    precio: { type: Number, default: 0, required: true },
    precio_descuento: { type: Number, default: 0 },
    porcentaje_descuento: { type: Number, default: 0 },
    desde_descuento: { type: Date },
    hasta_descuento: { type: Date },
    codbarra: {type: String,required: [true, "El código es necesario"],unique: true},
    sku: { type: String },
    marca: { type: Schema.Types.ObjectId, ref: "Marcas" },
    alto: { type: String },
    ancho: { type: String },
    largo: { type: String },
    peso: { type: String },
    precio_compra: { type: Number, default: 0 },
    youtube: { type: String },
    estado_producto: { type: Boolean, default: true },
    hecho_en: { type: String }
});

productoSchema.plugin(uniqueValidator, { message: "{PATH} debe de ser único" });
module.exports = mongoose.model("Producto", productoSchema);
