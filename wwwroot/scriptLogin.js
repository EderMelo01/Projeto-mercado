async function verificacao(event){
    event.preventDefault();

    const res = {
        nome: document.getElementById("name").value,
        senha: document.getElementById("senha").value
    };
    try{
        const login= await fetch("/api/login",
            {
                method: "GET",
                headers: {
                    "content-type": "application/json",
                }
            }
        );
        if(!login.ok){
            throw new Error(await response.text());
        }

        const result= await login.body();
        console.log(result);
    }
    catch(error)
    {
        console.error("Mensagem erro: "+ error);
    }
}    


document.getElementById("logar").addEventListener("submit", verificacao);
