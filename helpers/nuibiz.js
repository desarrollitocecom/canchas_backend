const axios = require('axios');

// URLs base de la API
const BASE_URL = 'https://apisandbox.vnforappstest.com/api.security/v1/';
const ECOMMERCE_URL = 'https://apisandbox.vnforappstest.com/api.ecommerce/v2/ecommerce/token/session/';
const merchantID = 456879852;

// Credenciales de Nuibiz
const userName = 'integraciones@niubiz.com.pe';
const password = '_7z3@8fF';

// Codificar credenciales en Base64
const encodedCredentials = Buffer.from(`${userName}:${password}`).toString('base64');

// Configuración inicial de cabeceras
const config = {
  headers: {
    Authorization: `Basic ${encodedCredentials}`,
    'Content-Type': 'application/json',
  },
};

// Función para obtener información de seguridad
async function getSecurityInfo() {
  try {
    // Solicitar token de seguridad
    const response = await axios.get(`${BASE_URL}security`, config);
    const token = response.data;

    if (token) {
      console.log('Token obtenido:', token);

      // Configurar cabeceras para la segunda solicitud
      const sessionHeaders = {
        headers: {
          Authorization: token,
          'Content-Type': 'application/json'
        },
      };
    //  console.log("SESION DE HEADER",sessionHeaders);
      

      // Datos para la solicitud POST
      const data = {
        channel: 'web',
        amount: 10.5,
        antifraud: {
          clientIp: '24.252.107.29',
          merchantDefineData: {
            MDD4: 'integraciones@niubiz.com.pe',
            MDD32: 'JD1892639123',
            MDD75: 'Registrado',
            MDD77: 458,
          },
        }
      };

      // Solicitar token de sesión
      const sessionResponse = await axios.post(`${ECOMMERCE_URL}${merchantID}`, data, sessionHeaders);
      console.log('Token de sesión obtenido:', sessionResponse.data.sessionKey);
    }
  } catch (error) {
    if (error.response) {
      console.error('Error en la solicitud:', error.response.status, error.response.data);
    } else {
      console.error('Error general:', error.message);
    }
  }
}

// Llamar a la función principal
getSecurityInfo();
