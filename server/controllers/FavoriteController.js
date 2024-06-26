import db from '../db.js'
import xmldoc from 'xmldoc'


export default class FavoriteController{
    index(req, res){
        let {userId} = req.query
         if(req.headers['x-requested-with'] === 'XMLHttpRequest'){
            db.getData("/favorites").then(data =>{
                let rows = data.filter(row => row.user_id === parseInt(userId, 10))
                console.table(data)
                console.table(rows)
                res.send({
                    rows
                })
            })
         }
    }

    show(req, res){
        if(/^\d+$/.test(req.params.id) && req.headers['x-requested-with'] === 'XMLHttpRequest'){
            db.getData("/favorites").then(resp =>{
                let row = resp.find(r => r.id === parseInt(req.params.id))
                if(row){
                    fetch(row.url).then(resp => resp.text()).then(d => {
                        let rss = new xmldoc.XmlDocument(d),
                            items = rss.childNamed('channel').childrenNamed("item"),
                            output = []
                        for(let [i, row] of Object.entries(items)){
                            output = [...output, {
                                'title': row.childNamed('title')? row.childNamed('title').val : '',
                                'href': row.childNamed('link')? row.childNamed('link').val : '',
                                'img': row.childNamed('enclosure')? row.childNamed('enclosure').attr.url : ''
                            }]
                        }
                        res.send(output)
                    })
                }else{
                    res.send(404)
                }
            })
        }
    }

    add(req, res){
        let statusCode = 400
        if(req.method == 'POST' && req.headers['x-requested-with'] === 'XMLHttpRequest'){
            let {id, name, url, userId} = req.body,
                errors = {},
                result = 'ko',
                rows = []
            db.getData("/favorites").then(data =>{
                if(name.trim() ===''){
                    errors['name'] = "Ce champ ne doit pas être vide"
                }

                if(data.filter(r => r.name === name && r.userId === userId).length > 0){
                    errors['name'] = "Ce titre éxiste déjà"
                }

                if(!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(rss|feed|xml)?$/.test(url)){
                    errors['url'] = "l'url fournie ne semble pas être valide"
                }
                
                if(Object.keys(errors).length === 0){
                    fetch(url).then(resp => resp.text()).then(d =>{
                        if(d.includes("<channel>")){
                            rows = [...data, {
                                id,
                                name,
                                url,
                                'user_id': userId
                            }]
                            db.push("/favorites", rows)
                            result = 'ok'
                            statusCode = 201
                        }else{
                            errors['url'] = "l'url fournie ne semble pas être valide"
                        }
                        res.status(statusCode).send({
                            rows,
                            result,
                            errors
                        })
                    })
                }else{
                    res.status(statusCode).send({
                        rows,
                        result,
                        errors
                    })
                }
            })
        }
        res.status(statusCode)
    }
}
