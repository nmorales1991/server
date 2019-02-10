const express = require('express')
const app = express()
const Categorias = require('../models/categorias')


app.get('/',async (req,res)=>{
    await Categorias.find((err,categoriasBD)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            categorias:categoriasBD
        })
    })
})

app.get('/:id',async (req,res)=>{
    let id = req.params.id
    await Categorias.findById(id,(err,categoriaxID)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            categorias:categoriaxID
        })
    })
   
})

app.post('/', async (req,res)=>{
    let body = req.body

    let categoria = new Categorias({//se crea un objeto según el esquema
        nombre_categoria:body.nombre_categoria,
        descripcion_categoria: body.descripcion_categoria
    })

    await categoria.save((err,categoriaGuardada)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            oki:true,
            categorias:categoriaGuardada
        })
    })
})

app.put('/:id', async (req,res)=>{
    let body = req.body
    const categoria = {
        nombre_categoria: body.nombre_categoria,
        descripcion_categoria: body.descripcion_categoria
    }

    let id = req.params.id
    await Categorias.findByIdAndUpdate(id, categoria,{new:true,context:'query'}, (err,categoriaActualizada)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({//puede ser en formato json la salida
            ok:true,
            categorias:categoriaActualizada
        })
    })
})

app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await Categorias.findByIdAndDelete(id,(err,categoriaEliminada)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            categorias:categoriaEliminada
        })
    })
    
})

module.exports= app