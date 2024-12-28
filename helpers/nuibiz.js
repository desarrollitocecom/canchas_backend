const axios = require('axios');

// URL base de la API de Nuibiz en el entorno de pruebas
const BASE_URL = 'https://apisandbox.vnforappstest.com/api.security/v1/';

// Tu nombre de usuario y contraseña de Nuibiz
const userName = 'integraciones@niubiz.com.pe';  // Sustituye con tu nombre de usuario
const password = '_7z3@8fF';    // Sustituye con tu contraseña

// Codificar las credenciales en Base64
const encodedCredentials = Buffer.from(`${userName}:${password}`).toString('base64');
console.log('Encoded Credentials:', encodedCredentials);

// Configuración de las cabeceras con la autenticación básica
const config = {
  headers: {
    'Authorization': `Basic ${encodedCredentials}`,
    'Content-Type': 'application/json'
  }
};

// Función para obtener la información de seguridad
async function getSecurityInfo() {
  try {
    const response = await axios.get(`${BASE_URL}security`, config);
    console.log('Respuesta de la API:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Error al obtener la información de seguridad:', error.response.status, error.response.data);
    } else {
      console.error('Error al obtener la información de seguridad:', error.message);
    }
  }
}

// Llamar a la función para obtener la información
getSecurityInfo();
