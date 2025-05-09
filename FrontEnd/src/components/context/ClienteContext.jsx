import { createContext, useEffect, useState } from "react";

export const ClienteContext = createContext();

export function ClienteProvider({children}){
    const [cliente, setCliente] = useState(null);

    useEffect(() => {
        const clienteSalvo = localStorage.getItem("clienteLogado");
        console.log("Cliente salvo no localStorage:", clienteSalvo);
        if(clienteSalvo && !cliente){
            setCliente(JSON.parse(clienteSalvo))
        }
    }, [cliente])

    const logarCliente = (clienteData) => {
        localStorage.setItem("clienteLogado", JSON.stringify(clienteData));
        setCliente(clienteData)
    };

    const deslogarCliente = () => {
        localStorage.removeItem("clienteLogado")
        setCliente(null);
    };

    return(
        <ClienteContext.Provider value={{cliente, logarCliente, deslogarCliente}}>{children}</ClienteContext.Provider>
    )
}