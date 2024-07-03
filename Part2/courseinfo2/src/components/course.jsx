import Header from './header'
import Part from './part'

const Course = ({course}) =>{
    const title= course.name
    console.log(title, 'así lo levanta course'); //ver como llega el prop 
    const parts=course.parts //extrae el array de partes en un array local
    console.log(parts) //imprime el array local
    const suma = parts.reduce((sum, part)=> sum + part.exercises, 0) //se suman todos los ejercicios en cada una de las partes. 
    return(
        <>
        <Header title={title}/>
        {parts.map(part => 
          <Part key={part.id} part={part} /> //Se mapean las partes para pasar cada una como prop del componente parte
        )}
        --------------------------------------<br />
        
        
        Total exercises: {suma}
        
        </>
    )
}
export default Course