var objetos = {
  A1: "AVIAO",   B1: "MACA",    C1: "FORMIGA",
  A2: "BOLA",    B2: "ABELHA",  C2: "GATO",
  A3: "XICARA",  B3: "BOLO",    C3: "ROSCA",
  A4: "PEIXE",   B4: "FLOR",    C4: "BOLA"
};

var perguntas = [
  { posicao: "A2", opcoes: ["BOLA", "FLOR"] },
  { posicao: "A3", opcoes: ["BOLA", "XICARA"] },
  { posicao: "A4", opcoes: ["BOLO", "PEIXE"] },
  { posicao: "B1", opcoes: ["BOLA", "MACA"] },
  { posicao: "B2", opcoes: ["XICARA", "ABELHA"] },
  { posicao: "B3", opcoes: ["BOLO", "GATO"] },
  { posicao: "B4", opcoes: ["FLOR", "BOLO"] },
  { posicao: "C1", opcoes: ["GATO", "FORMIGA"] }
];

var cores = ["#d33", "#36c", "#2a2", "#e90", "#92e", "#000"];

var corEscolhida = null;
var acertos = 0;

function montarPaleta() {
  var paleta = document.getElementById("paleta");

  for (var i = 0; i < cores.length; i++) {
    var quadrado = document.createElement("span");
    quadrado.className = "cor";
    quadrado.style.backgroundColor = cores[i];

    quadrado.onclick = (function (cor, elemento) {
      return function () {
        corEscolhida = cor;
        var todas = document.getElementsByClassName("cor");
        for (var j = 0; j < todas.length; j++) {
          todas[j].className = "cor";
        }
        elemento.className = "cor ativa";
      };
    })(cores[i], quadrado);

    paleta.appendChild(quadrado);
  }
}

function montarPerguntas() {
  var area = document.getElementById("perguntas");

  for (var i = 0; i < perguntas.length; i++) {
    var p = perguntas[i];
    var linha = document.createElement("div");
    linha.className = "pergunta";

    var posicao = document.createElement("span");
    posicao.className = "posicao";
    posicao.textContent = p.posicao;
    linha.appendChild(posicao);

    for (var j = 0; j < p.opcoes.length; j++) {
      var opcao = document.createElement("span");
      opcao.className = "opcao";
      opcao.textContent = p.opcoes[j];
      opcao.onclick = criarVerificador(p.posicao, p.opcoes[j], opcao, linha);
      linha.appendChild(opcao);
    }

    var resultado = document.createElement("span");
    resultado.className = "resultado";
    linha.appendChild(resultado);

    area.appendChild(linha);
  }
}

function criarVerificador(posicao, nome, opcao, linha) {
  return function () {
    if (corEscolhida === null) {
      alert("Escolha uma cor primeiro.");
      return;
    }
    if (linha.getAttribute("data-feito") === "sim") {
      return;
    }

    var resultado = linha.getElementsByClassName("resultado")[0];

    if (nome === objetos[posicao]) {
      opcao.className = "opcao certa";
      opcao.style.borderColor = corEscolhida;
      opcao.style.color = corEscolhida;
      resultado.textContent = "Certo";
      linha.setAttribute("data-feito", "sim");
      acertos++;
      atualizarPlacar();
    } else {
      opcao.className = "opcao errada";
      resultado.textContent = "Tente de novo";
    }
  };
}

function atualizarPlacar() {
  var placar = document.getElementById("placar");
  placar.textContent = "Acertos: " + acertos + " de " + perguntas.length;
}

function reiniciar() {
  location.reload();
}

montarPaleta();
montarPerguntas();
atualizarPlacar();
document.getElementById("reiniciar").onclick = reiniciar;
