export default function ListaDeportes({ deportes, onSelect }) {
  if (deportes.length === 0) return <p>No hay deportes disponibles.</p>;

  return (
    <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
      {deportes.map(d => (
        <div key={d.id} onClick={() => onSelect(d)} style={{ border: "1px solid #ccc", padding: "10px", cursor: "pointer" }}>
          <h3>{d.nombre}</h3>
          <p>Profesor: {d.profesor}</p>
          <p>Precio: ${d.precioMensual}</p>
          <p>Categoría: {d.categoria}</p>
        </div>
      ))}
    </div>
  );
}
