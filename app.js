const FIELD = { sun: "#FFD60A", sky: "#D6DCFF", blue: "#2A2FE0", pink: "#FF9DBD", ink: "#0D1043" };
const P = [
  { id: "nacre-01", img: "images/nacre-01.jpg", name: "Nacre 01", cat: "vue", shape: "pantos", mat: "acétate", price: 185, field: "sun", dims: "49 · 21 · 145",
    desc: "Une pantos compacte aux angles adoucis, en acétate épais. Elle tient bien sur un visage étroit comme sur un visage large.",
    colors: [{ id: "ecaille", n: "Écaille fumée", a: "#5A3320" }, { id: "miel", n: "Miel", a: "#E0A63A" }, { id: "encre", n: "Noir d'encre", a: "#15121C" }] },
  { id: "angle-02", img: "images/angle-02.jpg", name: "Angle 02", cat: "vue", shape: "rectangulaire", mat: "mixte", price: 210, field: "sky", dims: "52 · 18 · 145",
    desc: "Un haut de monture en acétate, un cerclage fin en titane. Légère sur le nez, nette de face.",
    colors: [{ id: "noir", n: "Noir et titane", a: "#15121C", b: "#8E96A6" }, { id: "havane", n: "Havane et or pâle", a: "#7A4A22", b: "#C9AE72" }] },
  { id: "mistral-03", img: "images/mistral-03.jpg", name: "Mistral 03", cat: "soleil", shape: "aviateur", mat: "métal", price: 195, field: "blue", dims: "58 · 14 · 140",
    desc: "Une aviateur au tracé affiné, en métal fin, avec des verres teintés. Le classique, sans l'effet costume.",
    colors: [{ id: "chrome", n: "Chrome chaud", a: "#D9C9AE", t: "#2F3B36" }, { id: "noir", n: "Noir satiné", a: "#2A2A30", t: "#232A38" }, { id: "bronze", n: "Bronze", a: "#9A6B3A", t: "#3A2E24" }] },
  { id: "rumeur-04", img: "images/rumeur-04.jpg", name: "Rumeur 04", cat: "vue", shape: "papillon", mat: "acétate", price: 225, field: "pink", dims: "53 · 17 · 140",
    desc: "Un papillon dont les coins montent vers les tempes. Un acétate généreux, pour une monture qu'on remarque.",
    colors: [{ id: "oxyde", n: "Rouge oxyde", a: "#C23B1E" }, { id: "ecaille", n: "Écaille noire", a: "#2B1A14" }, { id: "rose", n: "Rose transparent", a: "#F4C3CF" }] },
  { id: "sillage-05", img: "images/sillage-05.jpg", name: "Sillage 05", cat: "soleil", shape: "ronde", mat: "mixte", price: 205, field: "sun", dims: "50 · 22 · 145",
    desc: "Une ronde légèrement aplatie : arcade en acétate, cerclage et branches en métal. Faite pour les longues journées dehors.",
    colors: [{ id: "olive", n: "Olive sombre", a: "#4B4A1E", b: "#B9B27A", t: "#2D332A" }, { id: "noir", n: "Noir profond", a: "#15121C", b: "#6D6D78", t: "#1E2230" }, { id: "clair", n: "Écaille claire", a: "#B88A4A", b: "#D8C08A", t: "#3A3028" }] },
  { id: "minuit-06", img: "images/minuit-06.jpg", name: "Minuit 06", cat: "vue", shape: "ronde", mat: "métal", price: 175, field: "ink", dims: "48 · 21 · 140",
    desc: "Un cercle fin en métal, pont sculpté, branches souples. On la porte toute la journée sans y penser.",
    colors: [{ id: "or", n: "Or brossé", a: "#D4A94E" }, { id: "argent", n: "Argent mat", a: "#C4C8D0" }, { id: "graphite", n: "Noir graphite", a: "#4A4C58" }] }
];
const SHAPES = {
  ronde: { hw: 64, top: -64, d: (x, y) => `M${x - 64},${y}a64,64 0 1,1 128,0a64,64 0 1,1 -128,0Z` },
  pantos: { hw: 68, top: -56, d: (x, y) => `M${x - 68},${y}a68,56 0 1,1 136,0a68,56 0 1,1 -136,0Z` },
  rectangulaire: { hw: 66, top: -48, d: (x, y) => `M${x - 66},${y - 22}q0,-18 18,-18h96q18,0 18,18v40q0,18 -18,18h-96q-18,0 -18,-18Z` },
  papillon: { hw: 70, top: -52, d: (x, y) => `M${x - 70},${y - 52}C${x - 30},${y - 54} ${x + 20},${y - 46} ${x + 66},${y - 34}C${x + 68},${y + 14} ${x + 36},${y + 46} ${x - 8},${y + 46}C${x - 50},${y + 46} ${x - 74},${y + 8} ${x - 70},${y - 52}Z` },
  aviateur: { hw: 66, top: -50, d: (x, y) => `M${x - 66},${y - 40}C${x - 30},${y - 52} ${x + 30},${y - 52} ${x + 66},${y - 40}C${x + 70},${y + 10} ${x + 30},${y + 56} ${x},${y + 56}C${x - 30},${y + 56} ${x - 70},${y + 10} ${x - 66},${y - 40}Z` }
};
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const byId = (id) => P.find((p) => p.id === id);
const colorOf = (p, cid) => p.colors.find((c) => c.id === cid) || p.colors[0];
const eur = (n) => new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

