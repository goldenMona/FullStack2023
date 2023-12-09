import { useState,useEffect } from 'react'
import axios from 'axios'
import MostrarPaises from './assets/Components/MostrarPaises'





function App() {
  
  //con ayuda de axios realizamos una promesa seguida del metodo then que hace un callback a ua funcion 
  //que obtiene el contenido de la pomesa
 
  const [busqueda,setBusqueda]=useState('')
  const [paisRespose,setPaisResponse]=useState([])
  const [paises,setPaises]=useState([])
 
  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setPaises(response.data)
        console.log(response.data)
      })
  }, [])
  
 

 const Search=()=>{
    
  const parametro = busqueda.toLowerCase()

  const resultado = paises.filter(p=>p.name.common.toLowerCase().includes(parametro))

  setPaisResponse(resultado);

 }
  //este metodo asigna el contenido del input a la variable pai, cada vez que el valor del input es cambiado el
  //metodo se ejecuta
 const handleChange=(event)=>{
  
  setBusqueda(event.target.value)
  Search();
  
  console.log(paisRespose.length)
 

 }
 
 
  return(
    <div>
      Find countries <input onChange={handleChange}/>
      <MostrarPaises paises={paisRespose}/>  
      
       
    </div>
  )
}

export default App
