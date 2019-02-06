//express
const express = require('express')
const app = express()

//imports
const morgan = require('morgan')
//const {mongoose} = require('../config/config') //MONGO

//middlewares
app.use(express.json())
app.use(morgan('dev'))

//routes
//app.use('/server/marcas',require('../routes/marcas.routes')) //MONGO
app.use('/server/marcas',require('../routes/marcas.routes.mysql')) //MYSQL

//server
app.listen(3000,()=>{
    console.log("Escuchando puerto 3000")
})