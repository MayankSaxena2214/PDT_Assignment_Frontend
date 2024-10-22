import React from 'react'
import "./Players.css"
import { UserData } from '../../context/UserContext'
import PlayerCard from './PlayerCard';
const Players = () => {
  const {players}=UserData();
  return (
    <div className="player-container">
      {
        players && players.length>0?(
          players.map((player)=>{
            return <PlayerCard key={player._id} player={player}/>
          })
        ):(
          <h1>No Players yet, Stay tuned</h1>
        )
      }
    </div>
  )
}

export default Players