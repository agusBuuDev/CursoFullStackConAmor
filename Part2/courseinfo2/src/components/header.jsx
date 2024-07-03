const Header = (title) =>{
    const name= title.title
    console.log(name, 'así lo levanta header');
    return(
        <>
        <div>
        <h2>{name}</h2>
        </div>
        
        </>
    )
}
export default Header