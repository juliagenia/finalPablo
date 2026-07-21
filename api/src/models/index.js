import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
// Importamos el constructor del modelo Turno agregando el .js obligatorio
import createTuDeporte from "./deportes.model.js"


dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false,
  }
);

// Inicializamos el modelo pasando la instancia configurada
const Deporte = createTuDeporte(sequelize);


// Exportamos la conexión por defecto y el modelo listo para usar
export default sequelize;
export { Deporte};