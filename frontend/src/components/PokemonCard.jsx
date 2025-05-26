import React from "react";

function PokemonCard({ pokemon, onAdd }) {
    return (
        <div className="pokemon-card">
            <h3>{pokemon.name}</h3>
            <button onClick={() => onAdd(pokemon)}>Adicionar ao Time</button>
        </div>
    );
}

export default PokemonCard;
