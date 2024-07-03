import './App.css';
import { useState } from "react"
import { useEffect } from 'react'
import Search from './components/Search'
import axios from 'Axios'


function App() {
  const apiCLima = import.meta.env.VITE_APICLIMA
  const [paises, setPaises]= useState ([])
  const [currency, setCurrency]= useState ('')
  const [clima, setClima]=useState ([])
  const[ubicacion, setUbicacion]=useState('')
  const [temperatura, setTemperatura]=useState('')
  const paisesURL= 'https://restcountries.com/v3.1/name/'
  const climaURL= 'https://my.meteoblue.com/packages/current?apikey='+apiCLima
  const formatClima= '&asl=14&format=json'  
  const ubicacionURL='https://www.meteoblue.com/en/server/search/query3?query='
  const formatUbicacion= '&apikey=DEMOKEY'
  
  
  console.log(currency)
  //useefect hace un llamaddo a la api para buscar conincidencias cada vez que se actualiza el estado de currency
  useEffect(() => {
      const buscarPais = async () => {
      try {
        const response = await axios.get(paisesURL + currency)
        setPaises(response.data); // Establece los datos de los países encontrados
         console.log(paises)
      } catch (error) {
        console.error('Error al buscar países:', error)
        setPaises([]) // Limpia los países en caso de error
      }
    }
     if (currency.trim() !== '') {//trim elimina espacios vacíos y saltos de línea en los extremos de las cadenas, lo que es util por si el usuario copia y pega
      buscarPais()
      
    } else {
      setPaises([]) // Limpia los países si la busqueda está vacía
    }
  }, [currency])
 
  //acá estamos intentando levantar la temperatura de la capital del país
  useEffect(() => {
    if (paises.length === 1) {
      const capital = paises[0].capital
      const buscarCoordenadas = async () => {
        try {
          const response = await axios.get(ubicacionURL + capital + formatUbicacion)
          console.log('Respuesta de ubicación:', response.data) // Verifica la respuesta recibida
          const lat=response.data.results[0].lat
          const lon=response.data.results[0].lon
          console.log('Ubicación actual:', ubicacion) // Verifica el estado de ubicación después de actualizar
          console.log('lat: ', lat, 'lon: ',lon )
          console.log(`lat=${lat}&lon=${lon}`)
          setUbicacion(`lat=${lat}&lon=${lon}`)
          console.log(ubicacion)
        } catch (error) {
          console.error('Error al buscar la ubicación', error)
        }
      }
      buscarCoordenadas()
    }
  }, [paises])

  //una vez creada la cadena de ubicacion usamos la api del clima

  useEffect(() => {
    if (ubicacion !== '') {
      const buscarClima = async () => {
        try {
          const response = await axios.get(climaURL + ubicacion + formatClima)
          setClima(response.data)
          console.log(`${climaURL}${ubicacion}${formatClima}`)
        } catch (error) {
          console.error('Error al buscar clima', error)
          setClima([])
        }
      }
      buscarClima()
    }
  }, [ubicacion])
  
  useEffect(() => {
    console.log('Estado actual de clima:', clima)
  }, [clima])
  
  useEffect(() => {
    if (ubicacion !== '') {
      const definirTemperatura = async () => {
        try {
          setTemperatura(clima.data_current.temperature)
          console.log(`la temperatura es ${temperatura}`)
        } catch (error) {
          console.error('Error al definir la temperatura', error)
          setTemperatura('error de conexión con el servidor')
        }
      }
      definirTemperatura()
    }
  }, [clima])
  
  useEffect(() => {
    console.log('Temperatura en la capital', temperatura)
  }, [clima])
  
  const mostrarResultados = (paises) => {
    let salida = '';
  
    if (paises.length < 1) {
      salida = (<p>No se encuentra el país buscado</p>)
    } else if (paises.length === 1) {
      salida = (
          <div>
          <h2>{paises[0].name.common}</h2>
          <p>Capital: {paises[0].capital}</p>
          <img src={paises[0].flags.png}/>
          <p>Zona horaria: {paises[0].timezones}</p>
          <p>Idiomas oficiales: {Object.values(paises[0].languages).join(', ')}</p>

          <h3>Datos sobre el clima actual en {paises[0].capital}</h3>
          <h5>obtenidos de meteoblue.com</h5>
          {<p>{temperatura}°C</p>}
        </div>
      )
    } else if (paises.length > 1 && paises.length < 11) {
      salida = paises.map(pais => <p key={pais.cca3}>{pais.name.common}<button onClick={()=>{setCurrency(pais.name.common)}}>Mostrar</button></p>)
    } else if (paises.length >= 11) {
      salida = (<p>Se encuentran muchos resultados, debe buscar un nombre más específico</p>)
    }
  
    return salida;
  }
  return (
    <div className='main'>
      <div className='content'>
        <h1>Información sobre paises</h1>
        <p>Buscar país</p>
        <Search currency={currency} setCurrency={setCurrency}/>
        {mostrarResultados(paises)}
        
      </div>
    </div>
  );
}

export default App
