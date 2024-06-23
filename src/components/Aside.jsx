function Aside({links, onGetRss}){
    let rows = []
    for(let [i, link] of Object.entries(links)){
        rows = [...rows, (
            <li key={i}>
                <a href={link.url} data-id={link.id} onClick={onGetRss}>{link.name}</a>
            </li>
        )]
    }
    return (
        <aside className="cell medium-3">
            <nav>
                <ul className="no-bullet">
                    {rows}
                </ul>
            </nav>
        </aside>
    )
}
export default Aside
