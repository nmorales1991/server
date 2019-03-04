const express = require('express')
const app = express()
const FormaPago = require('../models/formapago')


app.get('/',async (req,res)=>{
    await FormaPago.find((err,formapago)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            formapago
        })
    })
})

app.get('/:id',async (req,res)=>{
    let id = req.params.id
    await FormaPago.findById(id,(err,formapago)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            ok:true,
            formapago
        })
    })
   
})

app.post('/', async (req,res)=>{
    let body = req.body

    let nuevaformapago = new FormaPago({//se crea un objeto según el esquema
        nombre_formapago:body.nombre_formapago
    })

    await nuevaformapago.save((err,formapago)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            oki:true,
            formapago
        })
    })
})

app.put('/:id', async (req,res)=>{
    let body = req.body
    const nuevaformapago = {
        nombre_formapago: body.nombre_formapago
    }

    let id = req.params.id
    await FormaPago.findByIdAndUpdate(id, nuevaformapago,{new:true,context:'query'}, (err,formapago)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            formapago
        })
    })
})

app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await FormaPago.findByIdAndDelete(id,(err,formapago)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            formapago
        })
    })
    
})

module.exports= app