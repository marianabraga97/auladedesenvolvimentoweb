// Criando a referencia para o formulario
const frm = document.querySelector("form");



frm.addEventListener("submit", (e) => {
    //Evitar o formulario seja enviado.
    e.preventDefault();

    //Dois campos para pegar a sinformaçõesde palavra e dica
    //trim remove os espaços do inicio e do fim da palavra
    const palavra = frm.inPalavra.value.trim()
    const dica = frm.inDica.value

    //validar o preenchimento(palavra não pode ter espaço em branco no meio)

    if (palavra.includes(" ")) {
        alert("Informe uma palavra valida! (Sem espaços)")
        frm.inPalavra.focus()
        return        
    }

    //Se já existem dados no localStorage, gravar o conteudo anterior +; + palavra/dica

    if (localStorage.getItem("jogoPalavra")) {
        //se existe pegao anterior e concatena com a nova palavra
        localStorage.setItem("jogoPalavra", localStorage.getItem("jogoPalavra") + ";" + palavra)
        //se existe pega o anterior concatena com a nova dica
        localStorage.setItem("jogoDica", localStorage.getItem("jogoDica") + ";" + dica)
    } else {
        //se nao existe, primeira inclusao grava apenas a palavra e a dica
        localStorage.setItem("jogoPalavra", palavra)
        localStorage.setItem("jogoDica", dica)
    }
 

    if (localStorage.getItem("jogoPalavra")) {
        alert(`Ok! Palavra ${palavra} cadastrada com sucesso`)

    }

    frm.reset();
    frm.inPalavra.focus();
})