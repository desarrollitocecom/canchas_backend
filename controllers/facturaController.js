const { Factura } = require("../db_connection");

const createFactura = async ({ fecha_emision, monto_total, state }) => {
    try {
        const response = await Factura.create({ id_pago, fecha_emision, monto_total, state });
        return response || null;
    } catch (error) {
        console.error("Error al crear la Factura", error);
        return false;
    }
};

const updateFactura = async (id, { id_pago,id_usuario, fecha_emision, monto_total, state }) => {
    try {
        const getid = await getFactura(id);
        if (getid) {
            await Factura.update({ id_pago, id_usuario,fecha_emision, monto_total, state }, { where: { id } });
            return true;
        }
        return null;
    } catch (error) {
        console.error("No se pudo modificar la Factura", error);
        return false;
    }
};

const getFactura = async (id) => {
    try {
        const response = await Factura.findOne({
            where: { id },
            include: ["pago"], // Incluye la relación con el modelo Pago si es necesario
        });
        return response || null;
    } catch (error) {
        console.error("No se pudo obtener la Factura", error);
        return false;
    }
};

const getAllFacturas = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await Factura.findAndCountAll({
            limit,
            offset,
            order: [["id", "ASC"]],
            include: ["pago"], // Incluye la relación con el modelo Pago si es necesario
        });
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;
    } catch (error) {
        console.error("Error al obtener todas las Facturas", error);
        return false;
    }
};

module.exports = {
    createFactura,
    updateFactura,
    getFactura,
    getAllFacturas,
};
