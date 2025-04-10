let contaSelecionada = 0;
const elementoId=(id)=>document.getElementById(id);
async function apiRest(url, method= "GET", body= null) {
    let corpoRequisicao= {method, headers: {'Content-Type': 'application/json'}};
    if(body) corpoRequisicao.body= body;
    let requisicao= await fetch(url, corpoRequisicao);
    if(!requisicao.ok){
        throw new Error("falha na requisicao "+ requisicao.status);  
    }
    const texto= await requisicao.text();
    return texto? JSON.parse(texto) : null;
    
}

async function abrirModalConta(acao) {
    const modalTitulo = document.getElementById("tituloModalConta");
    const btnSalvar = document.getElementById("salvarConta");

    // Ajustando título e comportamento do botão com base na ação
    if (acao === "adicionar") {
        modalTitulo.textContent = "Adicionar Conta";
        btnSalvar.textContent = "Salvar";
        btnSalvar.setAttribute("onclick", `salvarNovaConta()`);
    }
    else if (acao === "alterar") {
        preencheCampos(await getAcountById());
        modalTitulo.textContent = "Alterar Conta";
        btnSalvar.textContent = "Alterar";
        btnSalvar.setAttribute("onclick", "salvarAlteracaoConta()");
        
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
        "descricao": document.getElementById("descricao").value,
        "valor": document.getElementById("valor").value,
        //"id_lote":document.getElementById("loteId").value,
        "data_emissao": document.getElementById("dataEmissao").value,
        "data_vencimento": document.getElementById("dataVencimento").value,
        "Is_receber": !document.getElementById("PagarTipo").checked,
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


async function salvarAlteracaoConta() {
    try {
        const valores = buscarValores();
        let response = await fetch(`app/Contas/AlterarContas/${contaSelecionada}`, {
            method: 'PUT',
            body:JSON.stringify(valores),
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(valores)
        });

        if (response.ok) {
            alert("Conta alterada com sucesso!");
            getContas(!document.getElementById("pagar").checked);
            return;
        }
        throw new Error("Erro ao alterar a conta");
    } catch (error) {
        console.error("Erro ao alterar conta:", error);
    }
}

async function confirmarExclusaoConta() {
    let contaBaixada= await getAcountById();
    if (contaSelecionada != 0 && contaBaixada["tipoConta"] == 0) {
        try {
            var result = await fetch(`app/Contas/DeletarContas/${contaSelecionada}`, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            if (!result.ok) {
                throw new Error("falha ao tentar exclusir");
            }
            getContas(!document.getElementById("pagar").checked);

            alert("Conta excluída com sucesso!");
        }
        catch (erro) {
            console.log(erro);
        }
    }
    else{
        alert("Conta já baixada");
    }

}


document.addEventListener("click", function (event) {
    if (event.target.tagName === "LI" && event.target.dataset.acao) {
        if(event.target.dataset.acao!= "novo" && contaSelecionada == 0){
            alert("Selecione uma conta");
        }
        else if(event.target.dataset.acao!= "excluir"){
            abrirModalConta(event.target.dataset.acao, event.target.dataset.tipo);
        }
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
            if(contas[i]["status"] != 0) {
                document.getElementById(contas[i]["id"]).style.backgroundColor = "#8dfd8c";
            }
            else if (new Date(contas[i]["data_vencimento"]) < new Date()) {
                document.getElementById(contas[i]["id"]).style.backgroundColor = "#fd8c8c";
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
});

function getId(num){
        if (contaSelecionada != 0) {
            document.getElementById(contaSelecionada).style.filter = "brightness(100%)";
        }
        contaSelecionada = num;
        document.getElementById(contaSelecionada).style.filter = "brightness(52%)";
}
async function getAcountById(){
    try {
        let json = await apiRest(`app/Contas/alterar/${contaSelecionada}`);
        return json;
    } catch (error) {
        console.log(error);
    }
}

function preencheCampos(json){
    let formConta= new FormData(document.getElementById("dadosConta"));
        formConta.forEach((value, key)=>{
            elementoId(key).value= json[key];
        });
        if(!json["tipoConta"]){
            elementoId("PagarTipo").checked = true;
        }
        else{
            elementoId("ReceberTipo").checked = true;
        }
}