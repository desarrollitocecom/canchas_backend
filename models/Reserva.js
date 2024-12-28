const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Reserva = sequelize.define('Reserva', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        // id_usuario: {
        //     type: DataTypes.UUID,
        //     references: {
        //         model: 'Usuarios',
        //         key: 'id',
        //     },
        //     allowNull: true
        // },
        // id_unidad_deportiva: {
        //     type: DataTypes.INTEGER,
        //     references: {
        //         model: 'UnidadDeportivas',
        //         key: 'id',
        //     },
        //     allowNull: true
        // },
        // id_pago: {
        //     type: DataTypes.STRING,
        //     references: {
        //         model: 'Pagos',
        //         key: 'id',
        //     },         
        //     allowNull: true
        // },
        fecha: {
            type: DataTypes.DATE,
            allowNull: true
        },
        hora_inicio: {
            type: DataTypes.STRING,
            allowNull: true
        },
        hora_fin: {
            type: DataTypes.STRING,
            allowNull: true
        },
        costo: {
            type: DataTypes.FLOAT,
            allowNull: false
        }
    }, {
        tableName: 'Reservas',
        timestamps: true
    });


    // DescargoNC.associate = (db) => {
    //     DescargoNC.belongsTo(db.EstadoDescargoNC, { foreignKey: 'id_estado', as: 'estadoDescargoNC' });
    //     DescargoNC.belongsTo(db.Usuario, { foreignKey: 'id_analista1', as: 'analistaUsuario' })
    // };


    return Reserva;
}