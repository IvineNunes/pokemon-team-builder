import React from "react";

function Team({ team }) {
    return (
        <div className="team">
            <h2>Seu Time</h2>
            <ul>
                {team.map((pokemon, index) => (
                    <li key={index}>{pokemon.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default Team;
