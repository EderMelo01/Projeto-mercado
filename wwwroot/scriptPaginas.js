const paginaInicial = document.getElementById("conteiner").innerHTML;
const paginas = {
    "/home": paginaInicial,
    "/produto":
        `
    <div  class="expandidor"></div>
    <div  class="nome-codigo">Nome</div>
    <div  class="valor">Valor venda</div>
    <div  class="nome-codigo">Código de barras</div>
    <div class="divididor"></div>
    <nav>
        <ul>
            <li class="menu">Produtos
                <ul class="itens">
                    <li><i class="fa fa-plus"></i>Novo</li>
                    <li><i class="fa fa-pencil"></i>Alterar</li>
                    <li><i class="fa fa-trash"></i>Excluir</li>
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
        document.getElementById("conteiner").innerHTML = paginas[caminho]
    }
    else {
        document.getElementById("conteiner").innerHTML = "<h1>Página não encontrada</h1>";
    }

}