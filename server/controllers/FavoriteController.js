import db from '../db.js'
import xmldoc from 'xmldoc'


export default class FavoriteController{
    index(req, res){
        if(req.headers['x-requested-with'] === 'XMLHttpRequest'){
            db.getData("/favorites").then(resp => res.send(resp))
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
        if(req.method == 'POST' && req.headers['x-requested-with'] === 'XMLHttpRequest'){
            let {id, name, url} = req.body,
                errors = {}
            db.getData("/favorites").then(data =>{
                if(name.trim() ===''){
                    errors['name'] = "Ce champ ne doit pas être  vide"
                }

                if(!/^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?(rss|feed|xml)$/.test(url)){
                    errors['url'] = "l'url fournie ne semble pas valide"
                }

                if(Object.keys(errors).length === 0){
                    let row = [...data, {
                        id,
                        name,
                        url
                    }]
                    db.push("/favorites", row)
                    res.status(201).send({
                        result: 'ok'
                    })
                }
                res.status(400)
            })
        }
    }
}
