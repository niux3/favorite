import { useState, useEffect } from 'react'
import Card from './Card'


function Content({rows}){
    let output = [],
        [display, setDisplay] = useState('')

    useEffect(()=>{
        if(display === 'display'){
            setDisplay('')
        }
        let timer = setTimeout(()=>{
            setDisplay('display')
        }, 500)
        return ()=> clearTimeout(timer)
    }, [rows])

    for(let [i, row] of Object.entries(rows)){
        output = [...output, <Card href={row.href} img={row.img} text={row.title} key={i} display={display} />]
    }
    return (
        <section className="cell medium-9 grid-x grid-margin-x">{rows.length > 0 && output}</section>
    )
}

export default Content
