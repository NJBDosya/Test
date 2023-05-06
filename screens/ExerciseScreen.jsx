import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import axios from 'axios';
import { Loading } from '../components/Loading';

// let info = [
//     {
//         "question": "Вопрос-1",
//         "answer1": "Ответ-1",
//         "answerValue1": 1,
//         "answer2": "Ответ-2",
//         "answerValue2": 0,
//         "answer3": "Ответ-3",
//         "answerValue3": 0,
//         "answer4": "Ответ-4",
//         "answerValue4": 0
//     },
//     {
//         "question": "Вопрос-2",
//         "answer1": "Ответ-1",
//         "answerValue1": 1,
//         "answer2": "Ответ-2",
//         "answerValue2": 0,
//         "answer3": "Ответ-3",
//         "answerValue3": 0,
//         "answer4": "Ответ-4",
//         "answerValue4": 0
//     },
// ]

let current = 0;
let result = 0
let right = 0;

export const Exercise = ({ route, navigation }) => {
    const [isLoading, setIsLoading] = React.useState(true);
    const [active, setActive] = useState(false);
    const [activeView, setActiveView] = useState(false);
    const [activeButton, setActiveButton] = useState(false);
    const [data, setData] = React.useState([]);
    const { id, book } = route.params;
    
    React.useEffect(() => {    
        axios
            .get('https://639aac87d5141501973b8ab0.mockapi.io/' + book + '/' + id)
            .then(({ data }) => {
                setData(data);
            })
            .catch((err) => {
                console.log(err);
                Alert.alert('Ошибка', 'Не удалось получить вопросы');
            })
            .finally(() => {
                setIsLoading(false);
            })
    }, []);
  
    if(isLoading) {
        return ( <Loading /> )
    }

    const onPress = (num) => {
        setActive(!active)
        setActiveButton(!activeButton)
        right = right + num
        // console.log("Правильно - " + right)
    };

    const onPressView = () => {
        setActiveView(!activeView)
        current = 0;
        result = 0
        right = 0;
    };

    let info = data.question
  
    return (
        <View>
            <View style={{
                margin: 10,
                justifyContent: 'center',
                alignItems: 'center',
                display: activeView ? 'none' : 'flex'
            }}>
                <TouchableOpacity
                    style={styles.button2}
                    onPress={()=> {
                        onPressView();
                    }}
                >
                    <Text style={styles.buttonText2}>Начать</Text>
                </TouchableOpacity>
            </View>

            <View style={{display: activeView ? 'flex' : 'none'}}>
                <View style={{
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: result == info.length ? 'none' : 'flex'
                }}>
                    <Text style={styles.text} >{info[current].question}</Text>

                    <TouchableOpacity
                        style={{
                            width: '100%',
                            padding: 15,
                            margin: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            backgroundColor: active ? info[current].answerColor1 : 'white',
                            marginTop: 5,
                            borderColor: 'white',
                            borderWidth: 2,
                        }}
                        disabled={active ? true : false}
                        onPress={()=> {
                            onPress(info[current].answerValue1);
                        }}
                    >
                        <Text>{info[current].answer1}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            padding: 15,
                            margin: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            backgroundColor: active ? info[current].answerColor2 : 'white',
                            marginTop: 5,
                            borderColor: 'white',
                            borderWidth: 2,
                        }}
                        disabled={active ? true : false}
                        onPress={()=> {
                            onPress(info[current].answerValue2);
                        }}
                    >
                        <Text>{info[current].answer2}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            padding: 15,
                            margin: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            backgroundColor: active ? info[current].answerColor3 : 'white',
                            marginTop: 5,
                            borderColor: 'white',
                            borderWidth: 2,
                        }}
                        disabled={active ? true : false}
                        onPress={()=> {
                            onPress(info[current].answerValue3);
                        }}
                    >
                        <Text>{info[current].answer3}</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity
                        style={{
                            width: '100%',
                            padding: 15,
                            margin: 10,
                            borderRadius: 10,
                            alignItems: 'center',
                            backgroundColor: active ? info[current].answerColor4 : 'white',
                            marginTop: 5,
                            borderColor: 'white',
                            borderWidth: 2,
                        }}
                        disabled={active ? true : false}
                        onPress={()=> {
                            onPress(info[current].answerValue4);
                        }}
                    >
                        <Text>{info[current].answer4}</Text>
                    </TouchableOpacity>
                </View> 

                <View style={{
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: result == info.length ? 'none' : 'flex',
                    display: activeButton ? 'flex' : 'none'
                }}>
                    <TouchableOpacity
                        style={styles.button2}
                        onPress={()=> {
                            setActive()
                            setActiveButton()
                            if(current < info.length-1){
                                current++
                            }
                            result++

                            // console.log("Длина - " + info.length)  
                            // console.log("current - " + current)          
                        }}
                    >
                        <Text style={styles.buttonText2}>Next</Text>
                    </TouchableOpacity>
                </View>

                <View style={{                
                    margin: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    display: result == info.length ? 'flex' : 'none'
                }}>
                    <Text>Правильные ответы {right} из {info.length}</Text>
                </View>
            </View>                 
        </View>
    );
}

export default Exercise 

const styles = StyleSheet.create({
    text: {
        marginBottom: 20,
    },
    button: {
        width: '100%',
        padding: 15,
        margin: 10,
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: 'white',
        borderWidth: 2,
    },
    button2: {
        backgroundColor: '#0782F9',
        width: '40%',
        padding: 15,
        marginTop: 50,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText2: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
})
