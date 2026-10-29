"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

const FIELD = {
  sun: "#FFD60A",
  sky: "#D6DCFF",
  blue: "#2A2FE0",
  pink: "#FF9DBD",
  ink: "#0D1043",
};

const PRODUCTS = [
  {
    id: "nacre-01",
    img: "/images/nacre-01.jpg",
    name: "Nacre 01",
    cat: "vue",
    shape: "pantos",
    mat: "acétate",
    price: 185,
    field: "sun",
    dims: "49 · 21 · 145",
    desc: "Une pantos compacte aux angles adoucis, en acétate épais. Elle tient bien sur un visage étroit comme sur un visage large.",
    colors: [
      { id: "ecaille", n: "Écaille fumée", a: "#5A3320" },
      { id: "miel", n: "Miel", a: "#E0A63A" },
      { id: "encre", n: "Noir d'encre", a: "#15121C" },
    ],
  },
  {
    id: "angle-02",
    img: "/images/angle-02.jpg",
    name: "Angle 02",
    cat: "vue",
    shape: "rectangulaire",
    mat: "mixte",
    price: 210,
    field: "sky",
    dims: "52 · 18 · 145",
    desc: "Un haut de monture en acétate, un cerclage fin en titane. Légère sur le nez, nette de face.",
    colors: [
      { id: "noir", n: "Noir et titane", a: "#15121C", b: "#8E96A6" },
      { id: "havane", n: "Havane et or pâle", a: "#7A4A22", b: "#C9AE72" },
    ],
  },
  {
    id: "mistral-03",
    img: "/images/mistral-03.jpg",
    name: "Mistral 03",
    cat: "soleil",
    shape: "aviateur",
    mat: "métal",
    price: 195,
    field: "blue",
    dims: "58 · 14 · 140",
    desc: "Une aviateur au tracé affiné, en métal fin, avec des verres teintés. Le classique, sans l'effet costume.",
    colors: [
      { id: "chrome", n: "Chrome chaud", a: "#D9C9AE", t: "#2F3B36" },
      { id: "noir", n: "Noir satiné", a: "#2A2A30", t: "#232A38" },
      { id: "bronze", n: "Bronze", a: "#9A6B3A", t: "#3A2E24" },
    ],
  },
  {
    id: "rumeur-04",
    img: "/images/rumeur-04.jpg",
    name: "Rumeur 04",
    cat: "vue",
    shape: "papillon",
    mat: "acétate",
    price: 225,
    field: "pink",
    dims: "53 · 17 · 140",
    desc: "Un papillon dont les coins montent vers les tempes. Un acétate généreux, pour une monture qu'on remarque.",
    colors: [
      { id: "oxyde", n: "Rouge oxyde", a: "#C23B1E" },
      { id: "ecaille", n: "Écaille noire", a: "#2B1A14" },
      { id: "rose", n: "Rose transparent", a: "#F4C3CF" },
    ],
  },
  {
    id: "sillage-05",
    img: "/images/sillage-05.jpg",
    name: "Sillage 05",
    cat: "soleil",
    shape: "ronde",
    mat: "mixte",
    price: 205,
    field: "sun",
    dims: "50 · 22 · 145",
    desc: "Une ronde légèrement aplatie : arcade en acétate, cerclage et branches en métal. Faite pour les longues journées dehors.",
    colors: [
      { id: "olive", n: "Olive sombre", a: "#4B4A1E", b: "#B9B27A", t: "#2D332A" },
      { id: "noir", n: "Noir profond", a: "#15121C", b: "#6D6D78", t: "#1E2230" },
      { id: "clair", n: "Écaille claire", a: "#B88A4A", b: "#D8C08A", t: "#3A3028" },
    ],
  },
  {
    id: "minuit-06",
    img: "/images/minuit-06.jpg",
    name: "Minuit 06",
    cat: "vue",
    shape: "ronde",
    mat: "métal",
    price: 175,
    field: "ink",
    dims: "48 · 21 · 140",
    desc: "Un cercle fin en métal, pont sculpté, branches souples. On la porte toute la journée sans y penser.",
    colors: [
      { id: "or", n: "Or brossé", a: "#D4A94E" },
      { id: "argent", n: "Argent mat", a: "#C4C8D0" },
      { id: "graphite", n: "Noir graphite", a: "#4A4C58" },
    ],
  },
];

