import db from '../db.js'
import md5 from 'md5'


export default class UserController{
    login(req, res){
        if(req.method === 'POST' && Object.keys(req.body).length && req.headers['x-requested-with'] === 'XMLHttpRequest'){
            let { login, password } = req.body
            db.getData("/users").then(data =>{
                let row = data.find(r => r.login === login && r.password === md5(password))
                if(row !== undefined){
                    res.status(200).send({
                        result: 'ok',
                        userId: row.id
                    })
                }else{
                    res.status(403).send({
                        result: 'ko',
                        errors: {'login': "utilisateur introuvable", "password": "utilisateur introuvable"}
                    })
                }
            })
        }
    }

    add(req, res){
        let { login, password, confirm } = req.body
        if(req.method === 'POST' && Object.keys(req.body).length && req.headers['x-requested-with'] === 'XMLHttpRequest'){
            db.getData("/users").then(data =>{
                console.table(data)
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
            // res.status(404).end()
        }
    }
}
