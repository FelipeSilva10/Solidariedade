(() => {
  const toolbar = document.querySelector(".game-toolbar");
  const input = document.querySelector("#game-search");
  const count = document.querySelector(".game-count");
  const empty = document.querySelector(".game-empty");
  const cards = [...document.querySelectorAll(".game-card")];
  const groups = [
    document.querySelector("#jogos-publicados"),
    document.querySelector("#arquivos-preservados"),
  ].filter(Boolean);

  if (!toolbar || !input || !count || !empty) return;

  const normalize = (value) => value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("pt-BR");

  const entries = cards.map((card) => ({
    card,
    text: normalize([
      card.querySelector("h3")?.textContent || "",
      card.querySelector(".game-card__body p")?.textContent || "",
    ].join(" ")),
  }));

  const filter = () => {
    const terms = normalize(input.value.trim()).split(/\s+/).filter(Boolean);
    let visible = 0;

    entries.forEach(({ card, text }) => {
      card.hidden = !terms.every((term) => text.includes(term));
      if (!card.hidden) visible += 1;
    });

    groups.forEach((group) => {
      group.hidden = ![...group.querySelectorAll(".game-card")]
        .some((card) => !card.hidden);
    });

    count.textContent = terms.length
      ? `${visible} de ${cards.length} jogos encontrados`
      : `${cards.length} jogos no acervo`;
    empty.hidden = visible > 0;
  };

  input.addEventListener("input", filter);
  toolbar.addEventListener("submit", (event) => event.preventDefault());
  toolbar.addEventListener("reset", () => {
    input.value = "";
    filter();
    input.focus();
  });

  toolbar.hidden = false;
  filter();
})();
