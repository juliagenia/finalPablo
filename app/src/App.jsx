
import { useEffect, useState } from 'react';
import api from './services/api.js'; // Tu configuración de Axios

// 1. Datos Locales (Opciones de cobertura de seguro exigidas en el enunciado)
const opcionesSeguro = [
  { id: "s1", tipo: "Cobertura Base (Municipal)", incremento: 0 },
  { id: "s2", tipo: "Cobertura Intermedia (Provincial)", incremento: 15 },
  { id: "s3", tipo: "Cobertura Alta Competencia (Nacional)", incremento: 30 }
];

function App() {
  // --- Estados de la Aplicación ---
  const [deportes, setDeportes] = useState([]); // Colección completa del backend
  const [categoriaFiltrada, setCategoriaFiltrada] = useState(""); // Filtro activo ("Niños", "Jóvenes", "Adultos" o "" para todos)
  const [deporteSeleccionado, setDeporteSeleccionado] = useState(null); // Objeto del deporte elegido
  const [seguroSeleccionado, setSeguroSeleccionado] = useState(opcionesSeguro[0]); // Seguro (por defecto el primero)

  // --- Consumo de API (Carga inicial automática) ---
  useEffect(() => {
    api.get('/deportes')
      .then(respuesta => {
        // Adaptado a tu estructura { estado: true, data: [...] }
        setDeportes(respuesta.data.data); 
      })
      .catch(error => {
        console.error("Error al cargar las escuelas deportivas:", error);
      });
  }, []);

  // --- Filtro en tiempo real por JavaScript ---
  const deportesFiltrados = categoriaFiltrada
    ? deportes.filter(dep => dep.categoria === categoriaFiltrada)
    : deportes;

  // --- Lógica Matemática (Punto Crítico) ---
  const calcularPrecioFinal = () => {
    if (!deporteSeleccionado) return 0;
    const precioBase = Number(deporteSeleccionado.precioMensual);
    const porcentaje = Number(seguroSeleccionado.incremento);
    // Fórmula exacta: Precio Final = Precio Mensual + (Precio Mensual x Incremento / 100)
    return precioBase + (precioBase * porcentaje / 100);
  };

  // --- Manejador del cambio de seguro ---
  const handleSeguroChange = (e) => {
    const seguroEncontrado = opcionesSeguro.find(s => s.id === e.target.value);
    if (seguroEncontrado) setSeguroSeleccionado(seguroEncontrado);
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2>Mesa de Examen - Programación Web 2</h2>
        <h1>Escuelas Deportivas Municipales</h1>
        <p>Santa Rosa de Calamuchita</p>
      </header>

      {/* --- BOTONES DE FILTRO POR CATEGORÍA --- */}
      <section style={{ marginBottom: '20px', textAlign: 'center' }}>
        <h3>Filtrar por Categoría:</h3>
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
          <button 
            onClick={() => setCategoriaFiltrada("Niños")}
            style={{ padding: '10px 20px', backgroundColor: categoriaFiltrada === "Niños" ? '#007bff' : '#f0f0f0', color: categoriaFiltrada === "Niños" ? '#fff' : '#000', border: '1px solid #ccc', cursor: 'pointer', borderRadius: '4px' }}
          >Niños</button>
          <button 
            onClick={() => setCategoriaFiltrada("Jóvenes")}
            style={{ padding: '10px 20px', backgroundColor: categoriaFiltrada === "Jóvenes" ? '#007bff' : '#f0f0f0', color: categoriaFiltrada === "Jóvenes" ? '#fff' : '#000', border: '1px solid #ccc', cursor: 'pointer', borderRadius: '4px' }}
          >Jóvenes</button>
          <button 
            onClick={() => setCategoriaFiltrada("Adultos")}
            style={{ padding: '10px 20px', backgroundColor: categoriaFiltrada === "Adultos" ? '#007bff' : '#f0f0f0', color: categoriaFiltrada === "Adultos" ? '#fff' : '#000', border: '1px solid #ccc', cursor: 'pointer', borderRadius: '4px' }}
          >Adultos</button>
          {categoriaFiltrada && (
            <button 
              onClick={() => setCategoriaFiltrada("")}
              style={{ padding: '10px 20px', backgroundColor: '#dc3545', color: '#fff', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
            >Ver Todos</button>
          )}
        </div>
      </section>

      {/* --- LISTADO DE TARJETAS DE DEPORTES --- */}
      <section style={{ marginBottom: '30px' }}>
        <h3>Deportes Disponibles ({deportesFiltrados.length})</h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          {deportesFiltrados.map((deporte) => {
            const esSeleccionado = deporteSeleccionado?.id === deporte.id;
            return (
              <div 
                key={deporte.id} 
                onClick={() => {
                  setDeporteSeleccionado(deporte);
                  // Opcional: Reiniciar seguro a la opción base al cambiar de deporte
                  setSeguroSeleccionado(opcionesSeguro[0]); 
                }}
                style={{
                  border: esSeleccionado ? '2px solid #28a745' : '1px solid #ccc',
                  backgroundColor: esSeleccionado ? '#e8f5e9' : '#fff',
                  padding: '15px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <h4>{deporte.nombre}</h4>
                <p><strong>Profesor:</strong> {deporte.profesor}</p>
                <p><strong>Categoría:</strong> {deporte.categoria}</p>
                <p><strong>Precio Mensual:</strong> ${deporte.precioMensual}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* --- SELECCIÓN ÚNICA DE SEGURO Y RENDEREADO CONDICIONAL --- */}
      <section style={{ borderTop: '2px solid #eee', paddingTop: '20px' }}>
        {!deporteSeleccionado ? (
          // Mensaje indicativo si no hay selección
          <div style={{ padding: '20px', backgroundColor: '#fff3cd', color: '#856404', borderRadius: '4px', textAlign: 'center' }}>
            <strong>Por favor, selecciona un deporte de la lista superior para comenzar tu inscripción.</strong>
          </div>
        ) : (
          // Panel de inscripción activo
          <div>
            <h3>Configuración de Cobertura</h3>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="seguro-select" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
                Selecciona el tipo de seguro requerido:
              </label>
              <select 
                id="seguro-select"
                value={seguroSeleccionado.id} 
                onChange={handleSeguroChange}
                style={{ width: '100%', padding: '10px', fontSize: '16px', borderRadius: '4px', border: '1px solid #ccc' }}
              >
                {opcionesSeguro.map((seguro) => (
                  <option key={seguro.id} value={seguro.id}>
                    {seguro.tipo} (+{seguro.incremento}%)
                  </option>
                ))}
              </select>
            </div>

            {/* RESUMEN DE INSCRIPCIÓN */}
            <div style={{ backgroundColor: '#f8f9fa', padding: '20px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
              <h3 style={{ marginTop: 0, color: '#2d3748' }}>Resumen de Inscripción</h3>
              <p><strong>Deporte:</strong> {deporteSeleccionado.nombre} ({deporteSeleccionado.categoria})</p>
              <p><strong>Profesor asignado:</strong> {deporteSeleccionado.profesor}</p>
              <p><strong>Costo Base Mensual:</strong> ${deporteSeleccionado.precioMensual}</p>
              <p><strong>Seguro Adicional:</strong> {seguroSeleccionado.tipo} (+{seguroSeleccionado.incremento}%)</p>
              <hr style={{ border: 'none', borderTop: '1px solid #cbd5e0', margin: '15px 0' }} />
              
              <h2 style={{ color: '#28a745', margin: '0 0 20px 0' }}>
                Precio Final: ${calcularPrecioFinal().toFixed(2)}
              </h2>

              <button 
                onClick={() => alert(`Inscripción confirmada para ${deporteSeleccionado.nombre}`)}
                style={{ width: '100%', padding: '12px', backgroundColor: '#28a745', color: '#fff', border: 'none', fontSize: '16px', fontWeight: 'bold', borderRadius: '4px', cursor: 'pointer' }}
              >
                Confirmar Inscripción
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}

export default App;

