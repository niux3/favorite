import { useState, useEffect } from "react"
import xhr from "./hooks/xhr"
import Dashboard from "./components/Dashboard"
import Login from "./components/Login"
import Register from "./components/Register"

function App() {
    let [status, setStatus] = useState('dashboard'),
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
        let output = {}
        for(let [k, v]  of form.entries()){
            output[k] = v
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
            let options = {
                "method": "POST",
                "body": JSON.stringify(output)
            }
            xhr('http://localhost:8000/auth/add', options).then(({data, errorServer, loading}) => {
                if(data.result === 'ok'){
                    setStatus('login')
                }else{
                    setErrorFormRegister(data.errors)
                }
            })
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
