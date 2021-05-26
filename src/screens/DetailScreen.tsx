import React from 'react'
import { StackScreenProps } from '@react-navigation/stack'
import { RootStackParams } from '../navigation/Navigatio'
import { ActivityIndicator, Dimensions, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { useMovieDetails } from '../hooks/useMovieDetails';
import { MovieDetails } from '../components/MovieDetails';

import Icon from 'react-native-vector-icons/Ionicons';

interface Props extends StackScreenProps<RootStackParams, 'DetailScreen'> { }

const { height: screenHeight } = Dimensions.get('screen')

export const DetailScreen = ({ route, navigation }: Props) => {



    const movie = route.params
    const uri = `https://image.tmdb.org/t/p/w500${movie.poster_path}`

    // console.log(movie.id);
    const { isLoading, movieFull, cast } = useMovieDetails(movie.id)


    return (

        <ScrollView>

            <View style={styles.imageContainer}>
                <Image
                    source={{ uri }}
                    style={styles.imagePoster}
                />
            </View>

            <View style={styles.marginContainer}>
                <Text style={styles.subTitle}>{movie.original_title}</Text>
                <Text style={styles.title}>{movie.title}</Text>
            </View>

            <View style={{ marginTop: 20 }}>

                {
                    isLoading
                        ? <ActivityIndicator size={35} color='grey' style={{ marginTop: 20 }} />
                        : <MovieDetails cast={cast} movieFull={movieFull!} />
                }
            </View>


            <TouchableOpacity style={styles.backBtn}
                onPress={() => navigation.pop()}
            >
                <Icon
                    name="arrow-back-outline"
                    size={50}
                    color='grey'

                />
            </TouchableOpacity>

        </ScrollView>

    )
}


const styles = StyleSheet.create({
    imageContainer: {
        overflow: 'hidden',
        width: '100%',
        height: screenHeight * 0.7,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.24,
        shadowRadius: 8,
        elevation: 9,

        borderBottomEndRadius: 14,
        borderBottomStartRadius: 14,
    },
    imagePoster: {
        flex: 1
    },
    marginContainer: {
        marginHorizontal: 20,
        marginTop: 20,
    },
    subTitle: {
        fontSize: 16,
        opacity: 0.8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    },
    backBtn: {
        position: 'absolute',
        top: 20,
        left: 5,
        zIndex: 999,
        elevation: 9
    }
});