const SHAPES = {
  ronde: {
    hw: 64,
    top: -64,
    d: (x, y) => `M${x - 64},${y}a64,64 0 1,1 128,0a64,64 0 1,1 -128,0Z`,
  },
  pantos: {
    hw: 68,
    top: -56,
    d: (x, y) => `M${x - 68},${y}a68,56 0 1,1 136,0a68,56 0 1,1 -136,0Z`,
  },
  rectangulaire: {
    hw: 66,
    top: -48,
    d: (x, y) =>
      `M${x - 66},${y - 22}q0,-18 18,-18h96q18,0 18,18v40q0,18 -18,18h-96q-18,0 -18,-18Z`,
  },
  papillon: {
    hw: 70,
    top: -52,
    d: (x, y) =>
      `M${x - 70},${y - 52}C${x - 30},${y - 54} ${x + 20},${y - 46} ${x + 66},${y - 34}C${x + 68},${y + 14} ${x + 36},${y + 46} ${x - 8},${y + 46}C${x - 50},${y + 46} ${x - 74},${y + 8} ${x - 70},${y - 52}Z`,
  },
  aviateur: {
    hw: 66,
    top: -50,
    d: (x, y) =>
      `M${x - 66},${y - 40}C${x - 30},${y - 52} ${x + 30},${y - 52} ${x + 66},${y - 40}C${x + 70},${y + 10} ${x + 30},${y + 56} ${x},${y + 56}C${x - 30},${y + 56} ${x - 70},${y + 10} ${x - 66},${y - 40}Z`,
  },
};

const euro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0,
});

function colorOf(product, colorId) {
  return product.colors.find((color) => color.id === colorId) || product.colors[0];
}

function Frame({ product, color, view = "f" }) {
  if (product.img && view === "f") {
    return (
      <Image
        className="frame-image"
        src={product.img}
        alt={`${product.name}, vue de face`}
        fill
        sizes="(max-width: 520px) 90vw, (max-width: 860px) 45vw, 60vw"
      />
    );
  }

  const shape = SHAPES[product.shape];
  const isSun = product.cat === "soleil";
  const isThin = product.mat === "métal";
  const isMixed = product.mat === "mixte";
  const rim = isThin
    ? { stroke: color.a, strokeWidth: 5 }
    : isMixed
      ? { stroke: color.b, strokeWidth: 5 }
      : { stroke: color.a, strokeWidth: 15 };
  const brow = isMixed ? (
    <path
      d={`M${105 - shape.hw + 2},${90 + shape.top + 8}Q105,${90 + shape.top - 4} ${105 + shape.hw - 2},${90 + shape.top + 8}`}
      fill="none"
      stroke={color.a}
      strokeWidth="13"
      strokeLinecap="round"
    />
  ) : null;
  const half = (
    <>
      <path
        d={shape.d(105, 90)}
        fill={isSun ? color.t : "#fff"}
        fillOpacity={isSun ? 0.92 : 0.16}
        {...rim}
        strokeLinejoin="round"
      />
      {brow}
      <path
        d="M80,78l22,-14"
        stroke="#fff"
        strokeOpacity=".4"
        strokeWidth="5"
        strokeLinecap="round"
      />
    </>
  );
  const bridgeColor = isMixed ? color.b : color.a;
  const bridgeWidth = isThin ? 4 : 12;

  return (
    <svg
      viewBox={view === "d" ? "125 40 150 100" : "0 0 400 180"}
      role="img"
      aria-label={`${product.name}, ${color.n}, ${view === "d" ? "détail du pont" : "vue de face"}`}
    >
      <path
        d={`M${105 + shape.hw},72Q200,${isThin ? 60 : 52} ${295 - shape.hw},72`}
        fill="none"
        stroke={bridgeColor}
        strokeWidth={bridgeWidth}
        strokeLinecap="round"
      />
      <path
        d={`M${105 - shape.hw},68L6,62M${295 + shape.hw},68L394,62`}
        stroke={isMixed ? color.b : color.a}
        strokeWidth={isThin || isMixed ? 4 : 12}
        strokeLinecap="round"
      />
      {half}
      <g transform="translate(400 0) scale(-1 1)">{half}</g>
    </svg>
  );
}

