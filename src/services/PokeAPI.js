import axios from "axios";

export const API = (url = "https://pokeapi.co/api/v2") => {
  return axios.create({
    baseURL: url,
  });
};

/* REQUESTS */

export const getPokemons = () => {
  return API().get("/pokemon");
};

export const getPokemonByName = (name) => {
  return API().get(`/pokemon/${name}`);
};
