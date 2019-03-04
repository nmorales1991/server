const express = require('express')
const app = express()
const Perfil = require('../models/perfil')


app.get('/',async (req,res)=>{
    await Perfil.find((err,perfil)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.json({
            oki:true,
            perfil
        })
    })
})



app.post('/', async (req,res)=>{
    let body = req.body

    let nuevoperfil = new Perfil({//se crea un objeto según el esquema
        nombre_perfil:body.nombre_perfil
    })

    await nuevoperfil.save((err,perfil)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            oki:true,
            perfil
        })
    })
})


app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await Perfil.findByIdAndDelete(id,(err,perfil)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            perfil
        })
    })
    
})

module.exports= app