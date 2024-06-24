import { useState, useEffect } from "react"
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import Loader from './Loader'
import Modal from './Modal'
import FormAddLink from './FormAddLink'
import xhr from "../libs/xhr"


function Dashboard(){
    let [modal, setModal] = useState(false),
        [links, setLinks] = useState([]),
        [errorForm, setErrorForm] = useState({
            'name': '',
            'url': ''
        })
        
    useEffect(()=>{
        xhr('http://localhost:8000/',{ "method": "GET" }).then(({data, errorServer, loading})=>{
            setLinks(links => links = [...data])
        })
    }, [])

    let showModal = e => {
        setErrorForm({
            'name': '',
            'url': ''
        })
        setModal(true)
    }
    let closeModal = e => setModal(false)
    let addLink = e =>{
        e.preventDefault()
        let errors = {
            'name': '',
            'url': ''
        }

        let form = new FormData(e.target)
        if(form.get('name') === ''){
            errors['name'] = 'ne doit pas être vide'
        }

        if(!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(rss|feed|xml)?$/.test(form.get('url'))){
            errors['url'] = "l'url fournie ne semble pas valide"
        }

        setErrorForm(errors)
        if(Array.from(form.keys()).every(k => errors[k] === '')){
            setModal(false)
            let options = {
                "method": "POST",
                "body": JSON.stringify({
                    'id': new Date().getTime(),
                    'name': form.get('name'),
                    'url': form.get('url')
                })
            }
            xhr('http://localhost:8000/add', options).then(({data, errorServer, loading}) => {
                setLinks(data.rows)
            })
        }
    }
    return (
        <>
            { modal && <Modal closeModal={closeModal}><FormAddLink addLink={addLink} errorForm={errorForm} /></Modal> }
            <Header showModal={showModal} />
            <Main links={links} />
        </>
    )
}
export default Dashboard
