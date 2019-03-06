const express = require("express");
const app = express();
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken')

app.post('/', (req,res)=>{
    let body = req.body
    Usuarios.findOne({rut_usuario:body.rut_usuario},(err,usuario)=>{
        if(err){
            return res.status(500).send({
                ok:false,
                err
            })
        }

        if(!usuario){
            return res.status(400).send({
                ok:false,
                err:{
                    message:'user'
                }
            })
        }

        if(!bcrypt.compareSync(body.clave_usuario,usuario.clave_usuario)){
            return res.status(400).send({
                ok:false,
                err:{
                    message:'pass'
                }
            })
        }

        let token = jwt.sign({
            usuariobd:usuario //este nombre es el decoded del authentication.js
        },'secret',{expiresIn:'24h'})

        res.json({//respuesta al navegador
            ok:true,
            usuariobd:usuario,
            token
        })



    })
})


module.exports = app