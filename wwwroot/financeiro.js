function abrirModalConta(acao) {
    const modalTitulo = document.getElementById("tituloModalConta");
    const btnSalvar = document.getElementById("salvarConta");
    const descricao = document.getElementById("descricaoConta");
    const valor = document.getElementById("valorConta");
    const dataVencimento = document.getElementById("dataVencimento");

    // Ajustando título e comportamento do botão com base na ação
    if (acao === "adicionar") {
        modalTitulo.textContent = "Adicionar Conta";
        btnSalvar.textContent = "Salvar";
        btnSalvar.setAttribute("onclick", "salvarNovaConta()");
        descricao.disabled = false;
        valor.disabled = false;
        dataVencimento.disabled = false;
    } 
    else if (acao === "alterar") {
        modalTitulo.textContent = "Alterar Conta";
        btnSalvar.textContent = "Alterar";
        btnSalvar.setAttribute("onclick", "salvarAlteracaoConta()");
        descricao.disabled = false;
        valor.disabled = false;
        dataVencimento.disabled = false;
    } 
    else if (acao === "excluir") {
        modalTitulo.textContent = "Excluir Conta";
        btnSalvar.textContent = "Confirmar Exclusão";
        btnSalvar.setAttribute("onclick", "confirmarExclusaoConta()");
        descricao.disabled = true;
        valor.disabled = true;
        dataVencimento.disabled = true;
    }

    // Abrindo o modal
    let modal = new bootstrap.Modal(document.getElementById("modalConta"));
    modal.show();
}

function limparModalConta() {
    document.getElementById("dadosConta").reset();
}

// Ações de salvar (você pode substituir pelo código correto)
function salvarNovaConta() {
    alert("Conta adicionada com sucesso!");
}

function salvarAlteracaoConta() {
    alert("Conta alterada com sucesso!");
}

function confirmarExclusaoConta() {
    alert("Conta excluída com sucesso!");
}
