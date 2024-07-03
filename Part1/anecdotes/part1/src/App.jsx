import { useState } from 'react'

const Button = ({onClick, text}) => <><button onClick={onClick}>{text}</button></>
const Anecdote = ({array, anecdote, index}) =>{
  console.log(index)
  if (array.length === 0 ){
      return (
          <>
          <p>No hay anecdotas para contar</p>
          </>
      ) // Maneja el caso de un array vacío
    }if (anecdote===0){
      return(
      <>
          <p>Presiona el botón para leer una anecdota</p>
      </>//textoo que se muestra al cargar la app
      )
  }else{
      
      return(
        <>
        <p>
            {array[index]}
        </p>
        </>
      ) 
  }
   

}

function App() {
  const [anecdote, setAnecdote] = useState(null)
  const [votes, setVotes] = useState(Array(8).fill(0))
  const showAnecdote= () => {
    setAnecdote(anecdote + 1)
    console.log(anecdote)
}
const maxVotesIndex = votes.indexOf(Math.max(...votes));
const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  const randomIndex = Math.floor(Math.random() * anecdotes.length)
  const vote = (index) => {
    if(anecdote!==null){
    const copy = [...votes]
    copy[index]= copy[index]+1
    setVotes(copy)
    console.log(votes)
   }
  }
  const indexmax= Math.max(votes)
  return (
    <>
      <div>
        <h1>Anecdote of the day</h1>
      <Anecdote array={anecdotes} anecdote={anecdote} index={randomIndex} />     
      <Button
        onClick={showAnecdote}
        text='Next anecdote'
      />  
      <Button onClick={() => vote(randomIndex)} text="Vote" />
      <h1>Anecdote with most votes</h1>
      
      {console.log(maxVotesIndex)}
      {anecdotes[maxVotesIndex]}



      </div>
      </>

  )
}

export default App
