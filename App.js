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
// import {MaterialCommunityIcons} from '@expo/vector_icons'
// import { NavigationContainer } from '@react-navigation/native'

// Screens
import Home from './screens/home'
import Profile from './screens/profile'
import Recents from './screens/recents'

// Lien API
// BASE_URL : https://api.themoviedb.org/3
// KEY : ?api_key=ecc51c8258646afe0ddd18a4d8eeedd8

// TOP_RATED : movie/top_rated
// DETAILS_MOVIE : /movie/{movie_id}

const movieURL = "https://api.themoviedb.org/3/movie/top_rated?api_key=ecc51c8258646afe0ddd18a4d8eeedd8"
// const Tab = createMaterialBottomTabNavigator();

// APP
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
      
        {/*
        <NavigationContainer>
          <Tab.Navigator
          initialRoute="Home"
          activeColor="#02ad94"
          inactiveColor="#dedede"
          style={{backgroundColor: '#000'}}
          barStyle={{backgroundColor: '#0f0f0f', padding: 4}}
          >
          <Tab.Screen
            name="Home"
            component={Home}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name = 'home' color={color} zise={28} />
              )
            }}
          />
            
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name = 'camera-matering-spot' color={color} zise={28} />
              )
            }}
          />

          <Tab.Screen
            name="Recents"
            component={Recents}
            options={{
              tabBarLabel: '',
              tabBarIcon: ({color}) => (
                <MaterialCommunityIcons name = 'account' color={color} zise={28} />
              )
            }}
          />
          </Tab.Navigator>
        </NavigationContainer>
        */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={({id}, index)=> id}
          renderItem={({item}) =>(
            <View>
              {/*
              <Image
                style={styles.principal_image}
                source={{
                  uri: 'https://image.tmdb.org/t/p/w500/'+({item.poster_path}.toString()),
                }}
              />
              */}
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