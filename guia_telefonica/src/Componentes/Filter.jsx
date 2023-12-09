import Number from "./Numbers";
import Person from "./Person";

const Filter=({FilterChange,filter,persons,Blur})=>{

    return(
        <div>
        filter show with:<input onChange={FilterChange} value={filter}  onBlur={Blur} />
        <Person persons={persons}/>
        </div>
    )
}
export default Filter;