function frame(p, c, view = "f") {
  if (p.img && view === "f") return `<img src="${p.img}" alt="${p.name}, vue de face" loading="lazy">`;
  const s = SHAPES[p.shape], sun = p.cat === "soleil", thin = p.mat === "métal", mixed = p.mat === "mixte";
  const rim = thin ? `stroke="${c.a}" stroke-width="5"` : mixed ? `stroke="${c.b}" stroke-width="5"` : `stroke="${c.a}" stroke-width="15"`;
  const brow = mixed ? `<path d="M${105 - s.hw + 2},${90 + s.top + 8}Q105,${90 + s.top - 4} ${105 + s.hw - 2},${90 + s.top + 8}" fill="none" stroke="${c.a}" stroke-width="13" stroke-linecap="round"/>` : "";
  const half = `<path d="${s.d(105, 90)}" fill="${sun ? c.t : "#fff"}" fill-opacity="${sun ? .92 : .16}" ${rim} stroke-linejoin="round"/>${brow}<path d="M80,78l22,-14" stroke="#fff" stroke-opacity=".4" stroke-width="5" stroke-linecap="round"/>`;
  const bw = thin ? 4 : 12, bc = mixed ? c.b : c.a;
  return `<svg viewBox="${view === "d" ? "125 40 150 100" : "0 0 400 180"}" role="img" aria-label="${p.name}, ${c.n}, ${view === "d" ? "détail du pont" : "vue de face"}">
    <path d="M${105 + s.hw},${72}Q200,${thin ? 60 : 52} ${295 - s.hw},72" fill="none" stroke="${bc}" stroke-width="${bw}" stroke-linecap="round"/>
    <path d="M${105 - s.hw},68L6,62M${295 + s.hw},68L394,62" stroke="${mixed ? c.b : c.a}" stroke-width="${thin || mixed ? 4 : 12}" stroke-linecap="round"/>
    ${half}<g transform="translate(400 0) scale(-1 1)">${half}</g></svg>`;
}

const store = {
  read(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; } },
  write(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { toast("Ce navigateur n'a pas pu enregistrer votre sélection."); } }
};
let cart = store.read("optik-cart-v2", []).filter((i) => byId(i.id) && i.q > 0);
let favs = store.read("optik-favs-v2", []).filter(byId);
let cat = "all", favOnly = false, cur = null, curColor = null, curView = "f", lastFocus = null, tt;

