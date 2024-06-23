function Modal({children, closeModal}){
    return (
        <>
            <div className="reveal-overlay" onClick={closeModal}></div>
            <div className="reveal">
                <button className="close-button" type="button" onClick={closeModal}>
                    <span aria-hidden="true">×</span>
                </button>
                {children}
            </div>
        </>
    )
}
export default Modal
