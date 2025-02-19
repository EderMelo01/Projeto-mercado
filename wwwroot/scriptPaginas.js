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
                    <li data-acao="novo" id="1" data-tipo="financeiro"><i class="fa fa-plus"></i>Adicionar Conta</li>
                    <li data-acao="alterar"id="2" data-tipo="financeiro"><i class="fa fa-pencil"></i>Alterar Conta</li>
                    <li data-acao="excluir"id="3" data-tipo="financeiro"><i class="fa fa-trash"></i>Excluir Conta</li>
                </ul>
            </li>
            <li class="menu">Contas a Receber
                <ul class="itens">
                    <li data-acao="novo"id="4" data-tipo="financeiro"><i class="fa fa-plus"></i>Adicionar Conta a Receber</li>
                    <li data-acao="alterar"id="5" data-tipo="financeiro"><i class="fa fa-pencil"></i>Alterar Conta a Receber</li>
                    <li data-acao="excluir"id="6" data-tipo="financeiro"><i class="fa fa-trash"></i>Excluir Conta a Receber</li>
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
                        <!--<div class="mb-3">
                            <label for="loteId" class="form-label">Numero do Lote </label>
                            <input type="text" id="loteId" name="loteId" class="form-control" required>
                        </div>-->
                        <div class="mb-3">
                            <label for="dataEmissao" class="form-label">Data de Emissão</label>
                            <input type="date" id="dataEmissao" name="dataEmissao" class="form-control" required>
                        </div>

                        <div class="mb-3">
                            <label for="dataVencimento" class="form-label">Data de Vencimento</label>
                            <input type="date" id="dataVencimento" name="dataVencimento" class="form-control" required>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" onclick="limparModalConta()">Fechar</button>
                            <button id="salvarConta" type="button" onclick="salvarNovaConta(true)" class="btn btn-primary">Salvar</button>
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