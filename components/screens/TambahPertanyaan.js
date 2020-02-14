import React, { useState } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Alert,
} from 'react-native'
import { postData } from '../actions'


const TambahPertanyaan = () => {
    const [pertanyaan, setPertanyaan] = useState('')

    const resetButton = () => {
        setPertanyaan('')
    }

    const submitButton = () => {
        if (!pertanyaan) {
            Alert.alert('Peringatan', 'Silahkan isi pertanyaan terlebih dahulu!')
        }
        else {
            const data = {'pertanyaan': pertanyaan }
            const url = 'http://ryan-retired.site:8080/api/data_vote/'
            resetButton()
            Alert.alert('Peringatan', 'Apakah Anda Yakin ingin menambahkan pertanyaan ' + pertanyaan + '?',
                [
                    { text: 'Tidak', style: 'cancel' },
                    { text: 'Ya', onPress: () => { postData(data, url, status = 'Pertanyaan' ) } }
                ]
            )
        }
    }

    return (
        <>
            <View style={styles.viewAtas}>
                <Text style={styles.textJudul}>Tambah Pertanyaan Baru</Text>
            </View>
            <View style={styles.viewBawah}>
                <View style={styles.viewGroupAction}>
                    <View style={styles.viewGroupInput}>
                        <Text style={{ marginRight: 20, fontSize: 15, flex: 1, marginLeft: 20 }}>Masukan Pertanyaan Baru : </Text>
                        <TextInput
                            placeholder='Masukan Pertanyaan Baru'
                            style={{ borderWidth: 1, flex: 1, margin: 5 }}
                            onChangeText={(value) => setPertanyaan(value)}
                            value={pertanyaan}
                        />
                    </View>
                    <View style={styles.viewButtonInput}>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#8b0000' }]}
                            onPress={() => resetButton()}>
                            <Text style={{ fontSize: 25, textAlign: 'center', color: 'white' }}>Reset</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[styles.button, { backgroundColor: '#006400' }]}
                            onPress={() => submitButton()}>
                            <Text style={{ fontSize: 25, textAlign: 'center', color: 'white' }}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    viewAtas: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'silver'
    },
    textJudul: {
        fontSize: 30,
        textAlign: 'center',
        textDecorationLine: 'underline',
        color: 'green'
    },
    viewBawah: {
        flex: 5,
        justifyContent: 'center'
        // backgroundColor: 'blue'
    },
    viewGroupAction: {
        height: 200,
        borderWidth: 1,
        margin: 20,
    },
    viewGroupInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    viewButtonInput: {
        marginTop: 50,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    button: {
        borderWidth: 1,
        borderRadius: 10,
        // backgroundColor: '#87ceeb',
        width: 100,
        height: 40,
        marginBottom: 10
    }
})


export default TambahPertanyaan