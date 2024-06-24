import { useEffect, useState } from 'react'
import xhr from '../hooks/xhr'
import Aside from './Aside'
import Content from './Content'


function Main(){
    let [rows, setRows] = useState([]),
        [links, setLinks] = useState([])

    useEffect(()=>{
        xhr('http://localhost:8000/',{ "method": "GET" }).then(({data, errorServer, loading})=>{
            setLinks(links => links = [...data])
        })
    }, [])

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
                {links && <Aside links={links} onGetRss={onGetRss} />}
                {rows.length > 0 && <Content rows={rows} />}
            </div>
        </main>
    )
}

export default Main
