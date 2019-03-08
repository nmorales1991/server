const express = require('express')
const app = express()
const Generos = require('../models/generos')


app.get('/',async (req,res)=>{
    await Generos.find((err,genero)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            genero
        })
    })
})

app.get('/:id',async (req,res)=>{
    let id = req.params.id
    await Generos.findById(id,(err,genero)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            genero
        })
    })
   
})

app.post('/', async (req,res)=>{
    let body = req.body

    let new_genero = new Generos({//se crea un objeto según el esquema
        nombre_genero:body.nombre_genero
    })

    await new_genero.save((err,genero)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            oki:true,
            genero
        })
    })
})

app.put('/:id', async (req,res)=>{
    let body = req.body
    const new_genero = {
        nombre_genero: body.nombre_genero
    }

    let id = req.params.id
    await Generos.findByIdAndUpdate(id, new_genero,{new:true,context:'query'}, (err,genero)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({//puede ser en formato json la salida
            ok:true,
            genero
        })
    })
})

app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await Generos.findByIdAndDelete(id,(err,genero)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            genero
        })
    })
    
})

module.exports= app