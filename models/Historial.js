const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Historial = sequelize.define(
        "Historial",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
            },
            id_usuario: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: "Usuarios",
                    key: "id",
                },
            },
            accion: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            modelo: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            descripcion: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            fecha: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            hora: {
                type: DataTypes.TIME,
                allowNull: false,
            },
        },
        {
            tableName: "Historial",
            timestamps: false,
        }
    );

    Historial.associate = (db) => {
        Historial.belongsTo(db.Usuario, {
            foreignKey: { name: "id_usuario", allowNull: true },
            as: "usuario",
        });
    };

    return Historial;
};
