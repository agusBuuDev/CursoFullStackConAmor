import { useState } from 'react'
import { useEffect } from 'react'
import axios from 'Axios'
import Perdonform from './components/Personform'
import Filtro from './components/Filtro'
import Persona from './components/Persona'
import Personform from './components/Personform'
import agendaHandle from './services/contactos'
import Notificacion from './components/Mensajes'
import './index.css'


const App = () => {
  
  const [entradaName, setEntradaName] = useState('') //esta entrada levanta el input de NOMBRE
  const [entradaPhone, setEntradaPhone] = useState(0) //levanta el input teléfono
  const [contactos, setContactos] = useState([])//modifica el estado de la agenda
  const [search, setSearch] = useState('')//levanta los términos de búsqueda
  const [errorMensaje, setErrorMensaje] = useState(null) //mensaje de error o confirmación 
  const [tipoError, setTipoError] = useState('')//maneja el color de las notificaciones que aparecen en pantalla, pasa como parámetro tipo al componente notificacion, y se usa como clase css
 
 //saludo

 console.log('Hello! claramente el objetivo de esta parte es entender los conceptos acerca de las comunicaciones entre react y un servidor a través de una api. los estilos implementados son intencionalmente feos jajaj')
 
  //carga localmente la agenda desde el servidor
const recargar = ()=>{
  agendaHandle.getAll()
  .then(response => {
    setContactos(response.data);
  })
  .catch(error => {
    console.error('Error fetching contacts:', error);
  }) 
  console.log('recargado...')
}

    useEffect(() => {
    console.log('effect')
    recargar()  }, [])

//notificaciones o errores en pantalla que se muestran por 5 segundos
  const mostrarError= (msj, tipo) =>{
    setTipoError(tipo)
    console.log('la función mostrarError fue llamada')
    setErrorMensaje(msj)
    setTimeout(() => {
      setErrorMensaje(null)
    }, 5000)
  }
  
  //variables auxiliares y función  para la lógica de verificar contactos existentes en la agenda
  let existeName = false 
  let existePhone = false

  const verificarExistentes = () =>{
  
    contactos.map (contacto => {
      existeName= contacto.name == entradaName ? true : existeName 
      existePhone = contacto.phone == entradaPhone ? true : existePhone              
  })}
//función de añadir contacto. 
  const addContacto = (event) => {
    event.preventDefault()//previene reload
    verificarExistentes()//verifica si ya existe
    console.log('existe?', existeName, entradaName, entradaPhone); // verificación en consola para ver si existe el nombre y/o numero

    if (existeName==false && existePhone==false){
        const nuevoContacto = {
        name: entradaName,
        phone: entradaPhone,
        
      } //se crea un objeto tipo contacto para añadir al array 
      setContactos(contactos.concat(nuevoContacto)) //se usa el metodo concat para crear una copia deñ array y no modificar directamente el estado
      const reset= () => recargar()
      //enviamos el nuevo contacto al json-server
      agendaHandle
      .create(nuevoContacto, reset)
      setEntradaName('')  
      setEntradaPhone('') 
      mostrarError('Contacto agregado correctamente', 'notificacion')
      console.log(errorMensaje)
      
    } else{

    }
    if (existeName){
      const mensaje = 'el contacto '+entradaName+' ya existe en la agenda desea reemplazar su número por uno nuevo?'
      if(confirm(mensaje)){ //la funcion confirm permite aceptar o rechazar la acción. 
        const reset= () => recargar()
        const contactoFind = contactos.find(contacto=>contacto.name==entradaName)
        console.log('encontró el contacto: ', contactoFind.id)
        const contactoUpdate = {...contactoFind, phone:entradaPhone}
        console.log('contacto update quedó así: ', contactoUpdate)
        agendaHandle.update(contactoFind.id, contactoUpdate, reset)
               
        setEntradaName('')  
        setEntradaPhone('') 
      
      }else{
        mostrarError('El contacto no fue actualizado', 'error')
        setEntradaName('')  
        setEntradaPhone('') 
      }
      
      
    } if(existePhone){
      alert ('el número de teléfono '+entradaPhone+' ya existe en la agenda')
      setEntradaName('')  
      setEntradaPhone('')  
      }
    }

    const deleteContacto = (id) => {
      const reset= () => recargar() //este recargar se asegura de que un contacto que fue recién cargado ya se encuentre en el 
      //servidor antes de intentar borrarlo, de esta manera nos evitamos un 404 si el usuario intenta borrar inmediatamente después de agregar.
      const mensaje= '¿Está seguro de eliminar el contacto?'
      if(confirm(mensaje)){
        agendaHandle.deletePerson(id, reset)
        .then (response=>mostrarError(`El contacto ${id} fue eliminado`, 'notificacion'))
        .catch (error=> mostrarError('el contacto ya no existe en el servidor', 'error') )
        
      }else{
        mostrarError('no se eliminó el contacto', 'error')
      }
      
        
    }

  return (
    <div>
      <h1>Mi Agenda retro coquette</h1>

      <h2>Buscar contacto</h2>
      <Filtro search={search} setSearch={setSearch} contactos={contactos} /> 

      <h2>Agregar nuevo contacto</h2>
      <Personform addContacto={addContacto} entradaName={entradaName} entradaPhone={entradaPhone} setEntradaName={setEntradaName} setEntradaPhone={setEntradaPhone} />
      <Notificacion mensaje={errorMensaje} tipo={tipoError} />
    <div className = 'list'>
    <ul>          
    {contactos.map(contacto => <Persona key={contacto.name} contacto={contacto} deleteP={()=>deleteContacto(contacto.id)} />  )}
    </ul>
    </div>
    </div>
  )
}

export default App
