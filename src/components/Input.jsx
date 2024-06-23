function Input({text, name, type, errorInput}){
    let spanError = errorInput !== ''? <span className="error">{errorInput}</span> : ''
    return (
        <label>
            <span>{text}</span>
            <input type={type} name={name} />
            {spanError}
        </label>
    )
}
export default Input
