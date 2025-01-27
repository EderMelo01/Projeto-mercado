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

function clickUser(){
    let menuUsers= document.getElementById("menuUsers");
    menuUsers.style.display= "block";
    if(!menuUsers.addEventListener("mouseover", function(){return true})){
        setTimeout(() => {
            document.getElementById("menuUsers").style.display= "none"; 
        }, 5000);
    }

 
}
