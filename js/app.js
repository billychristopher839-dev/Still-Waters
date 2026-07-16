/* ============================================================
   STILL WATERS — app.js
   Tabs · 365 Miracles · 18 Holy Sites (+quiz) · Hymn player
============================================================ */
(function () {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  /* ==================== TAB NAVIGATION ==================== */
  function goTo(name) {
    $$(".panel").forEach((p) => p.classList.toggle("is-active", p.id === "panel-" + name));
    $$(".tab").forEach((t) => {
      const on = t.dataset.nav === name;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  document.addEventListener("click", (e) => {
    const nav = e.target.closest("[data-nav]");
    if (nav) { e.preventDefault(); goTo(nav.dataset.nav); }
  });
  document.addEventListener("keydown", (e) => {
    const nav = e.target.closest && e.target.closest(".home-card[data-nav]");
    if (nav && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); goTo(nav.dataset.nav); }
  });

  /* ==================== MIRACLES ==================== */
  const dayOfYear = Math.min(365, Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 864e5));
  const today = MIRACLES.find((m) => m.day === dayOfYear) || MIRACLES[0];

  $("#today-card").innerHTML = `
    <p class="eyebrow">Today’s miracle · Day ${today.day} of 365</p>
    <h3>${esc(today.title)}</h3>
    <p class="today-era">${esc(today.era)}</p>
    <h4>What happened</h4>
    <p>${esc(today.happened)}</p>
    <h4>How it touches the heart in Christ</h4>
    <p><em>${esc(today.reflection)}</em></p>`;

  // Era chips (grouped by leading era keyword)
  const eraGroups = ["All eras", "Biblical", "Early Church", "Middle Ages", "Modern"];
  const eraOf = (era) => {
    const e = era.toLowerCase();
    if (e.includes("biblical")) return "Biblical";
    if (e.includes("early church") || e.includes("patristic")) return "Early Church";
    if (e.includes("middle") || e.includes("medieval")) return "Middle Ages";
    return "Modern";
  };
  let activeEra = "All eras", query = "", shown = 30;
  const chipsBox = $("#era-chips");
  eraGroups.forEach((g, i) => {
    const b = document.createElement("button");
    b.className = "chip" + (i === 0 ? " is-active" : "");
    b.textContent = g;
    b.onclick = () => { activeEra = g; shown = 30; $$(".chip", chipsBox).forEach((c) => c.classList.toggle("is-active", c === b)); renderMiracles(); };
    chipsBox.appendChild(b);
  });

  const filtered = () => MIRACLES.filter((m) => {
    if (activeEra !== "All eras" && eraOf(m.era) !== activeEra) return false;
    if (!query) return true;
    const q = query.toLowerCase();
    return m.title.toLowerCase().includes(q) || m.happened.toLowerCase().includes(q) ||
           m.reflection.toLowerCase().includes(q) || m.era.toLowerCase().includes(q) ||
           String(m.day) === q.replace(/^day\s*/, "");
  });

  function renderMiracles() {
    const list = filtered();
    $("#miracle-count").textContent = list.length === 365
      ? "Showing all 365 days — open any day to read the full account."
      : `${list.length} miracle${list.length === 1 ? "" : "s"} found.`;
    $("#miracle-list").innerHTML = list.slice(0, shown).map((m) => `
      <details class="miracle-item">
        <summary>
          <span class="m-day">Day ${m.day}</span>
          <span class="m-title">${esc(m.title)}</span>
          <span class="m-era">${esc(eraOf(m.era))}</span>
        </summary>
        <div class="m-body">
          <h4>Historical era</h4><p>${esc(m.era)}</p>
          <h4>What happened</h4><p>${esc(m.happened)}</p>
          <h4>How it touches the heart in Christ</h4>
          <p class="m-reflect">${esc(m.reflection)}</p>
        </div>
      </details>`).join("");
    $("#miracle-more").style.display = shown < list.length ? "" : "none";
    $("#miracle-more").textContent = `Show more days (${Math.min(shown, list.length)} of ${list.length})`;
  }
  $("#miracle-search").addEventListener("input", (e) => { query = e.target.value.trim(); shown = 30; renderMiracles(); });
  $("#miracle-more").addEventListener("click", () => { shown += 40; renderMiracles(); });
  renderMiracles();

  /* ==================== HOLY SITES ==================== */
  const SITES = SITES_DATA.sites;
  $("#sites-intro").innerHTML =
    esc(SITES_DATA.holylandIntro).slice(0, 0) + // keep structure simple
    `If you’ve ever wanted to literally walk through the pages of the New Testament, this journey is for you. Twelve sites trace the life of Jesus across the Holy Land — from the Annunciation in Nazareth to the empty tomb in Jerusalem — and six more follow the faith to Rome, Vatican City, and Assisi. <strong>Tap any photograph to step inside.</strong>`;

  let region = "all";
  function renderSites() {
    const list = SITES.filter((s) => region === "all" || s.region === region);
    $("#site-grid").innerHTML = list.map((s) => `
      <button class="site-card" data-site="${s.num}" aria-label="Open ${esc(s.name)}">
        <img src="${s.image}" alt="${esc(s.name)}" loading="lazy">
        <span class="sc-label">
          <span class="sc-num">Site ${s.num} · ${esc(s.region)}</span><br>
          <span class="sc-name">${esc(s.name)}</span><br>
          <span class="sc-loc">${esc(s.location)}</span>
        </span>
      </button>`).join("");
  }
  $$("#region-chips .chip").forEach((c) => c.addEventListener("click", () => {
    region = c.dataset.region;
    $$("#region-chips .chip").forEach((x) => x.classList.toggle("is-active", x === c));
    renderSites();
  }));
  renderSites();

  // --- Site modal ---
  const siteModal = $("#site-modal");
  let currentSite = 0;
  function openSite(num) {
    const s = SITES.find((x) => x.num === num);
    if (!s) return;
    currentSite = num;
    $("#modal-img").src = s.image;
    $("#modal-img").alt = s.name;
    $("#modal-region").textContent = s.region;
    $("#modal-title").textContent = s.name;
    $("#modal-loc").textContent = s.location;
    $("#modal-text").innerHTML = s.body.split(/\n\n+/).map((p) => `<p>${esc(p)}</p>`).join("");
    $("#modal-count").textContent = `${num} of 18`;
    siteModal.hidden = false;
    document.body.style.overflow = "hidden";
  }
  function closeModals() {
    $$(".modal").forEach((m) => (m.hidden = true));
    document.body.style.overflow = "";
  }
  document.addEventListener("click", (e) => {
    const card = e.target.closest(".site-card");
    if (card) openSite(+card.dataset.site);
    if (e.target.closest("[data-close]")) closeModals();
  });
  $("#modal-prev").onclick = () => openSite(currentSite === 1 ? 18 : currentSite - 1);
  $("#modal-next").onclick = () => openSite(currentSite === 18 ? 1 : currentSite + 1);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModals();
    if (!siteModal.hidden) {
      if (e.key === "ArrowRight") $("#modal-next").click();
      if (e.key === "ArrowLeft") $("#modal-prev").click();
    }
  });

  /* ==================== PILGRIM QUIZ ==================== */
  const quizModal = $("#quiz-modal");
  let qOrder = [], qIndex = 0, qScore = 0;
  const shuffleArr = (a) => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

  function startQuiz() {
    qOrder = shuffleArr(SITES).slice(0, 6);
    qIndex = 0; qScore = 0;
    quizModal.hidden = false;
    document.body.style.overflow = "hidden";
    renderQuestion();
  }
  function renderQuestion() {
    if (qIndex >= qOrder.length) {
      const msg = qScore === 6 ? "A true pilgrim! You know these holy places by heart."
        : qScore >= 4 ? "Well walked! Your feet know most of this road."
        : "Every pilgrimage begins with a single step — explore the sites and try again.";
      $("#quiz-body").innerHTML = `
        <p class="eyebrow">Pilgrim quiz · complete</p>
        <div class="quiz-final">
          <div class="big">${qScore} / 6</div>
          <p style="margin:.6rem 0 1.2rem">${msg}</p>
          <button class="btn btn-gold" id="quiz-again">Walk again</button>
        </div>`;
      $("#quiz-again").onclick = startQuiz;
      return;
    }
    const site = qOrder[qIndex];
    const wrong = shuffleArr(SITES.filter((s) => s.num !== site.num)).slice(0, 3);
    const opts = shuffleArr([site, ...wrong]);
    $("#quiz-body").innerHTML = `
      <p class="eyebrow">Pilgrim quiz · question ${qIndex + 1} of 6</p>
      <h3>Which holy site is this?</h3>
      <div class="quiz-img"><img src="${site.image}" alt="A holy site — can you name it?"></div>
      <div class="quiz-opts">
        ${opts.map((o) => `<button class="quiz-opt" data-num="${o.num}">${esc(o.name)} <span style="opacity:.6;font-weight:400">· ${esc(o.location)}</span></button>`).join("")}
      </div>
      <div class="quiz-foot">
        <span class="quiz-score">Score: ${qScore}</span>
        <span style="font-size:.8rem;color:#8b989e">Choose an answer to continue</span>
      </div>`;
    $$(".quiz-opt").forEach((b) => b.addEventListener("click", () => {
      const right = +b.dataset.num === site.num;
      if (right) qScore++;
      $$(".quiz-opt").forEach((x) => {
        x.disabled = true;
        if (+x.dataset.num === site.num) x.classList.add("correct");
        else if (x === b) x.classList.add("wrong");
      });
      setTimeout(() => { qIndex++; renderQuestion(); }, 1100);
    }));
  }
  $("#quiz-open").addEventListener("click", startQuiz);

  /* ==================== MUSIC PLAYER ==================== */
  const audio = $("#audio");
  const player = $("#player");
  let current = -1;            // index into PLAYLIST
  let isPlaying = false;
  let shuffleOn = false;
  let repeatMode = "all";      // "all" (default: loop whole playlist) | "one" | "off"
  let shuffleQueue = [];
  let liked = new Set(JSON.parse(localStorage.getItem("sw-liked") || "[]"));

  const fmt = (t) => { if (!isFinite(t)) return "0:00"; const m = Math.floor(t / 60), s = Math.floor(t % 60); return `${m}:${s < 10 ? "0" : ""}${s}`; };

  function renderTracks() {
    $("#track-list").innerHTML = PLAYLIST.map((t, i) => `
      <li class="track-row ${i === current ? "is-current" : ""} ${i === current && isPlaying ? "is-playing" : ""}" data-i="${i}">
        <span class="t-num">${i + 1}</span>
        <button class="t-play" data-i="${i}" aria-label="Play ${esc(t.title)}">
          ${i === current && isPlaying
            ? '<svg viewBox="0 0 24 24"><path d="M7 5h3.4v14H7zM13.6 5H17v14h-3.4z"/></svg>'
            : '<svg viewBox="0 0 24 24"><path d="M8 5v14l12-7z"/></svg>'}
        </button>
        <span class="t-meta">
          <span class="t-title">${esc(t.title)}</span>
          <span class="t-artist">${esc(t.artist)}</span>
        </span>
        <span class="eq"><span></span><span></span><span></span></span>
        <button class="t-heart ${liked.has(t.src) ? "liked" : ""}" data-like="${i}" aria-label="Save ${esc(t.title)} to Liked Songs">
          <svg viewBox="0 0 24 24"><path d="M12 21s-7.5-4.9-10-9.3C.4 8.4 2.4 4.5 6.2 4.5c2.2 0 3.7 1.2 4.6 2.6.2.4.9.4 1.1 0 .9-1.4 2.5-2.6 4.7-2.6 3.8 0 5.8 3.9 4.2 7.2C19.5 16.1 12 21 12 21z"/></svg>
        </button>
      </li>`).join("");
  }

  function load(i, autoplay = true) {
    current = ((i % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
    const t = PLAYLIST[current];
    audio.src = t.src;
    $("#player-title").textContent = t.title;
    $("#player-artist").textContent = t.artist;
    updateHeartUI();
    if (autoplay) play();
    renderTracks();
  }
  function play() {
    if (current === -1) { load(0); return; }
    audio.play().then(() => { isPlaying = true; syncPlayUI(); }).catch(() => {});
  }
  function pause() { audio.pause(); isPlaying = false; syncPlayUI(); }
  function syncPlayUI() {
    $("#icon-play").style.display = isPlaying ? "none" : "";
    $("#icon-pause").style.display = isPlaying ? "" : "none";
    $("#btn-play").setAttribute("aria-label", isPlaying ? "Pause" : "Play");
    player.classList.toggle("is-playing", isPlaying);
    renderTracks();
  }

  function nextIndex() {
    if (shuffleOn) {
      if (!shuffleQueue.length) shuffleQueue = shuffleArr([...PLAYLIST.keys()].filter((i) => i !== current));
      return shuffleQueue.shift();
    }
    return current + 1;
  }
  function next(fromEnded = false) {
    if (fromEnded && repeatMode === "one") { audio.currentTime = 0; play(); return; }
    const atEnd = !shuffleOn && current === PLAYLIST.length - 1;
    if (fromEnded && atEnd && repeatMode === "off") { pause(); audio.currentTime = 0; return; }
    load(nextIndex());   // wraps around → after the last song, the same order starts again
  }
  function prev() {
    if (audio.currentTime > 3) { audio.currentTime = 0; return; } // restart current song
    load(current <= 0 ? PLAYLIST.length - 1 : current - 1);
  }

  // Controls
  $("#btn-play").onclick = () => (isPlaying ? pause() : play());
  $("#btn-next").onclick = () => next(false);
  $("#btn-prev").onclick = prev;
  $("#hero-play").onclick = () => { goTo("music"); if (!isPlaying) play(); };

  $("#btn-shuffle").onclick = function () {
    shuffleOn = !shuffleOn; shuffleQueue = [];
    this.classList.toggle("active", shuffleOn);
    this.title = shuffleOn ? "Shuffle: on" : "Shuffle: off";
  };
  $("#btn-repeat").onclick = function () {
    repeatMode = repeatMode === "all" ? "one" : repeatMode === "one" ? "off" : "all";
    this.classList.toggle("active", repeatMode !== "off");
    this.classList.toggle("one", repeatMode === "one");
    this.title = repeatMode === "all" ? "Repeat: playlist" : repeatMode === "one" ? "Repeat: this song" : "Repeat: off";
  };
  $("#btn-repeat").classList.add("active"); // default: repeat whole playlist

  // Heart / liked songs
  function updateHeartUI() {
    const h = $("#btn-heart");
    const likedNow = current >= 0 && liked.has(PLAYLIST[current].src);
    h.classList.toggle("liked", likedNow);
    h.title = likedNow ? "Remove from Liked Songs" : "Save to Liked Songs";
  }
  function toggleLike(i) {
    const key = PLAYLIST[i].src;
    liked.has(key) ? liked.delete(key) : liked.add(key);
    localStorage.setItem("sw-liked", JSON.stringify([...liked]));
    updateHeartUI(); renderTracks();
  }
  $("#btn-heart").onclick = () => { if (current >= 0) toggleLike(current); };

  $("#track-list").addEventListener("click", (e) => {
    const likeBtn = e.target.closest("[data-like]");
    if (likeBtn) { toggleLike(+likeBtn.dataset.like); return; }
    const row = e.target.closest("[data-i]");
    if (!row) return;
    const i = +row.dataset.i;
    if (i === current) { isPlaying ? pause() : play(); } else { load(i); }
  });

  // Liked songs modal
  $("#show-liked").onclick = () => {
    const items = PLAYLIST.map((t, i) => ({ t, i })).filter(({ t }) => liked.has(t.src));
    $("#liked-list").innerHTML = items.length
      ? `<ol class="track-list" style="margin-top:1rem">${items.map(({ t, i }) => `
          <li class="track-row" data-liked-i="${i}">
            <button class="t-play" aria-label="Play ${esc(t.title)}"><svg viewBox="0 0 24 24"><path d="M8 5v14l12-7z"/></svg></button>
            <span class="t-meta"><span class="t-title">${esc(t.title)}</span><span class="t-artist">${esc(t.artist)}</span></span>
          </li>`).join("")}</ol>`
      : `<p style="margin-top:1rem;color:#6b7a80">Nothing here yet — tap the ♡ on any hymn to keep it close.</p>`;
    $("#liked-modal").hidden = false;
    document.body.style.overflow = "hidden";
  };
  $("#liked-list").addEventListener("click", (e) => {
    const row = e.target.closest("[data-liked-i]");
    if (row) { closeModals(); goTo("music"); load(+row.dataset.likedI); }
  });

  // Progress / seek / time
  audio.addEventListener("timeupdate", () => {
    if (audio.duration) $("#progress-fill").style.width = (audio.currentTime / audio.duration) * 100 + "%";
    $("#time-cur").textContent = fmt(audio.currentTime);
  });
  audio.addEventListener("loadedmetadata", () => { $("#time-dur").textContent = fmt(audio.duration); });
  audio.addEventListener("ended", () => next(true));
  audio.addEventListener("play", () => { isPlaying = true; syncPlayUI(); });
  audio.addEventListener("pause", () => { if (!audio.ended) { isPlaying = false; syncPlayUI(); } });
  $("#progress-wrap").addEventListener("click", (e) => {
    if (!audio.duration) return;
    const r = e.currentTarget.getBoundingClientRect();
    audio.currentTime = ((e.clientX - r.left) / r.width) * audio.duration;
  });

  // Media Session (lock-screen controls)
  if ("mediaSession" in navigator) {
    navigator.mediaSession.setActionHandler("play", play);
    navigator.mediaSession.setActionHandler("pause", pause);
    navigator.mediaSession.setActionHandler("previoustrack", prev);
    navigator.mediaSession.setActionHandler("nexttrack", () => next(false));
    audio.addEventListener("loadedmetadata", () => {
      if (current >= 0) navigator.mediaSession.metadata = new MediaMetadata({
        title: PLAYLIST[current].title, artist: PLAYLIST[current].artist, album: "Still Waters · Instrumental Hymns",
      });
    });
  }

  renderTracks();
})();
