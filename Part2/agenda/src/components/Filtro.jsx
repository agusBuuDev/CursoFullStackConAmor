import Persona from './Persona'

const Filtro = ({search, setSearch, contactos}) => {
console.log({search})
const filteredContactos = contactos.filter(contacto =>
        contacto.name.toLowerCase().includes(search.toLowerCase())
      );
return (
    <>
    <input type='text' name='name' value={search} onChange={event => setSearch(event.target.value)}></input>    
    <ul>

  {search.length > 0? filteredContactos.map(contacto => (
    <Persona key={contacto.id} contacto={contacto}  />
  )):''
  
  }
</ul>
    </>
    
      

)

}
export default Filtro