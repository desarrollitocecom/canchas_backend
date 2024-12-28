const { DataTypes } = require("sequelize");
module.exports = (sequelize) => {
    const Factura = sequelize.define('Factura', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        id_pago: {
            type: DataTypes.UUID,
            allowNull: false,
            references: {
                model: 'Pagos',
                key: 'id',
            },
            unique: true,
        },
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
            type: DataTypes.FLOAT,

            allowNull: true
        },

        state: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
    }, {
        tableName: 'Facturas',
        timestamps: true
    });


    Factura.associate = (db) => {
        Factura.belongsTo(db.Pago, {
            foreignKey: 'id_pago',
            as: 'pago',
        });
       // Factura.belongsTo(db.Usuario, { foreignKey: 'id_usuario', as: 'Usuarios' })
    };


    return Factura;
}

