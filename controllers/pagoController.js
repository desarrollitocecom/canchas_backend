const { Pago } = require("../db_connection");

const createPago = async ({ id_reserva, monto, state, metodo_pago, fecha_pago }) => {
    try {
        const response = await Pago.create({ id_reserva, monto, state, metodo_pago, fecha_pago });
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

module.exports = {
    createPago,
    updatePago,
    getPago,
    getAllPagos,
};
