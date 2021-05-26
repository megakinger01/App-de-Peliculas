import React from 'react'
import { ActivityIndicator, Dimensions, ScrollView, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import Carousel from 'react-native-snap-carousel';
import { HorizontalSlider } from '../components/HorizontalSlider';

import { MoviePoster } from '../components/MoviePoster'
import { useMovie } from '../hooks/useMovie'



const { width: windowWidth } = Dimensions.get('window')

export const HomeScreen = () => {

    const { top } = useSafeAreaInsets()
    const { nowPlaying, popular, topRated, upComing, isLoading } = useMovie()

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator color="red" size={40} />
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{ marginTop: top + 20 }}>

                {/* Carousel principal  */}
                <View style={{ height: 420 }}>
                    <Carousel
                        data={nowPlaying}
                        renderItem={({ item }: any) => <MoviePoster movie={item} />}
                        sliderWidth={windowWidth}
                        itemWidth={250}
                    />
                </View>

                {/* peliculas populares */}
                <HorizontalSlider title='Popular' movies={popular} />
                <HorizontalSlider title='Top Rated' movies={topRated} />
                <HorizontalSlider title='UpComing' movies={upComing} />

            </View>
        </ScrollView>
    )
}

{/*     */ }