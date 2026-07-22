
export default function ResumenInscripcion({ deporte, opcionesSeguro, seguroSeleccionado, setSeguroSeleccionado, precioFinal }) {
  return (
    <div>
      <h2>Resumen de Inscripción</h2>
      <p>Deporte: {deporte.nombre}</p>
      <p>Profesor: {deporte.profesor}</p>
      <select value={seguroSeleccionado.id} onChange={e => setSeguroSeleccionado(opcionesSeguro.find(s => s.id === e.target.value))}>
        {opcionesSeguro.map(s => (
          <option key={s.id} value={s.id}>{s.tipo}</option>
        ))}
      </select>
      <p>Precio Final: ${precioFinal.toFixed(2)}</p>
      <button>Confirmar</button>
    </div>
  );
}
