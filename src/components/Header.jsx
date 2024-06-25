function Header({showModal}){
    return (
        <div className="sticky padding-vertical-1">
            <header className="grid-container grid-x grid-padding-x align-justify">
                <p className="h3 col small-4"><strong>Visionneuse RSS</strong></p>
                <button className="button" onClick={showModal}>ajouter un lien</button>
            </header>
        </div>
    )
}

export default Header
