import Input from "./Input"

function FormAddLink({addLink, errorForm}){
    return (
        <>
            <h2>ajouter un flux</h2>
            <form method="post" onSubmit={addLink}>
                <Input text="titre" type="text" name="name" errorInput={errorForm.name} />
                <Input text="url" type="text" name="url" errorInput={errorForm.url} />
                <button type="submit" className="button expanded">ajouter</button>
            </form>
        </>
    )
}
export default FormAddLink
