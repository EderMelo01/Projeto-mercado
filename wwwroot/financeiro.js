

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

