import { useEffect, useState } from 'react'
import {getDeportes} from "./services/api.js"
import './App.css'
const opcionesSeguro = [
{ id: "s1", tipo: "Cobertura Base (Municipal)", incremento: 0 },
{ id: "s2", tipo: "Cobertura Intermedia (Provincial)", incremento: 15 },
{ id: "s3", tipo: "Cobertura Alta Competencia (Nacional)", incremento: 30 }
];

function App() {
  const [deportes, setDeportes] = useState([]);
  const [filtro, setFiltro]= useState("Todos");
  const [deporteSel, setDepoirteSel]= useState(opcionesSeguro[0]);
  useEffect(()=>{
 getDeportes().then(res=> setDeportes(res.data));
  }, []);

  const deportesFiltrados = filtro === "Todos"
  ? deportes
  : deportes.filter(d => d.categoria === filtro);

  const calcularPrecioFinal = ()=> {
    if(!deporteSel) return 0;
    const precio= parseFloat(deporteSel.presioMensual);
    return precio + (precio* seguroSel.incremento / 100);
  };
  return(
    <div className='min-h-screen bg-gray-100 p-6'>
      <h1  className='text-3xl font-bold text-center mb-6 '>
        Escuelas Deportivas Municipales
      </h1>
      <div className='flex justify-center gap-3 mb-6'>
        {["todos", "niños", "adultos"].map(cat=>(
          <button
          key= {cat}
          onClick={()=> setFiltro(cat)}
          className={"px-4 py-2 rounded-x1 font-semibold ${filtro=== cat? "bg-black text_white" : "bg-white"}"}>
            {cat}
          </button>
        ))}
      </div>
      <div className='grid md:grid-cols-3 gap-4 max-w-5xl mx-auto'>
        {deportesFiltrados.map(d =>(
          <div 
          key= {d.id}
          onClick={()=>{setDepoirteSel(d); setSeguroSel(opcionesSeguro[0]);}}
          className={"bg-white p-4 rounded-2xl shadow cursor-pointer hover: shadow-lg ${deporteSel?.id === d.id? "border-2 border-black" : ""}"}>
            <h3>${d.nombre}</h3>
            <p>PROF: {d.profesor}</p>
            <p>Categoria: ${d.categoria}</p>
            <p>${d.presioMensual}</p>

          </div>
        ))}

      </div>
      <div className=' max-w-2xl mx-auto mt-8'>
        {deporteSel?(
          <div className='bg-white p-6 rounded-2xl shadow'>
            <h2 className='text 2xl font-bold mb-4'>Resumen de incripcion</h2>
            <p>Deporte: {deporteSel.nombre}</p>
            <p>Profesor: {deporteSel.profesor}</p>
            <p>Precio Base: ${deporteSel.presioMensual}</p>
            <label>seleccionar seguro: </label>
              <select
              value={setSeguroSel.id}
              onChange={(e)=> setSeguroSel(opcionesSeguro.find(satisfies.id === e.target.value))}
              className='w-full border p-2 rounded mt-1'>{opcionesSeguro.map(s => (
                <opcion key={s.id} value={s.id}>{s.tipo} + {s.incremento} %</opcion>
              ))}</select>
              <p>PRECIO FINAL: ${calcularPrecioFinal(.toFixed(2)}</p>
              <button>confirmar inscripcion</button>
           
          </div>
        ):(
          <p>selecciona un deporte para ver el resumen </p>
        )}

      </div>
    </div>
  );
}
export default App;