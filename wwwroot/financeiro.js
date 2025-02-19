function abrirModalConta(acao, tipoConta) {
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
        btnSalvar.setAttribute("onclick", `salvarNovaConta(${tipoConta})`);
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


function buscarValores(tipoConta) {
    return {
        "descricao": document.getElementById("descricaoConta").value,
        "valor": document.getElementById("valorConta").value,
        //"id_lote":document.getElementById("loteId").value,
        "data_emissao": document.getElementById("dataEmissao").value,
        "data_vencimento": document.getElementById("dataVencimento").value,
        "Is_receber": tipoConta,
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
        abrirModalConta(event.target.dataset.acao, event.target.id > 3 ? 1 : 0, event.target.dataset.tipo);
    }
});

/*Função para abrir modais de Produto ou Financeiro
function abrirModal(acao, tipoConta, tipo) {
    let modalTitulo = document.getElementById("tituloModal");
    let btnSalvar = document.getElementById("salvar");
    let formulario = document.getElementById("dados");

    if (tipo === "financeiro") {
        modalTitulo = document.getElementById("tituloModalConta");
        btnSalvar = document.getElementById("salvarConta");
        formulario = document.getElementById("dadosConta");
    }

    // Define o título e a ação do botão conforme a ação selecionada
    if (acao === "novo") {
        modalTitulo.textContent = tipo === "produto" ? "Adicionar Produto" : "Adicionar Conta";
        btnSalvar.textContent = "Salvar";
        btnSalvar.setAttribute("onclick", tipo === "produto" ? "adicionaProduto()" : `salvarNovaConta(${tipoConta})`);
    } else if (acao === "alterar") {
        modalTitulo.textContent = tipo === "produto" ? "Alterar Produto" : "Alterar Conta";
        btnSalvar.textContent = "Alterar";
        btnSalvar.setAttribute("onclick", tipo === "produto" ? "alteraProduto()" : "alterarConta()");
    } else if (acao === "excluir") {
        modalTitulo.textContent = tipo === "produto" ? "Excluir Produto" : "Excluir Conta";
        btnSalvar.textContent = "Confirmar Exclusão";
        btnSalvar.setAttribute("onclick", tipo === "produto" ? "deleteProduto()" : "deletarConta()");
    }

    // Exibe o modal correto
    let modal = new bootstrap.Modal(document.getElementById(tipo === "produto" ? "modal" : "modalConta"));
    modal.show();
}

// Função para limpar os modais
function limparModal() {
    document.getElementById("dados").reset();
}

function limparModalConta() {
    document.getElementById("dadosConta").reset();
}

// Adicionar ações dos modais de produto e financeiro
function adicionaProduto() {
    alert("Produto adicionado!");
}

function alteraProduto() {
    alert("Produto alterado!");
}

function deleteProduto() {
    alert("Produto excluído!");
}

function adicionarConta() {
    alert("Conta adicionada!");
}

function alterarConta() {
    alert("Conta alterada!");
}

function deletarConta() {
    alert("Conta excluída!");
}
// Função para buscar contas a receber
async function getContasAReceber() {
    // Lógica para buscar e atualizar a lista de contas a receber
}

// Funções para adicionar, alterar e excluir contas a receber
function adicionarContaReceber() {
    alert("Conta a Receber adicionada!");
}

function alterarContaReceber() {
    alert("Conta a Receber alterada!");
}

function deletarContaReceber() {
    alert("Conta a Receber excluída!");
}

// Limpar campos do modal de Conta a Receber
function limparModalContaReceber() {
    document.getElementById("dadosContaReceber").reset();
    
}
*/

