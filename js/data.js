/* ==========================================================
   Data loader
   1) api/content          → SQLite veritabanı (python server.py)
   2) data/content.json    → statik yedek (GitHub Pages vb.)
   ========================================================== */
(function () {
  const img = (id, w, h) =>
    "https://images.unsplash.com/photo-" + id + "?auto=format&fit=crop&w=" + w + (h ? "&h=" + h : "") + "&q=78";

  async function fetchJson(url) {
    const res = await fetch(url, { headers: { Accept: "application/json" } });
    if (!res.ok) throw new Error(url + " → " + res.status);
    return res.json();
  }

  window.loadSiteData = async function () {
    let data;
    let source = "api";
    try {
      data = await fetchJson("api/content");
    } catch (_) {
      source = "static";
      data = await fetchJson("data/content.json");
    }
    data.img = img;
    data.source = source;
    window.SITE_DATA = data;
    return data;
  };
})();
