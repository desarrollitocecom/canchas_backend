const { DataTypes } = require("sequelize");
module.exports=(sequelize)=>{
    const Pago=sequelize.define('Pago',{
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
            defaultValue: DataTypes.UUIDV4,
        },
        id_reserva:{
          type:DataTypes.UUID,
          references: {
            model: 'Reservas',
            key: 'id',
        },
        allowNull: true
        },
        
        monto:{
          type:DataTypes.FLOAT,
          allowNull: true
        },
        
        state:{
            type:DataTypes.BOOLEAN,
            allowNull: true
        },

        metodo_pago:{
            type: DataTypes.STRING,
           
            allowNull: true
        },

       fecha_pago:{
            type: DataTypes.DATEONLY,
          
            allowNull: true
        },
    }, {
        tableName: 'Pagos',
        timestamps: true
    });
    
    return Pago;
}

