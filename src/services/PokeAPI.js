import axios from "axios";

const API = (url = "https://pokeapi.co/api/v2") => {
  return axios.create({
    baseURL: url,
  });
};

/* REQUESTS */
export const getAllPokemons = () => {
  return API().get("/pokemon?limit=-1");
};

export const getPokemons = () => {
  return API().get("/pokemon");
};

export const getPokemonByName = (name) => {
  return API().get(`/pokemon/${name}`);
};

export const getPokemonByNames = (names) => {
  return axios.all(names);
};

export const getInfoByUrl = (url) => {
  return API(url).get();
};

export const getRegionByName = (name) => {
  return API().get(`/region/${name}`);
};

export const getGenerationById = (id) => {
  return API().get(`/generation/${id}`);
};
