const express = require("express");
const app = express();
const Producto = require("../models/productos");
const Precios = require("../models/precios");
const Stock = require("../models/stock");
const TipoPrecio = require("../models/tipoprecios");
const TipoStock = require("../models/tipostock");
const _ = require("underscore");

//obtener todos los productos
app.get("/", async (req, res) => {
    await Producto.find()
        .populate("material", "nombre_material")
        .populate("genero", "nombre_genero")
        .populate("categoria", "nombre_categoria")
        .populate("subcategoria", "nombre_subcategoria")
        .populate("marca", "nombre_marca")
        .populate(
            "usuarioreg",
            "nombre_usuario apaterno_usuario amaterno_usuario"
        )
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                oki: true,
                producto
            });
        });
});

//busqueda de productos con estado true, por código o nombre
app.get("/search", async (req, res) => {
    let query = req.query.q;
    await Producto.find({
        $and: [
            { estado_producto: true },
            {
                $or: [{ nombre: {$regex:query, $options:'i'} }, { codbarra: {$regex:query, $options:'i'} }]
            }
        ]
    })
        .populate("material", "nombre_material")
        .populate("genero", "nombre_genero")
        .populate("categoria", "nombre_categoria")
        .populate("subcategoria", "nombre_subcategoria")
        .populate("marca", "nombre_marca")
        .populate(
            "usuarioreg",
            "nombre_usuario apaterno_usuario amaterno_usuario"
        )
        .exec((err, producto) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }
            res.json({
                oki: true,
                producto
            });
        });
});

//agregar producto, historial precio compra y venta
app.post("/", async (req, res) => {
    let body = req.body;

    let nuevoProducto = new Producto({
        stock: body.stock,
        nombre: body.nombre,
        nombre_corto: body.nombre_corto,
        modelo: body.modelo,
        descripcion: body.descripcion,
        color: body.color,
        material: body.material,
        genero: body.genero,
        a_pilas: body.a_pilas,
        tipo_pila: body.tipo_pila,
        cantidad_pilas: body.cantidad_pilas,
        incluye_pilas: body.incluye_pilas,
        edad: body.edad,
        hecho_en: body.hecho_en,
        categoria: body.categoria,
        subcategoria: body.subcategoria,
        usuarioreg: body.usuarioreg,
        precio: body.precio,
        codbarra: body.codbarra,
        sku: body.sku,
        marca: body.marca,
        alto: body.alto,
        ancho: body.ancho,
        largo: body.largo,
        peso: body.peso,
        precio_compra: body.precio_compra,
        youtube: body.youtube
    });

    await nuevoProducto.save((err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        //precio venta
        TipoPrecio.findOne({ id_tipoprecio: 1 }, (err, tipoprecio) => {
            let nuevoPrecioHistorial = new Precios({
                precio_historial: body.precio,
                idproducto_historial: producto._id,
                idtipoprecio_historial: tipoprecio._id
            });

            nuevoPrecioHistorial.save((err, historial) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
            });
        });

        if (body.precio_compra) {
            //precio compra
            TipoPrecio.findOne({ id_tipoprecio: 2 }, (err, tipoprecio) => {
                let nuevoPrecioHistorial = new Precios({
                    precio_historial: body.precio_compra,
                    idproducto_historial: producto._id,
                    idtipoprecio_historial: tipoprecio._id
                });

                nuevoPrecioHistorial.save((err, historial) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }
                });
            });
        }

        //historial stock, ingreso stock
        TipoStock.findOne({ id_tipostock: 2 }, (err, tipostock) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            let nuevoStockHistorial = new Stock({
                cantidad: body.stock,
                idproducto_historial: producto._id,
                tipo_movimiento: tipostock._id
            });

            nuevoStockHistorial.save((err, historial) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }
            });
        });

        res.json({
            ok: true,
            producto
        });
    });
});

//producto por código
app.get("/c/:cod", async (req, res) => {
    let cod = req.params.cod;
    await Producto.findOne({ codbarra: cod }, (err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!producto) {
            return res.json({
                ok: false,
                msg: "Producto no existe"
            });
        }

        res.json({
            ok: true,
            producto
        });
    });
});

//producto por id
app.get("/i/:id", async (req, res) => {
    let id = req.params.id;
    await Producto.findById(id, (err, producto) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!producto) {
            return res.json({
                ok: false,
                msg: "Producto no existe"
            });
        }

        res.json({
            ok: true,
            producto
        });
    });
});

//actualizar detalles
app.put("/d/:id", async (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        "descripcion",
        "sku",
        "nombre_corto",
        "categoria",
        "subcategoria",
        "alto",
        "ancho",
        "largo",
        "youtube",
        "color",
        "peso",
        "material",
        "genero",
        "a_pilas",
        "tipo_pila",
        "cantidad_pilas",
        "incluye_pilas",
        "edad",
        "hecho_en"
    ]);

    await Producto.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true, context: "query" },
        (err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                producto
            });
        }
    );
});

//actualizar stock
app.put("/s/:id", (req, res) => {
    let id = req.params.id;
    Producto.findByIdAndUpdate(
        id,
        { $inc: { stock: req.body.stock } },
        { new: true, runValidators: true, context: "query" },
        (err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            //historial stock, ingreso stock
            TipoStock.findOne({ id_tipostock: 2 }, (err, tipostock) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let nuevoStockHistorial = new Stock({
                    cantidad: req.body.stock,
                    idproducto_historial: id,
                    tipo_movimiento: tipostock._id
                });

                nuevoStockHistorial.save((err, historial) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }
                });
            });

            res.json({
                ok: true,
                producto
            });
        }
    );
});

//actualizar descuento y el historial
app.put("/o/:id", async (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, [
        "precio_descuento",
        "porcentaje_descuento",
        "desde_descuento",
        "hasta_descuento"
    ]);

    await Producto.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true, context: "query" },
        (err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            TipoPrecio.findOne({ id_tipoprecio: 3 }, (err, tipoprecio) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let nuevoPrecioHistorial = new Precios({
                    precio_historial: body.precio_descuento,
                    porcentaje_descuentohistorial: body.porcentaje_descuento,
                    desde_descuentohistorial: body.desde_descuento,
                    hasta_descuentohistorial: body.hasta_descuento,
                    idproducto_historial: id,
                    idtipoprecio_historial: tipoprecio._id
                });

                nuevoPrecioHistorial.save((err, historial) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }
                });
            });

            res.json({
                ok: true,
                producto
            });
        }
    );
});

//actualizar precio venta y agregar a histórico
app.put("/v/:id", async (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ["precio"]);

    await Producto.findByIdAndUpdate(
        id,
        body,
        { new: true, runValidators: true, context: "query" },
        (err, producto) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }

            TipoPrecio.findOne({ id_tipoprecio: 1 }, (err, tipoprecio) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        err
                    });
                }

                let nuevoPrecioHistorial = new Precios({
                    precio_historial: body.precio,
                    idproducto_historial: id,
                    idtipoprecio_historial: tipoprecio._id
                });

                nuevoPrecioHistorial.save((err, historial) => {
                    if (err) {
                        return res.status(500).json({
                            ok: false,
                            err
                        });
                    }
                });
            });

            res.json({
                ok: true,
                producto
            });
        }
    );
});

//desactivar producto
app.delete("/:id", (req, res) => {
    let id = req.params.id;

    Producto.findById(id, (err, producto) => {
        producto.estado_producto = !producto.estado_producto;
        producto.save((err, producto) => {
            res.json({
                ok: true,
                producto
            });
        });
    });
});

module.exports = app;
