// api/proxy.js

import fetch from 'node-fetch';  // Importar node-fetch

export default async function handler(req, res) {
  const targetUrl = "https://nu.mnuu.nu/api/v1/init";
  const queryParams = new URLSearchParams(req.query).toString();
  const finalUrl = `${targetUrl}?${queryParams}`;

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

    // Registrar detalles de la respuesta
    console.log("Response Status:", apiResponse.status);
    console.log("Response OK:", apiResponse.ok);

    // Intentar convertir la respuesta a JSON
    let data;
    try {
      data = await apiResponse.json();
    } catch (err) {
      console.error("Error parsing JSON response:", err);
      const errorText = await apiResponse.text();
      console.error("Raw Response Text:", errorText);

      return res
        .status(apiResponse.status)
        .json({ error: "Error parsing JSON from API response", details: errorText });
    }

    // Devolver la respuesta al cliente
    res.status(apiResponse.status).json(data);
  } catch (error) {
    console.error("Fetch Error:", error);

    // Manejar errores de red o del servidor
    res.status(500).json({ error: "Error fetching API", details: error.message });
  }
}
