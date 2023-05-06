import React, { useState, useEffect, useCallback } from 'react';
import { Button, Alert, View, Image, ImageBackground, Text, TouchableOpacity, StyleSheet, FlatList, ScrollView, RefreshControl, Dimensions, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import RadioForm from 'react-native-simple-radio-button';
import axios from 'axios';
import { Loading } from './components/Loading';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import InfoScreen from './screens/InfoScreen';
import ListScreen from './screens/ListScreen';
import ExerciseScreen from './screens/ExerciseScreen';
import * as Font from 'expo-font';
// import Constants from 'expo-constants';
import FlipPage, { FlipPagePage } from 'react-native-flip-page';
// import styled from 'styled-components/native';

const Stack = createNativeStackNavigator();

const MyStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ 
          headerShown: false 
          }} />
        <Stack.Screen name="Home" component={HomeScreen} options={{ 
          headerTitle: "Книги",
          // headerStyle: {
          //   backgroundColor: 'black',
          // },
          // headerTintColor: '#d8bc7b',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: "Pacifico",
          },
          }} />
        <Stack.Screen name="List" component={ListScreen} options={({ route }) => ({ headerTitle: route.params.book,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontSize: 30,
            fontFamily: "Pacifico",
          }, })} />
          <Stack.Screen name="Info" component={InfoScreen} options={({ route }) => ({ headerTitle: route.params.name,
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: "Pacifico",
            }, })} />
          <Stack.Screen name="Exercise" component={ExerciseScreen} options={({ route }) => ({ headerTitle: 'Упражнение',
            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontSize: 30,
              fontFamily: "Pacifico",
            }, })} />
      </Stack.Navigator>    
  );
}

const App = () => {

  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({'Pacifico': require('./style/font/Pacifico-Regular.ttf')});
        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <NavigationContainer>
      <MyStack />
      {/* <StatusBar backgroundColor="#222" barStyle="light-content"/>  */}
    </NavigationContainer>
  );
  
}

export default App

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
  box2: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  box3: {
    flex: 1,
    borderWidth: 1,
    padding: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20
  },
  image: {
    width: 120, 
    height: 120,
  },
  text: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: "Pacifico",
  },
  button: {
    width: 120, 
  },
  container2: {
    flex: 1,
  },
  wrapDot: {
    position: 'absolute',
    bottom: 40, 
    right: 10, 
    flexDirection: 'row', 
    alignSelf:'center'
  },
  dotActive: { 
    margin: 3,
    color: '#000', 
  },
  dot: { 
    margin: 3,
    color: '#fff', 
  },
  textList:{
    top: 15,
  },
  shelvesHomeScreen:{
    // flex: 1,
    // width: '100%',
    // height: '125%',
    // marginBottom: 40,
  },
});