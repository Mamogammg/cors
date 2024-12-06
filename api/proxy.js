// api/proxy.js

export default async function handler(req, res) {
  // URL de la API a la que quieres hacer el proxy
  const targetUrl = "https://nu.mnuu.nu/api/v1/init";

  // Los parámetros de la API (puedes agregar más parámetros según sea necesario)
  const queryParams = req.query;

  try {
    // Realiza la solicitud a la API de destino
    const apiResponse = await fetch(targetUrl, {
      method: "GET", // o "POST", dependiendo de lo que necesites
      headers: {
        "Content-Type": "application/json",
      },
      // Si es necesario, incluye los parámetros en la URL o en el cuerpo
      body: JSON.stringify(queryParams),
    });

    // Verifica si la solicitud fue exitosa
    if (!apiResponse.ok) {
      return res.status(apiResponse.status).json({ error: 'Error en la solicitud' });
    }

    // Convierte la respuesta de la API en JSON
    const data = await apiResponse.json();

    // Devuelve la respuesta al cliente
    res.status(200).json(data);

  } catch (error) {
    // Si ocurre un error, devuelve el error
    console.log(error)
    res.status(500).json({ error: 'Error en el servidor proxy' });
  }
}
