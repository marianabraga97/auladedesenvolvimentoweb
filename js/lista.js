//Duas constante spara buscar as palavra e o checkbox

const tbPalavra = document.querySelector("table")
const ckMostrar= document.querySelector("input[type='checkbox']")

const montarTabela = () => {
    //se existir dados no localstorage 
    if (localStorage.getItem("jogoPalavra")) {
        //obter conteudo e converter em um vetor usando o ; como separador
        const palavra = localStorage.getItem("jogoPalavra").split(";")
        //split é para pegar os itens e separar pelo ;

        const dica = localStorage.getItem("jogoDica").split(";")

        //percorrer elementos do vetor e inserir na tabela

        for(let i=0; i < palavra.length; i++){
            const linha = tbPalavra.insertRow(-1)
            //adiciona linha na tabela

            const col1 = linha.insertCell(0) // Cria colunas na linha inserida
            const col2 = linha.insertCell(1)
            const col3 = linha.insertCell(2)

            col1.innerText = palavra[i]
            col2.innerText = dica[i]
            col3.innerHTML = "<i class='exclui' title='Excluir'> &#1008; </i>"
        }
    }
}

// evento quando o checkbox é alterado

ckMostrar.addEventListener("change", () => {
ckMostrar.checked ? montarTabela() : window.location.reload()
})

// evento de exclusão do item da tabela

tbPalavra.addEventListener("click", () => {
//se a classe do elemento alvo clicado contém excluir
        if(e.target.classlist.container("exclui")) {
            // acessar o elemento avô do elemento alvo e obtem o 1 filho
            const palavra = e.target.parentElement.parentElement.children[0].innerText;

                if(confirm (`Confirma a exclusão da Palavra: ${palavra}?`)){
                        //remover a linha da tabela que contém o simbolo x clicado
                        e.target.parentElement.parentElement.remove()

                        localStorage.removeItem("jogoPalavra");
                        localStorage.removeItem("jogoDica")

                        const palavra = []
                        const dica = []

                        //obtem os dados da tabela acrescenta ao vetor

                        for(let i=1; i < tbPalavra.rows.length; i++) {

                            palavra.push(tbPalavra.rows[i].cells[0].innerText)
                            dica.push(tbPalavra.row[i].cells[1].innerText)
                        }

                        //salva o conteudo no localstorage sem a linha removida

                        localStorage.setItem("jogoPalavra", palavra.join(";"))
                        localStorage.setItem("jogoDica", dica.join(";"))

            }
        }
    }
)