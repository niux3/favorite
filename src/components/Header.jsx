function Header({showModal, onLogout}){
    return (
        <div className="sticky padding-vertical-1">
            <header className="grid-container grid-x grid-padding-x align-justify">
                <p className="h3 col small-4"><strong>Visionneuse RSS</strong></p>
                <div>
                    <button className="button margin-right-1" onClick={showModal}>ajouter un lien</button>
                    <button className="button alert" onClick={onLogout}>se déconnnecter</button>
                </div>
            </header>
        </div>
    )
}

export default Header
