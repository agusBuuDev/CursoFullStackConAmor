import { useState } from 'react'

const StatisticsLine = ({text, value}) => <><tbody><tr><th>{text}:</th><th> {value}</th></tr></tbody></>

const Statistics = ({porcentaje, total, good, bad, neutral, average}) =>{   
        if (total!== 0){
            return(
                <>
                <table border='1px'>
                <StatisticsLine text='Good' value={good}/>
                <StatisticsLine text='Neutral' value={neutral}/>
                <StatisticsLine text='Bad' value={bad}/>
                <StatisticsLine text='Total' value={total}/>
                <StatisticsLine text='Positive %' value={porcentaje}/>
                <StatisticsLine text='Average' value={average}/>
                </table>
                </>            

            )
        }else {
            return(
                <>
                <p>No feedback given</p>
                </>
            )            
        }  
}

const Button = ({onClick, text}) => <><button onClick={onClick}>{text}</button></>
const App = () => {
  // guarda los clics de cada botón en su propio estado
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  
  
  const increaseFeed= (feedback, setFeedback) => ()=>{
    let feed= feedback + 1
    setFeedback(feed)
    console.log(feed)
    setTotal(total + 1)
    }
    
  const porcentaje= total!== 0 ? good*100/total : 0 // tiene un if acortado para que muestre cero cuando aún no se presionó ningún botón
  const average = total !== 0 ? (good - bad) / total : 0
  
 return (
    <div>
    <h1>Give feedback</h1>
     <Button
        onClick={increaseFeed(good, setGood)}
        text='Good'
      />  
      <Button
        onClick={increaseFeed(neutral, setNeutral)}
        text='Neutral'
      />  
      <Button
        onClick={increaseFeed(bad, setBad)}
        text='Bad'
      />      
      <h1>Statistics</h1> 
    <Statistics porcentaje={porcentaje} total={total} good={good} bad={bad} neutral={neutral} average={average} />
    
    
     
    </div>
    
  )
}

export default App