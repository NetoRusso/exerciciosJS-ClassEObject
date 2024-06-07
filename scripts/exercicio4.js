/*
- Crie uma classe `ContaBancaria` com propriedades como saldo e número da conta.
- Implemente métodos para depositar, sacar e verificar o saldo da conta.
 */


console.log("Exercício 04 OK");

const numeroContaInput = document.getElementById("numeroConta");
const nomeCompletoInput = document.getElementById("nomeCompleto");
const capitalInicialInput = document.getElementById("capitalInicial");
const criarContaBtn = document.getElementById("criarContaBtn");
const depositarBtn = document.getElementById("depositarBtn");
const sacarBtn = document.getElementById("sacarBtn");
const valorOperacaoInput = document.getElementById("valorOperacao");
const nomeConta = document.getElementById("nomeConta");
const numeroContaExibido = document.getElementById("numeroContaExibido");
const saldoConta = document.getElementById("saldoConta");
const desconectarBtn = document.getElementById("desconectarBtn");
const operacaoAtual = document.getElementById("operacaoAtual");
const confirmarOperacaoBtn = document.getElementById("confirmarOperacaoBtn");
const infoConta = document.getElementById("info-conta");

class ContaBancaria {
  constructor(numeroConta, nomeCompleto, saldoInicial = 0) {
    this.numeroConta = numeroConta;
    this.nomeCompleto = nomeCompleto;
    this.saldo = saldoInicial;
  }

  depositar(valor) {
    if (valor > 0) {
      this.saldo += valor;
      infoConta.textContent = `Depósito de R$ ${valor.toFixed(2).replace(".", ",")} realizado com sucesso.`;
      infoConta.style.display = "block";
      this.atualizarSaldo();
      setTimeout(() => {
        infoConta.style.display = "none";
      }, 2000);
    } else {
      infoConta.textContent = "Valor inválido para depósito.";
      infoConta.style.display = "block";
      setTimeout(() => {
        infoConta.style.display = "none";
      }, 2000);
    }
  }

  sacar(valor) {
    if (valor > 0 && valor <= this.saldo) {
      this.saldo -= valor;
      infoConta.textContent = `Saque de R$ ${valor.toFixed(2).replace(".", ",")} realizado com sucesso.`;
      infoConta.style.display = "block";
      this.atualizarSaldo();
      setTimeout(() => {
        infoConta.style.display = "none";
      }, 2000);
    } else {
      infoConta.textContent = "Saldo insuficiente ou valor inválido para saque.";
      infoConta.style.display = "block";
      setTimeout(() => {
        infoConta.style.display = "none";
      }, 2000);
    }
  }

  atualizarSaldo() {
    saldoConta.textContent = `R$ ${this.saldo.toFixed(2).replace(".", ",")}`;
  }

  desconectar() {
    nomeConta.textContent = "";
    numeroContaExibido.textContent = "";
    saldoConta.textContent = "";

    depositarBtn.style.display = "none";
    sacarBtn.style.display = "none";
    valorOperacaoInput.style.display = "none";
    operacaoAtual.style.display = "none";
    confirmarOperacaoBtn.style.display = "none";
    desconectarBtn.style.display = "none";

    document.querySelector(".nova-conta").style.display = "block";

    contaAtual = null;
  }
}

let contas = [];
let contaAtual = null;
let operacaoAtualString = null;

numeroContaInput.addEventListener("input", () => {
  let numero = numeroContaInput.value.replace(/[^0-9]/g, '');
  numero = numero.replace(/(\d{4})(\d{4})(\d{4})(\d{2})/, '$1 $2 $3-$4');
  numeroContaInput.value = numero;
});

function mascaraValor(input) {
  let valor = input.value.replace(/[^0-9]/g, '');
  valor = valor.replace(/(\d)(\d{3})$/, '$1.$2');
  valor = valor.replace(/(\d)(\d{3})(\d{3})$/, '$1.$2.$3');
  input.value = valor;
}

capitalInicialInput.addEventListener("input", () => {
  mascaraValor(capitalInicialInput);
});

valorOperacaoInput.addEventListener("input", () => {
  mascaraValor(valorOperacaoInput);
});

