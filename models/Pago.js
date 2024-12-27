const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const Reserva=sequelize.define('Reserva',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        nro_descargo:{
          type:DataTypes.STRING,
          allowNull: true
        },
        
        fecha_descargo:{
          type:DataTypes.DATE,
          allowNull: true
        },
        
        documento:{
            type:DataTypes.STRING,
            allowNull: true
        },

        id_estado:{
            type: DataTypes.INTEGER,
            references: {
                model: 'EstadoDescargoNCs',
                key: 'id',
            },
            allowNull: true
        },

        id_analista1:{
            type: DataTypes.UUID,
            references: {
                model: 'Usuarios',
                key: 'id',
            },
            allowNull: true
        },
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

