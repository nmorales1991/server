const express = require('express')
const app = express()
const Ventas = require('../models/ventas')


app.get('/',async (req,res)=>{
    await Ventas.find()
    .populate("forma_pago", "nombre_formapago")
    .populate("usuarioreg_venta", "nombre_usuario apaterno_usuario amaterno_usuario")
    .exec((err,venta)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            venta
        })
    })
})
app.get('/count/', async (req,res)=>{
    await Ventas.countDocuments((err,total)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            total
        })
    })
})
app.get('/:id',async (req,res)=>{
    console.log("entró")
    let id = req.params.id
    await Ventas.findById(id)
    .populate("forma_pago", "nombre_formapago")
    .populate("usuarioreg_venta", "nombre_usuario apaterno_usuario amaterno_usuario")
    .exec((err,venta)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            venta
        })
    })
   
})



app.post('/', async (req,res)=>{
    let body = req.body

    let nuevaVenta = new Ventas({
        total_venta:body.total_venta,
        vuelto_venta: body.vuelto_venta,
        paga_con: body.paga_con,
        forma_pago: body.forma_pago,
        usuarioreg_venta: body.usuarioreg_venta,
        fecha_cierre: body.fecha_cierre
    })

    await nuevaVenta.save((err,venta)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            venta
        })
    })
})


module.exports= app