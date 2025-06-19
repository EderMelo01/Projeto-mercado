let produtoListado;
let modal;
let isAtivo = 1;
let botaoSalvar = document.getElementById("btn btn-save")


async function getProdutos(texto = null) {
    let campoTexto = document.getElementById("searchInput").value.toLowerCase();
    texto = campoTexto.trim().length > 0 ? campoTexto.trim() : texto;
    try {
        let produtos = await fetch(`app/produtos/produtos?status=${isAtivo}&texto=${texto}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!produtos.ok) {
            throw new Error("Failed to get produtos");
        }

        produtoListado = await produtos.json();
        geraProdutos(produtoListado);
    } catch (error) {
        console.error(error);
    }
}

getProdutos();

document.querySelectorAll('[name="status"]').forEach((radios) => {
    radios.addEventListener("click", async (event) => {
        isAtivo = event.target.value == "ativo" ? 1 : 0;
        await getProdutos();
    })
})

async function editProduct(id) {
    try {
        let requisicao = await fetch(`app/produtos/${id}`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!requisicao.ok) {
            throw new Error("Falhou na busca");
        }
        botaoSalvar.getAttribute("onclick", "salvarProdutoAlterado()");
        botaoSalvar.textContent = "Alterar"
        let respostaJson = await requisicao.json();
        valuesForJson(respostaJson[0]);

    } catch (erro) {
        console.log(erro);
    }
}

function camposProduto() {
    let form = new FormData(document.getElementById("productForm"));
    const produto = {}
    produto["perecivel"] = 0
    form.forEach((value, key) => {
        if (key == "perecivel") {
            produto[key] = 1;
        }
        else {
            produto[key] = value;
        }
    })
    return produto;
}



async function salvarProdutoAlterado() {
    let produto = camposProduto();
    try {
        let requisicao = await fetch(`app/produtos/${produtoSelecionado}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produto)
        });

        if (!requisicao.ok) {
            throw new Error("Erro ao atualizar o produto");
        }
    } catch (erro) {
        console.log(erro);
    }
}

async function geraProdutos(array) {
    let coluna = document.getElementById("productsTableBody");
    let elementos = Array.from(document.getElementsByClassName("ProdutoListado"));
    for (el of elementos) {
        el.remove();
    }

    array.forEach(function (i) {
        let tr = document.createElement("tr");
        tr.setAttribute("data-id", i["id_produto"]);
        tr.classList.add("ProdutoListado");

        tr.innerHTML = `
            <td>${i["id_produto"]}</td>
            <td>${i["nome"]}</td>
            <td class="price">R$ ${i["preco"]}</td>
            <td><span class="perecivel-badge perecivel-nao">Não</span></td>
            <td><span class="status-badge status-active">Ativo</span></td>
            <td>
                <div class="action-buttons">
                    <button class="btn-action btn-edit" onclick="editProduct(${i["id_produto"]})">Alterar</button>
                    <button class="btn-action btn-inactive" onclick="Inative(${i["id_produto"]})">Inativar</button>
                    <button class="btn-action btn-delete" onclick="deleteProduto(${i["id_produto"]})">Excluir</button>
                </div>
            </td>
        `;
        coluna.appendChild(tr);
    });
}


function clearForm() {
    document.getElementById("productForm").reset();
    botaoSalvar.getAttribute("onclick", "saveProduct()");
    botaoSalvar.textContent = "Salvar"

}

document.getElementById("searchInput").addEventListener("keydown", function () {
    let texto = this.value;
    if (texto.length >= 1) {
        getProdutos(texto);
    }
});

async function deleteProduto(id) {
    try {
        var result = await fetch(`app/produtos/${id}`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!result.ok) {
            throw new Error("falha ao tentar excluir");
        }

        getProdutos();
    } catch (erro) {
        console.log(erro);
    }
}

async function saveProduct() {
    const camposTela = camposProduto()
    try {
        var result = await fetch(`app/produtos/ProdutoNovo`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(camposTela)
        });

        if (!result.ok) {
            throw new Error("falha ao tentar adicionar o produto");
        }
    } catch (erro) {
        console.log(erro);
    }

    getProdutos();
}

async function requisicao(code) {
    let url = `https://api.cosmos.bluesoft.com.br/gtins/${code}.json`;

    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "Cosmos-API-Request",
                "X-Cosmos-Token": "9xeJteDqV6sEec5h0XPEWA",
            },
        });

        if (!response.ok) {
            throw new Error();
        }

        var body = await response.json();
        valuesForJson({
            "nome": body["description"],
            "preco": 0,
            "imagem": body["thumbnail"]
        });
    } catch (error) {
        console.error("Request failed:", error);
    }
}

document.getElementById("codigo").addEventListener("input", async function () {
    if (this.value.length >= 13) {
        await requisicao(this.value);
    }
});

async function Inative(id) {
    try {
        let response = await fetch(`app/produtos/${id}/${0}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Falha em mudar o status");
        }

        alert("Status alterado");
        getProdutos();
    } catch (erro) {
        console.log(erro);
    }
}

function valuesForJson(produto) {
    ["nome", "preco", "perecivel", "codigo"].forEach(campo => {
        if (campo == "perecivel") {
            document.getElementById(campo).checked = produto[campo] == 1;
        }
        else if(produto[campo]){
            document.getElementById(campo).value = produto[campo] ?? "";
        }
    });

}

