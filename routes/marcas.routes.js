const express = require('express')
const app = express()
const Marcas = require('../models/marcas')


app.get('/',async (req,res)=>{
    await Marcas.find((err,marcasBD)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            marcas:marcasBD
        })
    })
})

app.get('/:id',async (req,res)=>{
    let id = req.params.id
    await Marcas.findById(id,(err,marcaxID)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            marcas:marcaxID
        })
    })
   
})

app.post('/', async (req,res)=>{
    let body = req.body

    let marca = new Marcas({//se crea un objeto según el esquema
        nombre_marca:body.nombre_marca
    })
    await marca.save((err,marcaGuardada)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            oki:true,
            marca:marcaGuardada
        })
    })
})

app.put('/:id', async (req,res)=>{
    let body = req.body
    const marca = {
        nombre_marca: body.nombre_marca
    }
    let id = req.params.id
    await Marcas.findByIdAndUpdate(id, marca,{new:true,context:'query'}, (err,marcaActualizada)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({//puede ser en formato json la salida
            ok:true,
            marca:marcaActualizada
        })
    })
})

app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await Marcas.findByIdAndDelete(id,(err,marcaEliminada)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            marca:marcaEliminada
        })
    })
    
})

module.exports= app