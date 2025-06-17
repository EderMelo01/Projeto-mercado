const paginaInicial = document.getElementById("conteiner").innerHTML;

const paginas = {
    "/home": paginaInicial,
    "/produto": `
<div class="main-content">
        <div class="header">
            <h1>Produtos</h1>
            <h2>Gerenciar Produtos</h2>
        </div>

        <div class="content">
            <!-- Status Radio Buttons -->
            <div class="status-section">
                <div class="radio-group">
                    <input type="radio" id="ativo" name="status" value="ativo" checked>
                    <label for="ativo">Ativo</label>
                </div>
                <div class="radio-group">
                    <input type="radio" id="inativo" name="status" value="inativo">
                    <label for="inativo">Inativo</label>
                </div>
            </div>

            <!-- Search Section -->
            <div class="search-section">
                <input type="text" class="search-input" placeholder="Digite o nome do produto" id="searchInput">
                <button class="search-button" onclick="searchProduct()">Procurar</button>
            </div>

            <!-- Product Form -->
            <form id="productForm">
                <input type="hidden" id="productId" name="productId">
                <div class="form-container">
                    <div class="form-fields">
                        <div class="form-row">
                            <div class="form-group">
                                <label for="nome">Nome</label>
                                <input type="text" id="nome" name="nome" placeholder="Nome do produto">
                            </div>
                            <div class="form-group">
                                <label for="preco">Valor de venda</label>
                                <input type="text" id="preco" name="preco" placeholder="0,00">
                            </div>
                        </div>

                        <div class="form-group">
                            <label for="codigo">Código de barras</label>
                            <input type="text" id="codigo" name="codigo" placeholder="Código de barras">
                        </div>

                        <div class="form-group">
                            <label for="perecivel">Produto Perecível</label>
                            <div class="checkbox-group">
                                <input type="checkbox" id="perecivel" name="perecivel">
                                <label for="perecivel">Este produto é perecível</label>
                            </div>
                        </div>

                        <div class="form-actions">
                            <button type="button" class="btn btn-save" onclick="saveProduct()">Salvar</button>
                            <button type="button" class="btn btn-cancel" onclick="clearForm()">Cancelar</button>
                        </div>
                    </div>

                    <!-- Image Section -->
                    <div class="image-section">
                        <div class="image-container" id="imageContainer">
                            <div class="image-placeholder">
                                <p>Imagem do Produto</p>
                                <p style="font-size: 12px; margin-top: 5px;">Clique em "Selecionar Imagem" para adicionar</p>
                            </div>
                        </div>
                        <div class="image-upload">
                            <input type="file" id="imageInput" accept="image/*" style="display: none;" onchange="previewImage(event)">
                            <button type="button" class="upload-button" onclick="document.getElementById('imageInput').click()">
                                Selecionar Imagem
                            </button>
                        </div>
                    </div>
                </div>
            </form>

            <!-- Products Table -->
            <div class="table-section">
                <table class="table">
                    <thead class="table-header">
                        <tr>
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Preço</th>
                            <th>Perecível</th>
                            <th>Status</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody id="productsTableBody">
                        <tr data-id="1">
                            <td>001</td>
                            <td>Arroz Branco 5kg</td>
                            <td class="price">R$ 25,50</td>
                            <td><span class="perecivel-badge perecivel-nao">Não</span></td>
                            <td><span class="status-badge status-active">Ativo</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-action btn-edit" onclick="editProduct(1)">Alterar</button>
                                    <button class="btn-action btn-inactive" onclick="toggleProductStatus(1)">Inativar</button>
                                    <button class="btn-action btn-delete" onclick="deleteProduct(1)">Excluir</button>
                                </div>
                            </td>
                        </tr>
                        <tr data-id="2">
                            <td>002</td>
                            <td>Feijão Preto 1kg</td>
                            <td class="price">R$ 10,30</td>
                            <td><span class="perecivel-badge perecivel-nao">Não</span></td>
                            <td><span class="status-badge status-active">Ativo</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-action btn-edit" onclick="editProduct(2)">Alterar</button>
                                    <button class="btn-action btn-inactive" onclick="toggleProductStatus(2)">Inativar</button>
                                    <button class="btn-action btn-delete" onclick="deleteProduct(2)">Excluir</button>
                                </div>
                            </td>
                        </tr>
                        <tr data-id="3">
                            <td>003</td>
                            <td>Leite Integral 1L</td>
                            <td class="price">R$ 4,50</td>
                            <td><span class="perecivel-badge perecivel-sim">Sim</span></td>
                            <td><span class="status-badge status-active">Ativo</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-action btn-edit" onclick="editProduct(3)">Alterar</button>
                                    <button class="btn-action btn-inactive" onclick="toggleProductStatus(3)">Inativar</button>
                                    <button class="btn-action btn-delete" onclick="deleteProduct(3)">Excluir</button>
                                </div>
                            </td>
                        </tr>
                        <tr data-id="4">
                            <td>004</td>
                            <td>Açúcar Cristal 1kg</td>
                            <td class="price">R$ 4,50</td>
                            <td><span class="perecivel-badge perecivel-nao">Não</span></td>
                            <td><span class="status-badge status-active">Ativo</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-action btn-edit" onclick="editProduct(4)">Alterar</button>
                                    <button class="btn-action btn-inactive" onclick="toggleProductStatus(4)">Inativar</button>
                                    <button class="btn-action btn-delete" onclick="deleteProduct(4)">Excluir</button>
                                </div>
                            </td>
                        </tr>
                        <tr data-id="5">
                            <td>005</td>
                            <td>Pão Francês</td>
                            <td class="price">R$ 0,50</td>
                            <td><span class="perecivel-badge perecivel-sim">Sim</span></td>
                            <td><span class="status-badge status-inactive">Inativo</span></td>
                            <td>
                                <div class="action-buttons">
                                    <button class="btn-action btn-edit" onclick="editProduct(5)">Alterar</button>
                                    <button class="btn-action btn-inactive" onclick="toggleProductStatus(5)">Ativar</button>
                                    <button class="btn-action btn-delete" onclick="deleteProduct(5)">Excluir</button>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

   `,
    "/financeiro": `
    <div id="coluna" class="coluna">
        <h2>Financeiro</h2>

        <div>
            <h3>Contas a Pagar</h3>
            <input type="radio" id="receber" name="TypeAcount" value="1" class="form-check-input">
            <label for="receber" class="form-check-label" style="margin-right: 10px;">Receber</label>
             <input type="radio" id="pagar" name="TypeAcount" value="1" class="form-check-input">
            <label for="pagar" class="form-check-label">Pagar</label>
            <input type="text" id="filtroContaPagar" placeholder="Digite o nome da conta a pagar"></input>
            <button onclick="getContasAPagar()">Procurar</button>
        </div>

        <aside>
            <div class="nome-codigo">Descrição</div>
            <div class="valor">Valor</div>
            <div class="pagador">Pagador</div>
            <div class="data">Data de Vencimento</div>
            <div class="data">Data Emissão</div>
        </aside>
        
    </div>

    <nav>
        <ul>
            <li class="menu">Contas
                <ul class="itens">
                    <li data-acao="novo"id="4" data-tipo="financeiro"><i class="fa fa-plus"></i>Adicionar Conta </li>
                    <li data-acao="alterar"id="5" data-tipo="financeiro""><i class="fa fa-pencil"></i>Alterar Conta </li>
                    <li data-acao="excluir"id="6" data-tipo="financeiro"onclick="confirmarExclusaoConta()"><i class="fa fa-trash"></i>Excluir Conta </li>
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
                         <input type="radio" name="tipoConta" id="PagarTipo">
                        <label for="Pagar">Pagar</label>
                        <input type="radio" name="tipoConta" id="ReceberTipo">
                        <label for="Receber">Receber</label>
                        </div>
                         <div class="mb-3">
                            <label for="descricaoConta" class="form-label">Descrição da Conta</label>
                            <input type="text" id="descricao" name="descricao" class="form-control" required>
                        </div>
                        <div class="mb-3">
                            <label for="valorConta" class="form-label">Valor da Conta</label>
                            <input type="text" id="valor" name="valor" class="form-control" required>
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
