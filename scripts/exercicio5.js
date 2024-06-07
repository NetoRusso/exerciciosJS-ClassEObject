/**
- Crie uma classe `Produto` com propriedades como nome, preço e quantidade em estoque.
- Crie uma classe `CarrinhoDeCompras` que possa adicionar produtos, calcular o total da compra e finalizar a compra.
 */


console.log("Exercício 05 OK");

const produtosContainer = document.getElementById("produtos");
const itensCarrinho = document.getElementById("itensCarrinho");
const totalCarrinho = document.getElementById("totalCarrinho");
const finalizarCompraBtn = document.getElementById("finalizarCompra");
const mensagemCompra = document.getElementById("mensagemCompra"); 

class Produto {
  constructor(nome, preco, quantidadeEmEstoque, imagem) {
    this.nome = nome;
    this.preco = preco;
    this.quantidadeEmEstoque = quantidadeEmEstoque;
    this.imagem = imagem;
  }
}

class CarrinhoDeCompras {
  constructor() {
    this.itens = [];
  }

  adicionarProduto(produto, quantidade) {

    const itemExistente = this.itens.find(item => item.produto.nome === produto.nome);

    if (itemExistente) {

      itemExistente.quantidade += quantidade;
    } else {

      this.itens.push({ produto: produto, quantidade: quantidade });
    }
  }

  calcularTotal() {
    let total = 0;
    this.itens.forEach(item => {
      total += item.produto.preco * item.quantidade;
    });
    return total;
  }

  finalizarCompra() {

    console.log("Compra finalizada!");
    this.itens = [];
  }

  limparCarrinho() {
    this.itens = [];
  }
}


const produtos = [
  new Produto("SIKAI CASE Teclado mecânico sem fio", 352.00, 10, "https://m.media-amazon.com/images/I/61sKDkhxg9L._AC_SY450_.jpg"),
  new Produto("Headset Sem Fio Logitech Zone Vibe 100 Com Microfone", 449.90, 5, "https://m.media-amazon.com/images/S/aplus-media-library-service-media/54d6814e-66ea-4021-ad67-6572f86c149e.__CR0,0,1464,600_PT0_SX1464_V1___.jpg"),
  new Produto("Mouse sem fio Logitech MX Master 3S com Sensor Darkfield", 628.00, 8, "https://m.media-amazon.com/images/S/aplus-media-library-service-media/d8b41d96-8a27-4d18-b7df-49e4b62b7a2a.__CR0,0,1464,600_PT0_SX1464_V1___.jpg"),
  new Produto("Suporte Articulado de Mesa com Pistão a Gás", 379.99, 15, "https://m.media-amazon.com/images/S/aplus-media-library-service-media/bfd495ba-66de-4c13-a84d-39cf475776a3.__CR0,0,300,300_PT0_SX220_V1___.jpg"),
  new Produto("Mouse Pad Desk Mat Logitech Studio Series com Base Antiderrapante", 119.99, 45, "https://m.media-amazon.com/images/S/aplus-media-library-service-media/413529ff-17c4-42a0-a508-da6a8e5c41ff.__CR0,0,1464,600_PT0_SX1464_V1___.jpg"),
  new Produto("Monitor Profissional 28 Polegadas Nano IPS 2K Elements 2030xti Preto", 3899.00, 5, "https://m.media-amazon.com/images/S/aplus-media-library-service-media/7e6530b7-b2f5-4e09-8d5d-58827f6a9db2.__CR279,0,1515,937_PT0_SX970_V1___.png"),





];

const carrinho = new CarrinhoDeCompras();


produtos.forEach(produto => {
  const card = document.createElement("div");
  card.classList.add("produto-card");
  card.innerHTML = `
    <img src="${produto.imagem}" alt="${produto.nome}">
    <div class="produtoDescricao">
    <h3>${produto.nome}</h3>
    <p>R$ ${produto.preco.toFixed(2)}</p>
    <button class="adicionar-ao-carrinho btnComprar" data-produto-nome="${produto.nome}">Comprar</button>
    </div>
  `;
  produtosContainer.appendChild(card);


  const adicionarBtn = card.querySelector(".adicionar-ao-carrinho");
  adicionarBtn.addEventListener("click", () => {
    const produtoNome = adicionarBtn.dataset.produtoNome;
    const produto = produtos.find(p => p.nome === produtoNome);
    carrinho.adicionarProduto(produto, 1);
    atualizarCarrinho();
  });
});


function atualizarCarrinho() {
  itensCarrinho.innerHTML = "";

  carrinho.itens.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.produto.nome} x <span class="quantidade" data-item-index="${index}">${item.quantidade}</span> - R$ ${item.produto.preco.toFixed(2)}
      <div class="btnsQtd">
      <button class="diminuir-quantidade" data-item-index="${index}">-</button>
      <button class="aumentar-quantidade" data-item-index="${index}">+</button>
      </div>
    `;
    itensCarrinho.appendChild(li);

    const diminuirBtn = li.querySelector(".diminuir-quantidade");
    diminuirBtn.addEventListener("click", () => {
      const itemIndex = diminuirBtn.dataset.itemIndex;
      if (carrinho.itens[itemIndex].quantidade > 1) {
        carrinho.itens[itemIndex].quantidade--;
        atualizarCarrinho();
      } else {
        carrinho.itens.splice(itemIndex, 1);
        atualizarCarrinho();
      }
    });

    const aumentarBtn = li.querySelector(".aumentar-quantidade");
    aumentarBtn.addEventListener("click", () => {
      const itemIndex = aumentarBtn.dataset.itemIndex;
      carrinho.itens[itemIndex].quantidade++;
      atualizarCarrinho();
    });
  });

  totalCarrinho.textContent = `Total: R$ ${carrinho.calcularTotal().toFixed(2)}`;
}


finalizarCompraBtn.addEventListener("click", () => {
  carrinho.finalizarCompra();
  atualizarCarrinho();
  mensagemCompra.textContent = "Compra finalizada com sucesso!";
  mensagemCompra.style.display = "block";
  setTimeout(() => {
    mensagemCompra.style.display = "none";
  }, 3000);
});

const limparCarrinhoBtn = document.createElement("button");
limparCarrinhoBtn.textContent = "Limpar Carrinho";
limparCarrinhoBtn.classList.add("btnExercicio5");

limparCarrinhoBtn.addEventListener("click", () => {
  carrinho.limparCarrinho();
  atualizarCarrinho();
  mensagemCompra.textContent = "Carrinho limpo!";
  mensagemCompra.style.display = "block";
  setTimeout(() => {
    mensagemCompra.style.display = "none";
  }, 3000);
});

const carrinhoContainer = document.getElementById("carrinho");
carrinhoContainer.appendChild(limparCarrinhoBtn);