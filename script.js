// ===== CARTA FECHADA =====
const botaoAbrir = document.getElementById("abrir-carta");
const cartaFechada = document.getElementById("carta-fechada");
const conteudo = document.getElementById("conteudo-principal");

botaoAbrir.addEventListener("click", () => {
    // animação de abrir carta
    const carta = document.querySelector(".carta");
    carta.classList.add("aberta"); // você pode criar uma classe .aberta no CSS para animação
    
    setTimeout(() => {
        // Esconde a carta fechada
        cartaFechada.style.display = "none";
        // Mostra o conteúdo principal
        conteudo.style.display = "block";
        
        // Inicia corações de fundo, rastro e explosão
        loopCoracoesFundo();
        // o rastro e explosão continuam funcionando como estão
    }, 1000); // espera 1s para animação de abertura
});

document.getElementById("abrir-carta").addEventListener("click", () => {
    // Esconde a carta
    document.getElementById("carta-fechada").style.display = "none";
    // Mostra o conteúdo principal
    document.getElementById("conteudo-principal").style.display = "block";

    // Aqui você inicializa corações, rastro, explosão etc.
    loopCoracoesFundo();
});

// ===== CORAÇÕES DE FUNDO =====
function criarCoracaoFundo() {
    const heart = document.createElement("div");
    heart.classList.add("heart");

    const inner = document.createElement("div");
    inner.classList.add("heart-inner");
    heart.appendChild(inner);

    // Posição horizontal aleatória
    heart.style.left = Math.random() * 100 + "vw";

    // Profundidade
    const profundidade = Math.random();
    const size = 10 + profundidade * 25;
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    const duration = 6 + (1 - profundidade) * 8;
    heart.style.animationDuration = duration + "s";
    heart.style.opacity = 0.4 + profundidade * 0.6;
    heart.style.filter = `blur(${(1 - profundidade) * 2}px)`;

    const cores = ["#ff69b4", "#ff1493", "#db7093", "#c71585", "#ff4da6", "#ff85c1"];
    inner.style.background = cores[Math.floor(Math.random() * cores.length)];

    // Deriva horizontal
    const drift = (Math.random() - 0.5) * 80;
    heart.style.setProperty("--drift", drift + "px");

    // Camadas mp3
    heart.style.zIndex = Math.random() < 0.1 ? "5" : "0";

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
}

// Loop de corações de fundo
function loopCoracoesFundo() {
    criarCoracaoFundo();
    setTimeout(loopCoracoesFundo, Math.random() * 200 + 100);
}
loopCoracoesFundo();


// ===== RASTRO FLUIDO DE CORAÇÕES =====
let ultimoRastro = 0;

document.addEventListener("mousemove", function (e) {
    const agora = Date.now();

    // cria no máximo 1 coração a cada 40ms (controle de performance)
    if (agora - ultimoRastro < 40) return;

    ultimoRastro = agora;

    const heart = document.createElement("div");
    heart.classList.add("heart");

    const inner = document.createElement("div");
    inner.classList.add("heart-inner");
    heart.appendChild(inner);

    const size = 6 + Math.random() * 6;
    heart.style.width = size + "px";
    heart.style.height = size + "px";

    heart.style.left = e.clientX + "px";
    heart.style.top = e.clientY + "px";
    heart.style.position = "fixed";
    heart.style.bottom = "auto";
    heart.style.zIndex = 15;
    heart.style.opacity = 0.7;

    const cores = ["#ff69b4", "#ff1493", "#db7093", "#c71585", "#ff4da6", "#ff85c1"];
    inner.style.background = cores[Math.floor(Math.random() * cores.length)];

    heart.animate([
        { transform: "translate(0,0) rotate(45deg)", opacity: 0.7 },
        { transform: "translate(0,-40px) rotate(45deg)", opacity: 0 }
    ], {
        duration: 900,
        easing: "ease-out",
        fill: "forwards"
    });

    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 900);
});


// ===== EXPLOSÃO AO CLICAR COM SOM =====
const somCoracao = new Audio("som.mp3"); // adicione um som suave de clique ou pop

