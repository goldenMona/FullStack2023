import Person from "./Person";

const Number=({persons,borrar})=>{
    return(
        <div>
      <Person persons={persons} borrar={borrar}/> 
        </div>
    )
}
export default Number;