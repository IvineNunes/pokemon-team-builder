import React, { useEffect, useState } from "react";
import { getPokemons, searchPokemons, addTeam, getTeam } from "../services/api";
import PokemonCard from "../components/PokemonCard";
import SearchPokemon from "../components/SearchPokemon";
import Team from "../components/Team";
import "../styles/App.css";

function Home() {
    const [pokemons, setPokemons] = useState([]);
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [team, setTeam] = useState([]);

    useEffect(() => {
        getPokemons().then(data => setPokemons(data.results));
        getTeam().then(res => setTeam(res.team));
    }, []);

    const handleSearch = () => {
        searchPokemons(name, type).then(data => setPokemons(data));
    };

    const handleAddTeam = (pokemon) => {
        addTeam(pokemon).then(res => setTeam(res.team)).catch(err => {
            alert(err.response.data.error);
        });
    };

    return (
        <div className="container">
            <h1>Pokémon Team Builder</h1>
            <SearchPokemon
                name={name}
                type={type}
                onNameChange={setName}
                onTypeChange={setType}
                onSearch={handleSearch}
            />
            <div className="pokemon-list">
                {pokemons.map(poke => (
                    <PokemonCard key={poke.name} pokemon={poke} onAdd={handleAddTeam} />
                ))}
            </div>
            <Team team={team} />
        </div>
    );
}

export default Home;
