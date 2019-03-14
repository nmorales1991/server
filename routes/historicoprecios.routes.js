const express = require("express");
const app = express();
const Precios = require("../models/precios");

app.get("/", async (req, res) => {
    await Precios.find()
    .populate("idproducto_historial", "nombre")
    .populate("idtipoprecio_historial", "nombre_tipoprecio")
    .exec((err, historicoprecios) => {
        if (err) {
            //error de servidor
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            historicoprecios
        });
    });
});

app.get("/:id", async (req, res) => {
    let id = req.params.id
    await Precios.find({idproducto_historial:id})
    .populate("idproducto_historial", "nombre")
    .populate("idtipoprecio_historial", "nombre_tipoprecio")
    .exec((err, historicoprecios) => {
        if (err) {
            //error de servidor
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!historicoprecios){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"No hay historial para este producto"
                }
            })
        }

        res.json({
            ok: true,
            historicoprecios
        });
    });
});

module.exports = app;
