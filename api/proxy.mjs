// api/proxy.js

import fetch from 'node-fetch';  // Importar node-fetch

export default async function handler(req, res) {
  const targetUrl = "https://nu.mnuu.nu/api/v1/init";
  const queryParams = new URLSearchParams(req.query).toString();
  const finalUrl = `${targetUrl}?${queryParams}`;

  // Configurar encabezados para CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  try {
    // Realizar la solicitud
    const apiResponse = await fetch(finalUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Verificar si la respuesta de la API fue exitosa
    if (!apiResponse.ok) {
      // Leer el texto de la respuesta solo una vez
      const errorText = await apiResponse.text();
      console.error("Error Response Text:", errorText);

      return res.status(apiResponse.status).json({
        error: "Error en la solicitud a la API externa",
        details: errorText,
      });
    }

    // Convertir la respuesta a JSON solo una vez
    const data = await apiResponse.json();

    // Devolver los datos al cliente
    res.status(200).json(data);
  } catch (error) {
    console.error("Fetch Error:", error);

    // Manejar errores de red o del servidor
    res.status(500).json({
      error: "Error realizando la solicitud al servidor externo",
      details: error.message,
    });
  }
}
