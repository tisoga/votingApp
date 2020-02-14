import axios from 'axios'
import qs from 'qs'
import { useState } from 'react';
import NavigationService from '../../NavigationService'

const postData = async (data, url, status, ...lainnya) => {    
    const destination = (res) => {
        switch (status) {
            case 'Vote':
                NavigationService.navigate(
                    'Result',
                    {
                        'id_pertanyaan': res.data.pertanyaan.id_pertanyaan,
                        'message': 'Voting Berhasil',
                        'status': status
                    }
                );
                break;
            case 'Pilihan':
                NavigationService.navigate(
                    'Result',
                    {
                        'id_pertanyaan': lainnya[0],
                        'message': 'Tambah Pilihan Berhasil',
                        'status': status
                    }
                );
                break;
            case 'Pertanyaan':
                NavigationService.navigate(
                    'Result',
                    {
                        'message': 'Tambah Soal Berhasil',
                        'status': status
                    }
                );
                break;
        }
    }
    await axios.post(url,
        qs.stringify(data)).then(res => destination(res))
        .catch(
            function (error) {
                if (error.response) {
                    // Request made and server responded
                    // console.log(error.response.data);
                    // console.log(error.response.status);
                    // console.log(error.response.headers);
                    NavigationService.navigate(
                        'Result',
                        {
                            'message': 'Terjadi Kesalahan, Silahkan Coba beberapa saat lagi!',
                            'status': 'Error'
                        }
                    )
                } else if (error.request) {
                    // The request was made but no response was received
                    // console.log(error.request);
                    // console.log('Koneksi Tidak Ada');
                    NavigationService.navigate(
                        'Result',
                        {
                            'message': 'Silahkan Periksa Koneksi anda atau Coba beberapa saat lagi!',
                            'status': 'Error'
                        }
                    )
                } else {
                    // Something happened in setting up the request that triggered an Error
                    console.log('Error', error.message);
                }
            });

}

export default postData