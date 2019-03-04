//express
const express = require("express");
const app = express();

//imports
const morgan = require("morgan");
const cors = require("cors");
const { mongoose } = require("../config/config"); //MONGO

//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use(require("../routes/indes.routes")); //MONGO
//app.use('/server/marcas',require('../routes/marcas.mysql.routes')) //MYSQL

//server
app.listen(3000, () => {
  console.log("Escuchando puerto 3000");
});
