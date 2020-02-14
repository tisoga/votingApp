import axios from 'axios'
import NavigationService from '../../NavigationService'

const deleteData = async (url, status, ...lainnya) => {
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
        // headers: {
        //   Authorization: authorizationToken
        // },
    }).then(res => destination(res))
}

export default deleteData