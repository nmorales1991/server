const express = require('express')
const app = express()
const VentasDetalle = require('../models/ventasdetalle')


app.get('/',async (req,res)=>{
    await VentasDetalle.find()
    .populate("id_productodetalle", "nombre")
    .populate("idventa_ventadetalle", "fechareg_venta")
    .exec((err,detalle)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            detalle
        })
    })
})

module.exports = app