// api/proxy.js

import fetch from 'node-fetch';  // Importar node-fetch

export default async function handler(req, res) {
  const targetUrl = "https://nu.mnuu.nu/api/v1/init";
  // Construir los parámetros de consulta
  const queryParams = new URLSearchParams(req.query).toString();
  
  // Concatenar los parámetros a la URL de destino
  const finalUrl = `${targetUrl}?${queryParams}`;

  // Agregar los encabezados CORS si es necesario
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Realizar la solicitud GET con los parámetros de consulta
    const apiResponse = await fetch(finalUrl, {
      method: "GET", // Método GET sin cuerpo
      headers: {
        "Content-Type": "application/json",  // Establecer el tipo de contenido si es necesario
      },
    });

    // Convertir la respuesta de la API en JSON
    const data = await apiResponse.json();

    // Devolver los datos como respuesta al cliente
    res.status(apiResponse.status).json(data);
  } catch (error) {
    // Si ocurre un error, devolver una respuesta con error

    console.log(error)
    res.status(500).json({ error: 'Error en el servidor proxy' });
  }
}
