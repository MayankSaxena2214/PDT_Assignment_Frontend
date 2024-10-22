import React, { useEffect } from 'react';
import './MyTeams.css';
import { UserData } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

const MyTeams = () => {
  const { myTeams, isAuthenticated } = UserData();
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/login');
    }
    if (!isAuthenticated) navigate('/login');
  }, [isAuthenticated, navigate]);

  return (
    <div className="myteams-container">
      <h1>Your Fantasy Teams</h1>
      {myTeams.length > 0 ? (
        <div className="teams-list">
          {myTeams.map((team) => (
            <MyTeamCard key={team._id} team={team} />
          ))}
        </div>
      ) : (
        <p>No teams found. Please create a team.</p>
      )}
    </div>
  );
};

// Updated MyTeamCard to handle clicks
const MyTeamCard = ({ team }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/teams/${team._id}`);  // Navigate to the TeamDetails page with the team ID
  };

  return (
    <div className="teamcard" onClick={handleClick}>
      <h2>{team.name}</h2>
      {/* <p>Players: {team.players.map((player) => player.name).join(', ')}</p> */}
      <p>Click to see details</p>
      <p>Total Points: {team.totalPoints}</p>
    </div>
  );
};

export default MyTeams;
