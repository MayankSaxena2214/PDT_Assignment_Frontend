import React from 'react'

const PlayerCard = ({player}) => {
  return (
    <div className="player-card">
        <div className="player-image">
          <img src={player.avatar.url} alt="Player Image" />
        </div>
        <div className="player-description">
          <h2>{player.name} | {player.team}</h2>
          <p>{player.sports}</p>
          <p>{player.position}</p>
        </div>
    </div>
  )
}

export default PlayerCard