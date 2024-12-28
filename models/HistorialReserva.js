const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const HistorialReserva = sequelize.define('HistorialReserva', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        // id_reserva: {
        //     type: DataTypes.UUID,
        //     references: {
        //         model: 'Reservas',
        //         key: 'id',
        //     },
        //     allowNull: true
        // },

        // id_usuario: {
        //     type: DataTypes.UUID,
        //     references: {
        //         model: 'Usuarios',
        //         key: 'id',
        //     },
        //     allowNull: true
        // },

        fecha_emision: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },

        monto_total: {
            type: DataTypes.STRING,

            allowNull: true
        },

        state: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }, {
        tableName: 'HistorialReservas',
        timestamps: true
    });


    // DescargoNC.associate = (db) => {
    //     DescargoNC.belongsTo(db.EstadoDescargoNC, { foreignKey: 'id_estado', as: 'estadoDescargoNC' });
    //     DescargoNC.belongsTo(db.Usuario, { foreignKey: 'id_analista1', as: 'analistaUsuario' })
    // };


    return HistorialReserva;
}
