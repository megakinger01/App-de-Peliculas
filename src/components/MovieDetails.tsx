import React from 'react'
import currencyFormatter from 'currency-formatter'
import { FlatList, Text, View } from 'react-native'
import { Cast } from '../interfaces/creditDBMovie';
import { MovieFull } from '../interfaces/movieDBNowPlaying'
import Icon from 'react-native-vector-icons/Ionicons'
import { CastItem } from './CastItem'


interface Props {
    movieFull: MovieFull;
    cast: Cast[]
}

export const MovieDetails = ({ movieFull, cast }: Props) => {
    return (
        <View>
            <View style={{ marginHorizontal: 20 }}>
                <View style={{ flexDirection: 'row' }}>
                    <Icon
                        name="star-outline"
                        color="grey"
                        size={18}
                    />
                    <Text>{movieFull.vote_average}</Text>

                    <Text>
                        -  {movieFull.genres.map(g => g.name).join(', ')}
                    </Text>
                </View>
            </View>

            <Text>
                {movieFull.release_date}
            </Text>

            <Text style={{ fontSize: 16 }}>
                {movieFull.overview}
            </Text>

            <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold' }}>
                Presupuesto
            </Text>

            <Text >
                {currencyFormatter.format(movieFull.budget, { code: 'USD' })}
            </Text>

            <View style={{ marginTop: 10, marginBottom: 100 }}>
                <Text style={{ fontSize: 23, marginTop: 10, fontWeight: 'bold', marginHorizontal: 20 }}>
                    Actores
                </Text>
                <FlatList
                    data={cast}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <CastItem actor={item} />}
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}
                    style={{
                        marginTop: 10,
                        height: 50,

                    }}
                />
                {/* <CastItem actor={cast[0]}/> */}
            </View>
        </View>
    )
}
