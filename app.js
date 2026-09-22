(() => {
  const entries = window.OLYMPUS_ENTRIES ?? [];
  const grid = document.querySelector("#card-grid");
  const input = document.querySelector("#search-input");
  const filters = document.querySelector("#filters");
  const count = document.querySelector("#result-count");
  const empty = document.querySelector("#empty-state");
  const dialog = document.querySelector("#detail-dialog");

  if (!grid || !input || !filters || !count || !empty || !dialog) return;

  const state = { query: "", group: "All" };
  const groups = ["All", ...new Set(entries.map((entry) => entry.group))];

  function normalized(value) {
    return value.toLocaleLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function matches(entry) {
    const haystack = normalized([entry.name, entry.group, entry.domain, entry.summary, entry.symbols].join(" "));
    return (state.group === "All" || entry.group === state.group) && haystack.includes(normalized(state.query.trim()));
  }

  function openEntry(entry) {
    dialog.querySelector("#dialog-group").textContent = entry.group;
    dialog.querySelector("#dialog-title").textContent = `${entry.symbol} ${entry.name}`;
    dialog.querySelector("#dialog-domain").textContent = entry.domain;
    dialog.querySelector("#dialog-description").textContent = entry.summary;
    dialog.querySelector("#dialog-facts").innerHTML = `<dt>Parents</dt><dd>${entry.parents}</dd><dt>Symbols</dt><dd>${entry.symbols}</dd>`;
    dialog.showModal();
  }

  function card(entry) {
    const button = document.createElement("button");
    button.className = "myth-card";
    button.type = "button";
    button.setAttribute("aria-label", `Read about ${entry.name}`);
    button.innerHTML = `<span class="card-symbol" aria-hidden="true">${entry.symbol}</span><h3>${entry.name}</h3><p class="card-domain">${entry.domain}</p><p class="card-summary">${entry.summary}</p>`;
    button.addEventListener("click", () => openEntry(entry));
    return button;
  }

  function render() {
    const visible = entries.filter(matches);
    grid.replaceChildren(...visible.map(card));
    count.textContent = `${visible.length} ${visible.length === 1 ? "figure" : "figures"}`;
    empty.hidden = visible.length !== 0;
  }

  groups.forEach((group) => {
    const button = document.createElement("button");
    button.className = "filter-button";
    button.type = "button";
    button.textContent = group;
    button.setAttribute("aria-pressed", String(group === state.group));
    button.addEventListener("click", () => {
      state.group = group;
      filters.querySelectorAll("button").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      render();
    });
    filters.append(button);
  });

  input.addEventListener("input", () => {
    state.query = input.value;
    render();
  });

  dialog.querySelector("#dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const bounds = dialog.getBoundingClientRect();
    const outside = event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom;
    if (outside) dialog.close();
  });

  render();
})();
