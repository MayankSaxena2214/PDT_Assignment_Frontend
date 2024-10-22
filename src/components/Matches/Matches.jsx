import React from 'react'
import "./Matches.css"
import { UserData } from '../../context/UserContext'
import MatchCard from './MatchCard';
const Matches = () => {
  const {match}=UserData();
  return (
    <div className="matches-container">
      <h1>All Matches</h1>
      {
        match && match.length>0?(
          match.map((element)=>{
            return <MatchCard key={element._id} match={element}/>
          })
        ):(
          <h1>No matches yet, Stay tuned</h1>
        )
      }
    </div>
  )
}

export default Matches