import { useEffect, useState } from 'react'

export const useFetch = url => {
    const [state, setState] = useState('')

    useEffect(() => {
        setState('');
        fetch(url)
            .then(x => x.json())
            .then(y => {
                setState(y)
            });
    },[url])

    return state
}