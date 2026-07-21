import { DataTypes } from 'sequelize';
export default (sequelize) => {
  const Deporte = sequelize.define(
    'Deporte',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      nombre: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      profesor: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      precioMensual: {
        type: DataTypes.DECIMAL(10,5),
        allowNull: false,
      },
      categoria: {
        type: DataTypes.ENUM("niños", "jovenes", "adultos"),
        allowNull: false,
      },
     
    },
    {
      tableName: 'deportes',
      timestamps: false,
    }
  );

  return Deporte;
};