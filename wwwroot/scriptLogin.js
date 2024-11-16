async function verificacao(event){
    event.preventDefault();

    const res = {
        nome: document.getElementById("name").value,
        senha: document.getElementById("senha").value
    };
    try{
        const login= await fetch("/app/login",
            {
                method: "POST",
                body: JSON.stringify(res),
                headers: {
                    "content-type": "application/json",
                }
            }
        );
        if(!login.ok){
            throw new Error(await login.text());
        }

        const result= await login.text();
        console.log(result);
    }
    catch(error)
    {
        console.error(error);
    }
}    


document.getElementById("logar").addEventListener("submit", verificacao);
