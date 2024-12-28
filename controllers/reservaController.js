const { Reserva } = require("../db_connection");

const createReserva = async ({ fecha, hora_inicio, hora_fin, costo }) => {
    try {
        const response = await Reserva.create({ fecha, hora_inicio, hora_fin, costo })
        return response || null
    } catch (error) {
        console.error("Error al crear la Reserva");
        return false;

    }
}
const updateReserva = async (id, { id_usuario, id_unidad_deportiva, id_pago, fecha, hora_inicio, hora_fin, costo }) => {
    try {
        const getid = await getReserva(id);
        if (getid) {
            await Reserva.update({ id_usuario, id_unidad_deportiva, id_pago, fecha, hora_inicio, hora_fin, costo })
        }
    } catch (error) {
        console.error("No se pudo modificar la Reserva", error);
        return false

    }
}
const getReserva = async (id) => {
    try {
        const response = await Reserva.findOne({
            where: { id }
        })
        return response || null;
    } catch (error) {
        console.error("No se pudo traer una reserva", error);
        return false
    }
}
const getAllReservas = async (page = 1, limit = 20) => {
    const offset = (page - 1) * limit;
    try {
        const response = await Reserva.findAndCountAll({
            limit,
            offset,
            order: [['id', 'ASC']]
        })
        return { totalCount: response.count, data: response.rows, currentPage: page } || null;

    } catch (error) {
        console.error("Error en el Controlador al traer todas las Reservas");
        return false

    }
}
module.exports = {

    createReserva,
    getAllReservas,
    getReserva,
    updateReserva
}