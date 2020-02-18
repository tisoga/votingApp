import React from 'react'
import { Alert } from 'react-native'
import axios from 'axios'
import qs from 'qs'
import AsyncStorage from '@react-native-community/async-storage'
import NavigationService from '../../NavigationService'

const authLogin = async (data) => {
    const url = "http://147.139.164.109:8080/api/auth/login/"
    const success = async (result) => {
        try {
            await AsyncStorage.setItem('@auth', JSON.stringify(result))
            Alert.alert('Login Success', 'Login Success')
            NavigationService.navigate('Home')
        } catch (e) {
            Alert.alert('Terjadi Kesalahan', 'Pesan Error'+e)
        }
    }

    await axios.post(url,
        qs.stringify(data))
        .then(result => success(result.data))
        .catch(
            function (error) {
                if (error.response) {
                    // Request made and server responded
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    Alert.alert('Login Gagal', 'Silahkan Periksa Username dan Password anda!')
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


export default authLogin