import React from 'react'
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { Movie } from '../interfaces/movieDBNowPlaying';


interface Props {
    movie: Movie;
    height?: number,
    width?: number
}

export const MoviePoster = ({ movie, height = 400, width = 250 }: Props) => {
    // console.log(movie);
    // console.log(movie.poster_path);

    const navigation = useNavigation()

    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    return (

        <TouchableOpacity

            activeOpacity={0.6}
            style={{
                width,
                height,
                paddingBottom: 20,
                marginHorizontal: 5
            }}
            onPress={() => navigation.navigate('DetailScreen', movie)}
        >
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.image}
                />
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({

    imageContainer: {
        flex: 1,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 6,
        },
        shadowOpacity: 0.9,
        shadowRadius: 8.30,
        elevation: 13,
    },
    image: {
        flex: 1,
        borderRadius: 20,
        marginHorizontal: 8
    },

});