function toast(m) { const t = $("#toast"); t.textContent = m; t.classList.add("on"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("on"), 2600); }

function renderGrid() {
  const q = $("#f-q").value.trim().toLocaleLowerCase("fr"), sh = $("#f-shape").value, mt = $("#f-mat").value, so = $("#f-sort").value;
  const list = P.filter((p) => (cat === "all" || p.cat === cat) && (sh === "all" || p.shape === sh) && (mt === "all" || p.mat === mt) &&
    (!favOnly || favs.includes(p.id)) && `${p.name} ${p.shape} ${p.mat} ${p.cat} ${p.colors.map((c) => c.n).join(" ")}`.toLocaleLowerCase("fr").includes(q));
  if (so === "price-asc") list.sort((a, b) => a.price - b.price);
  if (so === "price-desc") list.sort((a, b) => b.price - a.price);
  if (so === "name") list.sort((a, b) => a.name.localeCompare(b.name, "fr"));
  $("#grid").innerHTML = list.map((p) => {
    const on = favs.includes(p.id);
    return `<article class="tile"><button class="t-art" type="button" data-open="${p.id}" style="--f:${FIELD[p.field]}" aria-label="Voir la fiche de ${p.name}">${frame(p, p.colors[0])}</button>
      <div class="t-info"><h3>${p.name}</h3><span class="pr">${eur(p.price)}</span>
      <p>${p.shape[0].toUpperCase() + p.shape.slice(1)}, ${p.mat}, ${p.colors.length} coloris</p>
      <div class="t-act"><button type="button" data-add="${p.id}" aria-label="Ajouter ${p.name} au panier">Ajouter</button><button type="button" data-fav="${p.id}" aria-pressed="${on}" aria-label="${on ? "Retirer des gardées" : "Garder"} : ${p.name}">${on ? "Gardée" : "Garder"}</button></div></div></article>`;
  }).join("");
  $("#count").textContent = `${list.length} monture${list.length > 1 ? "s" : ""}${favOnly ? " gardée" + (list.length > 1 ? "s" : "") : ""}`;
  $("#grid").hidden = !list.length; $("#empty").hidden = !!list.length;
  $("#empty-txt").textContent = favOnly && !favs.length ? "Vous n'avez rien gardé pour l'instant. Utilisez « Garder » sous une monture." : "Aucune monture ne correspond à ces filtres.";
  $(".fav-n").textContent = favs.length;
  $$(".seg [data-c]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.c === cat)));
}
function setCat(c) { cat = c; favOnly = false; renderGrid(); }
function resetAll() { cat = "all"; favOnly = false; $("#f-q").value = ""; ["#f-shape", "#f-mat"].forEach((s) => $(s).value = "all"); $("#f-sort").value = "featured"; renderGrid(); }

function addToCart(p, cid) {
  const c = colorOf(p, cid), ex = cart.find((i) => i.id === p.id && i.c === c.id);
  if (ex) ex.q++; else cart.push({ id: p.id, c: c.id, q: 1 });
  store.write("optik-cart-v2", cart); renderCart(); toast(`${p.name}, ${c.n} : ajoutée au panier.`);
}
function renderCart() {
  let total = 0, n = 0;
  $("#cart-lines").innerHTML = cart.length ? cart.map((i) => {
    const p = byId(i.id), c = colorOf(p, i.c); total += p.price * i.q; n += i.q;
    return `<article class="line" data-k="${i.id}|${i.c}"><div class="l-img" style="--f:${FIELD[p.field]}">${frame(p, c)}</div><h3>${p.name}</h3><strong>${eur(p.price * i.q)}</strong><p>${c.n}, ${eur(p.price)} l'unité</p>
      <div class="q"><button type="button" data-q="-1" aria-label="Retirer une unité de ${p.name}">−</button><span aria-label="Quantité">${i.q}</span><button type="button" data-q="1" aria-label="Ajouter une unité de ${p.name}">+</button></div><button class="x" type="button" data-rm>Supprimer</button></article>`;
  }).join("") : `<p class="cart-empty">Le panier est vide. Les six montures sont <a href="#montures" data-close>juste là</a>.</p>`;
  $("#total").textContent = eur(total); $(".cart-n").textContent = n; $("#checkout").disabled = !cart.length;
}

function open(el) { lastFocus = document.activeElement; $("#veil").hidden = false; el.hidden = false; document.body.classList.add("lock"); (el.querySelector("[data-close],button") || el).focus(); }
function closeAll() { $("#cart").hidden = $("#sheet").hidden = $("#veil").hidden = true; document.body.classList.remove("lock"); if (lastFocus && lastFocus.focus) lastFocus.focus(); }
const anyOpen = () => !$("#cart").hidden || !$("#sheet").hidden;

function renderSheet() {
  const p = cur, c = colorOf(p, curColor), on = favs.includes(p.id);
  $("#sheet").style.setProperty("--f", FIELD[p.field]);
  $("#s-img").innerHTML = frame(p, c, curView);
  $("#s-cname").textContent = c.n;
  $("#s-swatches").innerHTML = p.colors.map((k) => `<button class="sw" type="button" role="radio" aria-checked="${k.id === c.id}" data-color="${k.id}" style="--a:${k.a};--b:${k.b || k.a}"><i></i>${k.n}</button>`).join("");
  $("#s-fav").textContent = on ? "Gardée" : "Garder"; $("#s-fav").setAttribute("aria-pressed", String(on));
  $$("#sheet [data-v]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.v === curView)));
}
function openSheet(p) {
  cur = p; curColor = p.colors[0].id; curView = "f";
  $("#s-name").textContent = p.name; $("#s-price").textContent = eur(p.price); $("#s-desc").textContent = p.desc;
  $("#s-specs").innerHTML = `<dt>Type</dt><dd>${p.cat === "vue" ? "Lunettes de vue" : "Lunettes de soleil"}</dd><dt>Forme</dt><dd>${p.shape}</dd><dt>Matière</dt><dd>${p.mat}</dd><dt>Calibre, pont, branche</dt><dd>${p.dims} mm</dd>`;
  renderSheet(); open($("#sheet"));
}
function toggleFav(id) { favs = favs.includes(id) ? favs.filter((f) => f !== id) : [...favs, id]; store.write("optik-favs-v2", favs); renderGrid(); if (cur && !$("#sheet").hidden) renderSheet(); }

$("#grid").addEventListener("click", (e) => {
  const o = e.target.closest("[data-open]"), a = e.target.closest("[data-add]"), f = e.target.closest("[data-fav]");
  if (o) openSheet(byId(o.dataset.open)); else if (a) addToCart(byId(a.dataset.add)); else if (f) toggleFav(f.dataset.fav);
});
$$(".seg [data-c]").forEach((b) => b.addEventListener("click", () => setCat(b.dataset.c)));
["#f-shape", "#f-mat", "#f-sort"].forEach((s) => $(s).addEventListener("change", renderGrid));
$("#f-q").addEventListener("input", renderGrid);
$("#reset").addEventListener("click", resetAll);
$$(".hero-doors a").forEach((a) => a.addEventListener("click", () => setCat(a.dataset.cat)));
$("#favs-btn").addEventListener("click", () => { favOnly = !favOnly; cat = "all"; renderGrid(); location.hash = "#montures"; });
$("#cart-btn").addEventListener("click", () => { renderCart(); open($("#cart")); });
$("#hero-art").addEventListener("click", () => openSheet(byId("rumeur-04")));
$("#veil").addEventListener("click", closeAll);
document.addEventListener("click", (e) => { if (e.target.closest("[data-close]")) closeAll(); });
$("#s-add").addEventListener("click", () => { addToCart(cur, curColor); closeAll(); });
$("#s-fav").addEventListener("click", () => toggleFav(cur.id));
$("#s-swatches").addEventListener("click", (e) => { const b = e.target.closest("[data-color]"); if (b) { curColor = b.dataset.color; renderSheet(); $(`[data-color="${curColor}"]`).focus(); } });
$$("#sheet [data-v]").forEach((b) => b.addEventListener("click", () => { curView = b.dataset.v; renderSheet(); }));
$("#cart-lines").addEventListener("click", (e) => {
  const l = e.target.closest("[data-k]"); if (!l) return;
  const [id, c] = l.dataset.k.split("|"), i = cart.findIndex((x) => x.id === id && x.c === c);
  if (i < 0) return;
  if (e.target.closest("[data-rm]")) cart.splice(i, 1);
  else if (e.target.closest("[data-q]")) { cart[i].q += +e.target.closest("[data-q]").dataset.q; if (cart[i].q <= 0) cart.splice(i, 1); }
  else return;
  store.write("optik-cart-v2", cart); renderCart();
});
$("#checkout").addEventListener("click", () => toast("Démonstration : aucun paiement n'est configuré sur ce site."));

const menu = $(".menu"), nav = $("#nav");
const setMenu = (o) => { nav.classList.toggle("open", o); menu.setAttribute("aria-expanded", String(o)); menu.textContent = o ? "Fermer" : "Menu"; };
menu.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
nav.addEventListener("click", (e) => { if (e.target.closest("a")) setMenu(false); });

const d = new Date(), today = new Date(d - d.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
$("#b-date").min = today;
$("#form").addEventListener("submit", (e) => {
  e.preventDefault();
  const f = e.currentTarget, err = $("#b-err"), ok = $("#b-ok"); ok.hidden = true;
  $$("input,select", f).forEach((x) => x.removeAttribute("aria-invalid"));
  const bad = $$("input,select", f).find((x) => !x.checkValidity());
  const day = f.date.value ? new Date(f.date.value + "T12:00").getDay() : -1;
  const closed = day === 0 || day === 1;
  if (bad || closed) {
    const el = bad || f.date; el.setAttribute("aria-invalid", "true"); el.focus();
    err.textContent = closed && !bad ? "L'atelier est fermé le dimanche et le lundi. Choisissez un jour entre mardi et samedi." : "Complétez le champ « " + (f.querySelector(`label[for=${el.id}]`)?.textContent || "") + " » pour continuer.";
    err.hidden = false; return;
  }
  err.hidden = true;
  ok.textContent = `Merci ${f.name.value}. Votre demande pour le ${new Date(f.date.value + "T12:00").toLocaleDateString("fr-FR", { weekday: "long", day: "numeric", month: "long" })} à ${f.time.value} est notée ici, mais n'a été envoyée à personne : ce site est une démonstration.`;
  ok.hidden = false; f.reset();
});

document.addEventListener("keydown", (e) => {
  if (!anyOpen()) return;
  if (e.key === "Escape") return closeAll();
  if (e.key !== "Tab") return;
  const box = $("#cart").hidden ? $("#sheet") : $("#cart"), f = $$("button:not([disabled]),input,select,a[href]", box);
  if (!f.length) return;
  if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
  else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
});

$("#hero-art").innerHTML = ["rumeur-04", "angle-02", "nacre-01"]
  .map((id, i) => `<img class="hero-photo hero-photo-${i + 1}" src="${byId(id).img}" alt="" loading="lazy">`)
  .join("");
$("#n-vue").textContent = P.filter((p) => p.cat === "vue").length + " modèles";
$("#n-soleil").textContent = P.filter((p) => p.cat === "soleil").length + " modèles";
renderGrid(); renderCart();
