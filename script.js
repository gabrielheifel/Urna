let seuVotoPara = document.querySelector('.container-1-1 span');
let cargo = document.querySelector('.container-1-2 span');
let numeros = document.querySelector('.container-1-3');
let descricao = document.querySelector('.container-1-4');
let lateral = document.querySelector('.container-1-right');
let aviso = document.querySelector('.container-2');
let botoes = document.querySelectorAll('.tec-botao');

// variaveis de controle
let etapaAtual = 0;
let numeroVoto = '';
let votoBranco = false;
let votos = [];

function comecarEtapa() {
  let etapa = etapas[etapaAtual];

  let numeroHTML = '';
  numeroVoto = '';
  votoBranco = false;

  for (let i = 0; i < etapa.numeros; i++) {
    if (i === 0) {
      numeroHTML += '<div class="numero pisca"></div>';
    } else {
      numeroHTML += '<div class="numero"></div>';
    }
  }

  seuVotoPara.style.display = 'none';
  cargo.innerHTML = etapa.titulo;
  descricao.innerHTML = '';
  aviso.style.display = 'none';
  lateral.innerHTML = '';
  numeros.innerHTML = numeroHTML;
}

function atualizaInterface() {
  let etapa = etapas[etapaAtual];
  let candidato = etapa.candidatos.filter(item => {
    if (item.numero === numeroVoto) {
      return true;
    } else {
      return false;
    }
  });
  if (candidato.length > 0) {
    candidato = candidato[0];
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';

    if(etapaAtual == 0) {
      descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}`;
    } else {
      descricao.innerHTML = `Nome: ${candidato.nome}<br>Partido: ${candidato.partido}<br>Vice: ${candidato.vice}`;
    }
    
    let fotosHTML = '';
    for (let i in candidato.fotos) {
      if(candidato.fotos[i].small) {
        fotosHTML += `<div class="container-1-image small"><img src="./images/${candidato.fotos[i].url}" alt="Prefeito Dilera">${candidato.fotos[i].legenda}</div>`;
      } else {
        fotosHTML += `<div class="container-1-image"><img src="./images/${candidato.fotos[i].url}" alt="Prefeito Dilera">${candidato.fotos[i].legenda}</div>`;
      }
    }
    lateral.innerHTML = fotosHTML;

  } else {
    seuVotoPara.style.display = 'block';
    aviso.style.display = 'block';
    descricao.innerHTML = '<div class="aviso-grande pisca">VOTO NULO</div>';
  }
}

for (var botao of botoes) {
  botao.addEventListener("click", event => {
    let numeroDisplay = document.querySelector('.numero.pisca');
    if (numeroDisplay !== null) {
      let n = event.target.innerHTML;

      numeroDisplay.innerHTML = n;
      numeroVoto = `${numeroVoto}${n}`

      numeroDisplay.classList.remove('pisca');
      if (numeroDisplay.nextElementSibling !== null) {
        numeroDisplay.nextElementSibling.classList.add('pisca');
      } else {
        atualizaInterface();
      }
    }
  });
}

function branco() {
  numeroVoto = '';
  votoBranco = true;

  seuVotoPara.style.display = 'block';
  aviso.style.display = 'block';
  numeros.innerHTML = '';
  descricao.innerHTML = '<div class="aviso-grande pisca">VOTO EM BRANCO</div>';
  lateral.innerHTML = '';

}
function corrige() {
  comecarEtapa();
}
function confirma() {
  let etapa = etapas[etapaAtual];

  let votoConfirmado = false;

  if(votoBranco === true) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: 'branco'
    });
  } else if(numeroVoto.length === etapa.numeros) {
    votoConfirmado = true;
    votos.push({
      etapa: etapas[etapaAtual].titulo,
      voto: numeroVoto
    });
  }

  if(votoConfirmado) {
    etapaAtual++;
    if(etapas[etapaAtual] !== undefined){
      comecarEtapa();
    } else {
      document.querySelector('.tela').innerHTML = '<div class="aviso-gigante pisca">FIM</div>';
      console.log(votos);
    }
  }
}

comecarEtapa();
