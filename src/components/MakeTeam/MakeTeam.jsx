import React, { useState, useEffect } from 'react';
import "./MakeTeam.css";
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { server } from '../../main';
import toast from 'react-hot-toast';

const MakeTeam = () => {
  const { id } = useParams();
  const location = useLocation();
  const [teamAPlayers, setTeamAPlayers] = useState([]);
  const [teamBPlayers, setTeamBPlayers] = useState([]);
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // Message state for feedback
  const [teamName, setTeamName] = useState(""); // State for team name
  const navigate = useNavigate();

  const match = location.state?.match;

  const fetchTeamsAndPlayers = async () => {
    try {
      const [teamAResponse, teamBResponse] = await Promise.all([
        axios.get(`${server}/api/v1/players/getByTeam?team=${match.teamA}`),
        axios.get(`${server}/api/v1/players/getByTeam?team=${match.teamB}`)
      ]);

      setTeamAPlayers(teamAResponse.data.players);
      setTeamBPlayers(teamBResponse.data.players);
      setLoading(false);
      
    } catch (error) {
      console.error("Error fetching players:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTeamsAndPlayers();
  }, [match]);

  const togglePlayerSelection = (player) => {
    setSelectedPlayers((prevSelected) => {
      if (prevSelected.includes(player)) {
        return prevSelected.filter((p) => p !== player);
      } else {
        if (prevSelected.length < 11) {
          return [...prevSelected, player];
        }
        return prevSelected; // Prevents selecting more than 11 players
      }
    });
  };

  const createTeam = async () => {
    if (selectedPlayers.length !== 11) {
      setMessage("Please select exactly 11 players.");
      return;
    }
    if (!teamName) {
      setMessage("Please enter a team name.");
      return;
    }

    try {
      const response = await axios.post(`${server}/api/v1/teams/create`, {
        match: match._id,
        players: selectedPlayers.map(player => player._id), // Send player IDs
        name: teamName // Include team name
      },{
        headers:{
          token:localStorage.getItem("token")
        }
      });
      setMessage(response.data.message || "Team created successfully!");
      setSelectedPlayers([]); // Clear selection after successful team creation
      setTeamName(""); // Clear the team name input
      toast.success("Team created successfully!");
      navigate("/myteams");
      window.location.reload();
    } catch (error) {
      console.error("Error creating team:", error);
      toast.error(error.response?.data?.message || "Failed to create team.");
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className='maketeam-container'>
      <h1>Create Team for Match: {match.teamA} vs {match.teamB}</h1>
      <h4>See your selected players below</h4>
      
      <input 
        type="text" 
        placeholder="Enter Team Name" 
        value={teamName} 
        onChange={(e) => setTeamName(e.target.value)} 
        className="team-name-input"
      />
      
      <div className="players-container-both">
        <div className="players-container">
          <h2>Select Players for {match.teamA}</h2>
          {teamAPlayers.map((player) => (
            <div key={player._id} className="player-card">
              <input 
                type="checkbox" 
                checked={selectedPlayers.includes(player)} 
                onChange={() => togglePlayerSelection(player)} 
              />
              <span>{player.name}</span>
            </div>
          ))}
        </div>
        <div className="players-container">
          <h2>Select Players for {match.teamB}</h2>
          {teamBPlayers.map((player) => (
            <div key={player._id} className="player-card">
              <input 
                type="checkbox" 
                checked={selectedPlayers.includes(player)} 
                onChange={() => togglePlayerSelection(player)} 
              />
              <span>{player.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="selected-players">
        <h2>Selected Players:</h2>
        {selectedPlayers.length > 0 ? (
          selectedPlayers.map((player) => (
            <div key={player._id} className="selected-player">
              {player.name}
            </div>
          ))
        ) : (
          <p>No players selected</p>
        )}
      </div>

      <button onClick={createTeam} className="create-team-button">Create Team</button>
      {message && <div className="message">{message}</div>} {/* Display message */}
    </div>
  );
};

export default MakeTeam;
