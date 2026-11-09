const frm = document.querySelector("form")
const respPalavra =  document.querySelector("#outPalavra")
const respErros = document.querySelector("#outErros")
const respDica =  document.querySelector("#outDica")
const respChances = document.querySelector("#outChances")
const respMensagemFinal = document.querySelector("#outMensagemFinal")
const imgStatus = document.querySelector("img")

let palavraSorteada 
let dicaSorteada

window.addEventListener("load", () => {
    // se nao existe palavras cadastrada 
    if(!localStorage.getItem("jogoPalavra")) {
        alert("Cadastre palavras para jogar!")
        frm.inLetra.disabled = true 
        frm.btJogar.disabled = true 
        frm.btVerDica.disabled = true 

    }

    //buscar conteudo no localstorge

    const palavra = localStorage.getItem("jogoPalavra").split(";")
    const dica = localstorage.getItem("jogoDica").split(";")
    const tam = palavra.length // quantidade de palavras cadastradas 

    //gerar numero aleatorio entre 0 e 1 (arrendondando para baixo)

    const numAleatorio = Math.floor(Math.random() * tam)

    palavraSorteada = palavra[numAleatorio].toUpperCase()
    dicaSorteada = dica[numAleatorio]

    let novaPalavra = ""

    for(const letra of palavraSorteada) {
        //se igual a letra inicial, acrescenta esta letra para exibir
        if(letra == palavraSorteada.charAt(0)) {
            novaPalavra += palavraSorteada.charAt(0)

        } else{
            novaPalavra +=" _ "
        }

    }

    respPalavra.innerText = novaPalavra // exibe a nova palavra 
})