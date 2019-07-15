//express
const express = require("express");
const app = express();

//imports
const fs = require('fs')
const https = require('https')
const morgan = require("morgan");
const cors = require("cors");
const { mongoose } = require("../config/config"); //MONGO


const privateKey = fs.readFileSync('/etc/letsencrypt/live/ayndemos.com/privkey.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/ayndemos.com/cert.pem', 'utf8');
const ca = fs.readFileSync('/etc/letsencrypt/live/ayndemos.com/chain.pem', 'utf8');

const credentials = {
	key: privateKey,
	cert: certificate,
	ca: ca
};
const httpsServer = https.createServer(credentials, app);
//middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

//routes
app.use(require("../routes/index.routes")); //MONGO
//app.use('/server/marcas',require('../routes/marcas.mysql.routes')) //MYSQL

//server
httpsServer.listen(3000, () => {
  console.log("Escuchando puerto 3000");
});
