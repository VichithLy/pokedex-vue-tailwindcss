import API from "./API";

export default{
    getPokemon(){
        return API.get('/')
    }
}
