(() => {
  const page = document.body.dataset.page || "";
  const mainNav = [
    { id: "home", href: "index.html", label: "Início" },
    { id: "games", href: "jogos.html", label: "Jogos" },
    { id: "team", href: "equipe.html", label: "Equipe" },
  ];

  const navigation = mainNav
    .map(({ id, href, label }) => {
      const current = page === id ? ' aria-current="page"' : "";
      return `<li><a href="${href}"${current}>${label}</a></li>`;
    })
    .join("");

  const header = document.querySelector("[data-site-header]");
  if (header) {
    header.innerHTML = `
      <header class="site-header">
        <div class="site-header__inner">
          <a class="brand" href="index.html" aria-label="Soli — página inicial">
            <img src="icons/soli.svg" alt="" width="44" height="44" />
            <span class="brand__text">
              <strong>Soli<span aria-hidden="true">.</span></strong>
              <small>memória do Estágio Solidariedade</small>
            </span>
          </a>
          <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="site-navigation">
            <span>Menu</span>
            <span class="nav-toggle__icon" aria-hidden="true"></span>
          </button>
          <nav class="site-nav" id="site-navigation" aria-label="Navegação principal">
            <ul>${navigation}</ul>
          </nav>
        </div>
      </header>`;

    const toggle = header.querySelector(".nav-toggle");
    const nav = header.querySelector(".site-nav");
    toggle.addEventListener("click", () => {
      const expanded = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!expanded));
      nav.dataset.open = String(!expanded);
    });
  }

  const footer = document.querySelector("[data-site-footer]");
  if (footer) {
    footer.innerHTML = `
      <footer class="site-footer">
        <div class="site-footer__inner">
          <a class="footer-brand" href="index.html">
            <img src="icons/soli.svg" alt="" width="34" height="34" />
            <span><strong>Soli.</strong><small>nasceu do Estágio Solidariedade</small></span>
          </a>
          <p>Acervo de jogos, materiais e registros do projeto.</p>
          <nav aria-label="Links no rodapé">
            <a href="jogos.html">Jogos</a>
            <a href="equipe.html">Equipe</a>
            <a href="MB.html">App Android</a>
            <a href="YT.html">Vídeos</a>
          </nav>
        </div>
      </footer>`;
  }
})();
