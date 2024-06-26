import db from "./db.js"


const mock = ()=>{
    let defaultLinks = [
        {
            'id': new Date().getTime(),
            'name': 'linternaute actualité',
            'url': 'https://www.linternaute.com/actualite/rss/',
            'user_id': new Date().getTime() + 5
        },
        {
            'id': new Date().getTime() + 1,
            'name': 'linternaute sport',
            'url': 'https://www.linternaute.com/sport/rss/',
            'user_id': new Date().getTime() + 5
        },
        {
            'id': new Date().getTime() + 2,
            'name': 'linternaute cinema',
            'url': 'https://www.linternaute.com/cinema/rss/',
            'user_id': new Date().getTime() + 5
        },
        {
            'id': new Date().getTime() + 3,
            'name': 'actualite alsacreations',
            'url': 'https://www.alsacreations.com/rss/actualites.xml',
            'user_id': new Date().getTime() + 5
        },
        {
            'id': new Date().getTime() + 4,
            'name': 'figaro actualité',
            'url': 'https://www.lefigaro.fr/rss/figaro_actualites.xml',
            'user_id': new Date().getTime() + 5
        },
    ]
    let defaultUsers = [
        {
            'id': new Date().getTime() + 5,
            "login": "demo",
            "password": "fe01ce2a7fbac8fafaed7c982a04e229"
        }
    ]

    db.push("/favorites", defaultLinks)
    db.push("/users", defaultUsers)
}
export default mock
