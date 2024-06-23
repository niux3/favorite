import { useEffect, useState } from 'react'
import useFetch from '../hooks/useFetch'
import Aside from './Aside'
import Content from './Content'


function Main(){
    let [rows, setRows] = useState([])
    let {data, error, loading} = useFetch('http://localhost:8000/',{
        "method": "GET"
    })
    let onGetRss = e =>{
        e.preventDefault()
        let options = {}
        options['headers'] = new Headers({
            "X-Requested-With": "XMLHttpRequest",
            "Accept": "application/json",
            "Content-Type": 'application/json'
        })
        options['method'] = 'get'
        options['cache'] = 'no-cache'
        options['redirect'] = 'follow'
        options['referrerPolicy'] = 'no-referrer'
        options['mode'] = 'cors'
        fetch(`http://localhost:8000/${e.target.dataset.id}`, options).then(resp => resp.text()).then(str => new window.DOMParser().parseFromString(str, "text/xml")).then(data => {
            let articles = []
            let items = data.querySelectorAll("item")
            items.forEach((item) => {
                articles = [...articles, item]
            })
            if(articles.length){
                setRows(rows => rows = articles)
            }
        })
    }
    return (
        <main className="grid-container margin-vertical-3">
            <div className="grid-x grid-margin-x">
                {data && <Aside links={data} onGetRss={onGetRss} />}
                {rows.length > 0 && <Content rows={rows} />}
            </div>
        </main>
    )
}

export default Main
