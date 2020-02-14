import { useState, useEffect } from 'react'
import axios from 'axios'

const fetchData = (url) => {
    const [result, setResult] = useState([])
    useEffect(() => {
        const data = async () => {
            const response = await axios.get(url, { 'Cache-Control': 'no-cache' });
            setResult(response.data)
        }
        data()
    }, [url])

    return result
}

export default fetchData