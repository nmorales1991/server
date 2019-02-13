//express
const express = require('express')
const app = express()

//imports
const morgan = require('morgan')
const cors = require('cors')
const {mongoose} = require('../config/config') //MONGO

//middlewares
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())

//routes
app.use('/server/marcas',require('../routes/marcas.routes')) //MONGO
app.use('/server/categorias',require('../routes/categorias.routes')) //MONGO
app.use('/server/pilas',require('../routes/tipopilas.routes')) //MONGO
app.use('/server/generos',require('../routes/generos.routes')) //MONGO
app.use('/server/materiales',require('../routes/material.routes')) //MONGO
app.use('/server/subcategorias',require('../routes/subcategorias.routes')) //MONGO
app.use('/server/codigos',require('../routes/codigos.routes')) //MONGO
//app.use('/server/marcas',require('../routes/marcas.routes.mysql')) //MYSQL

//server
app.listen(3000,()=>{
    console.log("Escuchando puerto 3000")
})