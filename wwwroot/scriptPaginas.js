const paginaInicial = document.getElementById("conteiner").innerHTML;

const paginas = {
    "/home": paginaInicial,
    "/produto": `
    <div id="coluna" class="coluna">
        <div>
            <input type="text" id="filtroID" placeholder="Digite o Produto"></input>
        </div>
        <aside>
            <div  class="expandidor"></div>
            <div  class="nome-codigo">Nome</div>
            <div  class="valor">Valor venda</div>
            <div  class="nome-codigo">Código de barras</div>
            <div class="divididor"></div>
        </aside>
    </div>
    
    <nav>
        <ul>
            <li class="menu">Produtos
                <ul class="itens">
                    <li onclick="ifremeProduto()"><i class="fa fa-plus"></i>Novo</li>
                    <li onclick= "alteraProduto()"><i class="fa fa-pencil"></i>Alterar</li>
                    <li onclick= "deleteProduto()"> <i class="fa fa-trash"></i>Excluir</li>
                </ul>
                <ul class="itens">
                    <li class= "BtStatus" onclick="getProdutos()"><i></i>Todos</li>
                    <li class= "BtStatus" onclick="getProdutos(1)"><i></i>Ativos</li>
                    <li class= "BtStatus" onclick="getProdutos(0)"><i></i>Inativos</li>
                </ul>
                <ul class="itens">
                    <li class= "BtStatus" onclick="Inative(1)"><i></i>Ativar</li>
                    <li class= "BtStatus" onclick="Inative(0)"><i></i>Inativar</li>
                </ul>
            </li>
        </ul>
    </nav>
    <div class="modal fade" id="modal" tabindex="-1" aria-labelledby="tituloModal" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tituloModal">Título do Modal</h5>
                    <button type="button" class="btn-close" onclick="limparModal()" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <form name="cadastroProduto" id="dados" action="#">
                        <img id="imgProduto" width="150" height="150">
                        <div class="mb-3">
                            <label for="pnome" class="form-label">Nome Produto</label>
                            <input type="text" id="pnome" name="pnome" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="pcodigo" class="form-label">Código de barras</label>
                            <input type="number" id="pcodigo" name="codigo" class="form-control">
                        </div>
                        <div class="mb-3">
                            <label for="ppreco" class="form-label">Preço Produto</label>
                            <input type="text" id="ppreco" name="ppreco" class="form-control" required>
                        </div>
                        <p>Perecível:</p>
                        <div class="form-check">
                            <input type="radio" id="perecivelSim" name="perecivel" value="1" class="form-check-input">
                            <label for="perecivelSim" class="form-check-label">Sim</label>
                        </div>
                        <div class="form-check">
                            <input type="radio" id="perecivelNao" name="perecivel" value="0" class="form-check-input">
                            <label for="perecivelNao" class="form-check-label">Não</label>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="limparModal()">Fechar</button>
                            <button id="salvar" type="button" onclick="adicionaProduto()" class="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    `,
"/financeiro": `
    <div id="coluna" class="coluna">
        <h2>Financeiro</h2>

        <div>
            <h3>Contas a Pagar</h3>
            <input type="text" id="filtroContaPagar" placeholder="Digite o nome da conta a pagar"></input>
            <button onclick="getContasAPagar()">Procurar</button>
        </div>

        <div>
            <h3>Contas a Receber</h3>
            <input type="text" id="filtroContaReceber" placeholder="Digite o nome da conta a receber"></input>
            <button onclick="getContasAReceber()">Procurar</button>
        </div>

        <aside>
            <div class="expandidor"></div>
            <div class="nome-codigo">Descrição</div>
            <div class="valor">Valor</div>
            <div class="data">Data de Vencimento</div>
            <div class="status">Status</div>
            <div class="divididor"></div>
        </aside>

        <div id="listaContas">
            <!-- As contas a pagar e a receber serão listadas aqui -->
        </div>
    </div>

    <nav>
        <ul>
            <li class="menu">Contas
                <ul class="itens">
                    <li data-acao="novo" data-tipo="financeiro"><i class="fa fa-plus"></i>Adicionar Conta</li>
                    <li data-acao="alterar" data-tipo="financeiro"><i class="fa fa-pencil"></i>Alterar Conta</li>
                    <li data-acao="excluir" data-tipo="financeiro"><i class="fa fa-trash"></i>Excluir Conta</li>
                </ul>
            </li>
            <li class="menu">Contas a Receber
                <ul class="itens">
                    <li data-acao="novo" data-tipo="financeiro"><i class="fa fa-plus"></i>Adicionar Conta a Receber</li>
                    <li data-acao="alterar" data-tipo="financeiro"><i class="fa fa-pencil"></i>Alterar Conta a Receber</li>
                    <li data-acao="excluir" data-tipo="financeiro"><i class="fa fa-trash"></i>Excluir Conta a Receber</li>
                </ul>
            </li>
        </ul>
    </nav>

    <!-- Modal para Contas a Pagar e Contas a Receber -->
    <div class="modal fade" id="modalConta" tabindex="-1" aria-labelledby="tituloModalConta" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tituloModalConta">Título do Modal Conta</h5>
                    <button type="button" class="btn-close" onclick="limparModalConta()" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <form name="cadastroConta" id="dadosConta" action="#">
                        <div class="mb-3">
                            <label for="descricaoConta" class="form-label">Descrição da Conta</label>
                            <input type="text" id="descricaoConta" name="descricao" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="valorConta" class="form-label">Valor da Conta</label>
                            <input type="text" id="valorConta" name="valor" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="dataVencimento" class="form-label">Data de Vencimento</label>
                            <input type="date" id="dataVencimento" name="dataVencimento" class="form-control" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="limparModalConta()">Fechar</button>
                            <button id="salvarConta" type="button" onclick="adicionarConta()" class="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <!-- Modal para Contas a Receber -->
    <div class="modal fade" id="modalContaReceber" tabindex="-1" aria-labelledby="tituloModalContaReceber" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="tituloModalContaReceber">Título do Modal Conta a Receber</h5>
                    <button type="button" class="btn-close" onclick="limparModalContaReceber()" aria-label="Fechar"></button>
                </div>
                <div class="modal-body">
                    <form name="cadastroContaReceber" id="dadosContaReceber" action="#">
                        <div class="mb-3">
                            <label for="descricaoContaReceber" class="form-label">Descrição da Conta a Receber</label>
                            <input type="text" id="descricaoContaReceber" name="descricao" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="valorContaReceber" class="form-label">Valor da Conta a Receber</label>
                            <input type="text" id="valorContaReceber" name="valor" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="dataVencimentoReceber" class="form-label">Data de Vencimento</label>
                            <input type="date" id="dataVencimentoReceber" name="dataVencimento" class="form-control" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="limparModalContaReceber()">Fechar</button>
                            <button id="salvarContaReceber" type="button" onclick="adicionarContaReceber()" class="btn btn-primary">Salvar</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
`

};

