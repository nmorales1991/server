const express = require("express");
const app = express();
const Stock = require("../models/stock");

app.get("/", async (req, res) => {
    await Stock.find()
    .populate("idproducto_historial", "nombre")
    .populate("tipo_movimiento", "nombre_tipostock")
    .exec((err, historicostock) => {
        if (err) {
            //error de servidor
            return res.status(500).json({
                ok: false,
                err
            });
        }

        res.json({
            ok: true,
            historicostock
        });
    });
});

app.get("/:id", async (req, res) => {
    let id = req.params.id
    await Stock.find({idproducto_historial:id})
    .populate("idproducto_historial", "nombre")
    .populate("tipo_movimiento", "nombre_tipostock")
    .exec((err, historicostock) => {
        if (err) {
            //error de servidor
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if(!historicostock){
            return res.status(400).json({
                ok:false,
                err:{
                    message:"No hay historial para este producto"
                }
            })
        }

        res.json({
            ok: true,
            historicostock
        });
    });
});

module.exports = app;
