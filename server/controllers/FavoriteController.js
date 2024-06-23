import db from '../db.js'


export default class FavoriteController{
    index(req, res){
        db.getData("/favorites").then(resp => res.send(resp))
    }

    show(req, res){
        // 1719058118090
        if(/^\d+$/.test(req.params.id)){
            db.getData("/favorites").then(resp =>{
                let row = resp.find(r => r.id === parseInt(req.params.id))
                if(row){
                    fetch(row.url).then(resp => resp.text()).then(d => res.send(d))
                }else{
                    res.send(404)
                }
            })
        }
    }
}
