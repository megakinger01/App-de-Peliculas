import axios from "axios";



const movieDB = axios.create({
    baseURL: 'https://api.themoviedb.org/3/movie',
    params: {
        api_key: '931539899f2f52de4b8203acbf74fd92',
        language: 'es-ES'
    }
})

export default movieDB;