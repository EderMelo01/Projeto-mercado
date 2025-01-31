async function verificacao(event){
    event.preventDefault();
    const res = {
        nome: document.getElementById("name").value,
        senha: document.getElementById("senha").value
    };
    try{
        const login= await fetch("api/user/login",
            {
                method: "POST",
                body: JSON.stringify(res),
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );
        if(!login.ok){
            throw new Error(await login.text());
        }

        const result= await login.text();
        alert(result);
        result == "Logado com sucesso"? window.location.href = "telaInicial.html": "";

    }
    catch(error)
    {
        console.error(error);
    }
}    
document.getElementById("logar").addEventListener("submit", verificacao);

