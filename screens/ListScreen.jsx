import React, { useState, useEffect } from 'react';
import { View, ImageBackground, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Loading } from '../components/Loading';

const ListScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([])
    const [filteredData, setFilteresData] = useState([])
    const { id, book } = route.params;
  
    useEffect(() => {
      fetchData('https://639aac87d5141501973b8ab0.mockapi.io/' + book);
    }, []);
  
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
          const itemData = item.title ? item.title.toUpperCase() : ''.toUpperCase();
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
      <View>
        <ScrollView>
          {
            filteredData.map((item, index) => {
              return (
                <View key={index}>
                  <TouchableOpacity style={styles.box2} onPress={() => { 
                    navigation.navigate('Info', {
                      id: item.id,
                      title: item.title,
                      book: book,
                      // name: 'Глава ' + item.id
                      name: item.title
                    })
                  }}>
                    <ImageBackground
                      style={{
                        width: '100%',
                        height: '100%',
                        justifyContent: 'center',
                      }}
                      source={require('../img/shelves.jpg')}
                    >              
                      <Text style={ styles.text }>{ item.title }</Text>
                    </ImageBackground>
                  </TouchableOpacity>
                </View>
              )
            })
          }
        </ScrollView>
      </View>
    );
  }
    
export default ListScreen

const styles = StyleSheet.create({
  box2: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Pacifico",
  },
});