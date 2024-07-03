const Personform = ({addContacto, entradaName, entradaPhone, setEntradaName, setEntradaPhone}) =>{
    return(
<>
<form onSubmit={addContacto}>
        <label>Nombre:  </label>
        <input type='text' name='name' value={entradaName} onChange={event => setEntradaName(event.target.value)}></input>
        <br />
        <br />
        <label>Teléfono:  </label>
        <input type='number' name='phone' value={entradaPhone} onChange={event => setEntradaPhone(event.target.value)}></input>
        <br />
        <br />
        <button type='submit'>Guardar</button>
      </form>

</>

    )



}
export default Personform