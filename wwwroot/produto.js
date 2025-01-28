let produtoListado;
let produtoSelecionado = 0;
let cadastroProduto = `
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
let verificador;
function ifremeProduto() {
    if (produtoSelecionado == 0) {
        let iframe = document.createElement("iframe");
        iframe.srcdoc = cadastroProduto;
        document.getElementById("conteiner").appendChild(iframe);
        document.getElementsByTagName("html").style.display = "none";
    }
}

async function getProdutos(verificadorSelecionado = 3, texto = null) {
    let campoTexto = document.getElementById("filtroID").value.toLowerCase();
    texto = campoTexto.trim().length > 0 ? campoTexto.trim() : texto;
    verificador = verificadorSelecionado;
    try {
        let produtos = await fetch(`app/produtos/produtos?status=${verificador}&texto=${texto}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!produtos.ok) {
            throw new Error("Failed to get produtos");
        }
        produtoListado = await produtos.json()
        geraProdutos(produtoListado);
        produtoSelecionado = 0;
    }
    catch (error) {
        console.error(error);
    }

}
getProdutos();



function clickProduto(idProduto) {
    if (produtoSelecionado != 0) {
        document.getElementById(produtoSelecionado).style.backgroundColor = "transparent";
    }
    produtoSelecionado = idProduto;
    document.getElementById(produtoSelecionado).style.backgroundColor = "#b5b5b5";
}






async function alteraProduto() {
    try {
        let requisicao = await fetch(`app/produtos/${produtoSelecionado}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!requisicao.ok) {
            throw new Error("Falhou alterar o produto");
        }
    }
    catch (erro) {
        console.log(erro);
    }

}





async function geraProdutos(array) {
    let coluna = document.getElementById("coluna");
    let filhos = document.getElementsByClassName("ProdutoListado");
    for (i in filhos) {
        for (let lf of filhos) {
            lf.remove();
        }
    }
    array.forEach(function (i) {
        let aside = document.createElement("aside");
        aside.innerHTML = `<aside id="${i["id_produto"]}" class="ProdutoListado" onclick="clickProduto(${i["id_produto"]})">
        <div class="expandidor"></div>
        <div class="nome-codigo">${i["nome"]}</div>
        <div class="valor">${i["preco"]}</div>
        <div  class="nome-codigo"></div>
        <div class="divididor"></div>
    </aside>`
        coluna.appendChild(aside);
    });
}

document.getElementById("filtroID").addEventListener("keydown", function () {
    let texto = this.value;
    if (texto.length >= 1) {
        getProdutos(verificador, texto);
    }

});



async function deleteProduto() {
    if (produtoSelecionado != 0) {
        try {
            var result = await fetch(`app/produtos/${produtoSelecionado}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!result.ok) {
                throw new Error("falha ao tentar excluir");
            }
            getProdutos(verificador);
        }
        catch (erro) {
            console.log(erro);
        }
    }
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
async function Inative(num) {
    if (produtoSelecionado == 0) {
        alert("Selecione um produto");
        return;
    }
    for(let i in produtoListado){
        if(produtoListado[i]["id_produto"]==produtoSelecionado && produtoListado[i]["status"]==num){
            alert("Produto já está"+(num==0? "inativo": "ativo"));
            return;
        }
    }

    try{
        let response= await fetch(`app/produtos/setStatus?id=${produtoSelecionado}&novoStatus=${num}`, {
            method:"PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(!response.ok){
            throw new Error("Falha em mudar o status");
        }
        alert("Status alterado")
        getProdutos(verificador);
    }
    catch(erro){
        console.log(erro);
    }
    
}