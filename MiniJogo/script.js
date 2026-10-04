let vida = 100;
let vidainimigo = 100;

let turnoJogador = true;
let jogoAcabou = false;

const cvidaHTML = document.getElementById('vidacavaleiro');
const gvidaHTML = document.getElementById('vidagoblin');
const mensagemHTML = document.getElementById('anuncio');
const imagemgoblin =  document.getElementById('imgoblin')
const cimagem= document.getElementById('imgcavaleiro')
const botaoAtacar = document.getElementById('atacar');
const botaoDefender = document.getElementById('defender');
const botaoCurar = document.getElementById('curar');
const botaoFugir = document.getElementById('fugir');
const cbarraVida = document.getElementById('barraCavaleiro');
const gbarraVida = document.getElementById('barraGoblin');

//Voltar imagem ao normal

function imgnormal() {
setTimeout(() => {
cimagem.src = '/img/cavaleiro.png'
}, 1000 )
}

function imgnormalgoblin() {
setTimeout(() => {
imagemgoblin.src = '/img/goblin_direito.png'
}, 1000 )
}

// ==============================
// ATUALIZA A TELA
// ==============================

function atualizarTela() {
    cvidaHTML.textContent = vida;
    gvidaHTML.textContent = vidainimigo;
      cbarraVida.style.width = vida + '%';
       gbarraVida.style.width = vidainimigo + '%';
}
let jogadorDefendendo = false;

// ==============================
// TRAVA / DESTRAVA OS BOTÕES
// ==============================

function atualizarBotoes() {

    if (jogoAcabou || !turnoJogador) {

        botaoAtacar.disabled = true;
        botaoDefender.disabled = true;
        botaoCurar.disabled = true;
        botaoFugir.disabled = true;

    } else {

        botaoAtacar.disabled = false;
        botaoDefender.disabled = false;
        botaoCurar.disabled = false;
        botaoFugir.disabled = false;

    }
}


// ==============================
// VERIFICA SE O JOGO ACABOU
// ==============================

function fimdejogo() {

    if (vidainimigo <= 0) {

        jogoAcabou = true;
        mensagemHTML.textContent = 'O Goblin morreu!';
        imagemgoblin.src = "/img/goblincaido.png";

    } 
    
    else if (vida <= 0) {

        jogoAcabou = true;
        mensagemHTML.textContent = 'O Cavaleiro morreu!';
        cimagem.src = '/img/cavaleirocaido.png'
    }

    atualizarBotoes();

    return jogoAcabou;
}


// ==============================
// COMEÇA O TURNO DO INIMIGO
// ==============================

function iniciarTurnoInimigo() {

    if (jogoAcabou) {
        return;
    }

    turnoJogador = false;
    atualizarBotoes();

    mensagemHTML.textContent = 'O Goblin está pensando...';

    setTimeout(() => {

        if (jogoAcabou) {
            return;
        }

        acaoinimigo();

    }, 2000);
}


// ==============================
// ATAQUE DO JOGADOR
// ==============================

function atacar() {

    if (jogoAcabou || !turnoJogador) {
        return;
    }

    const aleatorio = Math.floor(Math.random() * 16) + 10;

    vidainimigo = Math.max(0, vidainimigo - aleatorio);

    mensagemHTML.textContent =
        `Cavaleiro atacou e causou ${aleatorio} de dano.`;
    cimagem.src = '/img/cavaleiroatacando.png'
    imgnormal();
    atualizarTela();

    // Verifica se o Goblin morreu
    if (fimdejogo()) {
        return;
    }

    iniciarTurnoInimigo();
}


// ==============================
// CURA DO JOGADOR
// ==============================

function curar() {

    if (jogoAcabou || !turnoJogador) {
        return;
    }

    const aleatorio = Math.floor(Math.random() * 16) + 10;

    vida = Math.min(100, vida + aleatorio);

    mensagemHTML.textContent =
        `Cavaleiro curou ${aleatorio} de HP.`;
     cimagem.src = '/img/cavaleirocurando.png'
     imgnormal()
    atualizarTela();

    iniciarTurnoInimigo();
}


