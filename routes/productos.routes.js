const express = require("express");
const app = express();
const Producto = require("../models/productos");

//obtener todos los productos
app.get("/", async (req, res) => {
    await Producto.find()
        .populate("material", "nombre_material")
        .populate("genero", "nombre_genero")
        .populate("categoria", "nombre_categoria")
        .populate("subcategoria", "nombre_subcategoria")
        .populate("marca", "nombre_marca")
        .populate(
            "usuarioreg",
            "nombre_usuario apaterno_usuario amaterno_usuario"
        )
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                oki: true,
                producto
            });
        });
});

//agregar producto
app.post("/", async (req, res) => {
    let body = req.body;

    let nuevoProducto = new Producto({
        stock: body.stock,
        nombre: body.nombre,
        nombre_corto: body.nombre_corto,
        modelo: body.modelo,
        descripcion: body.descripcion,
        color: body.color,
        material: body.material,
        genero: body.genero,
        categoria: body.categoria,
        subcategoria: body.subcategoria,
        usuarioreg: body.usuarioreg,
        precio: body.precio,
        precio_descuento: body.precio_descuento,
        porcentaje_descuento: body.porcentaje_descuento,
        desde_descuento: body.desde_descuento,
        hasta_descuento: body.hasta_descuento,
        codbarra: body.codbarra,
        sku: body.sku,
        marca: body.marca,
        alto: body.alto,
        ancho: body.ancho,
        largo: body.largo,
        peso: body.peso,
        precio_compra: body.precio_compra,
        youtube: body.youtube
    });

    await nuevoProducto.save((err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            producto
        });
    });
});

//producto por código o id
app.get('/q', async (req,res)=>{
    let cod = req.query.cod
    let id = req.query.id
    if(cod){
        await Producto.findOne({codbarra:cod},(err,producto)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
    
            if(!producto){
                return res.json({
                    ok:false,
                    msg: 'Producto no existe'
                })
            }
    
            res.json({
                ok:true,
                producto
            })
        })
    }
    if(id){
        await Producto.findById(id,(err,producto)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
    
            if(!producto){
                return res.json({
                    ok:false,
                    msg: 'Producto no existe'
                })
            }
    
            res.json({
                ok:true,
                producto
            })
        })
    }
    
    
})




module.exports = app;
