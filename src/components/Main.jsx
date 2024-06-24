import { useEffect, useState } from 'react'
import xhr from '../libs/xhr'
import Aside from './Aside'
import Content from './Content'


function Main({links}){
    let [rows, setRows] = useState([])

    let onGetRss = e =>{
        e.preventDefault()
        xhr(`http://localhost:8000/${e.target.dataset.id}`,{ "method": "GET" }).then(({data, errorServer, loading})=>{
            setRows(data)
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