function Logo({ footer = false }) {
  return (
    <a
      className="logo"
      href="#accueil"
      aria-label={footer ? "OPTIK, retour en haut" : "OPTIK, accueil"}
    >
      <Image
        src="/logo.svg"
        alt=""
        width={260}
        height={64}
        priority={!footer}
      />
    </a>
  );
}

function getLocalDate() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function readStoredValue(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? [] : JSON.parse(raw);
  } catch (error) {
    console.error(`Impossible de lire la sélection « ${key} ».`, error);
    return [];
  }
}

export default function HomePage() {
  const [cart, setCart] = useState([]);
  const [favs, setFavs] = useState([]);
  const [storageReady, setStorageReady] = useState(false);
  const [category, setCategory] = useState("all");
  const [shapeFilter, setShapeFilter] = useState("all");
  const [materialFilter, setMaterialFilter] = useState("all");
  const [sort, setSort] = useState("featured");
  const [query, setQuery] = useState("");
  const [favoritesOnly, setFavoritesOnly] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dialog, setDialog] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [view, setView] = useState("f");
  const [toast, setToast] = useState("");
  const [dateMin, setDateMin] = useState("");
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const dialogRef = useRef(null);

  const selectedProduct = PRODUCTS.find((product) => product.id === selectedId);
  const selectedProductColor = selectedProduct
    ? colorOf(selectedProduct, selectedColor)
    : null;

  const visibleProducts = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("fr");
    const filtered = PRODUCTS.filter((product) => {
      const text = `${product.name} ${product.shape} ${product.mat} ${product.cat} ${product.colors
        .map((color) => color.n)
        .join(" ")}`.toLocaleLowerCase("fr");

      return (
        (category === "all" || product.cat === category) &&
        (shapeFilter === "all" || product.shape === shapeFilter) &&
        (materialFilter === "all" || product.mat === materialFilter) &&
        (!favoritesOnly || favs.includes(product.id)) &&
        text.includes(normalizedQuery)
      );
    });

    if (sort === "price-asc") filtered.sort((a, b) => a.price - b.price);
    if (sort === "price-desc") filtered.sort((a, b) => b.price - a.price);
    if (sort === "name") filtered.sort((a, b) => a.name.localeCompare(b.name, "fr"));
    return filtered;
  }, [category, favs, favoritesOnly, materialFilter, query, shapeFilter, sort]);

  const cartTotal = cart.reduce((total, item) => {
    const product = PRODUCTS.find((entry) => entry.id === item.id);
    return product ? total + product.price * item.q : total;
  }, 0);
  const cartCount = cart.reduce((total, item) => total + item.q, 0);

  useEffect(() => {
    const storedCart = readStoredValue("optik-cart-v2");
    const storedFavs = readStoredValue("optik-favs-v2");
    setCart(
      Array.isArray(storedCart)
        ? storedCart.filter(
            (item) =>
              item &&
              PRODUCTS.some((product) => product.id === item.id) &&
              Number.isFinite(item.q) &&
              item.q > 0,
          )
        : [],
    );
    setFavs(
      Array.isArray(storedFavs)
        ? storedFavs.filter((id) => PRODUCTS.some((product) => product.id === id))
        : [],
    );
    setStorageReady(true);
    setDateMin(getLocalDate());
  }, []);

  useEffect(() => {
    if (!storageReady) return;

    try {
      window.localStorage.setItem("optik-cart-v2", JSON.stringify(cart));
      window.localStorage.setItem("optik-favs-v2", JSON.stringify(favs));
    } catch (error) {
      console.error("Impossible d’enregistrer votre sélection.", error);
      setToast("Ce navigateur n'a pas pu enregistrer votre sélection.");
    }
  }, [cart, favs, storageReady]);

  useEffect(() => {
    if (!toast) return undefined;
    const timeout = window.setTimeout(() => setToast(""), 2600);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  useEffect(() => {
    if (!dialog) return undefined;

    const previousFocus = document.activeElement;
    document.body.classList.add("lock");

    const focusFrame = window.requestAnimationFrame(() => {
      const focusTarget = dialogRef.current?.querySelector("[data-close],button");
      (focusTarget || dialogRef.current)?.focus();
    });

    function keepFocusInside(event) {
      if (event.key === "Escape") {
        setDialog(null);
        return;
      }
      if (event.key !== "Tab" || !dialogRef.current) return;

      const focusable = [
        ...dialogRef.current.querySelectorAll(
          'button:not(:disabled),input,select,a[href]',
        ),
      ];
      if (!focusable.length) return;

      if (event.shiftKey && document.activeElement === focusable[0]) {
        event.preventDefault();
        focusable.at(-1).focus();
      } else if (
        !event.shiftKey &&
        document.activeElement === focusable.at(-1)
      ) {
        event.preventDefault();
        focusable[0].focus();
      }
    }

    document.addEventListener("keydown", keepFocusInside);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.removeEventListener("keydown", keepFocusInside);
      document.body.classList.remove("lock");
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, [dialog]);

  function showToast(message) {
    setToast(message);
  }

  function openProduct(product) {
    setSelectedId(product.id);
    setSelectedColor(product.colors[0].id);
    setView("f");
    setDialog("product");
  }

  function addToCart(product, colorId = product.colors[0].id) {
    const color = colorOf(product, colorId);
    setCart((current) => {
      const existing = current.find(
        (item) => item.id === product.id && item.c === color.id,
      );
      return existing
        ? current.map((item) =>
            item.id === product.id && item.c === color.id
              ? { ...item, q: item.q + 1 }
              : item,
          )
        : [...current, { id: product.id, c: color.id, q: 1 }];
    });
    showToast(`${product.name}, ${color.n} : ajoutée au panier.`);
  }

  function toggleFavorite(id) {
    setFavs((current) =>
      current.includes(id)
        ? current.filter((favorite) => favorite !== id)
        : [...current, id],
    );
  }

  function changeQuantity(id, colorId, amount) {
    setCart((current) =>
      current
        .map((item) =>
          item.id === id && item.c === colorId
            ? { ...item, q: item.q + amount }
            : item,
        )
        .filter((item) => item.q > 0),
    );
  }

  function removeFromCart(id, colorId) {
    setCart((current) =>
      current.filter((item) => !(item.id === id && item.c === colorId)),
    );
  }

  function resetFilters() {
    setCategory("all");
    setFavoritesOnly(false);
    setShapeFilter("all");
    setMaterialFilter("all");
    setSort("featured");
    setQuery("");
  }

  function handleAppointment(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const fields = [...form.querySelectorAll("input,select")];
    fields.forEach((field) => field.removeAttribute("aria-invalid"));

    const invalidField = fields.find((field) => !field.checkValidity());
    const dateField = form.elements.date;
    const day = dateField.value
      ? new Date(`${dateField.value}T12:00`).getDay()
      : -1;
    const closedDay = day === 0 || day === 1;

    if (invalidField || closedDay) {
      const field = invalidField || dateField;
      field.setAttribute("aria-invalid", "true");
      field.focus();
      const label = form.querySelector(`label[for="${field.id}"]`)?.textContent;
      setFormError(
        closedDay && !invalidField
          ? "L'atelier est fermé le dimanche et le lundi. Choisissez un jour entre mardi et samedi."
          : `Complétez le champ « ${label || ""} » pour continuer.`,
      );
      setFormSuccess("");
      return;
    }

    const values = new FormData(form);
    const name = values.get("name");
    const appointmentDate = new Date(`${dateField.value}T12:00`).toLocaleDateString(
      "fr-FR",
      { weekday: "long", day: "numeric", month: "long" },
    );
    setFormError("");
    setFormSuccess(
      `Merci ${name}. Votre demande pour le ${appointmentDate} à ${values.get("time")} est notée ici, mais n'a été envoyée à personne : ce site est une démonstration.`,
    );
    form.reset();
  }

  return (
    <>
      <a className="skip" href="#contenu">
        Aller au contenu
      </a>
      <header className="bar">
        <Logo />
        <button
          className="menu"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="nav"
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Fermer" : "Menu"}
        </button>
        <nav
          id="nav"
          className={menuOpen ? "open" : ""}
          aria-label="Navigation principale"
        >
          <a href="#montures" onClick={() => setMenuOpen(false)}>
            Les montures
          </a>
          <a href="#atelier" onClick={() => setMenuOpen(false)}>
            L'atelier
          </a>
          <a href="#rendez-vous" onClick={() => setMenuOpen(false)}>
            Rendez-vous
          </a>
        </nav>
        <div className="tools">
          <button
            type="button"
            id="favs-btn"
            aria-pressed={favoritesOnly}
            onClick={() => {
              setFavoritesOnly((only) => !only);
              setCategory("all");
              window.location.hash = "montures";
            }}
          >
            Gardées <b className="fav-n">{favs.length}</b>
          </button>
          <button
            type="button"
            id="cart-btn"
            onClick={() => setDialog("cart")}
          >
            Panier <b className="cart-n">{cartCount}</b>
          </button>
        </div>
      </header>

      <main id="contenu">
        <section className="hero" id="accueil" aria-labelledby="h1">
          <div className="hero-copy">
            <h1 id="h1">Six montures, choisies une par une.</h1>
            <p>
              OPTIK est un atelier de lunettes de vue et de soleil à Paris, sur
              rendez-vous. Peu de modèles, tous essayables, tous ajustés à votre
              visage avant que vous repartiez.
            </p>
            <div className="cta">
              <a className="btn sun" href="#montures">
                Voir les six montures
              </a>
              <a className="btn ghost" href="#rendez-vous">
                Prendre rendez-vous
              </a>
            </div>
          </div>
          <button
            className="hero-art"
            type="button"
            aria-label="Voir la fiche de Rumeur 04"
            onClick={() =>
              openProduct(PRODUCTS.find((product) => product.id === "rumeur-04"))
            }
          >
            {["rumeur-04", "angle-02", "nacre-01"].map((id, index) => {
              const product = PRODUCTS.find((entry) => entry.id === id);
              return (
                <Image
                  key={id}
                  className={`hero-photo hero-photo-${index + 1}`}
                  src={product.img}
                  alt=""
                  width={1200}
                  height={800}
                  loading={index === 0 ? "eager" : "lazy"}
                  sizes="(max-width: 860px) 100vw, 55vw"
                />
              );
            })}
          </button>
          <div className="hero-doors">
            <a
              href="#montures"
              onClick={() => {
                setCategory("vue");
                setFavoritesOnly(false);
              }}
            >
              <span>Lunettes de vue</span>
              <small>
                {PRODUCTS.filter((product) => product.cat === "vue").length}{" "}
                modèles
              </small>
            </a>
            <a
              href="#montures"
              onClick={() => {
                setCategory("soleil");
                setFavoritesOnly(false);
              }}
            >
              <span>Lunettes de soleil</span>
              <small>
                {PRODUCTS.filter((product) => product.cat === "soleil").length}{" "}
                modèles
              </small>
            </a>
          </div>
        </section>

        <section className="shop" id="montures" aria-labelledby="h-shop">
          <div className="shop-head">
            <h2 id="h-shop">Les montures</h2>
            <p>Prix TTC. Collection fictive : rien ici ne s'achète vraiment.</p>
          </div>
          <div className="filters">
            <div className="seg" role="group" aria-label="Type de lunettes">
              {[
                ["all", "Toutes"],
                ["vue", "Vue"],
                ["soleil", "Soleil"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={category === value}
                  onClick={() => {
                    setCategory(value);
                    setFavoritesOnly(false);
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <label>
              <span className="sr">Forme</span>
              <select
                id="f-shape"
                value={shapeFilter}
                onChange={(event) => setShapeFilter(event.target.value)}
              >
                <option value="all">Toutes les formes</option>
                <option value="pantos">Pantos</option>
                <option value="rectangulaire">Rectangulaire</option>
                <option value="papillon">Papillon</option>
                <option value="aviateur">Aviateur</option>
                <option value="ronde">Ronde</option>
              </select>
            </label>
            <label>
              <span className="sr">Matière</span>
              <select
                id="f-mat"
                value={materialFilter}
                onChange={(event) => setMaterialFilter(event.target.value)}
              >
                <option value="all">Toutes les matières</option>
                <option value="acétate">Acétate</option>
                <option value="métal">Métal</option>
                <option value="mixte">Mixte</option>
              </select>
            </label>
            <label>
              <span className="sr">Trier</span>
              <select
                id="f-sort"
                value={sort}
                onChange={(event) => setSort(event.target.value)}
              >
                <option value="featured">Notre ordre</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="name">Nom A–Z</option>
              </select>
            </label>
            <label className="search">
              <span className="sr">Rechercher une monture</span>
              <input
                id="f-q"
                type="search"
                placeholder="Rechercher : ronde, olive…"
                autoComplete="off"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
              />
            </label>
          </div>
          <p className="count" aria-live="polite">
            {visibleProducts.length} monture
            {visibleProducts.length > 1 ? "s" : ""}
            {favoritesOnly
              ? ` gardée${visibleProducts.length > 1 ? "s" : ""}`
              : ""}
          </p>
          {visibleProducts.length > 0 ? (
            <div className="grid">
              {visibleProducts.map((product) => {
                const isFavorite = favs.includes(product.id);
                return (
                  <article className="tile" key={product.id}>
                    <button
                      className="t-art"
                      type="button"
                      style={{ "--f": FIELD[product.field] }}
                      aria-label={`Voir la fiche de ${product.name}`}
                      onClick={() => openProduct(product)}
                    >
                      <Frame product={product} color={product.colors[0]} />
                    </button>
                    <div className="t-info">
                      <h3>{product.name}</h3>
                      <span className="pr">{euro.format(product.price)}</span>
                      <p>
                        {product.shape[0].toUpperCase() + product.shape.slice(1)},{" "}
                        {product.mat}, {product.colors.length} coloris
                      </p>
                      <div className="t-act">
                        <button
                          type="button"
                          aria-label={`Ajouter ${product.name} au panier`}
                          onClick={() => addToCart(product)}
                        >
                          Ajouter
                        </button>
                        <button
                          type="button"
                          aria-pressed={isFavorite}
                          aria-label={`${isFavorite ? "Retirer des gardées" : "Garder"} : ${product.name}`}
                          onClick={() => toggleFavorite(product.id)}
                        >
                          {isFavorite ? "Gardée" : "Garder"}
                        </button>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="empty">
              <p>
                {favoritesOnly && favs.length === 0
                  ? "Vous n'avez rien gardé pour l'instant. Utilisez « Garder » sous une monture."
                  : "Aucune monture ne correspond à ces filtres."}
              </p>
              <button
                className="btn blue"
                type="button"
                onClick={resetFilters}
              >
                Réinitialiser les filtres
              </button>
            </div>
          )}
        </section>

        <section className="atelier" id="atelier" aria-labelledby="h-at">
          <h2 id="h-at">À l'atelier, on règle ce qui compte.</h2>
          <div className="services">
            <div>
              <h3>Essayage</h3>
              <p>
                Les six modèles, dans tous leurs coloris, regardés à la lumière
                du jour. On vous dit franchement quand une forme ne vous va pas.
              </p>
            </div>
            <div>
              <h3>Ajustement</h3>
              <p>
                Plaquettes remises d'aplomb, branches serrées derrière l'oreille,
                vis resserrées. Pour toute monture, achetée chez nous ou non.
              </p>
            </div>
            <div>
              <h3>Entretien</h3>
              <p>
                Nettoyage, remplacement de plaquettes et petites réparations
                pour garder une paire longtemps.
              </p>
            </div>
          </div>
          <p className="note">
            Services de démonstration : disponibilités et tarifs fictifs.
          </p>
        </section>

        <section className="rdv" id="rendez-vous" aria-labelledby="h-rdv">
          <div>
            <h2 id="h-rdv">Venez les essayer.</h2>
            <p>
              Choisissez un créneau, on prépare les modèles qui vous intéressent.
              L'atelier est ouvert du mardi au samedi, de 10 h 30 à 19 h.
            </p>
            <address>
              18, rue des Trois Bornes
              <br />
              75011 Paris
              <br />
              <a href="mailto:bonjour@optik-atelier.fr">
                bonjour@optik-atelier.fr
              </a>
            </address>
            <p className="note">Adresse et horaires fictifs.</p>
          </div>
          <form noValidate onSubmit={handleAppointment}>
            <label htmlFor="b-name">Nom</label>
            <input
              id="b-name"
              name="name"
              autoComplete="name"
              required
              minLength={2}
            />
            <label htmlFor="b-mail">E-mail</label>
            <input
              id="b-mail"
              name="email"
              type="email"
              autoComplete="email"
              required
            />
            <label htmlFor="b-svc">Je viens pour</label>
            <select id="b-svc" name="service" required defaultValue="">
              <option value="">Choisir</option>
              <option>Essayer des montures</option>
              <option>Faire ajuster mes lunettes</option>
              <option>Un entretien ou une réparation</option>
            </select>
            <div className="two">
              <div>
                <label htmlFor="b-date">Jour</label>
                <input
                  id="b-date"
                  name="date"
                  type="date"
                  min={dateMin || undefined}
                  required
                />
              </div>
              <div>
                <label htmlFor="b-time">Heure</label>
                <select id="b-time" name="time" required defaultValue="">
                  <option value="">Choisir</option>
                  <option>10:30</option>
                  <option>11:30</option>
                  <option>14:00</option>
                  <option>15:00</option>
                  <option>16:30</option>
                  <option>17:30</option>
                </select>
              </div>
            </div>
            {formError ? (
              <p className="err" role="alert">
                {formError}
              </p>
            ) : null}
            <button className="btn sun" type="submit">
              Demander ce créneau
            </button>
            <p className="note">
              Démonstration : la demande n'est envoyée à personne.
            </p>
            {formSuccess ? (
              <p className="ok" role="status">
                {formSuccess}
              </p>
            ) : null}
          </form>
        </section>
      </main>

      <footer>
        <Logo footer />
        <nav aria-label="Pied de page">
          <a href="#montures">Les montures</a>
          <a href="#atelier">L'atelier</a>
          <a href="#rendez-vous">Rendez-vous</a>
          <a href="mailto:bonjour@optik-atelier.fr">Écrire</a>
        </nav>
        <p>Marque, produits et boutique fictifs. Projet de portfolio de Lymo.</p>
      </footer>

      {dialog ? (
        <>
          <div
            className="veil"
            aria-hidden="true"
            onClick={() => setDialog(null)}
          />
          {dialog === "cart" ? (
            <aside
              className="cart"
              role="dialog"
              aria-modal="true"
              aria-labelledby="cart-h"
              ref={dialogRef}
              tabIndex={-1}
            >
              <div className="panel-top">
                <h2 id="cart-h">Panier</h2>
                <button
                  type="button"
                  className="x"
                  data-close
                  onClick={() => setDialog(null)}
                >
                  Fermer
                </button>
              </div>
              <div id="cart-lines">
                {cart.length ? (
                  cart.map((item) => {
                    const product = PRODUCTS.find(
                      (entry) => entry.id === item.id,
                    );
                    if (!product) return null;
                    const color = colorOf(product, item.c);
                    return (
                      <article
                        className="line"
                        key={`${item.id}|${item.c}`}
                      >
                        <div
                          className="l-img"
                          style={{ "--f": FIELD[product.field] }}
                        >
                          <Frame product={product} color={color} />
                        </div>
                        <h3>{product.name}</h3>
                        <strong>{euro.format(product.price * item.q)}</strong>
                        <p>
                          {color.n}, {euro.format(product.price)} l'unité
                        </p>
                        <div className="q">
                          <button
                            type="button"
                            aria-label={`Retirer une unité de ${product.name}`}
                            onClick={() =>
                              changeQuantity(product.id, color.id, -1)
                            }
                          >
                            −
                          </button>
                          <span aria-label="Quantité">{item.q}</span>
                          <button
                            type="button"
                            aria-label={`Ajouter une unité de ${product.name}`}
                            onClick={() =>
                              changeQuantity(product.id, color.id, 1)
                            }
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="x"
                          type="button"
                          onClick={() => removeFromCart(product.id, color.id)}
                        >
                          Supprimer
                        </button>
                      </article>
                    );
                  })
                ) : (
                  <p className="cart-empty">
                    Le panier est vide. Les six montures sont{" "}
                    <a href="#montures" onClick={() => setDialog(null)}>
                      juste là
                    </a>
                    .
                  </p>
                )}
              </div>
              <div className="cart-foot">
                <p className="total">
                  <span>Total TTC</span>
                  <strong>{euro.format(cartTotal)}</strong>
                </p>
                <p className="note">
                  Démonstration : aucune commande ni aucun paiement n'est
                  possible.
                </p>
                <button
                  className="btn blue"
                  type="button"
                  disabled={!cart.length}
                  onClick={() =>
                    showToast(
                      "Démonstration : aucun paiement n'est configuré sur ce site.",
                    )
                  }
                >
                  Finaliser (démo)
                </button>
              </div>
            </aside>
          ) : selectedProduct && selectedProductColor ? (
            <section
              className="sheet"
              role="dialog"
              aria-modal="true"
              aria-labelledby="s-name"
              ref={dialogRef}
              tabIndex={-1}
            >
              <button
                type="button"
                className="x"
                data-close
                onClick={() => setDialog(null)}
              >
                Fermer
              </button>
              <div
                className="s-art"
                style={{ "--f": FIELD[selectedProduct.field] }}
              >
                <div className="s-img">
                  <Frame
                    product={selectedProduct}
                    color={selectedProductColor}
                    view={view}
                  />
                </div>
                <div className="seg" role="group" aria-label="Vue de la monture">
                  <button
                    type="button"
                    aria-pressed={view === "f"}
                    onClick={() => setView("f")}
                  >
                    Face
                  </button>
                  <button
                    type="button"
                    aria-pressed={view === "d"}
                    onClick={() => setView("d")}
                  >
                    Détail du pont
                  </button>
                </div>
              </div>
              <div className="s-info">
                <h2 id="s-name">{selectedProduct.name}</h2>
                <p className="s-price">
                  {euro.format(selectedProduct.price)}
                </p>
                <p>{selectedProduct.desc}</p>
                <dl>
                  <dt>Type</dt>
                  <dd>
                    {selectedProduct.cat === "vue"
                      ? "Lunettes de vue"
                      : "Lunettes de soleil"}
                  </dd>
                  <dt>Forme</dt>
                  <dd>{selectedProduct.shape}</dd>
                  <dt>Matière</dt>
                  <dd>{selectedProduct.mat}</dd>
                  <dt>Calibre, pont, branche</dt>
                  <dd>{selectedProduct.dims} mm</dd>
                </dl>
                <fieldset>
                  <legend>
                    Coloris : <span>{selectedProductColor.n}</span>
                  </legend>
                  <div id="s-swatches" role="radiogroup" aria-label="Coloris">
                    {selectedProduct.colors.map((color) => (
                      <button
                        className="sw"
                        key={color.id}
                        type="button"
                        role="radio"
                        aria-checked={color.id === selectedProductColor.id}
                        style={{
                          "--a": color.a,
                          "--b": color.b || color.a,
                        }}
                        onClick={() => setSelectedColor(color.id)}
                      >
                        <i aria-hidden="true" />
                        {color.n}
                      </button>
                    ))}
                  </div>
                </fieldset>
                <div className="cta">
                  <button
                    className="btn blue"
                    type="button"
                    onClick={() => {
                      addToCart(selectedProduct, selectedProductColor.id);
                      setDialog(null);
                    }}
                  >
                    Ajouter au panier
                  </button>
                  <button
                    className="btn ghost-d"
                    type="button"
                    aria-pressed={favs.includes(selectedProduct.id)}
                    onClick={() => toggleFavorite(selectedProduct.id)}
                  >
                    {favs.includes(selectedProduct.id) ? "Gardée" : "Garder"}
                  </button>
                </div>
              </div>
            </section>
          ) : null}
        </>
      ) : null}
      <div className={`toast${toast ? " on" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </>
  );
}
