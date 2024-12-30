const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
    const Usuario = sequelize.define(
        "Usuario",
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false
            },
            dni: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            nombres: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            apellidos: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            telefono: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            correo: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    isEmail: true,
                },
                unique: true,
            },
            contraseña: {
                type: DataTypes.STRING(255),
                allowNull: false,
                validate: {
                    len: [8, 255], // Mínimo 8 caracteres
                },
            },
            state: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            ip: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            resetToken: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            resetTokenExpires: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            tableName: "Usuarios",
            timestamps: true,
        }
    );

    Usuario.associate = (db) => {
        // Relación 1:N con Historial
        Usuario.belongsTo(db.Historial, {
            foreignKey: { name: "id_usuario", allowNull: true },
            as: "historiales",
        });
    };

    return Usuario;
};
