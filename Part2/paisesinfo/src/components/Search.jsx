
const Search = ({currency, setCurrency}) =>{
       
    return(
        <input type='text' name='search' value={currency} onChange={event => setCurrency(event.target.value)}></input> 
        
    )
}
export default Search