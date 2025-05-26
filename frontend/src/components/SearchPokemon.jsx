import React from "react";

function SearchPokemon({ name, type, onNameChange, onTypeChange, onSearch }) {
    return (
        <div className="search-pokemon">
            <input
                type="text"
                placeholder="Buscar por nome"
                value={name}
                onChange={(e) => onNameChange(e.target.value)}
            />
            <input
                type="text"
                placeholder="Buscar por tipo"
                value={type}
                onChange={(e) => onTypeChange(e.target.value)}
            />
            <button onClick={onSearch}>Buscar</button>
        </div>
    );
}

export default SearchPokemon;
