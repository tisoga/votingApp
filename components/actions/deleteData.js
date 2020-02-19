import axios from 'axios'
import NavigationService from '../../NavigationService'
import AsyncStorage from '@react-native-community/async-storage'

const deleteData = async (url, status, ...lainnya) => {
    const auth = JSON.parse(await AsyncStorage.getItem('@auth'))
    const headers = {
        'Authorization': 'Token ' + auth.token,
    }
    const destination = () => {
        switch (status) {
            case 'Pertanyaan':
                NavigationService.navigate(
                    'Result',
                    {
                        'message': 'Delete Pertanyaan berhasil',
                        'status': "Delete"
                    }
                )
                break
            case 'Pilihan':
                NavigationService.navigate(
                    'Result',
                    {
                        'id_pertanyaan': lainnya[0],
                        'message': 'Delete Pilihan berhasil',
                        'status': "Pilihan"
                    }
                )
                break
        }

    }

    await axios.delete(url, {
        headers
    }).then(res => destination(res))
}

export default deleteData