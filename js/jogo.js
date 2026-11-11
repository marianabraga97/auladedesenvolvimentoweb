
// Referências aos elementos HTML
const frm = document.querySelector("#frmJogo");

const respPalavra = document.querySelector("#outPalavra");
const respErros = document.querySelector("#outErros");
const respDica = document.querySelector("#outDica");
const respChances = document.querySelector("#outChances");
const respMensagemFinal = document.querySelector("#outMensagemFinal");

const imgStatus = document.querySelector("#imgStatus");

const inLetra = document.querySelector("#inLetra");
const btJogar = document.querySelector("#btJogar");
const btVerDica = document.querySelector("#btVerDica");

// Variáveis do jogo
let palavraSorteada = "";
let dicaSorteada = "";

let chances = 4;
let letrasEncontradas = [];
let letrasErradas = [];

let dicaUtilizada = false;
let jogoFinalizado = false;


// Inicialização do jogo
window.addEventListener("load", () => {

    // Recupera os dados do localStorage
    const dadosPalavras = localStorage.getItem("jogoPalavra");
    const dadosDicas = localStorage.getItem("jogoDica");

    // Verifica se existem palavras cadastradas
    if (!dadosPalavras || !dadosDicas) {

        alert("Cadastre palavras para jogar!");

        desabilitarJogo();

        return;
    }

    const palavras = dadosPalavras.split(";");
    const dicas = dadosDicas.split(";");

    // Verifica se os dados são válidos
    if (
        palavras.length === 0 ||
        palavras.some(p => !p.trim()) ||
        palavras.length !== dicas.length
    ) {

        alert("Não existem palavras e dicas válidas para jogar!");

        desabilitarJogo();

        return;
    }

    // Sorteia uma palavra
    const numAleatorio = Math.floor(
        Math.random() * palavras.length
    );

    palavraSorteada = palavras[numAleatorio]
        .trim()
        .normalize("NFC")
        .toUpperCase();

    dicaSorteada = dicas[numAleatorio].trim();

    // Revela a primeira letra
    letrasEncontradas.push(palavraSorteada.charAt(0));

    mostrarPalavra();

    atualizarChances();

    // Verifica se a palavra já foi descoberta
    if (verificarVitoria()) {
        finalizarJogo(true);
    }

});


// Exibe a palavra com as letras descobertas
function mostrarPalavra() {

    let novaPalavra = "";

    for (const letra of palavraSorteada) {

        if (
            letrasEncontradas.includes(letra) ||
            letra === " "
        ) {

            novaPalavra += letra;

        } else {

            novaPalavra += "_";

        }

        novaPalavra += " ";
    }

    respPalavra.innerText = novaPalavra.trim();

}


// Atualiza chances e imagem
function atualizarChances() {

    respChances.innerText = chances;

    imgStatus.src = `./img/status${chances}.jpg`;

}


// Verifica se todas as letras foram descobertas
function verificarVitoria() {

    for (const letra of palavraSorteada) {

        if (
            letra !== " " &&
            !letrasEncontradas.includes(letra)
        ) {

            return false;

        }

    }

    return true;

}


// Finaliza o jogo
function finalizarJogo(vitoria) {

    jogoFinalizado = true;

    if (vitoria) {

        respMensagemFinal.innerText =
            "Parabéns! Você descobriu a palavra!";

        respMensagemFinal.className = "text-success";

    } else {

        respMensagemFinal.innerText =
            `Fim de jogo! A palavra era: ${palavraSorteada}`;

        respMensagemFinal.className = "text-danger";

        mostrarPalavraCompleta();

    }

    desabilitarJogo();

}


// Exibe a palavra completa quando o jogador perde
function mostrarPalavraCompleta() {

    respPalavra.innerText = palavraSorteada
        .split("")
        .join(" ");

}


// Desabilita os controles
function desabilitarJogo() {

    inLetra.disabled = true;

    btJogar.disabled = true;

    btVerDica.disabled = true;

}


// Evento para jogar
frm.addEventListener("submit", (e) => {

    e.preventDefault();

    if (jogoFinalizado) {
        return;
    }

    const letra = inLetra.value
        .trim()
        .normalize("NFC")
        .toUpperCase();

    // Valida a letra informada
    if (!/^[A-ZÀ-ÖØ-Þ]$/u.test(letra)) {

        alert("Informe apenas uma letra válida!");

        inLetra.value = "";

        inLetra.focus();

        return;
    }

    // Verifica se a letra já foi utilizada
    if (
        letrasEncontradas.includes(letra) ||
        letrasErradas.includes(letra)
    ) {

        alert("Você já informou essa letra!");

        inLetra.value = "";

        inLetra.focus();

        return;
    }

    // Verifica se a letra existe na palavra
    if (palavraSorteada.includes(letra)) {

        letrasEncontradas.push(letra);

        mostrarPalavra();

        // Verifica vitória
        if (verificarVitoria()) {

            finalizarJogo(true);

        }

    } else {

        // Letra incorreta
        letrasErradas.push(letra);

        respErros.innerText = letrasErradas.join(" - ");

        chances--;

        atualizarChances();

        // Verifica derrota
        if (chances <= 0) {

            finalizarJogo(false);

        }

    }

    // Limpa o campo
    inLetra.value = "";

    // Só devolve o foco se o jogo continuar
    if (!jogoFinalizado) {

        inLetra.focus();

    }

});


// Evento para consultar a dica
btVerDica.addEventListener("click", () => {

    if (jogoFinalizado || dicaUtilizada) {
        return;
    }

    // Verifica se existem chances suficientes
    if (chances <= 1) {

        alert(
            "Você não tem chances suficientes para consultar a dica!"
        );

        return;
    }

    // Desconta uma chance
    chances--;

    dicaUtilizada = true;

    respDica.innerText = dicaSorteada;

    atualizarChances();

    // Impede utilizar a dica novamente
    btVerDica.disabled = true;

});
