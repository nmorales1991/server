const express = require('express')
const app = express()
const TipoPilas = require('../models/tipo_pilas')


app.get('/',async (req,res)=>{
    await TipoPilas.find((err,tipo_pila)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            tipo_pila
        })
    })
})

app.get('/:id',async (req,res)=>{
    let id = req.params.id
    await TipoPilas.findById(id,(err,tipo_pila)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            tipo_pila
        })
    })
   
})

app.post('/', async (req,res)=>{
    let body = req.body

    let new_tipopila = new TipoPilas({//se crea un objeto según el esquema
        tipo_pila:body.tipo_pila
    })

    await new_tipopila.save((err,tipo_pila)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            oki:true,
            tipo_pila
        })
    })
})

app.put('/:id', async (req,res)=>{
    let body = req.body
    const new_tipopila = {
        tipo_pila: body.tipo_pila
    }

    let id = req.params.id
    await TipoPilas.findByIdAndUpdate(id, new_tipopila,{new:true,context:'query'}, (err,tipo_pila)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({//puede ser en formato json la salida
            ok:true,
            tipo_pila
        })
    })
})

app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await TipoPilas.findByIdAndDelete(id,(err,tipo_pila)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            tipo_pila
        })
    })
    
})

module.exports= app