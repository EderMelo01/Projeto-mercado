const paginaInicial= document.getElementById("conteiner").innerHTML;
function troca(caminho){
    if(caminho == "/produto"){
        document.getElementById("conteiner").innerHTML = " ";
        console.log("mudando de página")
    }
    else if(caminho == "/home"){
        document.getElementById("conteiner").innerHTML = paginaInicial;
        console.log("mudando de página")
    }
    
}