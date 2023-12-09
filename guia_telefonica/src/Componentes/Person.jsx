
const Person =({persons,borrar})=>{

    return (
        <div>
          {persons.map(person => (
            <li className='linea' key={person.number}>{person.name} {person.number} <button className='button' onClick={()=>borrar(person.id,person.name)}>delete</button></li>
          ))}
        </div>
      );
}

export default Person;