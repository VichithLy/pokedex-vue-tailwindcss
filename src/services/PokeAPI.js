import axios from "axios";

export const API_URL = "https://pokeapi.co/api/v2";

const API = (url = API_URL) => {
  return axios.create({
    baseURL: url,
  });
};

/* REQUESTS */
export const makeConcurrentRequests = (requests) => {
  return axios.all(requests);
};

export const getAllPokemons = () => {
  return API().get("/pokemon?limit=-1");
};

export const getPokemons = () => {
  return API().get("/pokemon");
};

export const getPokemonByName = (name) => {
  return API().get(`/pokemon/${name}`);
};

export const getDataFromUrl = (url) => {
  return API(url).get();
};

export const getRegionByName = (name) => {
  return API().get(`/region/${name}`);
};

export const getGenerationById = (id) => {
  return API().get(`/generation/${id}`);
};

export const getTypeByName = (name) => {
  return API().get(`/type/${name}`);
};
