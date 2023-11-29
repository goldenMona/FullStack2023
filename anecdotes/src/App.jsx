import React, { useState } from 'react'
import ReactDOM from 'react-dom'


const Anecdote=({anecdotes,selected,votes})=>{
  return( <div>
    
    <p>{anecdotes[selected]}</p>
    <p>has {votes[selected]} votes</p>
  
  </div>)
}

const Vote = ({ votes, selected, setVotes }) => {
  const newVotes = [...votes];
  newVotes[selected] += 1;
  setVotes(newVotes);
    console.log(newVotes)
};
const Next = ({anecdotes,setSelected}) => {
    
 
  const newSelected = Math.floor(Math.random() * anecdotes.length);
  setSelected(newSelected);
};

const App = () => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0));
  var mostVotes=Math.max(...votes)
  const mostIndex=votes.indexOf(mostVotes)

  
  return (
    
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={anecdotes} selected={selected} votes={votes}/>
      <button onClick={()=>Next({anecdotes,selected,setSelected})}>next anecdote</button>
      <button onClick={() => Vote({ votes, selected, setVotes })}>vote</button>

       <h1>Anecdote with most votes</h1>
       <Anecdote anecdotes={anecdotes} selected={mostIndex} votes={votes}/>
    </div>
    
  );
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

export default App
