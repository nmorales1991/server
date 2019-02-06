const express = require('express')
const app = express()

const mysqlConnection  = require('../config/config.mysql');

app.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM marcas', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});


app.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM marcas WHERE id_marca = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});


app.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM marcas WHERE id_marca = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });
});


app.post('/', (req, res) => {
  const {nombre_marca} = req.body;
  const query = "INSERT INTO marcas(nombre_marca) VALUES (?)";
  mysqlConnection.query(query, [nombre_marca], (err, rows, fields) => {
    if(!err) {
      res.json({
          "rows":rows
      });
    } else {
      console.log(err);
    }
  });

});

app.put('/:id', (req, res) => {
  const { nombre_marca } = req.body;
  const { id } = req.params;
  const query = "UPDATE marcas SET nombre_marca = ? WHERE id_marca = ?";
  mysqlConnection.query(query, [nombre_marca, id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'Marca Actualizada'});
    } else {
      console.log(err);
    }
  });
});

module.exports = app;