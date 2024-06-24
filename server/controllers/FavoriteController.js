import db from '../db.js'
import xmldoc from 'xmldoc'


export default class FavoriteController{
    index(req, res){
        db.getData("/favorites").then(resp => res.send(resp))
    }

    show(req, res){
        if(/^\d+$/.test(req.params.id)){
            db.getData("/favorites").then(resp =>{
                let row = resp.find(r => r.id === parseInt(req.params.id))
                if(row){
                    fetch(row.url).then(resp => resp.text()).then(d => {
                        var rss = new xmldoc.XmlDocument(d),
                            items = rss.firstChild.childrenNamed("item"),
                            output = []
                        for(let [i, row] of Object.entries(items)){
                            output = [...output, {
                                'title': row.childNamed('title')?.val,
                                'href': row.childNamed('link')?.val,
                                'img': row.childNamed('enclosure')?.attr?.url
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
}
