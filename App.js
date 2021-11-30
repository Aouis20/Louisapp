import React, {useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  Image,
  View,
  FlatList,
  TextInput,
  ActivityIndicator,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  TouchableHighlight,
  ScrollView,
  Pressable
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
  const [number, onChangeNumber] = React.useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [state, setState] = useState({ 
    selected: {}
  }) 

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

  function getImage(poster_path) {
    return 'https://image.tmdb.org/t/p/w500' + poster_path
  }


  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>TMDB App</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeNumber}
        value={number}
        placeholder="Rechercher un film"
      />
      <Text style={styles.title2}>Les mieux notés</Text>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={styles.list}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={data}
          keyExtractor={({id}, index)=> id}
          renderItem={({item}) =>(

          
          <View>

            {/* POPUP */}
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <Text style={styles.modalText}>{state.selected.poster_path}</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>

            {/* FILM */}
            <TouchableOpacity style={styles.movie_item}>
              <Text style={styles.text}>{item.title}</Text>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
              >
                <Image
                  style={styles.principal_image}
                  source={{uri:getImage(item.poster_path)}}
                />
              </Pressable>
            </TouchableOpacity>

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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
    color: '#FFF',
  },
  input: {
    margin: 15,
    backgroundColor: '#FFF',
    height: 40,
    borderWidth: 1,
    padding: 10,
    borderRadius: 20,
    minWidth: 150,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF',
  },
  title2: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    left: 0,
    position: 'relative',
  },
  principal_image: {
    width: 180,
    height: 250,
  },
  text: {
    fontSize: 15,
    color: '#FFF',
    position: 'absolute',
    backgroundColor: '#000',
    opacity: 0.5,
    fontWeight: 'bold',
    width: '100%',
  },
  list: {
    padding: 10,
    margin: 0,
    position: 'relative',
  },
  movie_item: {
    margin: 10,
    height: 300,
  },
  container2: {
    marginTop:30,
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#FFF',
    height: 350,
    width: '80%',
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
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
export default App;