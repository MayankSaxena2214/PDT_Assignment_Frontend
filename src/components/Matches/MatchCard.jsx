
import React from 'react';
import { useNavigate } from 'react-router-dom';
// Use the CSS provided

const MatchCard = ({ match }) => {
  const navigate = useNavigate();

  const handleCreateTeamClick = () => {
    navigate(`/match/${match._id}/create-team`, { state: { match } }); // Navigates to the team creation page
  };

  return (
    <div className="matchcard">
      <div className="fightingteams">
        <div className="fight-teamA">{match.teamA}</div>
        <div className="fight-verses">VS</div>
        <div className="fight-teamB">{match.teamB}</div>
      </div>
      <div className="details">
        <div className="details-date">{match.matchDate.substr(0, 10)}</div>
        <div className="details-sports">{match.sports}</div>
        <div className="details-location">{match.location}</div>
        <button onClick={handleCreateTeamClick}>Create Team</button> {/* Add this button */}
      </div>
    </div>
  );
};

export default MatchCard;
