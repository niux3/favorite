import db from "./db.js"


const mock = ()=>{
    let defaultLinks = [
        {
            'id': new Date().getTime(),
            'name': 'linternaute actualité',
            'url': 'https://www.linternaute.com/actualite/rss/'
        },
        {
            'id': new Date().getTime() + 1,
            'name': 'linternaute sport',
            'url': 'https://www.linternaute.com/sport/rss/'
        },
        {
            'id': new Date().getTime() + 2,
            'name': 'linternaute cinema',
            'url': 'https://www.linternaute.com/cinema/rss/'
        },
    ]
    let defaultUsers = [
        {
            'id': new Date().getTime() + 3,
            "login": "demo",
            "password": "fe01ce2a7fbac8fafaed7c982a04e229"
        }
    ]

    db.push("/favorites", defaultLinks)
    db.push("/users", defaultUsers)
}
export default mock
