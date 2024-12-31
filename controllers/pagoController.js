require("dotenv").config({path:"../.env"});
const {BASE_URL,PASSWORD_NUIBIZ,USER_NUIBIZ,ECOMMERCE_URL,merchantID,URL_TRANSACCION} = process.env;
const axios = require('axios');

const { Pago } = require("../db_connection");

const createPago = async ({  monto, state, metodo_pago, fecha_pago }) => {
    try {
        const response = await Pago.create({ monto, state, metodo_pago, fecha_pago });
        return response || null;
    } catch (error) {
        console.error("Error al crear el Pago", error);
        return false;
    }
};

const updatePago = async (id, { id_reserva, monto, state, metodo_pago, fecha_pago }) => {
    try {
        const getid = await getPago(id);
        if (getid) {
            await Pago.update({ id_reserva, monto, state, metodo_pago, fecha_pago }, { where: { id } });
            return true;
        }
        return null;
    } catch (error) {
        console.error("No se pudo modificar el Pago", error);
        return false;
    }
};

const getPago = async (id) => {
    try {
        const response = await Pago.findOne({
            where: { id },
        });
        return response || null;
    } catch (error) {
        console.error("No se pudo obtener el Pago", error);
        return false;
    }
};

const getAllPagos = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await Pago.findAndCountAll({
            limit,
            offset,
            order: [["id", "ASC"]],
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error al obtener todos los Pagos", error);
        return false;
    }
};
//obtengo el token de nuibiz
const getTokenNuibiz=async () => {

const encodedCredentials = Buffer.from(`${USER_NUIBIZ}:${PASSWORD_NUIBIZ}`).toString('base64');

const config = {
  headers: {
    Authorization: `Basic ${encodedCredentials}`,
    'Content-Type': 'application/json',
  },
};
    try {
         const response = await axios.get(`${BASE_URL}security`, config);
         const token = response.data;
        return token || null
    } catch (error) {
        console.error("No se pudo obtener el token de nuibiz");
        return false
    }
}
//
const tokendeSesion=async () => {
    const sessionHeaders = {
        headers: {
          Authorization: await getTokenNuibiz(),
          'Content-Type': 'application/json'
        },
      };
      //LA DATA DEL FRONT
      const data = {
        channel: 'web',
        amount: 90,
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

      
      try {
          const sessionResponse = await axios.post(`${ECOMMERCE_URL}${merchantID}`, data, sessionHeaders);

          console.log('Token de sesión obtenido:', sessionResponse.data.sessionKey);

          return sessionResponse.data || null
      } catch (error) {
        if (error.response) {
            console.error('Error en la solicitud:', error.response.status, error.response.data);
          } else {
            console.error('Error general:', error.message);
          }
      }
}
const capturarPago=async (token) => {
    
    try {
        const sessionHeaders = {
            headers: {
              Authorization: await getTokenNuibiz(),
              'Content-Type': 'application/json'
            },
          };
          const requestBody = {
            "channel": "web",
            "captureType": "manual",
            "countable": true,
            "order": {
                "tokenId": token, // Usar el tokenId del parámetro token
                "purchaseNumber": 2020100901, // El número de compra debe ser proporcionado por el token
                "amount": 90, // Monto de la transacción
                "currency": "PEN"// Tipo de moneda (por ejemplo, PEN)
            }
        };
        const response=await axios.post(`${URL_TRANSACCION}${merchantID}`,
            requestBody,
            sessionHeaders 
        )

      return response || null
    } catch (error) {
        // Manejar cualquier error que ocurra durante la llamada a la API
        console.error("Error al capturar el pago:", error.response ? error.response.data : error.message);
    }
}
module.exports = {
    createPago,
    updatePago,
    getPago,
    getAllPagos,
    getTokenNuibiz,
    tokendeSesion,
    capturarPago
};
