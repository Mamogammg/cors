const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();

// Habilitar CORS para todas las rutas
app.use(cors());

// Crear una ruta para manejar el proxy
app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url; // Obtenemos la URL del query param
  
  if (!targetUrl) {
    return res.status(400).send('No URL provided');
  }
  
  // Realizar la solicitud al servidor de destino
  request({ url: targetUrl, headers: req.headers })
    .on('error', (err) => {
      res.status(500).send(`Error en la solicitud al servidor de destino: ${err.message}`);
    })
    .pipe(res); // Pasa la respuesta directamente al cliente
});

// Exportar como una función API
module.exports = (req, res) => {
  app(req, res);
};
