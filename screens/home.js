import React from 'react'
import {StyleSheet,Text,View} from 'react-native';

const Home = ({navigation}) => {
    return (
        <View style={StyleSheet.container}>
            <Text>This is Home</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    }
});

export default Home;