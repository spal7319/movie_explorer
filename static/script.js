const form = document.getElementById("searchForm");
const input = document.getElementById("movieInput");
const btn = document.getElementById("searchBtn");
const statusEl = document.getElementById("status");
const resultsEl = document.getElementById("results");

// Fixed: Match the port from app.py (3000)
const API_BASE = "http://127.0.0.1:3000";

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) {
    setStatus("Please enter a movie title.");
    return;
  }
  await fetchRecommendations(title);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    form.dispatchEvent(new Event("submit"));
  }
});

async function fetchRecommendations(title) {
  clearResults();
  setStatus("Fetching recommendations...");
  setLoading(true);

  try {
    const url = `${API_BASE}/recommend?movie=${encodeURIComponent(title)}`;
    const res = await fetch(url);
    if (!res.ok) {
      if (res.status === 404) {
        setStatus("Movie not found in database. Try another title.");
      } else if (res.status === 400) {
        setStatus("Server says: missing movie parameter.");
      } else {
        setStatus(`Server error (${res.status}). Try again later.`);
      }
      setLoading(false);
      return;
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      setStatus("No recommendations found. Try another movie.");
      setLoading(false);
      return;
    }

    renderResults(data);
    setStatus(`Top ${data.length} recommendations for "${title}"`);
  } catch (err) {
    console.error(err);
    setStatus("Network error. Check if the Flask server is running.");
  } finally {
    setLoading(false);
  }
}

function renderResults(items) {
  const frag = document.createDocumentFragment();

  items.forEach((item) => {
    const card = document.createElement("article");
    card.className = "card";

    const posterWrap = document.createElement("div");
    posterWrap.className = "poster-wrap";

    const img = document.createElement("img");
    img.alt = `${item.title} poster`;
    img.loading = "lazy";
    img.decoding = "async";
    img.src = item.poster || "";
    img.onerror = () => {
      // Fallback: simple placeholder if the image fails to load
      img.remove();
      const ph = document.createElement("div");
      ph.className = "badge";
      ph.textContent = "No poster";
      posterWrap.appendChild(ph);
    };

    posterWrap.appendChild(img);

    const content = document.createElement("div");
    content.className = "content";

    const h3 = document.createElement("h3");
    h3.textContent = item.title || "Untitled";

    const meta = document.createElement("div");
    meta.className = "meta";

    // If you later enrich backend response (e.g., similarity score), show as badge
    // const score = document.createElement("span");
    // score.className = "badge";
    // score.textContent = `Score: ${(item.score ?? 0).toFixed(2)}`;

    content.appendChild(h3);
    // meta.appendChild(score);
    content.appendChild(meta);

    card.appendChild(posterWrap);
    card.appendChild(content);
    frag.appendChild(card);
  });

  resultsEl.appendChild(frag);
}

function clearResults() {
  resultsEl.innerHTML = "";
}

function setStatus(text) {
  statusEl.textContent = text;
}

function setLoading(isLoading) {
  btn.disabled = isLoading;
  input.readOnly = isLoading;
}
