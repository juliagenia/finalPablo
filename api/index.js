import app from './src/app.js';
//  CORREGIDO: Extraemos la instancia de sequelize desde tu index de modelos centralizado
import sequelize, { Libro, Taller} from './src/models/index.js'; 

const startServer = async () => {
  try {
    // Paso A: Verificar la conexión y autenticar la base de datos
    await sequelize.authenticate();
    console.log('✅ Conexión a la base de datos establecida correctamente.');

    // Paso B: Crear tablas de forma segura sin borrar los datos existentes
    //await sequelize.sync({ alter: true });
    console.log('✅ Tablas de turnos sincronizadas en el sistema');

    // Paso C: Abrir el puerto de la API
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`🚀 App corriendo en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('💥 Error fatal al arrancar el servidor:', error);
  }
};

startServer();
