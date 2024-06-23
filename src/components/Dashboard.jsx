import { useState, useEffect } from "react"
import Header from './Header'
import Footer from './Footer'
import Main from './Main'
import Loader from './Loader'
import Modal from './Modal'
import FormAddLink from './FormAddLink'


function Dashboard(){
    let [modal, setModal] = useState(false),
        [errorForm, setErrorForm] = useState({
            'name': '',
            'url': ''
        })
        

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

        if(!/^(https?:\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/.test(form.get('url'))){
            errors['url'] = "l'url fournie ne semble pas valide"
        }

        setErrorForm(errors)
        if(Array.from(form.keys()).every(k => errors[k] === '')){
            setModal(false)
            setLinks(links => links = [...links, {
                'id': new Date().getTime(),
                'name': form.get('name'),
                'url': form.get('url')
            }])

        }
    }
    return (
        <>
            { modal && <Modal closeModal={closeModal}><FormAddLink addLink={addLink} errorForm={errorForm} /></Modal> }
            <Header showModal={showModal} />
            <Main />
        </>
    )
}
export default Dashboard
