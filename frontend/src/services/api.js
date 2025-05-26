import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:3000"
});

export const getPokemons = async () => {
    const response = await api.get("/pokemons");
    return response.data;
};

export const searchPokemons = async (name, type) => {
    const response = await api.get(`/pokemons/search?name=${name}&type=${type}`);
    return response.data;
};

export const addTeam = async (pokemon) => {
    const response = await api.post("/team", { pokemon });
    return response.data;
};

export const getTeam = async () => {
    const response = await api.get("/team");
    return response.data;
};