criarContaBtn.addEventListener("click", () => {
  const numeroConta = numeroContaInput.value.replace(/[^0-9]/g, '');
  const nomeCompleto = nomeCompletoInput.value;
  const capitalInicial = parseFloat(capitalInicialInput.value.replace(/[^0-9]/g, ''));

  if (numeroConta && nomeCompleto && !isNaN(capitalInicial)) {
    const novaConta = new ContaBancaria(numeroConta, nomeCompleto, capitalInicial);
    contas.push(novaConta);
    contaAtual = novaConta;

    nomeConta.textContent = novaConta.nomeCompleto;
    numeroContaExibido.textContent = novaConta.numeroConta.replace(/(\d{4})(\d{4})(\d{4})(\d{2})/, '$1 $2 $3-$4');
    saldoConta.textContent = `R$ ${novaConta.saldo.toFixed(2).replace(".", ",")}`;

    document.querySelector(".conta-info").style.display = "flex";
    depositarBtn.style.display = "block";
    sacarBtn.style.display = "block";
    desconectarBtn.style.display = "block";
    document.querySelector(".nova-conta").style.display = "none";

    limparInputs();
  } else {
    infoConta.textContent = "Por favor, preencha todos os campos corretamente.";
    infoConta.style.display = "block";
    setTimeout(() => {
      infoConta.style.display = "none";
    }, 2000);
  }
});

depositarBtn.addEventListener("click", () => {
  if (contaAtual) {
    operacaoAtual.textContent = "Depósito";
    operacaoAtual.style.display = "block";
    valorOperacaoInput.style.display = "block";
    valorOperacaoInput.value = "";
    valorOperacaoInput.focus();
    confirmarOperacaoBtn.style.display = "block";

    operacaoAtualString = "depositar";

    confirmarOperacaoBtn.removeEventListener("click", confirmarOperacao);
    confirmarOperacaoBtn.addEventListener("click", confirmarOperacao);
  } else {
    infoConta.textContent = "Nenhuma conta ativa. Crie uma conta primeiro.";
    infoConta.style.display = "block";
    setTimeout(() => {
      infoConta.style.display = "none";
    }, 2000);
  }
});

sacarBtn.addEventListener("click", () => {
  if (contaAtual) {
    operacaoAtual.textContent = "Saque";
    operacaoAtual.style.display = "block";
    valorOperacaoInput.style.display = "block";
    valorOperacaoInput.value = "";
    valorOperacaoInput.focus();
    confirmarOperacaoBtn.style.display = "block";

    operacaoAtualString = "sacar";

    confirmarOperacaoBtn.removeEventListener("click", confirmarOperacao);
    confirmarOperacaoBtn.addEventListener("click", confirmarOperacao);
  } else {
    infoConta.textContent = "Nenhuma conta ativa. Crie uma conta primeiro.";
    infoConta.style.display = "block";
    setTimeout(() => {
      infoConta.style.display = "none";
    }, 2000);
  }
});

function confirmarOperacao() {
  const valor = parseFloat(valorOperacaoInput.value.replace(/[^0-9]/g, ''));
  if (!isNaN(valor)) {
    if (operacaoAtualString === "depositar") {
      contaAtual.depositar(valor);
    } else if (operacaoAtualString === "sacar") {
      if (valor > 0 && valor <= contaAtual.saldo) {
        contaAtual.sacar(valor);
      } else {
        infoConta.textContent = "Saldo insuficiente ou valor inválido para saque.";
        infoConta.style.display = "block";
        setTimeout(() => {
          infoConta.style.display = "none";
        }, 2000);
      }
    }

    valorOperacaoInput.style.display = "none";
    operacaoAtual.style.display = "none";
    confirmarOperacaoBtn.style.display = "none";
    limparInputs();
  } else {
    infoConta.textContent = "Por favor, insira um valor válido para a operação.";
    infoConta.style.display = "block";
    setTimeout(() => {
      infoConta.style.display = "none";
    }, 2000);
  }
}

desconectarBtn.addEventListener("click", () => {
  if (contaAtual) {
    contaAtual.desconectar();
    contaAtual = null;
    document.querySelector(".nova-conta").style.display = "block";
  } else {
    infoConta.textContent = "Nenhuma conta ativa para desconectar.";
    infoConta.style.display = "block";
    setTimeout(() => {
      infoConta.style.display = "none";
    }, 2000);
  }
});

function limparInputs() {
  numeroContaInput.value = "";
  nomeCompletoInput.value = "";
  capitalInicialInput.value = "";
  valorOperacaoInput.value = "";
}