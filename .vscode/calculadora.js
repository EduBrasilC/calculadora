const perguntas = [
  {
    texto: "Qual dessas roupas você usaria?",
    opcoes: [
      { imagem: "https://image.shutterstock.com/image-vector/set-line-icons-related-fashion-260nw-2472192513.jpg", estilo: "Casual" },
      { imagem: "https://www.shutterstock.com/image-vector/classic-icons-set-36-editable-260nw-779531452.jpg", estilo: "Clássico" },
      { imagem: "https://static.vecteezy.com/ti/vetor-gratis/t2/13348012-conjunto-de-icones-de-amor-icones-do-dia-dos-namorados-como-uma-carta-romantica-casal-feliz-presente-flores-anel-ilustracaoial-em-fundo-branco-vetor.jpg", estilo: "Romântico" },
      { imagem: "https://elements-resized.envatousercontent.com/elements-cover-images/395e277b-3223-4c1b-9aa6-79fc3a7f2a6d?w=433&cf_fit=scale-down&q=85&format=auto&s=be3ab9c4e172a9c9baad4a3c6fdf48b1b7e2b6be75a54a7408bda899e94d3acf", estilo: "Moderno" }
    ]
  },
  // ...outras perguntas
];

let respostas = [];
let perguntaAtual = 0;
let respostaSelecionada = null;

function mostrarPergunta() {
  const q = perguntas[perguntaAtual];
  let html = `<h2>${q.texto}</h2>`;
  q.opcoes.forEach((op, idx) => {
    html += `<img src="${op.imagem}" alt="${op.estilo}" title="${op.estilo}" 
      class="opcao-img${respostaSelecionada === idx ? ' selecionada' : ''}" 
      onclick="selecionarResposta(${idx})">`;
  });
  document.getElementById('quiz-container').innerHTML = html;

  // Mostra o botão "Voltar" apenas se não for a primeira pergunta
  document.getElementById('back-btn').style.display = perguntaAtual > 0 ? 'inline-block' : 'none';
  // Mostra o botão "Próxima" só se uma resposta foi selecionada
  document.getElementById('next-btn').style.display = respostaSelecionada !== null ? 'inline-block' : 'none';
}

function selecionarResposta(idx) {
  respostaSelecionada = idx;
  mostrarPergunta();
}

function avancarPergunta() {
  respostas[perguntaAtual] = perguntas[perguntaAtual].opcoes[respostaSelecionada].estilo;
  perguntaAtual++;
  respostaSelecionada = null;
  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
  } else {
    mostrarResultado();
  }
}

function voltarPergunta() {
  if (perguntaAtual > 0) {
    perguntaAtual--;
    respostaSelecionada = perguntas[perguntaAtual].opcoes.findIndex(
      op => op.estilo === respostas[perguntaAtual]
    );
    mostrarPergunta();
  }
}

function mostrarResultado() {
  const resultado = respostas.sort((a,b) =>
    respostas.filter(v => v===a).length - respostas.filter(v => v===b).length
  ).pop();
  document.getElementById('quiz-container').innerHTML = `<h2>Seu estilo é: ${resultado}</h2>`;
  document.getElementById('back-btn').style.display = 'none';
  document.getElementById('next-btn').style.display = 'none';
}

// Inicialização
if (perguntas.length > 0) mostrarPergunta();

// Eventos dos botões
document.getElementById('back-btn').onclick = voltarPergunta;
document.getElementById('next-btn').onclick = avancarPergunta;
document.getElementById('tipoFisicoForm').onsubmit = function(e) {
  e.preventDefault();
  const ombros = Number(this.ombros.value);
  const cintura = Number(this.cintura.value);
  const quadril = Number(this.quadril.value);
  const busto = Number(this.busto.value);

  let tipo = '';
  // Exemplo de regras simples (ajuste conforme sua metodologia):
  if (ombros === quadril && cintura < ombros) tipo = 'Ampulheta';
  else if (ombros > quadril) tipo = 'Triângulo Invertido';
  else if (quadril > ombros) tipo = 'Triângulo';
  else tipo = 'Retângulo';

  document.getElementById('resultado').innerHTML = `
    <strong>Seu tipo físico é:</strong> ${tipo}
  `;
};
document.getElementById('tipoFisicoForm').onsubmit = function(e) {
  e.preventDefault();
  const ombros = Number(this.ombros.value);
  const cintura = Number(this.cintura.value);
  const quadril = Number(this.quadril.value);
  const busto = Number(this.busto.value);

  let tipo = '';
  let descricao = '';
  let imagem = '';

  if (ombros === quadril && cintura < ombros) {
    tipo = 'Ampulheta';
    descricao = 'Ombros e quadris alinhados, cintura bem definida. Aposte em roupas que valorizem suas curvas!';
    imagem = 'https://img.freepik.com/vetores-premium/tipo-de-corpo-ampulheta_23-2147490837.jpg';
  } else if (ombros > quadril) {
    tipo = 'Triângulo Invertido';
    descricao = 'Ombros mais largos que o quadril. Invista em peças que equilibrem a silhueta, como saias evasê.';
    imagem = 'https://img.freepik.com/vetores-premium/tipo-de-corpo-triangulo-invertido_23-2147490839.jpg';
  } else if (quadril > ombros) {
    tipo = 'Triângulo';
    descricao = 'Quadril mais largo que os ombros. Valorize a parte superior com detalhes e cores claras.';
    imagem = 'https://img.freepik.com/vetores-premium/tipo-de-corpo-triangulo_23-2147490838.jpg';
  } else {
    tipo = 'Retângulo';
    descricao = 'Ombros, cintura e quadril com medidas próximas. Aposte em cintos e peças que criem curvas.';
    imagem = 'https://img.freepik.com/vetores-premium/tipo-de-corpo-retangulo_23-2147490840.jpg';
  }

  document.getElementById('resultado').innerHTML = `
    <div style="text-align:center;">
      <strong style="font-size:1.3rem;color:#3b0d91;">Seu tipo físico é: ${tipo}</strong>
      <p style="margin:1rem 0;color:#333;">${descricao}</p>
      <img src="${imagem}" alt="${tipo}" style="max-width:180px;border-radius:12px;box-shadow:0 2px 8px #3b0d9133;">
    </div>
  `;
};