//el header es el encargado de imprimir el título del curso
const Header= (props) =>{
  console.log('propos de Header', props)
  return(
    <>
    <h1>{props.name}</h1>
    </>
  )
}
//Part renderizará el nombre de la parte y la cantidad de ejercicios a partit del dato recibido por el props ingresado en content
const Part = (props) =>{
  console.log('propos de Part', props)
  return(
    <>
    <p>
        {props.part['name']} {props.part['exercises']}
      </p>     

    </>
  )
}
//content recibe los datos de los nombres de las partes y su respectiva cantidad de ejercicios y los pasa a cada parte. 
const Content = (props) =>{
  console.log('propos de Content', props)
  return(
    <>
    <Part part={props.parts[0]}/>
    <Part part={props.parts[1]}/>
    <Part part={props.parts[2]}/>
     
    </>
  )
}
//total toma los números de ejercicios y los suma para mostrar el total
const Total = (props) =>{
  console.log('propos de Total', props)
  return(
    <>
    <p>Number of exercises {props.parts[0]['exercises'] + props.parts[1]['exercises']  + props.parts[2]['exercises']}</p>
    </>

  )
}

//app es el componente raiz donde se llama al resto de los componentes. 
const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]
}
  return (
    <div>
      <Header name={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      
    </div>
  )

  
}
//exportar app es muy importante para el funcionamiento de la aplicación
export default App

//prometo solemnemente utilizar la consola del navegador durante todo el desarrollo de este curso ;)


