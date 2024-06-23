import Input from './Input'


function Register({onRegister, errorForm, toLogin}){
    return (
        <div className="wrap-login">
            <form method="post" className="grid-container" onSubmit={onRegister} autoComplete="off">
                <Input text="login" type="text" name="login" errorInput={errorForm.login} />
                <Input text="mot de passe" name="password" type="password" errorInput={errorForm.password} />
                <Input text="confirmer mot de pass" name="confirm" type="password" errorInput={errorForm.confirm} />
                <div className="grid-x grid-margin-x align-justify">
                    <a href="#" className="clear button primary cell medium-4" onClick={toLogin}>Se connecter</a>
                    <button className="button cell medium-4" type="submit">s'inscrire</button>
                </div>
            </form>
        </div>
    )
}
export default Register
