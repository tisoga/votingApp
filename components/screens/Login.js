import React, { useState } from 'react'
import {
    StyleSheet,
    View,
    Text,
    Button,
    TouchableOpacity,
    ImageBackground,
    Image,
    Modal,
    TextInput,
    Alert,
    KeyboardAvoidingView
} from 'react-native';

import authLogin from '../actions/authLogin'
import AsyncStorage from '@react-native-community/async-storage'
const Login = () => {
    const [modal, setModal] = useState({ 'login': false, 'register': false })
    const [user, setUser] = useState('')
    const [pass, setPass] = useState('')

    const resetValue = () => {
        setUser('')
        setPass('')
    }

    const modalOpenClose = (value) => {
        switch (value) {
            case 'login':
                setModal({ 'login': true, 'register': false })
                break;
            case 'register':
                setModal({ 'login': false, 'register': true })
                break;
            case 'close':
                setModal({ 'login': false, 'register': false })
                break;
        }
        resetValue()
    }


    const loginAuth = async () => {
        if (user && pass) {
            const data = {
                'username': user,
                'password': pass
            }
            await authLogin(data)
            modalOpenClose('close')
        }
        else {
            Alert.alert('Kesalahan!', 'Silahkan isi Username dan Password terlebih dahulu')
        }
    }

    return (
        <>
            <ImageBackground
                source={{ uri: 'https://cdn.pixabay.com/photo/2016/04/15/04/02/water-1330252__340.jpg' }}
                style={styles.backgroundImage}>
                <View style={styles.viewSatu}>
                    {/* <Text style={styles.textTitle}>S.I.M.S</Text> */}
                    <Text style={styles.textTitle}>Voting APP</Text>
                    {/* <Text style={{ textAlign: 'center' }}>Voting APP</Text> */}
                    {/* <Text style={{ textAlign: 'center' }}>Majalaya</Text> */}
                </View>
                <View style={styles.viewDua}>
                    <TouchableOpacity style={styles.button}>
                        <Button
                            color="purple"
                            title="Login"
                            onPress={() => modalOpenClose('login')}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button}>
                        <Button
                            color="red"
                            title="Daftar"
                            onPress={() => modalOpenClose('register')}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.viewTiga}>
                    <Text style={{ fontSize: 10, marginTop: 30, textDecorationLine: 'underline' }}>Sign in With Google</Text>
                </View>
            </ImageBackground>

            <Modal
                animationType='slide'
                visible={modal.login}
                onRequestClose={() => modalOpenClose('close')}>
                <ImageBackground
                    source={{ uri: 'https://ak6.picdn.net/shutterstock/videos/1027713866/thumb/10.jpg' }}
                    style={styles.backgroundImage}>
                    <View style={styles.modalSatu}>
                        <Text style={{ color: 'white' }}>Username</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder="Masukan Username"
                            value={user}
                            onChangeText={(value) => setUser(value)}
                        />
                        <Text style={{ color: 'white' }}>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            secureTextEntry={true}
                            placeholder="Masukan Password"
                            value={pass}
                            onChangeText={(value) => setPass(value)}
                        />
                        <Text style={{
                            color: '#87ceeb',
                            textAlign: 'right',
                            textDecorationLine: 'underline'
                        }}>
                            forgot your password
                        </Text>
                    </View>
                    <View style={styles.modalDua}>
                        <TouchableOpacity style={styles.button}>
                            <Button
                                title="Login"
                                onPress={() => loginAuth()}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.modalTiga}>

                    </View>
                </ImageBackground>
            </Modal>

            <Modal
                animationType='slide'
                visible={modal.register}
                onRequestClose={() => modalOpenClose('close')}>
                <ImageBackground
                    source={{ uri: 'https://img.freepik.com/free-vector/blue-abstract-acrylic-brush-stroke-textured-background_53876-86373.jpg?size=626&ext=jpg' }}
                    style={styles.backgroundImage}>
                    <KeyboardAvoidingView style={styles.viewModal}>
                        {/* <Image
                                source={{ uri: 'https://cnet3.cbsistatic.com/img/Yt768C55hXNi2eGSB9qOv-e7SQg=/2011/03/16/c7675aa8-fdba-11e2-8c7c-d4ae52e62bcc/Chrome-logo-2011-03-16.jpg' }}
                                style={{ width: 100, height: 100 }} /> */}
                        <Text style={{ textAlign: 'left', fontSize: 50 }}>Register</Text>
                        <Text>Username</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Masukan Username'
                            onChangeText={(value) => account.username = value}
                        />
                        <Text>Nama Lengkap</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Masukan Nama Lengkap'
                            onChangeText={(value) => account.nama = value}
                        />
                        <Text>NIM</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Masukan NIM'
                            onChangeText={(value) => account.nim = value}
                            keyboardType='number-pad'
                        />
                        <Text>No Telepon</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Masukan No Telepon'
                            onChangeText={(value) => account.telp = value}
                            keyboardType='number-pad'
                        />
                        <Text>Password</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Masukan Password'
                            onChangeText={(value) => account.pass = value}
                            secureTextEntry={true}
                        />
                        <Text>Confirm Password</Text>
                        <TextInput
                            style={styles.textInput}
                            placeholder='Masukan Ulang Password'
                            onChangeText={(value) => account.pass2 = value}
                            secureTextEntry={true}
                        />
                    </KeyboardAvoidingView>
                    <View style={styles.viewModalDua}>
                        <TouchableOpacity>
                            <Button
                                title="Register"
                            />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </Modal>

        </>
    )
}
const styles = StyleSheet.create({
    textTitle: {
        textAlign: 'center',
        fontSize: 30,
    },
    viewSatu: {
        flex: 8,
        justifyContent: 'center',
    },
    viewDua: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    viewTiga: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    modalSatu: {
        flex: 3,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    modalDua: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    modalTiga: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    button: {
        marginTop: 50,
        width: 100,
        borderRadius: 50,
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover', // or 'stretch'
    },
    logoImage: {
    },
    textInput: {
        width: '85%',
        height: 50,
        borderWidth: 1,
        borderColor: 'black',
        backgroundColor: 'white',
    },
    viewModal: {
        alignItems: 'center',
    },
    viewModalDua: {
        marginTop: 20,
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
});

export default Login