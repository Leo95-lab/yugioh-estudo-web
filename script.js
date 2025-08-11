const cartas = [
  { nome: "Dragão Branco", ataque: 3000 },
  { nome: "Mago Negro", ataque: 2500 },
  { nome: "Kuriboh", ataque: 300 },
  { nome: "Exodia", ataque: 1000 },
  { nome: "Caveira Invocada", ataque: 2500 },
  { nome: "Blue-Eyes Ultimate", ataque: 4500 },
  { nome: "Slifer", ataque: 4000 },
  { nome: "Obelisco", ataque: 4000 },
  { nome: "Ra", ataque: 4000 }
];

let baralhoJogador = [];
let baralhoOponente = [];
let lpJogador = 8000;
let lpOponente = 8000;

const status = document.getElementById("status");
const lpJogadorSpan = document.getElementById("lp-jogador");
const lpOponenteSpan = document.getElementById("lp-oponente");
const cartasDiv = document.getElementById("cartas-jogador");

function iniciarJogo() {
  baralhoJogador = embaralhar(cartas).slice(0, 5);
  baralhoOponente = embaralhar(cartas).slice(0, 5);
  lpJogador = 8000;
  lpOponente = 8000;
  atualizarLP();
  mostrarCartas();
  status.textContent = "Escolha sua carta para começar!";
}

function embaralhar(lista) {
  return [...lista].sort(() => Math.random() - 0.5);
}

function mostrarCartas() {
  cartasDiv.innerHTML = "";
  baralhoJogador.forEach((carta, index) => {
    const btn = document.createElement("button");
    btn.className = "carta";
    btn.textContent = `${carta.nome} (${carta.ataque})`;
    btn.onclick = () => jogarRodada(index);
    cartasDiv.appendChild(btn);
  });
}

function jogarRodada(index) {
  if (lpJogador <= 0 || lpOponente <= 0 || baralhoJogador.length === 0) return;

  const cartaJogador = baralhoJogador.splice(index, 1)[0];
  const cartaOponente = baralhoOponente.splice(
    Math.floor(Math.random() * baralhoOponente.length),
    1
  )[0];

  let resultado = `Você jogou ${cartaJogador.nome} (${cartaJogador.ataque})\n`;
  resultado += `O oponente jogou ${cartaOponente.nome} (${cartaOponente.ataque})\n`;

  if (cartaJogador.ataque > cartaOponente.ataque) {
    const dano = cartaJogador.ataque - cartaOponente.ataque;
    lpOponente -= dano;
    resultado += `✅ Você causou ${dano} de dano!`;
  } else if (cartaJogador.ataque < cartaOponente.ataque) {
    const dano = cartaOponente.ataque - cartaJogador.ataque;
    lpJogador -= dano;
    resultado += `❌ Você sofreu ${dano} de dano!`;
  } else {
    resultado += `⚔️ Empate!`;
  }

  atualizarLP();
  mostrarCartas();
  verificarFim(resultado);
}

function atualizarLP() {
  lpJogadorSpan.textContent = Math.max(lpJogador, 0);
  lpOponenteSpan.textContent = Math.max(lpOponente, 0);
}

function verificarFim(mensagemRodada) {
  if (lpJogador <= 0 && lpOponente <= 0) {
    status.textContent = mensagemRodada + "\n😵 Empate!";
  } else if (lpJogador <= 0) {
    status.textContent = mensagemRodada + "\n💀 Você perdeu o duelo!";
  } else if (lpOponente <= 0) {
    status.textContent = mensagemRodada + "\n🏆 Você venceu o duelo!";
  } else if (baralhoJogador.length === 0) {
    if (lpJogador > lpOponente) {
      status.textContent = mensagemRodada + "\n🏆 Vitória por LP!";
    } else if (lpJogador < lpOponente) {
      status.textContent = mensagemRodada + "\n💀 Derrota por LP!";
    } else {
      status.textContent = mensagemRodada + "\n⚖️ Empate!";
    }
  } else {
    status.textContent = mensagemRodada;
  }
}

iniciarJogo();
