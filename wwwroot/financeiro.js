let contaSelecionada = 0;

function abrirModalConta(acao) {
    const modalTitulo = document.getElementById("tituloModalConta");
    const btnSalvar = document.getElementById("salvarConta");
    const descricao = document.getElementById("descricaoConta");
    const valor = document.getElementById("valorConta");
    //const loteId = document.getElementById("loteId");
    const dataEmissao = document.getElementById("dataEmissao");
    const dataVencimento = document.getElementById("dataVencimento");

    // Ajustando título e comportamento do botão com base na ação
    if (acao === "adicionar") {
        modalTitulo.textContent = "Adicionar Conta";
        btnSalvar.textContent = "Salvar";
        btnSalvar.setAttribute("onclick", `salvarNovaConta()`);
        descricao.disabled = false;
        valor.disabled = false;
        //loteId.disabled = false;
        dataEmissao.disabled = false;
        dataVencimento.disabled = false;
    }
    else if (acao === "alterar") {
        modalTitulo.textContent = "Alterar Conta";
        btnSalvar.textContent = "Alterar";
        btnSalvar.setAttribute("onclick", "salvarAlteracaoConta()");
        descricao.disabled = false;
        valor.disabled = false;
        // loteId.disabled = false;
        dataEmissao.disabled = false;
        dataVencimento.disabled = false;
    }
    else if (acao === "excluir") {
        modalTitulo.textContent = "Excluir Conta";
        btnSalvar.textContent = "Confirmar Exclusão";
        btnSalvar.setAttribute("onclick", "confirmarExclusaoConta()");
        descricao.disabled = true;
        valor.disabled = true;
        //loteId.disabled = true;
        dataEmissao.disabled = true;
        dataVencimento.disabled = true;
    }


    // Abrindo o modal
    let modal = new bootstrap.Modal(document.getElementById("modalConta"));
    modal.show();
}

function limparModalConta() {
    document.getElementById("dadosConta").reset();
}


function buscarValores() {
    return {
        "descricao": document.getElementById("descricaoConta").value,
        "valor": document.getElementById("valorConta").value,
        //"id_lote":document.getElementById("loteId").value,
        "data_emissao": document.getElementById("dataEmissao").value,
        "data_vencimento": document.getElementById("dataVencimento").value,
        "Is_receber": !document.getElementById("Pagar").checked,
        "id_prestador": 1
    }
}
// Ações de salvar (você pode substituir pelo código correto)
async function salvarNovaConta(tipoConta) {
    try {
        const valores = buscarValores(tipoConta);
        console.log("Valores enviados para API:", valores);

        let save = await fetch("app/Contas/AdicionarContas", {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(valores)
        });

        if (save.ok) {
            alert("Conta adicionada com sucesso");
            return;
        }

        throw new Error("Erro ao adicionar a conta");

    } catch (error) {
        console.error("Erro ao salvar conta:", error);
    }
}


function salvarAlteracaoConta() {
    alert("Conta alterada com sucesso!");
}

function confirmarExclusaoConta() {
    alert("Conta excluída com sucesso!");
}


document.addEventListener("click", function (event) {
    if (event.target.tagName === "LI" && event.target.dataset.acao) {
        abrirModalConta(event.target.dataset.acao, event.target.dataset.tipo);
    }
});

async function getContas(num) {
    let corpo = document.getElementById("coluna");
    let filhos = document.getElementsByClassName("transacao");
    contaSelecionada=0;
    for (i in filhos) {
        for (let lf of filhos) {
            lf.remove();
        }
    }
    try {
        let req = await fetch(`app/Contas/getcontas/${num}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (!req.ok) {
            throw new Error("the accont not found");
        }
        let contas = await req.json();
        for (let i = 0; i < contas.length; i++) {
            let elemento = document.createElement("div");
            elemento.innerHTML = `<div class="transacao" id= ${contas[i]["id"]} onclick="getId(${contas[i]["id"]})">
                <div id="desc2">${contas[i]["descricao"]}</div>
                <div id="valor2">${contas[i]["valor"]}</div>
                <div id="pagador2">${contas[i]["pagador"]}</div>
                <div id="vencimento2">${new Date(contas[i]["data_vencimento"]).toLocaleDateString("pt-BR")}</div>
                <div id="emissao2">${new Date(contas[i]["data_emissao"]).toLocaleDateString("pt-BR")}</div>
            </div>`
            corpo.appendChild(elemento);
            if (new Date(contas[i]["data_vencimento"]) < new Date()) {
                document.getElementById(contas[i]["id"]).style.backgroundColor = "#fd8c8c";
            }
            else {
                document.getElementById(contas[i]["id"]).style.backgroundColor = "#8dfd8c";
            }
        }
    } catch (error) {
        console.log(error)
    }
}
document.getElementById("pagar").addEventListener("click", function () {
    getContas(0);
})
document.getElementById("receber").addEventListener("click", function () {
    getContas(1);
})
function getId(num){
        if (contaSelecionada != 0) {
            document.getElementById(contaSelecionada).style.filter = "brightness(100%)";
        }
        contaSelecionada = num;
        document.getElementById(contaSelecionada).style.filter = "brightness(52%)";
}