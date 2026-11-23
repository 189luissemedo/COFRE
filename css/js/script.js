
// Pegando os elementos do HTML

let cofre = document.querySelector("#cofre");
let senha = document.querySelector("#senha");
let tentar = document.querySelector("#tentar");
let mensagem = document.querySelector("#mensagem");
let tentativasTexto = document.querySelector("#tentativas");
let reiniciar = document.querySelector("#reiniciar");

let overview = document.querySelector("#overview");
let resultado = document.querySelector("#resultado");
let fechar = document.querySelector("#fechar");


// Variáveis do jogo

let numeroSecreto;
let tentativas = 0;
let jogoAtivo = true;


// Função para iniciar o jogo

function iniciarJogo() {

    numeroSecreto = Math.floor(Math.random() * 50) + 1;

    tentativas = 0;
    jogoAtivo = true;

    senha.value = "";

    senha.disabled = false;
    tentar.disabled = false;

    cofre.src = "img/cofre-fechado.png";

    cofre.classList.remove("desbloqueado");

    mensagem.textContent = "Aguardando sua tentativa...";
    mensagem.style.color = "#52677e";
    mensagem.classList.remove("alerta");

    tentativasTexto.textContent = "Tentativas: 0 de 7";

    overview.style.display = "none";

}


// Função para verificar a senha

function verificarSenha() {

    if (jogoAtivo == false) {
        return;
    }

    let numero = Number(senha.value);


    // Verificando se o número é válido

    if (senha.value == "" || !Number.isInteger(numero) || numero < 1 || numero > 50) {

        mensagem.textContent = "Digite um número inteiro de 1 a 50!";

        return;
    }


    // Contando as tentativas

    tentativas++;

    tentativasTexto.textContent = "Tentativas: " + tentativas + " de 7";


    // Se acertar a senha

    if (numero == numeroSecreto) {

        jogoAtivo = false;

        mensagem.textContent = "Senha correta!";
        mensagem.style.color = "green";

        cofre.src = "img/cofre-aberto.png";

        cofre.classList.add("desbloqueado");

        resultado.textContent = "Você abriu o cofre em " + tentativas + " tentativa(s)!";

        overview.style.display = "flex";

        senha.disabled = true;
        tentar.disabled = true;

    }


    // Se o número for menor

    else if (numero < numeroSecreto) {

        mensagem.textContent = "A senha é maior!";
        mensagem.style.color = "#2865a0";

    }


    // Se o número for maior

    else {

        mensagem.textContent = "A senha é menor!";
        mensagem.style.color = "#2865a0";

    }


    // Alerta quando restarem 2 tentativas

    if (tentativas == 5 && jogoAtivo == true) {

        mensagem.textContent += " ⚠️ Restam apenas 2 tentativas!";

        mensagem.classList.add("alerta");

    }


    // Se acabarem as tentativas

    if (tentativas == 7 && jogoAtivo == true) {

        jogoAtivo = false;

        mensagem.textContent = "Você perdeu! A senha era " + numeroSecreto;

        mensagem.style.color = "red";

        senha.disabled = true;
        tentar.disabled = true;

    }

    senha.value = "";

}


// Ligando o botão de tentar

tentar.addEventListener("click", verificarSenha);


// Permitindo usar a tecla Enter

senha.addEventListener("keydown", function(event) {

    if (event.key == "Enter") {

        verificarSenha();

    }

});


// Ligando o botão de reiniciar

reiniciar.addEventListener("click", iniciarJogo);


// Botão para fechar a caixa suspensa

fechar.addEventListener("click", function() {

    overview.style.display = "none";

});


// Começando o jogo

iniciarJogo();
