const Part = ({part}) => {
    return(
        <>
        <p>Name: <b>{part.name}</b>, exercises: {part.exercises}</p> {//extrae los nombres y total de ejercicios de cada parte
        }
        </>
    )
}
export default Part