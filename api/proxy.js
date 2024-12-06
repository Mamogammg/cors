const express = require('express');
const cors = require('cors');
const request = require('request');
const app = express();

app.use(cors());  // Esto habilita CORS para todas las rutas

app.get('/proxy', (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    return res.status(400).send('No URL provided');
  }
  request({ url: targetUrl, headers: req.headers })
    .pipe(res);  // Redirige la respuesta de la solicitud al cliente
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
