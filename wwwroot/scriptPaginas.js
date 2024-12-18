function troca(caminho){
    history.pushState({}, '', caminho);
    if(caminho== "/usuarios"){
        document.getElementsByClassName("conteudo").INNERHTML = "   ";
    }
    
}