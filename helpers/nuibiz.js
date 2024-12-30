require("dotenv").config({path:"../.env"});
const {BASE_URL,PASSWORD_NUIBIZ,USER_NUIBIZ,ECOMMERCE_URL,merchantID} = process.env;
const axios = require('axios');
console.log(BASE_URL,USER_NUIBIZ);

// Codificar credenciales en Base64
const encodedCredentials = Buffer.from(`${USER_NUIBIZ}:${PASSWORD_NUIBIZ}`).toString('base64');


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
