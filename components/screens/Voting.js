import React, { useEffect, useState, useRef } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native'
import { fetchData, postData, deleteData } from '../actions'
import axios from 'axios'
import AsyncStorage from '@react-native-community/async-storage'

const Voting = ({ navigation }) => {
    const id_pertanyaan = navigation.getParam('id_pertanyaan');
    let update = navigation.getParam('update')
    const url = 'http://ryan-retired.site:8080/api/data_vote/' + id_pertanyaan + '/'
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

    const vote = (id, pilihan) => {
        const sUrl = 'http://ryan-retired.site:8080/api/data_vote/' + id_pertanyaan + '/vote/'
        const data = { 'id_pilihan': id }
        const status = 'Vote'
        Alert.alert(
            'Apakah anda yakin ?',
            'Voting untuk pilihan : ' + pilihan,
            [
                { text: 'Tidak', style: 'cancel' },
                { text: 'Iya', onPress: () => { postData(data, sUrl, status); } },
            ])
    }

    const deletePertanyaan = () => {
        const url = 'http://ryan-retired.site:8080/api/data_vote/' + id_pertanyaan + '/'
        status = 'Pertanyaan'
        Alert.alert(
            'Peringatan!',
            'Apakah anda Ingin Menghapus Pertanyaan ini : ',
            [
                { text: 'Tidak', style: 'cancel' },
                { text: 'Iya', onPress: () => { deleteData(url, status) } },
            ])
    }

    const deletePilihan = (id_pilihan) => {
        const url = 'http://ryan-retired.site:8080/api/data_vote/' + id_pertanyaan + '/' + id_pilihan
        status = 'Pilihan'
        Alert.alert(
            'Peringatan!',
            'Apakah Anda Yakin ingin Menghapus Pilihan ini ?',
            [
                { text: 'Tidak', style: 'cancel' },
                { text: 'Iya', onPress: () => { deleteData(url, status, id_pertanyaan) } }
            ]
        )
    }
    return (
        <>
            <View style={styles.pertanyaanView}>
                <View style={{ flex: 1 }}>
                    <Text style={[styles.pertanyaanText, { textDecorationLine: "underline" }]}>Pertanyaan</Text>
                </View>
                <View style={{ flex: 4, justifyContent: 'center', borderWidth: 1, margin: 10, borderRadius: 20 }}>
                    <Text style={styles.pertanyaanText}>{listData.pertanyaan}</Text>
                </View>
            </View>
            <View style={styles.pilihanView}>
                <View style={{ flex: 1, backgroundColor: 'red', flexDirection: 'row', flexWrap: "wrap" }}>
                    <View style={styles.judulPilihan}>
                        <Text style={styles.textPilihan}>Pilihan</Text>
                    </View>
                    <View style={styles.judulPilihan}>
                        <Text style={styles.textPilihan}>Jumlah Vote</Text>
                    </View>
                </View>
                <View style={{ flex: 7 }}>
                    <FlatList
                        data={listData.kumpulan_pilihan}
                        keyExtractor={(item, index) => item.id_pilihan.toString()}
                        renderItem={(itemData) => (
                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                <TouchableOpacity style={styles.buttonPilihan}
                                    onPress={() => vote(itemData.item.id_pilihan, itemData.item.pilihan)}
                                    onLongPress={() => deletePilihan(itemData.item.id_pilihan)}>
                                    <Text style={styles.textPilihan}>{itemData.item.pilihan}</Text>
                                </TouchableOpacity>
                                <View style={styles.voteText}>
                                    <Text style={styles.textPilihan}>{itemData.item.vote}</Text>
                                </View>
                            </View>
                        )}
                    />
                </View>
            </View>
            <View style={styles.bottomView}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-around', }}>
                    <TouchableOpacity style={styles.bottomButton} onPress={() => deletePertanyaan()}>
                        <Text style={styles.bottomText}>Hapus Pertanyaan</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.bottomButton}
                        onPress={() => navigation.navigate(
                            'TambahPilihan',
                            {
                                'id_pertanyaan': id_pertanyaan,
                                'pertanyaan': listData.pertanyaan
                            }
                        )}>
                        <Text style={styles.bottomText}>Tambah Pliihan</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    pertanyaanView: {
        flex: 10,
        // backgroundColor: 'red',
    },
    pilihanView: {
        flex: 18,
        // backgroundColor: 'blue'
    },
    bottomView: {
        flex: 2,
        backgroundColor: 'yellow'
    },
    pertanyaanText: {
        fontSize: 30,
        textAlign: 'center'
    },
    judulPilihan: {
        margin: 10,
        width: '45%',
        borderRadius: 19,
    },
    buttonPilihan: {
        marginTop: 15,
        borderWidth: 2,
        margin: 10,
        width: '45%',
        borderRadius: 19,
        // borderColor: 'blue',
        backgroundColor: 'red'
    },
    voteText: {
        marginTop: 15,
        borderWidth: 2,
        margin: 10,
        width: '45%',
        borderRadius: 19,
        backgroundColor: 'yellow',
    },
    textPilihan: {
        fontSize: 30,
        textAlign: 'center',
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

export default Voting