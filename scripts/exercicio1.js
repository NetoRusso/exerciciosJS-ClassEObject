/*
- Crie uma classe `Forma` que tenha métodos para calcular a área e o perímetro.
- Crie subclasses para formas geométricas como `Retângulo`, `Círculo`, `Triângulo`, etc., cada uma com métodos  para calcular sua área e perímetro específicos.
*/


console.log("Exercício 01 OK");

const selectForma = document.getElementById("selectForma");
const formaEscolhida = document.getElementById("forma-escolhida");
const retanguloDesenho = document.getElementById("retangulo-desenho");
const circuloDesenho = document.getElementById("circulo-desenho");
const trianguloDesenho = document.getElementById("triangulo-desenho");
const inputsForma = document.getElementById("inputsExercicio1");
const retanguloInputs = document.getElementById("retangulo-inputs");
const circuloInputs = document.getElementById("circulo-inputs");
const trianguloInputs = document.getElementById("triangulo-inputs");
const btnExercicio1 = document.getElementById("btnExercicio1");
const resultadoExercicio1 = document.getElementById("resultadoExercicio1");

const baseRetanguloExercicio1 = document.getElementById("baseRetanguloExercicio1");
const alturaRetanguloExercicio1 = document.getElementById("alturaRetanguloExercicio1");
const raioCirculoExercicio1 = document.getElementById("raioCirculoExercicio1");
const baseTrianguloExercicio1 = document.getElementById("base-trianguloExercicio1");
const alturaTrianguloExercicio1 = document.getElementById("altura-trianguloExercicio1");
const lado1TrianguloExercicio1 = document.getElementById("lado1TrianguloExercicio1");
const lado2TrianguloExercicio1 = document.getElementById("lado2TrianguloExercicio1");
const lado3TrianguloExercicio1 = document.getElementById("lado3TrianguloExercicio1")

selectForma.addEventListener("change", () => {
  const formaSelecionada = selectForma.value;
  console.log(formaSelecionada);

  resultadoExercicio1.innerHTML = "";

  retanguloDesenho.style.display = "none";
  circuloDesenho.style.display = "none";
  trianguloDesenho.style.display = "none";

  retanguloInputs.style.display = "none";
  circuloInputs.style.display = "none";
  trianguloInputs.style.display = "none";

  inputsForma.style.display = "flex";


  if (formaSelecionada === "retangulo") {
    retanguloDesenho.style.display = "flex";
    retanguloInputs.style.display = "flex";
    btnExercicio1.style.display = "block";
  } else if (formaSelecionada === "circulo") {
    circuloDesenho.style.display = "flex";
    circuloInputs.style.display = "flex";
    btnExercicio1.style.display = "block";
  } else if (formaSelecionada === "triangulo") {
    trianguloDesenho.style.display = "flex";
    trianguloInputs.style.display = "flex";
    btnExercicio1.style.display = "block";
  } else if (formaSelecionada === "default"){
    btnExercicio1.style.display = "none";
  }
});




class Forma {
  constructor() {

  }

calcularArea() {
  throw new Error("Método calcularArea() deve ser implementado nas subclasses.");
}

calcularPerimetro() {
  throw new Error("Método calcularPerimetro() deve ser implementado nas subclasses.");
}
}

class Retangulo extends Forma {
  constructor(base, altura) {
    super();
    this.base = base;
    this.altura = altura;
  }

  calcularArea() {
    return this.base * this.altura;
  }
  
  calcularPerimetro() {
    console.log(this.base + "   " + this.altura + "  " +( (this.base + this.altura)));
    return 2 * (this.base + this.altura);
  }
}

class Circulo extends Forma {
  constructor(raio) {
    super();
    this.raio = raio;
  }

  calcularArea() {
    return Math.PI * Math.pow(this.raio, 2);
  }

  calcularPerimetro() {
    return 2 * Math.PI * this.raio;
  }
}

class Triangulo extends Forma {
  constructor(base, altura, lado1, lado2, lado3) {
    super();
    this.base = base;
    this.altura = altura;
    this.lado1 = lado1;
    this.lado2 = lado2;
    this.lado3 = lado3;
  }

  calcularArea() {
    return (this.base + this.altura) / 2;
  }

  calcularPerimetro() {
    return (this.lado1 + this.lado2 + this.lado3);
  }
}



btnExercicio1.addEventListener("click", () => {
  let formaSelecionada = selectForma.value;
  let forma;

  if (formaSelecionada === "retangulo") {
    let base = parseFloat(baseRetanguloExercicio1.value);
    let altura = parseFloat(alturaRetanguloExercicio1.value);
    forma = new Retangulo(base, altura);
    baseRetanguloExercicio1.value = "";
    alturaRetanguloExercicio1.value = "";

  } else if (formaSelecionada === "circulo") {
    let raio = parseFloat(raioCirculoExercicio1.value);
    forma = new Circulo(raio);
    raioCirculoExercicio1.value = "";

  } else if (formaSelecionada === "triangulo") {
    let baseTriangulo = parseFloat(baseTrianguloExercicio1.value);
    let alturaTriangulo = parseFloat(alturaTrianguloExercicio1.value);
    let lado1 = parseFloat(lado1TrianguloExercicio1.value);
    let lado2 = parseFloat(lado2TrianguloExercicio1.value);
    let lado3 = parseFloat(lado3TrianguloExercicio1.value);
    forma = new Triangulo(baseTriangulo, alturaTriangulo, lado1, lado2, lado3);
    baseTrianguloExercicio1.value ="";
    alturaTrianguloExercicio1.value = "";
    lado1TrianguloExercicio1.value = "";
    lado2TrianguloExercicio1.value = "";
    lado3TrianguloExercicio1.value = "";
  }

  if (forma) {
    const area = forma.calcularArea();
    const perimetro = forma.calcularPerimetro();
    resultadoExercicio1.innerHTML = `<h3>Resultado:</h3><p> Área: ${area.toFixed(2)}cm² <br/> Perímetro: ${perimetro.toFixed(2)}cm`;
  } else {
    alert("Por favor, selecione uma forma e insira os valores.");
  }
});