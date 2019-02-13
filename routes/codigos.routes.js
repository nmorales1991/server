const express = require('express')
const app = express()
const Codigos = require('../models/codigos')

app.get('/:cod', async (req,res)=>{
    let cod = req.params.cod
    await Codigos.findOne({codigo:cod},(err,codigo)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!codigo){
            return res.json({
                ok:false,
                msg: 'Código no existe'
            })
        }
        res.json({
            ok:true,
            codigo
        })
    })
})

app.post('/',async (req,res)=>{
    let body = req.body
    console.log(body);
    let codigo = new Codigos({
        codigo: body.codigo
    })
    
    await codigo.save((err,codigo)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            codigo
        })
    })
})

module.exports = app