document.addEventListener("click", function (e) {
    if (somCoracao) somCoracao.play();

    for (let i = 0; i < 12; i++) {
        const heart = document.createElement("div");
        heart.classList.add("heart");

        const inner = document.createElement("div");
        inner.classList.add("heart-inner");
        heart.appendChild(inner);

        const cores = ["#ff69b4", "#ff1493", "#db7093", "#c71585", "#ff4da6", "#ff85c1"];
        inner.style.background = cores[Math.floor(Math.random() * cores.length)];

        const size = 8 + Math.random() * 10;
        heart.style.width = size + "px";
        heart.style.height = size + "px";

        heart.style.left = e.clientX + "px";
        heart.style.top = e.clientY + "px";
        heart.style.position = "fixed";
        heart.style.bottom = "auto";
        heart.style.zIndex = 1000;

        // Explosão radial
        const angle = Math.random() * 2 * Math.PI;
        const distance = 60 + Math.random() * 60;
        heart.animate([
            { transform: "translate(0,0) rotate(45deg)", opacity: 1 },
            { transform: `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px) rotate(45deg)`, opacity: 0 }
        ], { duration: 1000, easing: "ease-out", fill: "forwards" });

        // Pequenas partículas mágicas extras
        if (Math.random() < 0.5) {
            const sparkle = document.createElement("div");
            sparkle.style.position = "fixed";
            sparkle.style.left = e.clientX + "px";
            sparkle.style.top = e.clientY + "px";
            sparkle.style.width = "4px";
            sparkle.style.height = "4px";
            sparkle.style.borderRadius = "50%";
            sparkle.style.background = "rgba(255,255,255,0.8)";
            sparkle.style.zIndex = 999;
            sparkle.animate([
                { transform: "translate(0,0)", opacity: 1 },
                { transform: `translate(${Math.cos(angle) * (distance / 2)}px, ${Math.sin(angle) * (distance / 2)}px)`, opacity: 0 }
            ], { duration: 800, easing: "ease-out", fill: "forwards" });
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 800);
        }

        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 1000);
    }
});

const imagens = document.querySelectorAll(".galeria img");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const fechar = document.getElementById("fechar");

//----- LIGHTBOX E SLIDESHOW =====
let indexAtual = 0;
let autoSlide;

// ===== ABRIR =====
imagens.forEach((img, index) => {
    img.addEventListener("click", () => {
        indexAtual = index;
        mostrarImagem();
        lightbox.style.display = "flex";
        iniciarAutoSlide();
    });
});

function mostrarImagem() {
    lightboxImg.src = imagens[indexAtual].src;
}

// ===== FECHAR CLICANDO FORA =====
lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
        fecharLightbox();
    }
});

function fecharLightbox() {
    lightbox.style.display = "none";
    pararAutoSlide();
}

// ===== AUTO SLIDE =====
function iniciarAutoSlide() {
    autoSlide = setInterval(() => {
        indexAtual = (indexAtual + 1) % imagens.length;
        mostrarImagem();
    }, 3000);
}

function pararAutoSlide() {
    clearInterval(autoSlide);
}

function reiniciarAutoSlide() {
    pararAutoSlide();
    iniciarAutoSlide();
}

// ===== SWIPE PARA MUDAR IMAGEM =====
let startX = 0;
let currentX = 0;
let isSwiping = false;

lightboxImg.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
}, { passive: true });

lightboxImg.addEventListener("touchmove", (e) => {
    if (!isSwiping) return;

    currentX = e.touches[0].clientX;
    let diff = startX - currentX;

    // impede o scroll horizontal
    if (Math.abs(diff) > 10) {
        e.preventDefault(); // 🔥 ESSENCIAL
    }
}, { passive: false });

lightboxImg.addEventListener("touchend", () => {
    if (!isSwiping) return;

    let diff = startX - currentX;

    if (Math.abs(diff) > 50) {
        if (diff > 0) {
            indexAtual = (indexAtual + 1) % imagens.length;
        } else {
            indexAtual = (indexAtual - 1 + imagens.length) % imagens.length;
        }

        mostrarImagem();
        reiniciarAutoSlide();
    }

    isSwiping = false;
});