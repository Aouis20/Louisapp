import React, {useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  ActivityIndicator,
  SafeAreaView
} from 'react-native';

// Screens
import Home from './screens/home'
import Profile from './screens/profile'
import Recents from './screens/recents'

// Lien API
// https://api.themoviedb.org/3/movie/top_rated?api_key=ecc51c8258646afe0ddd18a4d8eeedd8
const movieURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=ecc51c8258646afe0ddd18a4d8eeedd8"

const App = () => {

  // SETTERS
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  // Récupération data
  useEffect( () => {
    fetch(movieURL)
    .then((res) => res.json())
    .then((json) => {
      setData(json.results);
    })
    .catch((error) => alert(error))
    .finally(() => setLoading(false))
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image
          style={styles.principal_image}
          source={{
            uri: 'https://image.tmdb.org/t/p/w400/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
          }}
        />
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}, index)=> id}
          renderItem={({item}) =>(
            <View>
              <Text>{item.id}. {item.title} - {item.original_language}</Text>
            </View>
          )}
        />
      )

      }
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  principal_image: {
    width: 180,
    height: 250,
  },
});

export default App;