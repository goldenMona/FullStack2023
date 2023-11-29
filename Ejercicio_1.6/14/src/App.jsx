import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button=({funcion,text})=>{
  return(
    <button onClick={funcion}>{text}</button>
  )
}

const StatisticLine=({text,value})=>{
  return(
    
      <p>{text} {value}</p>
  
  )
}

const Statistics=({good,neutral,bad})=>{
  const All=good+neutral+bad
  if(All==0){
return <p>No feedback given</p>
  }
  return (
    <div><h1>Statistics</h1>
   
    <table>
      <tr> <StatisticLine text="good" value={good}/></tr>
      <tr><StatisticLine text="neutral" value={neutral}/></tr>
      <tr> <StatisticLine text="bad" value={bad}/></tr>
      <tr>
        <td>All</td>
        <td>{All}</td>
      </tr>
      <tr>
        <td>
         average
        </td>
        <td>{(good + bad * -1) / All}%</td>
      </tr>
      <tr>
        <td>
         positive
        </td>
        <td>{(good / All) * 100}%</td>
      </tr>
    </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>Get FeedBack</h1>
      <Button funcion={()=> setGood(good +1)} text="good"/>
      <Button funcion={()=>setNeutral(neutral +1)} text="neutral"/>
      <Button funcion={()=>setBad(bad +1)} text="bad"/>
     <Statistics good={good} neutral={neutral} bad={bad}/>
      

    </div>
  )
}

export default App
