import axios from 'Axios'
const baseUrl = 'http://localhost:3001/persons/'

const getAll = (mensaje) => {
    return axios
    .get(baseUrl)
    
  }
  
  const create = (newObject, reset) => {
    return axios.post(baseUrl, newObject)
    .then(reset)
  }
  
  const update = (id, newObject, reset, mensaje) => {
    return axios.put(`${baseUrl}${id}`, newObject)
    .then(reset)
    

  }
  const deletePerson = (id, reset) =>{
    return(
    axios.delete(`${baseUrl}${id}`)
    .then(reset)
    )
    
    

  }
  
  export default {getAll, create, update, deletePerson}