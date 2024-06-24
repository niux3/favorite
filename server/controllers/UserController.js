import db from '../db.js'
import md5 from 'md5'


export default class UserController{
    login(req, res){
        let { name, password } = req.body
        console.log(req.body)
        console.log('name', name)
        console.log('password', password)
        res.send('ok')
    }

    add(req, res){
        let { login, password, confirm } = req.body
        console.log(req.body)
        console.log('name', login)
        console.log('password', password)
        console.log('confirm', confirm)

        db.getData("/users").then(data =>{
            let errors = {}
            if(login === ''){
                errors['login'] = "Ce champs ne doit pas être vide"
            }

            if(password !== confirm){
                errors['confirm'] = "Ce champs doit être identique au mot de passe"
            }

            if(password.length <= 3){
                errors['password'] = "Ce champs doit contenir au moins 4 caractères"
            }

            if(data.filter(r => r.login === login).length > 0){
                errors['login'] = "Cet utilisateur existe déjà"
            }

            if(Object.keys(errors).length === 0){
                let row = [...data, {
                    "id": new Date().getTime(),
                    "login": login,
                    "password": md5(password)
                }]
                db.push("/users", row)
            }

            let statusCode = Object.keys(errors).length > 0? 400 : 201
            let result = Object.keys(errors).length > 0? 'ko' : 'ok'
            res.status(statusCode).send({
                result,
                errors
            })
        })
    }
}
