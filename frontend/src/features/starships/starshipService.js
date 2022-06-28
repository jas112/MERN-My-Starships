import axios from "axios"

const API_URL = '/api/starships/'

// collect starship
const setStarship = async (starshipData, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.post(API_URL, starshipData, config)

    return response.data
}


// get user starships
const getStarships = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    const response = await axios.get(API_URL, config)

    return response.data
}


// remove starship
const removeStarship =  async (starshipId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
    }

    console.log(`@starshipSlice starshipId => ${starshipId}`)

    const response = await axios.delete(API_URL + starshipId, config)

    return response.data
}


const starshipService = {
    setStarship,
    getStarships,
    removeStarship
}

export default starshipService