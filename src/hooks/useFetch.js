import { useState, useEffect } from 'react'


export default function useFetch(url, options) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const response = fetch(url, options)
    const d = response.json()
    setData(d)
    setLoading(false)
    //useEffect(async () => {
        //async function fetchData() {
            //options['headers'] = new Headers({
                //"X-Requested-With": "XMLHttpRequest",
                //"Accept": "application/json",
                //"Content-Type": 'application/json'
            //})
            //options['cache'] = 'no-cache'
            //options['redirect'] = 'follow'
            //options['referrerPolicy'] = 'no-referrer'
            //options['mode'] = 'cors'
            //try {
            //} catch (error) {
                //console.error('> ', error)
                //setError(error)
                //setLoading(false)
            //}
        //}
        //fetchData()
    // }, []) 
    return { data, error, loading }
}
