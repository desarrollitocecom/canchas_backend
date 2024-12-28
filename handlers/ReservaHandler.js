const {
    createReserva,
    getAllReservas,
    getReserva,
    updateReserva
} = require("../controllers/reservaController")
const { getIo } = require("../sockets");
    const io = getIo();
    io.on("reservas:crear", async ({ fecha, hora_inicio, hora_fin, costo }) => {
        //validaciones
        try {
            const response = await createReserva({ fecha, hora_inicio, hora_fin, costo });
            if (response) {
                socket.emit('reservas:creada', { success: true, reserva: response });
            } else {
                socket.emit('reservas:creada', { success: false, message: 'No se pudo crear la reserva' });
            }
        } catch (error) {
            console.error('Error en reservas:crear', error);
            socket.emit('reservas:creada', { success: false, message: 'Error interno del servidor' });
        }

    });

