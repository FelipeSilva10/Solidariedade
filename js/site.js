(() => {
  const page = document.body.dataset.page || "";
  const skipLink = document.querySelector(".skip-link");
  if (skipLink) skipLink.href = new URL("#conteudo", location.href).href;
  const main = document.querySelector("main");
  if (main) main.tabIndex = -1;
  const filename = location.pathname.split("/").pop();
  const mainNav = [
    { id: "home", href: "index.html", label: "Início", icon: "⌂" },
    { id: "games", href: "jogos.html", label: "Jogos", icon: "▸" },
    { id: "history", href: "index.html#historia", label: "Nossa história", icon: "▤" },
    { id: "team", href: "equipe.html", label: "Equipe", icon: "☺" },
    { id: "app", href: "MB.html", label: "App Android", icon: "▣" },
    { id: "videos", href: "YT.html", label: "Vídeos & materiais", icon: "▷" },
  ];
  const currentId = filename === "MB.html" ? "app" : filename === "YT.html" ? "videos" : page;
  const currentLabel = page === "credits" ? "Créditos dos assets" : mainNav.find(({ id }) => id === currentId)?.label || "Acervo";
  const navigation = mainNav.map(({ id, href, label, icon }) =>
    `<li><a href="${href}"${currentId === id ? ' aria-current="page"' : ""}><span aria-hidden="true">${icon}</span>${label}</a></li>`
  ).join("");

  const header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="desktop-titlebar"><span><span class="titlebar-dot" aria-hidden="true"></span> SOLI / ESTÁGIO SOLIDARIEDADE</span><span class="desktop-titlebar__right">PROGRAMAR · CRIAR · COMPARTILHAR <span class="window-controls" aria-hidden="true">_ □ ×</span></span></div>
        <div class="site-header__inner">
          <a class="brand" href="index.html" aria-label="Soli — página inicial">
            <span class="brand__symbol" aria-hidden="true">{ }</span>
            <span class="brand__text"><strong>Soli<span>.</span></strong><small>ESTÁGIO SOLIDARIEDADE ONLINE</small></span>
          </a>
          <div class="masthead-message"><span class="masthead-message__eyebrow">DESDE O PRIMEIRO BLOCO DE CÓDIGO</span><strong>a gente aprende criando<span>_</span></strong><span>jogos, descobertas e memórias na internet.</span></div>
          <span class="masthead-star" aria-hidden="true">✦</span>
        </div>
        <div class="nav-bar"><span class="nav-bar__label">NAVEGUE »</span><button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">Abrir menu <span aria-hidden="true">▾</span></button><nav class="site-nav" id="site-navigation" aria-label="Navegação principal"><ul>${navigation}</ul></nav><span class="nav-bar__end" aria-hidden="true">[ www ]</span></div>
        <div class="site-status"><span>Você está em: <strong>${currentLabel}</strong></span><span><span class="status-dot" aria-hidden="true"></span> ACERVO ONLINE <span class="status-divider">|</span> seja bem-vindo(a) :)</span></div>
      </header>`;
    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      toggle.innerHTML = `${expanded ? "Abrir" : "Fechar"} menu <span aria-hidden="true">${expanded ? "▾" : "▴"}</span>`;
      nav.dataset.open = String(!expanded);
    });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav.dataset.open === "true") {
        toggle.click();
        toggle.focus();
      }
    });
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `<footer class="site-footer"><div class="footer-top"><a class="footer-brand" href="index.html"><strong>Soli.</strong><span>um projeto, muitas descobertas.</span></a><nav aria-label="Links no rodapé"><a href="jogos.html">Jogos</a><a href="equipe.html">Equipe</a><a href="MB.html">App Android</a><a href="YT.html">Vídeos</a><a href="#top" data-back-top>Voltar ao topo ↑</a></nav></div><div class="footer-bottom"><span>Memória do Estágio Solidariedade · Feito para jogar, aprender e lembrar.</span><span><button type="button" class="motion-toggle" aria-pressed="false" data-motion-toggle>Pausar animações</button> <span aria-hidden="true">|</span> <a href="creditos.html">Créditos dos assets</a> <span aria-hidden="true">|</span> { espalhe essa ideia }</span></div></footer>`;
    footer.querySelector("[data-back-top]").addEventListener("click", (event) => {
      event.preventDefault();
      window.scrollTo({ top: 0, behavior: document.body.classList.contains("motion-paused") ? "instant" : "smooth" });
      const brand = document.querySelector(".brand");
      if (brand) brand.focus({ preventScroll: true });
    });
  }

  const gamePaths = ["JOGO1.html", "JOGO2.html", "JOGO3.html", "JOGO4.html", "JOGO5.html", "JOGO6.html", "JOGO7.html", "JOGO8%20.html", "JOGO01.html", "JOGO02.html"];
  document.querySelectorAll("[data-random-game]").forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", () => {
      location.href = `jogos/${gamePaths[Math.floor(Math.random() * gamePaths.length)]}`;
    });
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let motionPaused = reducedMotion.matches;
  try {
    const saved = localStorage.getItem("soli-pause-motion");
    if (saved !== null) motionPaused = saved === "true";
  } catch { /* The site also works when storage is unavailable. */ }
  const motionToggle = document.querySelector("[data-motion-toggle]");
  const applyMotion = () => {
    document.body.classList.toggle("motion-paused", motionPaused);
    if (motionToggle) {
      motionToggle.setAttribute("aria-pressed", String(motionPaused));
      motionToggle.textContent = motionPaused ? "Ativar animações" : "Pausar animações";
    }
  };
  motionToggle?.addEventListener("click", () => {
    motionPaused = !motionPaused;
    try { localStorage.setItem("soli-pause-motion", String(motionPaused)); } catch { /* Optional preference. */ }
    applyMotion();
  });
  reducedMotion.addEventListener("change", (event) => { motionPaused = event.matches; applyMotion(); });
  applyMotion();
})();
