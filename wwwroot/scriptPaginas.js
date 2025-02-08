const paginaInicial = document.getElementById("conteiner").innerHTML;
const paginas = {
    "/home": paginaInicial,
    "/produto": `
    <div id="coluna" class="coluna">
        <div>
            <input type="text", id="filtroID" placeholder="Digite o Produto"></input>
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
                    <li class= "BtStatus" onclick="getProdutos(0)"><i></i>inativos</li>
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
                <button type="button" class="btn-close" onclick= "limparModal()" aria-label="Fechar"></button>
            </div>
            <div class="modal-body">
                <form name="cadastroProduto" id="dados" action="#">

                    <img id="imgProduto"  width="150" height="150">
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
                        <button  id="salvar" type="button" onclick="adicionaProduto()" class="btn btn-primary">Salvar</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

    

    `,
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

document.getElementById("logout").addEventListener("click", deslogar);*/
