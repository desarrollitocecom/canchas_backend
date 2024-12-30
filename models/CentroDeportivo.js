const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const CentroDeportivo = sequelize.define(
    "CentroDeportivo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      direccion: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      latitud: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      longitud: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
      hora_apertura: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      hora_cierre: {
        type: DataTypes.TIME,
        allowNull: false,
      },
      entrada: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      tableName: "Centro_Deportivo",
      timestamps: false,
    }
  );

  return CentroDeportivo;
};
