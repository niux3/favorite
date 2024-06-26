import { useState, useEffect } from "react"
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import Loader from './Loader'
import Modal from './Modal'
import FormAddLink from './FormAddLink'
import xhr from "../libs/xhr"


function Dashboard({userId}){
    let [modal, setModal] = useState(false),
        [links, setLinks] = useState([]),
        [errorForm, setErrorForm] = useState({
            'name': '',
            'url': ''
        })
        
    useEffect(()=>{
        let params = 
        xhr(`http://localhost:8000/?userId=${userId}`, {"method": "GET"}).then(({data, errorServer, loading})=>{
            setLinks(links => links = [...data.rows])
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
            let options = {
                "method": "POST",
                "body": JSON.stringify({
                    'id': new Date().getTime(),
                    'name': form.get('name'),
                    'url': form.get('url'),
                    'userId': userId
                })
            }
            xhr('http://localhost:8000/add', options).then(({data, errorServer, loading}) => {
                if(data.result  === 'ok'){
                    setLinks(data.rows)
                    setModal(false)
                }else{
                    setErrorForm(data.errors)
                }
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
