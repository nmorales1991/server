const express = require('express')
const app = express()
const Material = require('../models/material')


app.get('/',async (req,res)=>{
    await Material.find((err,material)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            material
        })
    })
})

app.get('/:id',async (req,res)=>{
    let id = req.params.id
    await Material.findById(id,(err,material)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            material
        })
    })
   
})

app.post('/', async (req,res)=>{
    let body = req.body

    let new_material = new Material({//se crea un objeto según el esquema
        nombre_material:body.nombre_material
    })

    await new_material.save((err,material)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            oki:true,
            material
        })
    })
})

app.put('/:id', async (req,res)=>{
    let body = req.body
    const new_material = {
        nombre_material: body.nombre_material
    }

    let id = req.params.id
    await Material.findByIdAndUpdate(id, new_material,{new:true,context:'query'}, (err,material)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({//puede ser en formato json la salida
            ok:true,
            material
        })
    })
})

app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await Material.findByIdAndDelete(id,(err,material)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            material
        })
    })
    
})

module.exports= app