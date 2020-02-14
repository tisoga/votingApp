import React, { useEffect } from 'react'
import { View, Text, Alert } from 'react-native'


const Result = ({ navigation }) => {
    const status = navigation.getParam('status')
    const message = navigation.getParam('message')
    const id = navigation.getParam('id_pertanyaan')
    const rdm = Math.floor(Math.random() * 100)

    const destination = () =>{
        if (status == 'Vote' || status == 'Pilihan'){
            navigation.navigate('Vote', { 'id_pertanyaan': id, 'update': rdm })
        }
        else if(status == 'Delete' || status == 'Pertanyaan'){
            navigation.navigate('Home', { 'update': rdm })
        }
        else if(status == 'Error'){
            navigation.navigate('Home')
        }
    }

    useEffect(() => {
        Alert.alert(
            status, message,
            [
                {
                    text: 'Ok', onPress: () => {
                        destination()
                    }
                }
            ])

    }, [])
    return (
        <View>

        </View>
    )
}


export default Result