function troca(caminho) {
    let paginaIsTrul = paginas[caminho];
    if (paginaIsTrul) {
        document.querySelector("#cssRel").href = `${caminho.replace("/", "")}.css`;
        document.getElementById("conteiner").innerHTML = paginas[caminho];
        document.getElementById("scriptRel").src = `${caminho.replace("/", "")}.js`;
    }
    else {
        document.getElementById("conteiner").innerHTML = "<h1>Página não encontrada</h1>";
    }
}

function clickUser() {
    let menuUsers = document.getElementById("menuUsers");
    menuUsers.style.display = "block";
    if (!menuUsers.addEventListener("mouseover", function () { return true })) {
        setTimeout(() => {
            document.getElementById("menuUsers").style.display = "none";
        }, 5000);
    }
}
document.addEventListener("DOMContentLoaded", function () {
    // Adiciona eventos para os menus de Produto e Financeiro
    document.addEventListener("click", function (event) {
        if (event.target.tagName === "LI" && event.target.dataset.acao) {
            abrirModal(event.target.dataset.acao, event.target.dataset.tipo);
        }
    });
});

// Função para abrir modais de Produto ou Financeiro
function abrirModal(acao, tipo) {
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
        btnSalvar.setAttribute("onclick", tipo === "produto" ? "adicionaProduto()" : "adicionarConta()");
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



/*async function deslogar() {
    try {
        const logout = await fetch("api/user/logout", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            }
        });

        if (!logout.ok) {
            throw new Error(await logout.text());
        }

        const result = await logout.text();
        alert(result);

        if (result === "Deslogado com sucesso") {
            window.location.href = "index.html"; // Redireciona para a página inicial
        }
    } catch (error) {
        console.error(error);
        alert("Erro ao deslogar: " + error.message);
    }
}

document.getElementById("logout").addEventListener("click", deslogar); */