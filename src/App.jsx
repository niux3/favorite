import { useState, useEffect } from "react"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"


function App() {
    let [status, setStatus] = useState('login'),
        [errorFormLogin, setErrorFormLogin] = useState({
            'login': '',
            'password': ''
        }),
        [errorFormRegister, setErrorFormRegister] = useState({
            'login': '',
            'password': '',
            'confirm': ''
        })

    let onLogin = e =>{
        e.preventDefault()
        let form = new FormData(e.target)
        let errors = {
            'login': '',
            'password': ''
        }
        setStatus('dashboard')
    }
    let onRegister = e =>{
        e.preventDefault()
        let form = new FormData(e.target)
        let errors = {
            'login': '',
            'password': '',
            'confirm': ''
        }
        for(let [k, v]  of form.entries()){
            switch(k){
                case "password":
                    if(v.trim().length <= 3){
                        errors[k] = "Ce champs doit contenir au moins 4 caractères"
                    }
                    continue
                case 'login':
                case 'password':
                    if(v.trim() === ''){
                        errors[k] = "Ce champ ne doit pas être vide"
                    }
                    break
                case 'confirm':
                    if(v !== form.get('password')){
                        errors[k] = "Ce champs doit être identique au mot de passe"
                    }
                    break
            }
        }
        setErrorFormRegister(errors)
        if(Object.values(errors).every(v => v === "")){
            setStatus('login')
        }
    }
    let toRegister = e =>{
        e.preventDefault()
        setStatus('register')
    }
    let toLogin = e =>{
        e.preventDefault()
        setStatus('login')
    }

    let view = {
        'login': <Login onLogin={onLogin} errorForm={errorFormLogin} toRegister={toRegister} />,
        'register': <Register toLogin={toLogin} errorForm={errorFormRegister} onRegister={onRegister} />,
        'dashboard': <Dashboard />
    }

    return (<> {view[status]} </>)
}

export default App
