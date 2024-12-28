async function getProdutos() {
    let asides = [];
    let coluna = document.getElementById("coluna");
    try {
        let produtos = await fetch("app/produtos", {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!produtos.ok) {
            throw new Error("Failed to get produtos");
        }

        produtos = await produtos.json()
        if (produtos != null) {
            for (let i = 0; i < produtos.length; i++) {
                let aside = document.createElement("aside");
                aside.innerHTML = `<aside class="ProdutoListado" onclick="clickProduto(${produtos[i]["id"]})">
            <div class="expandidor"></div>
            <div class="nome-codigo">${produtos[i]["nome"]}</div>
            <div class="valor">${produtos[i]["preco"]}</div>
            <div  class="nome-codigo"></div>
            <div class="divididor"></div>
        </aside>`
                coluna.appendChild(aside);
            }

        }
    } catch (error) {
        console.error(error);
    }

}
getProdutos();

function clickProduto(id){
    console.log(id);
}

















async function requisicao() {
    let code = document.getElementById("barras").value;

    let url = `https://api.cosmos.bluesoft.com.br/gtins/${code}.json`;
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Cosmos-API-Request",
                "X-Cosmos-Token": "EhneOzzKCFC7znF-yqgyhA",
            },
        });
        if (!response.ok) {
            throw new Error();
        }
        var body = await response.json();
        document.getElementById("name").value = body["description"];
    } catch (error) {
        console.error("Request failed:", error);
    }
}