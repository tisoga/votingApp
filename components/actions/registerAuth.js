import { Alert } from 'react-native'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'
import qs from 'qs'
import NavigationService from '../../NavigationService'
const registerAuth = async (data) => {
    const url = 'http://147.139.164.109:8080/api/auth/register/'
    const success = async (result) => {
        console.log(result)
        try {
            await AsyncStorage.setItem('@auth', JSON.stringify(result))
            Alert.alert('Register Success', 'Register Success')
            NavigationService.navigate('Home')
        } catch (e) {
            Alert.alert('Terjadi Kesalahan', 'Pesan Error' + e)
        }
    }

    await axios.post(url,
        qs.stringify(data))
        .then(result => success(result.data))
        .catch(
            function (error) {
                if (error.response) {
                    // Request made and server responded
                    console.log(error.response.data);
                    
                    if (error.response.data.username){
                        Alert.alert('Terjadi Kesalahan', 'Username sudah ada, silahkan coba yang lain')
                    }
                } else if (error.request) {
                    // The request was made but no response was received
                    // console.log(error.request);
                    Alert.alert('Terjadi Kesalahan', 'Periksa Koneksi Internet anda, atau coba beberapa saat lagi!')
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });
}

export default registerAuth