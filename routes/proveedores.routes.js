const express = require("express");
const app = express();
const Proveedores = require("../models/proveedores")

app.get("/", async (req, res) => {
    await Proveedores.find((err, proveedor) => {
        if (err) {//error de servidor
          return res.status(500).json({
            ok: false,
            err
          });
        }

        res.json({
          ok: true,
          proveedor
        });
      });
  });

app.post("/", async (req, res) => {
    let body = req.body;
  
    let nuevoProveedor = new Proveedores({
      nombre_proveedor: body.nombre_proveedor,
      rut_proveedor: body.rut_proveedor,
      giro_proveedor: body.giro_proveedor,
      celular_proveedor: body.celular_proveedor,
      email_proveedor: body.email_proveedor,
      direccion_proveedor: body.direccion_proveedor,
      contacto_proveedor: body.contacto_proveedor
    });
  
    await nuevoProveedor.save((err, proveedor) => {
      if (err) {
        return res.status(500).json({
          ok: false,
          err
        });
      }
  
      res.json({
        oki: true,
        proveedor
      });
    });
  });

  app.delete('/:id', async (req,res)=>{
    let id = req.params.id

    await Proveedores.findByIdAndDelete(id,(err,proveedor)=>{
        if (err){
            return res.status(500).json({
                ok:false,
                err
            })
        }

        res.json({
            ok:true,
            proveedor
        })
    })
    
})

module.exports = app