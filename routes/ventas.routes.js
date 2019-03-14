const express = require("express");
const app = express();
const Ventas = require("../models/ventas");
const TipoStock = require("../models/tipostock");
const Stock = require("../models/stock");
const Producto = require("../models/productos");
const VentasDetalle = require("../models/ventasdetalle");

app.get("/", async (req, res) => {
    await Ventas.find()
        .populate("forma_pago", "nombre_formapago")
        .populate(
            "usuarioreg_venta",
            "nombre_usuario apaterno_usuario amaterno_usuario"
        )
        .exec((err, venta) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                venta
            });
        });
});
app.get("/count/", async (req, res) => {
    await Ventas.countDocuments((err, total) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            total
        });
    });
});
app.get("/:id", async (req, res) => {
    console.log("entró");
    let id = req.params.id;
    await Ventas.findById(id)
        .populate("forma_pago", "nombre_formapago")
        .populate(
            "usuarioreg_venta",
            "nombre_usuario apaterno_usuario amaterno_usuario"
        )
        .exec((err, venta) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                ok: true,
                venta
            });
        });
});

app.post("/", async (req, res) => {
    let body = req.body;

    let nuevaVenta = new Ventas({
        total_venta: body.total_venta,
        vuelto_venta: body.vuelto_venta,
        paga_con: body.paga_con,
        forma_pago: body.forma_pago,
        usuarioreg_venta: body.usuarioreg_venta,
        fecha_cierre: body.fecha_cierre
    });

    await nuevaVenta.save((err, venta) => {
        TipoStock.findOne({ id_tipostock: 1 }, (err, tipostock) => {
            body.detalleVenta.map(producto => {
                //historico stock
                let nuevoStockHistorial = new Stock({
                    cantidad: producto.cantidad,
                    idproducto_historial: producto.producto._id,
                    tipo_movimiento: tipostock._id
                });
                nuevoStockHistorial.save();

                //actualizar stock producto
                Producto.findByIdAndUpdate(
                    producto.producto._id,
                    { $inc: { stock: -producto.cantidad } },
                    { new: true, runValidators: true, context: "query" },
                    (err, producto) => {
                        if (err) {
                            return res.status(500).json({
                                ok: false,
                                err
                            });
                        }
                    }
                );

                //guardar detalle
                let nuevoDetalle = new VentasDetalle({
                    idventa_ventadetalle: venta._id,
                    id_productodetalle: producto.producto._id,
                    cantidad_producto: producto.cantidad,
                    subtotal_producto: producto.subtotal,
                    precio_normal: producto.precio_normal,
                    prefio_oferta: producto.precio_oferta,
                    descuento_producto: producto.descuento,
                    total_producto: producto.total
                });
                nuevoDetalle.save();
            });
        });

        res.json({
            ok: true,
            venta
        });
    });
});

module.exports = app;
