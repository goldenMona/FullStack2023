import Pais from "./Pais"
import { useState,useEffect } from "react";

const MostrarPaises=({paises})=>{

    const [paisSeleccionado, setPaisSeleccionado] = useState(null);
    

    const Show = (pais) => {
      setPaisSeleccionado(pais);
    };
  
    if (paises.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    }
  
    if (paises.length > 1) {
      return (
        <div>
          {paises.map((pais, index) => (
            <div key={index}>
              <p>
                {pais.name.common}
                <button onClick={() => Show(pais)}>Show</button>
              </p>
            </div>
          ))}
         {paisSeleccionado && <Pais pais={paisSeleccionado} />}
        </div>
      );
    }
  
    if (paises.length === 1) {
      return <Pais pais={paises[0]} />;
    }
  
    return null; // Manejar otros casos no manejados
  };
export default MostrarPaises;