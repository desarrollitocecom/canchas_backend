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
        id_pago: {
            type: DataTypes.UUID,
            references: {
                model: 'Pagos',
                key: 'id',
            },         
            allowNull: true,
            unique:true

        },
        fecha: {
            type: DataTypes.DATEONLY,
            allowNull: true
        },
        hora_inicio: {
            type: DataTypes.TIME,
            allowNull: true
        },
        hora_fin: {
            type: DataTypes.TIME,
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


    Reserva.associate = (db) => {
      //  Reserva.belongsTo(db.UnidadDeportivas, { foreignKey: 'id_unidad_deportiva', as: 'UnidadesDeportivas' });
        Reserva.belongsTo(db.Pago, { foreignKey: 'id_pago', as: 'pago' })
       // Reserva.belongsTo(db.Usuario, { foreignKey: 'id_usuario', as: 'Usuarios' })

    };


    return Reserva;
}