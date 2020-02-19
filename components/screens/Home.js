import React, { useEffect, useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Alert
} from 'react-native';

import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const Home = ({ navigation }) => {
    const url = 'http://147.139.164.109:8080/api/data_vote/'
    let update = navigation.getParam('update')

    const [listData, setListData] = useState([])
    const [updateData, setUpdateData] = useState(true)

    useEffect(() => {
        const data = async () => {
            const auth = JSON.parse(await AsyncStorage.getItem('@auth'))
            const headers = {
                'Authorization': 'Token '+auth.token,
            }

            await axios.get(url, { headers, 'Cache-Control': 'no-cache' }).then(response => setListData(response.data))
                .catch(
                    function (error) {
                        if (error.response) {
                            // Request made and server responded
                            if (error.response.status == '401') {
                                Alert.alert('Terjadi Kesalahan', 'Silahkan Login Terlebih Dahulu',
                                    [
                                        { text: 'OK', onPress: () => navigation.navigate('Login') }
                                    ],
                                    { cancelable: false }
                                )
                            }
                        } else if (error.request) {
                            // The request was made but no response was received
                            Alert.alert('Terjadi Kesalahan', 'Periksa Koneksi Internet anda, atau coba beberapa saat lagi!')
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            Alert.alert('Error', error.message);
                        }
                    }
                )
        }
        data()

    }, [updateData])

    useEffect(() => {
        if (update) {
            setUpdateData(!updateData)
        }

    }, [update])

    const refreshListData = () => {
        setUpdateData(!updateData)
    }

    const pindah = (id) => {
        navigation.navigate('Vote', { 'id_pertanyaan': id });
    }
    return (
        <>
            <View style={styles.judulView}>
                <Text style={styles.judulText}>List Pertanyaan</Text>
            </View>
            <View style={styles.pertanyaanView}>
                <FlatList
                    data={listData}
                    keyExtractor={(item, index) => item.id_pertanyaan.toString()}
                    renderItem={(itemData) => (
                        <TouchableOpacity onPress={() => pindah(itemData.item.id_pertanyaan)}>
                            <View style={styles.pertanyaanBox}>
                                <Text style={styles.pertanyaanText}>{itemData.item.pertanyaan}</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            </View>

            <View style={styles.bottomView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => refreshListData()}>
                        <Text style={styles.bottomText}>Refresh</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => navigation.navigate('TambahPertanyaan')}>
                        <Text style={styles.bottomText}>Tambah Pertanyaan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    judulView: {
        flex: 2,
        justifyContent: 'center'
    },
    pertanyaanView: {
        flex: 16,
        backgroundColor: 'yellow',
    },
    bottomView: {
        flex: 1.3,
        backgroundColor: 'blue'
    },
    judulText: {
        fontSize: 40,
        textAlign: 'center',
        textDecorationLine: "underline"
    },
    pertanyaanBox: {
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 40,
        marginRight: 40,
        borderWidth: 1,
        height: 130,
        width: '83%',
        borderRadius: 20,
        justifyContent: 'center',
    },
    pertanyaanText: {
        fontSize: 30,
        textAlign: 'center'
    },
    bottomButton: {
        borderWidth: 1,
        marginTop: 6,
        width: '40%',
        height: 40,
        borderRadius: 19,
        backgroundColor: '#87ceeb',
    },
    bottomText: {
        fontSize: 18,
        marginTop: 5,
        textAlign: 'center',
    }
})

export default Home