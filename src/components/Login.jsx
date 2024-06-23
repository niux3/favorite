import Input from './Input'


function Login({onLogin, errorForm, toRegister}){
    return (
        <div className="wrap-login">
            <form method="post" className="grid-container" onSubmit={onLogin}>
                <Input text="login" type="text" name="login" errorInput={errorForm.login} />
                <Input text="mot de passe" name="password" type="password" errorInput={errorForm.password} />
                <div className="grid-x grid-margin-x align-justify">
                    <a href="#" className="clear button primary cell medium-4" onClick={toRegister}>s'inscrire</a>
                    <button className="button cell medium-4" type="submit">se connecter</button>
                </div>
            </form>
        </div>
    )
}
export default Login
