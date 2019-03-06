//express
const express = require("express");
const app = express();
const {verificarToken} = require('../middleware/authentication')

app.use("/server/marcas", require("./marcas.routes")); //MONGO
app.use("/server/categorias", require("./categorias.routes")); //MONGO
app.use("/server/pilas", require("./tipopilas.routes")); //MONGO
app.use("/server/generos", require("./generos.routes")); //MONGO
app.use("/server/materiales", require("./material.routes")); //MONGO
app.use("/server/subcategorias", require("./subcategorias.routes")); //MONGO
app.use("/server/formapago", require("./formapago.routes")); //MONGO
app.use("/server/perfil", require("./perfil.routes")); //MONGO
app.use("/server/usuarios", require("./usuarios.routes")); //MONGO
app.use("/server/login", require("./login.routes")); //MONGO

module.exports = app