// api/proxy.js

import fetch from 'node-fetch';  // Importar node-fetch

export default async function handler(req, res) {
  const targetUrl = "https://nu.mnuu.nu/api/v1/init";
  const queryParams = req.query;

  // Agregar los encabezados CORS si es necesario
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Usar fetch de node-fetch
    const apiResponse = await fetch(targetUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(queryParams),  // Si es necesario, puedes agregar parámetros
    });

    // Verificar si la respuesta de la API fue exitosa
    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: 'Error en la solicitud a la API' });
    }

    // Convertir la respuesta de la API en JSON
    const data = await apiResponse.json();

    // Devolver los datos como respuesta al cliente
    res.status(200).json(data);
  } catch (error) {
    // Si ocurre un error, devolver una respuesta con error
    res.status(500).json({ error: 'Error en el servidor proxy' });
  }
}
