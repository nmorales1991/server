const express = require('express')
const app = express()
const Subcategorias = require('../models/subcategorias')


app.get('/',async (req,res)=>{
    await Subcategorias.find().populate('id_categoria','nombre_categoria').exec((err,subcategoria)=>{//populate se le pasa el nombre de la propiedad de la cual sacará el id para ir a la otra tabla, en este caso se llama id_categoria, este nombre se le dio en el modelo
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            subcategoria
        })
    })
})

app.get('/:id',async (req,res)=>{
    let id = req.params.id
    await Subcategorias.findById(id,(err,subcategoria)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            subcategoria
        })
    })
   
})

app.post('/', async (req,res)=>{
    let body = req.body

    let new_subcategoria = new Subcategorias({//se crea un objeto según el esquema
        nombre_subcategoria:body.nombre_subcategoria,
        descripcion_subcategoria: body.descripcion_subcategoria,
        id_categoria: body.id_categoria
    })

    await new_subcategoria.save((err,subcategoria)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            oki:true,
            subcategoria
        })
    })
})

app.put('/:id', async (req,res)=>{
    let body = req.body
    const new_subcategoria = {
        nombre_subcategoria: body.nombre_subcategoria,
        descripcion_subcategoria: body.descripcion_subcategoria,
        id_categoria: body.id_categoria
    }

    let id = req.params.id
    await Subcategorias.findByIdAndUpdate(id, new_subcategoria,{new:true,context:'query'}, (err,subcategoria)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({//puede ser en formato json la salida
            ok:true,
            subcategoria
        })
    })
})

app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await Subcategorias.findByIdAndDelete(id,(err,subcategoria)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            subcategoria
        })
    })
    
})

module.exports= app