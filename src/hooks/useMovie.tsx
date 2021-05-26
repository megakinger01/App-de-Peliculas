import { useEffect, useState } from "react"
import movieDB from "../api/movieDB"
import { Movie, MovieDBResponse } from "../interfaces/movieDBNowPlaying"


interface MoviesState {
    nowPlaying: Movie[];
    popular: Movie[];
    topRated: Movie[];
    upComing: Movie[];
}


export const useMovie = () => {


    const [isLoading, setIsLoading] = useState(true)
    const [movieState, setMovieState] = useState<MoviesState>({
        nowPlaying: [],
        popular: [],
        topRated: [],
        upComing: [],
    })

    const getMovies = async () => {

        const nowPlayingPromise = movieDB.get<MovieDBResponse>('/now_playing')
        const popularPromise = movieDB.get<MovieDBResponse>('/popular')
        const topRatedPromise = movieDB.get<MovieDBResponse>('/top_rated')
        const upComingPromise = movieDB.get<MovieDBResponse>('/upcoming')

        const resps = await Promise.all([
            nowPlayingPromise,
            popularPromise,
            topRatedPromise,
            upComingPromise
        ])

        setMovieState({
            nowPlaying: resps[0].data.results,
            popular: resps[1].data.results,
            topRated: resps[2].data.results,
            upComing: resps[3].data.results,
        })

        setIsLoading(false)
    }


    useEffect(() => {
        getMovies()
    }, [])

    return {
        ...movieState,
        isLoading
    }

}
