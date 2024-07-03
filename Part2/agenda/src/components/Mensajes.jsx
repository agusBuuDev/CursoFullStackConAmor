import '../index.css'
    
const Notificacion = ({mensaje, tipo}) =>{    
    
    if (mensaje==null){
        return(null)
    }else{
       return(
            <div className={tipo}>
            <p>{mensaje}</p>
            </div>
       )
            
        }    
                     
        
    }





export default Notificacion