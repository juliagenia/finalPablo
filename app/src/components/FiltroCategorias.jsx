
export default function FiltroCategorias({ setCategoriaFiltro }) {
  return (
    <div>
      <button onClick={() => setCategoriaFiltro("niños")}>Niños</button>
      <button onClick={() => setCategoriaFiltro("jovenes")}>Jóvenes</button>
      <button onClick={() => setCategoriaFiltro("adultos")}>Adultos</button>
      <button onClick={() => setCategoriaFiltro(null)}>Todos</button>
    </div>
  );
}
