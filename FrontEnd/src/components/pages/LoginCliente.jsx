import LinkButton from "../layout/LinkButton";

function loginCliente(){
    return (
        <div>
            <h1>Login Cliente</h1>
            <LinkButton to="/cadastroCliente" text="Cadastrar Cliente" />
        </div>
    )
}

export default loginCliente;