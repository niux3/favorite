function Loader({loading}){
    let isDisplay = loading? 'display': ''
    return (
        <div className={`overlay ${isDisplay}`}>
            <span className="loader"></span>
        </div>
    )
}

export default Loader
