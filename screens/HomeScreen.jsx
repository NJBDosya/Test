import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Loading } from '../components/Loading';
import { auth } from '../firebase'


const HomeScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([])
  const [filteredData, setFilteresData] = useState([])

  useEffect(() => {
    fetchData("https://6421375186992901b2add8ef.mockapi.io/Book");
  }, []);

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        navigation.replace("Login")
      })
      .catch(error => alert(error.message))
  }

  useEffect(() => {
    navigation.setOptions({
      // headerLargeTitile: true,
      headerSearchBarOptions: {
        placeholder: 'Поиск',
        onChangeText: (event) => {
          seacrhFilterFunction(event.nativeEvent.text);
        }
      },
    });
  });

  const fetchData = async (url) => {
    try {
      const respone = await fetch(url);
      const json = await respone.json();
      setData(json);
      setFilteresData(json);

    }catch(error){
      console.error(error)
    }    
    setIsLoading(false);
  }

  const seacrhFilterFunction = (text) => {
    if(text){
      const newData = data.filter(item => {
        const itemData = item.name ? item.name.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      })
      setFilteresData(newData);

    }else{
      setFilteresData(data);
    }
  }
  
  if(isLoading) {
    return ( <Loading /> )
  }
  
  return (
    <ScrollView>     
      <ImageBackground
          style={ styles.container }
          source={require('../img/shelves2.jpg')}
          resizeMode='repeat'
        >
        {
          filteredData.map((obj, index) => (
            <View key={index} style={styles.square}>
              <ImageBackground
                style={styles.box}
                source={require('../img/bookHomeScreen.jpg')}
              >
                <TouchableOpacity onPress={() => { 
                  navigation.navigate('List', {
                    book: obj.book
                  })
                }}>
                  <Image style={ styles.image } source={{
                    uri: obj.image
                  }} />
                  <Text style={ styles.text }>{obj.name}</Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>        
          ))
        }
      </ImageBackground>
      <View style={styles.container2}>
        <Text>Email: {auth.currentUser?.email}</Text>
        <TouchableOpacity
          onPress={handleSignOut}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    flexDirection:'row',
    // gap: '1rem',
    flexWrap: "wrap",
  },
  square: {
    // backgroundColor: "#7cb48f",
    // width: 150,
    // height: 100,
    // margin: 4,
    marginBottom: 45,
  },
  box: {
    padding: 20,
    margin: 10,
    marginBottom: -10,
    paddingLeft: 25,
    paddingRight: 15,
    // borderBottomWidth: 0.5,
    // alignItems: 'center',
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 2,
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 10,
  },
  image: {
    width: 120, 
    height: 120,
    borderRadius: 10,
  },
  text: {
    color: "white",
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Pacifico",
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
});
