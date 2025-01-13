let produtoListado;
let produtoSelecionado = 0;
let cadastroProduto= `
    <form method="PUT" name="cadastroProduto">
        <label for= "pnome">Nome Produto </label>
        <input type="text" id="pnome" name="pnome" required><br>
        <p>Perecivel:</p><br>
        <input type="radio" id="perecivel" value="nao"></input>
        <label for= "perecivel" value="1">Sim</label>
        <input type="radio" id="nperecivel" value="nao"></input>
        <label for= "nperecivel" value="0">Não</label>
    </form>
`
function ifremeProduto(){
    if (produtoSelecionado==0){
        let iframe= document.createElement("iframe");
        iframe.srcdoc=cadastroProduto;
        document.getElementById("conteiner").appendChild(iframe);
        document.getElementsByTagName("html").style.display= "block";
    }
}

async function getProdutos(num) {
    num = num ?? "";
    let asides = [];
    let coluna = document.getElementById("coluna");
    try {
        let produtos = await fetch(`app/produtos/${num}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!produtos.ok) {
            throw new Error("Failed to get produtos");
        }
        produtoListado = await produtos.json()
        for (var i in produtoListado) {
            let aside = document.createElement("aside");
            aside.innerHTML = `<aside class="ProdutoListado" onclick="clickProduto(${i["id"]})">
            <div class="expandidor"></div>
            <div class="nome-codigo">${i["nome"]}</div>
            <div class="valor">${i["preco"]}</div>
            <div  class="nome-codigo"></div>
            <div class="divididor"></div>
        </aside>`
            coluna.appendChild(aside);
        }
    }
    catch (error) {
    console.error(error);
}

}
getProdutos();



function clickProduto(id) {
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