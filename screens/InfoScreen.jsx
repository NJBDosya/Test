import React, { useState, useEffect } from 'react';
import { Button, Alert, View, ImageBackground, Text, StyleSheet } from 'react-native';
import axios from 'axios';
import { Loading } from '../components/Loading';
import FlipPage, { FlipPagePage } from 'react-native-flip-page';

const InfoScreen = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [data, setData] = React.useState([]);
    const { id, title, book } = route.params;
  
    React.useEffect(() => {   
      navigation.setOptions({
        headerRight: () => (
          <Text style={{ fontSize: 40 }} onPress={() => 
            navigation.navigate('Exercise', {
              id: id,
              book: book,
            })
          }>📝</Text>
        ),
      })
  
      axios
          .get('https://639aac87d5141501973b8ab0.mockapi.io/' + book + '/' + id)
          .then(({ data }) => {
              setData(data);
          })
          .catch((err) => {
              console.log(err);
              Alert.alert('Ошибка', 'Не удалось получить статьи');
          })
          .finally(() => {
              setIsLoading(false);
          })
    }, []);
  
    if(isLoading) {
        return ( <Loading /> )
    }
  
    return (
      <FlipPage orientation='horizontal'>
        {
          data.arr.map((obj, index) => (
            <FlipPagePage>
              <ImageBackground
                style={{
                  width: '100%',
                  height: '100%',
                }}
                source={require('../img/openBook.jpg')}
              >
                <View style={ styles.textList }>
                  <Text key={index} style={ styles.wrap }>{obj}</Text>
                </View>   
                <View style={ styles.wrapDot }>
                  <Text key={index}  style={ styles.text2 }>{index + 1}</Text>
                </View>
              </ImageBackground>
            </FlipPagePage>
          ))
        }
      </FlipPage>
    );
  }
  
export default InfoScreen;

const styles = StyleSheet.create({
    text: {
      fontSize: 20,
      textAlign: 'center',
      fontFamily: "Pacifico",
    },
    text2: {
      color: "blue",
    },
    wrap: {
      padding: 5
    },
    wrapDot: {
      position: 'absolute',
      bottom: 40, 
      right: 10, 
      flexDirection: 'row', 
      alignSelf:'center'
    },
    textList:{
      top: 15,
    },
  });