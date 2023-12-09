import { useEffect, useState } from 'react'
import Number from './Componentes/Numbers';
import Filter from './Componentes/Filter';
import personService from './Servicios/person'
import './App.css'

function App() {
  const [persons, setPersons] = useState([])
  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState('')
  const [showPerson, setShowPerson] = useState([])


  useEffect(() => {
    personService.getAll()
      .then(arrayDevuelto =>
        setPersons(arrayDevuelto))
  }, [])//El segundo parametro [] representa una matriz vacia inidicando que solo se ejecutara una vez siendo esta
  //cuando el componente se cree

  //AddPerson es un controlador de eventos de el formulario se llamara cunado se envie el
  //el formulario cuando se de click al boton submit(cualquier boton marcado con este type sera
  //el boton encargado de enviar el formulario)
  const AddPerson = (event) => {
    //evita la acción predeterminada de enviar un formulario
    event.preventDefault()

    const personObject = {
      name: newName,
      number: newNumber,
    }
    //En caso que se repita el nombre 
    if (persons.some((person) => person.name == newName)) {
      const cadena = personObject.name + "It is already included in the phonebook, you want to replace your number with a new one?"

      if (window.confirm(cadena)) {
        //se obtiene el id de la persona a la cual se actualizara 
        const id = persons.find(persona => persona.name === personObject.name).id
        let error=false;
        personService.update(id, personObject)
          .then(returned => { setPersons(persons.map(p => p.id !== id ? p : returned)) })
          .catch(() => {
            error=true
            setErrorMessage('Person ' + personObject.name +' has already been removed from server') 
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000);
          })

          if(error){
            setNewName('')
            setNewNumber('')
            setMessage('Updated ' + personObject.name)
            setTimeout(() => {
              setMessage(null)
            }, 5000);
          }
       

      }

    }
    else {
      personService
        .create(personObject)
        .then(personReturned => {
          console.log(personReturned)
          setPersons(persons.concat(personReturned))
          setNewName('')
          setNewNumber('')
          setMessage('Added ' + personObject.name)
          setTimeout(() => {
            setMessage(null)
          }, 5000);

        })
    }
  }

  //Evento encargado de cambiar el valor de la variable newName por medio del formulario
  const changeController = (event) => {
    console.log(event.target.value)

    //Asigna el contenido del input a la variable NewPerson
    setNewName(event.target.value)
  }

  //Evento encargado de cambiar el valor de la variable newNumber por medio del formulario
  const changeNumber = (event) => {
    console.log(event.target.value)

    //Asigna el contenido del input a la variable NewNumber
    setNewNumber(event.target.value)
  }

  const FilterChange = (event) => {
    //Cada que el texto del input filter cambie se ejecutara el metodo de busqueda 
    Search()
    setFilter(event.target.value)

  }

  const Search = () => {
    const searchTermLowerCase = filter.toLowerCase();

    // Filtrar personas que coincidan con el término de búsqueda (sin distinción de mayúsculas y minúsculas)
    const filtered = persons.filter(person =>
      person.name.toLowerCase().includes(searchTermLowerCase)
    );
    //Cambia personas a solo las filtradas
    setShowPerson(filtered)
  }
  //Controlador de evento Cuando el input buscar pierde el foco

  const Blur = () => {
    setShowPerson([])
  }
  const borrar = (id, name) => {

    if (window.confirm('Delete ' + name + '?')) {
      personService.suprimir(id)
        .then(result => {
          console.log(result.data);
          // Actualiza el estado de persons después de eliminar el elemento
          setPersons(persons.filter(person => person.id !== id));
        })
    }

  }
  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="not">
        {message}
      </div>
    )
  }
  const ErrorNotification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className="error">
        {message}
      </div>
    )
  }


  return (
    <div >

      <h2>Phonebook</h2>

      <Filter FilterChange={FilterChange} filter={filter} persons={showPerson} Blur={Blur} />
      <ErrorNotification message={errorMessage} />
      <h3>Add a New</h3>


      <form onSubmit={AddPerson}>
        <div>
          name: <input value={newName}
            onChange={changeController} />
        </div>
        <div>number: <input value={newNumber} onChange={changeNumber} /></div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h3>Numbers</h3>
      <Notification message={message} />
      <Number persons={persons} borrar={borrar} />

    </div>
  )
}

export default App
