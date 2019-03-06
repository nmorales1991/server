const express = require("express");
const app = express();
const Usuarios = require("../models/usuarios");
const bcrypt = require("bcryptjs");
const _ = require('underscore') 
const {verificarToken} = require('../middleware/authentication')

app.get("/", async (req, res) => {
  await Usuarios.find()
    .populate("perfil_usuario", "nombre_perfil")
    .exec((err, usuario) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
      res.json({
        oki: true,
        usuario
      });
    });
});

app.get("/:id", async (req, res) => {
  let id = req.params.id;
  await Usuarios.findById(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }
    res.json({
      ok: true,
      usuario
    });
  });
});

app.post("/", async (req, res) => {
  let body = req.body;

  let nuevousuario = new Usuarios({
    //se crea un objeto según el esquema
    nombre_usuario: body.nombre_usuario,
    apaterno_usuario: body.apaterno_usuario,
    amaterno_usuario: body.amaterno_usuario,
    email_usuario: body.email_usuario,
    rut_usuario: body.rut_usuario,
    clave_usuario: bcrypt.hashSync(body.clave_usuario, 10),
    perfil_usuario: body.perfil_usuario
  });

  await nuevousuario.save((err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.json({
      oki: true,
      usuario
    });
  });
});

app.put('/:id', async (req,res)=>{
    let body = _.pick(req.body,['nombre_usuario','apaterno_usuario','amaterno_usuario','rut_usuario','email_usuario'])
    let id = req.params.id
    await Usuarios.findByIdAndUpdate(id, body,{new:true,runValidators:true,context:'query'}, (err,usuario)=>{
        if (err){
            return res.status(400).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            usuario
        })
    })
})

app.delete("/:id", async (req, res) => {
  let id = req.params.id;

  await Usuarios.findByIdAndDelete(id, (err, usuario) => {
    if (err) {
      return res.status(500).json({
        ok: false,
        err
      });
    }

    res.json({
      ok: true,
      usuario
    });
  });
});

module.exports = app;
