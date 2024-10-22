import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { server } from '../../main';
import { useParams } from 'react-router-dom';
// import './TeamDetails.css'; // Import the CSS file

const TeamDetails = () => {
    const { teamId } = useParams();
    const [team, setTeam] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Function to fetch team details
        const fetchTeamDetails = async () => {
            try {
                const response = await axios.get(`${server}/api/v1/teams/get/${teamId}`, {
                    headers: {
                        token: localStorage.getItem("token")
                    }
                });
                setTeam(response.data.team);  // Set the team data from response
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        // Call the function to fetch team details
        fetchTeamDetails();
    }, [teamId]);

    if (loading) return <p className="loading">Loading...</p>;
    if (error) return <p className="error">Error: {error}</p>;
    if (!team) return <p>No team found</p>;

    return (
        <div className='team-details'>
            <h1>{team.name}</h1>
            <p>Total Points: {team.totalPoints}</p>
            <p>Created By: {team.createdBy}</p>

            {/* Match Details */}
            {team.match && (
                <div className='team-details-match'>
                    <h2>Match Details</h2>
                    <p>Match between {team.match.teamA} and {team.match.teamB}</p>
                    <p>Date: {new Date(team.match.matchDate).toLocaleString()}</p>
                    <p>Location: {team.match.location}</p>
                    <p>Sport: {team.match.sports}</p>
                </div>
            )}

            {/* Players */}
            <h2>Players:</h2>
            <ul className='team-details-ul'>
                {team.players.map(player => (
                    <li key={player._id}>
                        {player.name} - {player.position} ({player.team})
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TeamDetails;
