import React, { useState } from 'react'
import {
    View,
    Button,
    TextInput
} from 'react-native'

import AsyncStorage from '@react-native-community/async-storage';




const test = () => {
    const [nama, setNama] = useState('')
    const USER_1 = {
        name: 'Tom',
        age: 20,
        traits: {
            hair: 'black',
            eyes: 'blue'
        }
    }

    const storeData = async () => {
        try {
            await AsyncStorage.setItem('@MyApp_key', JSON.stringify(USER_1))
        } catch (e) {
            console.log(e);

        }
    }

    const getMyValue = async () => {
        try {
            const value = await AsyncStorage.getItem('@MyApp_key')
            const obj = JSON.parse(value)
            console.log(obj.name);

        } catch (e) {
            console.log(e);

        }
        // await AsyncStorage.removeItem('@MyApp_key')

    }
    getMyValue()
    return (
        <View>
            <TextInput
                placeholder='Nama'
                onChangeText={(value) => setNama(value)}
            />
            <Button
                title='Save'
                onPress={() => storeData()}
            />
        </View>
    )
}

export default test