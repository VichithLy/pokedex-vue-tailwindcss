import axios from 'axios'

export default(url='https://pokeapi.co/api/v2/pokemon/25')=>{
    return axios.create({
        baseURL:url
    })
}