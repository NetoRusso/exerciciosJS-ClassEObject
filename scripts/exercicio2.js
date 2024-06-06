/*
- Crie uma classe `JogoDaVelha` que represente o tabuleiro e as regras do jogo.
- Implemente métodos para marcar uma posição no tabuleiro, verificar se há um vencedor e reiniciar o jogo.
*/


console.log("Exercício 02 OK");

const tabuleiro = document.getElementById("tabuleiro");
const celulas = document.querySelectorAll(".celula");
const jogadorAtual = document.getElementById("jogadorAtual");
const resultadoJogoDaVelha = document.getElementById("resultadoExercicio2");
const reniciarJogo = document.getElementById("reiniciarJogo");
const btnUmJogador = document.getElementById("umJogador");
const btnDoisJogadores = document.getElementById("doisJogadores");

class JogoDaVelha {
  constructor() {
    this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
    this.jogadorAtual = "X";
    this.vencedor = null;
    this.jogoEmAndamento = true;
    this.modoDeJogo = null;
  }

  marcarPosicao(index) {
    if (this.tabuleiro[index] === "" && this.jogoEmAndamento) {
      this.tabuleiro[index] = this.jogadorAtual;
      this.trocarJogador();
      this.verificarVencedor();
      atualizarTabuleiro();
      atualizarResultado();
    }
  }

  trocarJogador() {
    this.jogadorAtual = this.jogadorAtual === "X" ? "O" : "X";
  }

  verificarVencedor() {
    const combinacoesVencedoras = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], 
      [0, 3, 6], [1, 4, 7], [2, 5, 8], 
      [0, 4, 8], [2, 4, 6] 
    ];

    for (const combinacao of combinacoesVencedoras) {
      const [a, b, c] = combinacao;
      if (
        this.tabuleiro[a] !== "" &&
        this.tabuleiro[a] === this.tabuleiro[b] &&
        this.tabuleiro[a] === this.tabuleiro[c]
      ) {
        this.vencedor = this.tabuleiro[a];
        this.jogoEmAndamento = false;
        return;
      }
    }


    if (!this.tabuleiro.includes("")) {
      this.vencedor = "Empate";
      this.jogoEmAndamento = false;
    }
  }

  reiniciarJogo() {
    this.tabuleiro = ["", "", "", "", "", "", "", "", ""];
    this.jogadorAtual = "X";
    this.vencedor = null;
    this.jogoEmAndamento = true;
    atualizarTabuleiro();
    atualizarResultado();
    document.getElementById("jogoDaVelha").style.display = "none";
    document.getElementById("menuExercicio2").style.display = "flex";
  }

  jogadaComputador() {
    let index = Math.floor(Math.random() * 9);

    while (this.tabuleiro[index] !== "") {
      index = Math.floor(Math.random() * 9);
    }
    this.marcarPosicao(index);
  }
}

const jogo = new JogoDaVelha();

btnUmJogador.addEventListener("click", () => {
  jogo.modoDeJogo = "umJogador";
  iniciarJogo();
});

btnDoisJogadores.addEventListener("click", () => {
  jogo.modoDeJogo = "doisJogadores";
  iniciarJogo();
});

function iniciarJogo() {
  jogo.reiniciarJogo();
  document.getElementById("menuExercicio2").style.display = "none";
  document.getElementById("jogoDaVelha").style.display = "flex";
}

celulas.forEach((celula) => {
  celula.addEventListener("click", () => {
    const index = parseInt(celula.dataset.index);
    jogo.marcarPosicao(index);
  });
});

reniciarJogo.addEventListener("click", () => {
  jogo.reiniciarJogo();
});

function atualizarTabuleiro() {
  celulas.forEach((celula, index) => {
    celula.textContent = jogo.tabuleiro[index];
  });
}

function atualizarResultado() {
  if (jogo.vencedor) {
    resultadoJogoDaVelha.textContent = `O vencedor é: ${jogo.vencedor}`;
  } else if (!jogo.jogoEmAndamento) {
    resultadoJogoDaVelha.textContent = "Empate!";
  } else {
    resultadoJogoDaVelha.textContent = "";
  }
  jogadorAtual.textContent = `Jogador ${jogo.jogadorAtual}`;

  
  if (jogo.modoDeJogo === "umJogador" && jogo.jogoEmAndamento) {

    if (jogo.jogadorAtual === "O") {
      jogo.jogadaComputador();
    }
  }
}
