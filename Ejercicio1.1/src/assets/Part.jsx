
const Part =({part})=>{
    return (
        <div>
          <p>
            {part.name} Total de Ejercicios: {part.exercises}
          </p>
        </div>
      );
}

export default Part;