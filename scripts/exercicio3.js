/*
- Crie uma classe `Contato` com propriedades como nome, telefone e email
- Crie uma classe `Agenda` que possa adicionar, remover e pesquisar contatos.
*/


console.log("Exercício 03 OK");

const nomeContatoInput = document.getElementById("nomeContato");
const telefoneContatoInput = document.getElementById("telefoneContato");
const emailContatoInput = document.getElementById("emailContato");
const imagemContatoInput = document.getElementById("imagemContato");
const adicionarBtn = document.getElementById("adicionarBtn");
const nomePesquisarInput = document.getElementById("nomePesquisar");
const resultadoPesquisa = document.getElementById("resultadoPesquisa");
const listaContatos = document.getElementById("listaContatos");

class Contato {
  constructor(nome, telefone, email, imagem) {
    this.nome = nome;
    this.telefone = telefone;
    this.email = email;
    this.imagem = imagem;
  }
}

class Agenda {
  constructor() {
    this.contatos = [];
    this.carregarContatos();
  }

  adicionarContato(contato) {
    this.contatos.push(contato);
    this.salvarContatos();
  }

  removerContato(indice) {
    this.contatos.splice(indice, 1);
    this.salvarContatos();
  }

  editarContato(indice, novoContato) {
    this.contatos[indice] = novoContato;
    this.salvarContatos();
  }

  pesquisarContato(nome) {
    return this.contatos.find(contato => contato.nome.toLowerCase() === nome.toLowerCase());
  }

  salvarContatos() {
    localStorage.setItem("contatos", JSON.stringify(this.contatos));
  }

  carregarContatos() {
    const contatosString = localStorage.getItem("contatos");
    if (contatosString) {
      this.contatos = JSON.parse(contatosString);
    }
  }
}

const agenda = new Agenda();


adicionarBtn.addEventListener("click", () => {
  const nome = nomeContatoInput.value;
  const telefone = telefoneContatoInput.value;
  const email = emailContatoInput.value;
  const imagem = imagemContatoInput.value;

  if (nome && telefone && email) {
    const novoContato = new Contato(nome, telefone, email, imagem);
    agenda.adicionarContato(novoContato);
    atualizarListaContatos();
    limparInputs();
  } else {
    alert("Por favor, preencha todos os campos.");
  }
});


nomePesquisarInput.addEventListener("input", () => {
  const nome = nomePesquisarInput.value.toLowerCase();
  const contatosFiltrados = agenda.contatos.filter(contato =>
    contato.nome.toLowerCase().includes(nome)
  );
  atualizarListaContatos(contatosFiltrados);
});


function atualizarListaContatos(contatos = agenda.contatos) {
  listaContatos.innerHTML = "";
  contatos.forEach((contato, indice) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <img src="${contato.imagem}" alt="${contato.nome}" class="contato-imagem">
      <div class="contato-info">
        <h4>${contato.nome}</h4>
        <p>${contato.telefone}</p>
        <p>${contato.email}</p>
      </div>
      <button class="remover-contato-btn" data-indice="${indice}">Remover</button>
      <button class="editar-contato-btn" data-indice="${indice}">Editar</button>
    `;
    listaContatos.appendChild(li);
  });


  const removerContatosBtns = document.querySelectorAll(".remover-contato-btn");
  removerContatosBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const indice = btn.dataset.indice;
      agenda.removerContato(indice);
      atualizarListaContatos();
    });
  });


  const editarContatosBtns = document.querySelectorAll(".editar-contato-btn");
  editarContatosBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const indice = btn.dataset.indice;
      const contato = agenda.contatos[indice];

      const modal = document.getElementById("modal-editar-contato");
      modal.style.display = "block";


      document.getElementById("modal-indice").value = indice;
      document.getElementById("modal-nome").value = contato.nome;
      document.getElementById("modal-telefone").value = contato.telefone;
      document.getElementById("modal-email").value = contato.email;
      document.getElementById("modal-imagem").value = contato.imagem;

      const salvarBtn = document.getElementById("modal-salvar-btn");

      salvarBtn.removeEventListener("click", salvarAlteracoes);
      salvarBtn.addEventListener("click", salvarAlteracoes);


      const closeModalBtn = document.querySelector(".close-modal");
      closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    });
  });
}


function salvarAlteracoes() {
  const indice = document.getElementById("modal-indice").value;
  const novoNome = document.getElementById("modal-nome").value;
  const novoTelefone = document.getElementById("modal-telefone").value;
  const novoEmail = document.getElementById("modal-email").value;
  const novaImagem = document.getElementById("modal-imagem").value;

  const novoContato = new Contato(novoNome, novoTelefone, novoEmail, novaImagem);

  agenda.editarContato(indice, novoContato);

  const modal = document.getElementById("modal-editar-contato");
  modal.style.display = "none";

  atualizarListaContatos();
}


function limparInputs() {
  nomeContatoInput.value = "";
  telefoneContatoInput.value = "";
  emailContatoInput.value = "";
  imagemContatoInput.value = "";
}


atualizarListaContatos();