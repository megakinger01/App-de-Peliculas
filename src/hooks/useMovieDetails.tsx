import { useEffect, useState } from "react"
import movieDB from "../api/movieDB"
import { MovieFull } from '../interfaces/movieDBNowPlaying';
import { Cast, Credits } from '../interfaces/creditDBMovie';

interface MovieDetail {
    isLoading: boolean;
    movieFull?: MovieFull;
    cast: Cast[];
}


export const useMovieDetails = (movieId: number) => {

    const [state, setState] = useState<MovieDetail>({
        isLoading: true,
        cast: []
    })

    const getMovieDetails = async () => {

        const movieDetailPromise = await movieDB.get<MovieFull>(`/${movieId}`)
        const castPromise = await movieDB.get<Credits>(`/${movieId}/credits`)


        const [movieDetailsResp, castResp] = await Promise.all([movieDetailPromise, castPromise])

        setState({
            isLoading: false,
            movieFull: movieDetailsResp.data,
            cast: castResp.data.cast
        })
    }


    useEffect(() => {
        getMovieDetails()
    }, [])

    return { ...state }
}