// ==============================
// DEFESA DO JOGADOR
// ==============================

function defender() {

    if (jogoAcabou || !turnoJogador) {
        return;
    }

    const chanceDefesa = Math.floor(Math.random() * 90) + 10;

    if (chanceDefesa >= 40) {

        jogadorDefendendo = true;

        mensagemHTML.textContent =
            'Cavaleiro se defendeu e não receberá dano.';

    } else {

        jogadorDefendendo = false;

        mensagemHTML.textContent =
            'O cavaleiro falhou em tentar se defender.';
    }

    iniciarTurnoInimigo();
}


// ==============================
// FUGIR
// ==============================

function fugir() {

    if (jogoAcabou || !turnoJogador) {
        return;
    }

    const chanceFugir = Math.floor(Math.random() * 90) + 10;

    if (chanceFugir >= 50) {

        mensagemHTML.textContent =
            'O cavaleiro conseguiu fugir!';
              cimagem.src  =  "/img/cavaleirofugindo.png"

        jogoAcabou = true;

        atualizarBotoes();

        return;

    } else {

        mensagemHTML.textContent =
            'O cavaleiro não conseguiu fugir!';
           cimagem.src  =  "/img/cavaleirofugindo.png"
            imgnormal()

        iniciarTurnoInimigo();
    }
}


// ==============================
// ATAQUE DO INIMIGO
// ==============================

function atacarinimigo() {

    const aleatorio = Math.floor(Math.random() * 16) + 10;

    if (jogadorDefendendo) {

        mensagemHTML.textContent =
            'O Cavaleiro bloqueou o ataque do Goblin!';

        jogadorDefendendo = false;

    } else {

        vida = Math.max(0, vida - aleatorio);

        mensagemHTML.textContent =
            `Goblin atacou e causou ${aleatorio} de dano.`;
    }

    imagemgoblin.src = '/img/goblinatacando.png';
    imgnormalgoblin();

    atualizarTela();

    fimdejogo();
}

// ==============================
// CURA DO INIMIGO
// ==============================

function curarinimigo() {

    const aleatorio = Math.floor(Math.random() * 16) + 10;

    vidainimigo = Math.min(100, vidainimigo + aleatorio);

    mensagemHTML.textContent =
        `O Goblin curou ${aleatorio} de HP.`;
     imagemgoblin.src  = '/img/goblincurando.png'
     imgnormalgoblin() 
    atualizarTela();

    fimdejogo();
}


// ==============================
// DEFESA DO INIMIGO
// ==============================

function defenderinimigo() {

    const chanceDefesa = Math.floor(Math.random() * 90) + 10;

    if (chanceDefesa >= 40) {

        mensagemHTML.textContent =
            'O Goblin se defendeu e não recebeu dano.';

    } else {

        mensagemHTML.textContent =
            'O Goblin falhou em tentar se defender.';

    }
}


// ==============================
// AÇÃO DO INIMIGO
// ==============================

function acaoinimigo() {

    if (jogoAcabou) {
        return;
    }

    const gacao = Math.floor(Math.random() * 90) + 10;

    if (vidainimigo >= 30 && gacao >= 30) {

        atacarinimigo();

    } else if (vidainimigo >= 30 && gacao >= 10) {

        curarinimigo();

    } else if (vidainimigo >= 30 && gacao >= 0) {

        defenderinimigo();

    } else if (vidainimigo < 30 && gacao >= 50) {

        curarinimigo();

    } else if (vidainimigo < 30 && gacao >= 20) {

        atacarinimigo();

    } else {

        defenderinimigo();
    }

    // Se o Goblin matou o jogador,
    // não devolve o turno.
    if (jogoAcabou) {
        return;
    }

    // Agora volta para o jogador
    turnoJogador = true;

    atualizarBotoes();
}


// ==============================
// BOTÕES
// ==============================

botaoAtacar.addEventListener("click", atacar);
botaoDefender.addEventListener("click", defender);
botaoCurar.addEventListener("click", curar);
botaoFugir.addEventListener("click", fugir);


// ==============================
// INICIA O JOGO
// ==============================

atualizarTela();
atualizarBotoes();