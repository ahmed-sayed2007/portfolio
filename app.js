/* Ahmed Sayed Ebrahim | futuristic portfolio. Plain JavaScript, no dependencies.
   Structure: helpers > content render > intro > motion systems (scroll, reveal, cursor, magnetic, tilt)
   > canvases (hero 3D wireframe, ambient particles) > contact form > boot. */
(function () {
  "use strict";
  var S = window.SITE || {};
  var html = document.documentElement;
  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = matchMedia("(hover:hover) and (pointer:fine)").matches;
  var animOn = html.classList.contains("anim");
  var clamp = function (v, a, b) { return Math.min(b, Math.max(a, v)); };
  var lerp = function (a, b, t) { return a + (b - a) * t; };
  var ease = {
    outExpo: function (t) { return t === 1 ? 1 : 1 - Math.pow(2, -10 * t); },
    outCubic: function (t) { return 1 - Math.pow(1 - t, 3); },
    inCubic: function (t) { return t * t * t; },
    linear: function (t) { return t; }
  };
  function tween(dur, fn, easing) {
    easing = easing || ease.outCubic;
    return new Promise(function (res) {
      var t0 = performance.now();
      (function f(now) {
        var p = clamp((now - t0) / dur, 0, 1);
        fn(easing(p), p);
        if (p < 1) requestAnimationFrame(f); else res();
      })(t0);
    });
  }
  var wait = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]; }); }
  function sessionMark() { try { sessionStorage.setItem("as-intro", "1"); } catch (e) {} }

  /* ================= icons ================= */
  var ICON = {
    html: '<path d="M12 12l-8 8 8 8M28 12l8 8-8 8M23 9l-6 22"/>',
    css: '<path d="M14 8c-4 0-4 3-4 5s0 4-3 7c3 3 3 5 3 7s0 5 4 5M26 8c4 0 4 3 4 5s0 4 3 7c-3 3-3 5-3 7s0 5-4 5"/>',
    js: '<rect x="6" y="6" width="28" height="28" rx="6"/><text x="20" y="27" text-anchor="middle" font-size="14" font-weight="800" fill="currentColor" stroke="none" font-family="Geist,sans-serif">JS</text>',
    ts: '<rect x="6" y="6" width="28" height="28" rx="6"/><text x="20" y="27" text-anchor="middle" font-size="14" font-weight="800" fill="currentColor" stroke="none" font-family="Geist,sans-serif">TS</text>',
    react: '<ellipse cx="20" cy="20" rx="15" ry="6"/><ellipse cx="20" cy="20" rx="15" ry="6" transform="rotate(60 20 20)"/><ellipse cx="20" cy="20" rx="15" ry="6" transform="rotate(120 20 20)"/><circle cx="20" cy="20" r="2.2" fill="currentColor"/>',
    next: '<circle cx="20" cy="20" r="14"/><path d="M15 27V13l10.5 14M26 13v8"/>',
    tailwind: '<path d="M6 17c2-6 6-8 10-6 3 1.5 4 4 8 4 3 0 5-2 6-5-2 6-6 8-10 6-3-1.5-4-4-8-4-3 0-5 2-6 5zM6 27c2-6 6-8 10-6 3 1.5 4 4 8 4 3 0 5-2 6-5-2 6-6 8-10 6-3-1.5-4-4-8-4-3 0-5 2-6 5z"/>',
    bootstrap: '<rect x="6" y="6" width="28" height="28" rx="8"/><path d="M15 12h6.5a4 4 0 010 8H15zM15 20h7.5a4.2 4.2 0 010 8.4H15z"/>',
    git: '<circle cx="12" cy="10" r="3"/><circle cx="12" cy="30" r="3"/><circle cx="28" cy="16" r="3"/><path d="M12 13v14M28 19c0 6-12 3-15 9"/>',
    github: '<g transform="translate(5 5) scale(1.875)" fill="currentColor" stroke="none"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0016 8c0-4.42-3.58-8-8-8z"/></g>',
    figma: '<path d="M15.5 6a4.5 4.5 0 000 9H20V6zM20 6h4.5a4.5 4.5 0 010 9H20zM15.5 15a4.5 4.5 0 000 9H20v-9zM24.5 15a4.5 4.5 0 110 9 4.5 4.5 0 010-9zM15.5 24a4.5 4.5 0 104.5 4.5V24z"/>',
    api: '<path d="M8 13h10a4 4 0 010 8H8M32 27H22a4 4 0 010-8h10M14 13V9M26 31v-4"/><circle cx="14" cy="8" r="1.500" fill="currentColor"/><circle cx="26" cy="32" r="1.500" fill="currentColor"/>',
    mail: '<rect x="5" y="9" width="30" height="22" rx="4"/><path d="M6 12l14 11 14-11"/>',
    linkedin: '<rect x="6" y="6" width="28" height="28" rx="6"/><path d="M13 17v10M13 12.500v.1M19 27V17M19 21c0-3 2-4.200 4-4.200s4 1.200 4 4.200v6"/>',
    instagram: '<rect x="6" y="6" width="28" height="28" rx="9"/><circle cx="20" cy="20" r="6.500"/><circle cx="28" cy="12" r="1.200" fill="currentColor"/>'
  };
  function svg(name, cls) { return '<svg viewBox="0 0 40 40" aria-hidden="true"' + (cls ? ' class="' + cls + '"' : "") + '>' + (ICON[name] || "") + '</svg>'; }
  var ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  /* ================= render content from SITE data ================= */
  function render() {
    $("#stats").innerHTML = (S.stats || []).map(function (s) {
      var v = s.from === "projects" ? S.projects.length : s.from === "tech" ? S.tech.length : s.value;
      return '<div class="rv" data-reveal><div class="stat glass" data-tilt><b data-count="' + v + '">' + v + '</b><span>' + esc(s.label) + '</span></div></div>';
    }).join("");
    $("#aboutCards").innerHTML = (S.about || []).map(function (c) {
      return '<div class="rv" data-reveal><article class="card glass" data-tilt><em>' + esc(c.k) + '</em><h3>' + esc(c.v) + '</h3><p>' + esc(c.s) + '</p></article></div>';
    }).join("");
    $("#techGrid").innerHTML = (S.tech || []).map(function (t) {
      return '<div class="rv" data-reveal><article class="tech glass" data-tilt><span class="ico">' + svg(t.icon) + '</span><h3>' + esc(t.name) + '</h3></article></div>';
    }).join("");
    $("#projects").innerHTML = (S.projects || []).map(function (p) {
      var media = p.image
        ? '<img class="proj-img" src="' + esc(p.image) + '" alt="' + esc(p.title) + ' preview" loading="lazy">'
        : '<div class="art" style="--h:' + (p.hue || 262) + '"><div class="art-grid"></div><div class="art-win"><div class="art-bar"><i></i><i></i><i></i></div><div class="art-rows"><i></i><i></i><i></i><div class="blk"></div><i></i></div></div><div class="art-mono">' + esc(p.mono || p.title.slice(0, 2)) + '</div><div class="art-sweep"></div></div>';
      var live = p.live
        ? '<a class="pl live" href="' + esc(p.live) + '" target="_blank" rel="noopener">Live demo ' + ARROW + '</a>'
        : '<span class="pl soon">Live demo coming soon</span>';
      var repo = p.repo ? '<a class="pl" href="' + esc(p.repo) + '" target="_blank" rel="noopener">GitHub ' + ARROW + '</a>' : "";
      return '<article class="proj glass" data-tilt data-tilt-max="2.5"><div class="proj-media" role="img" aria-label="' + esc(p.title) + ' preview">' + media + '</div>' +
        '<div class="proj-body"><p class="proj-cat">' + esc(p.category) + '</p><h3 class="proj-title">' + esc(p.title) + '</h3>' +
        '<p class="proj-desc">' + esc(p.description) + '</p><ul class="tags" aria-label="Technologies">' + p.tech.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join("") + '</ul>' +
        '<div class="proj-links">' + live + repo + '</div></div></article>';
    }).join("");
    var tl = $("#timeline");
    tl.innerHTML = (S.journey || []).map(function (j) {
      return '<li class="tl-item' + (j.now ? " now" : "") + '"><span class="tl-node" aria-hidden="true"></span><div class="tl-card glass"><span class="tl-when">' + esc(j.when) + '</span><h3>' + esc(j.title) + '</h3><p>' + esc(j.text) + '</p><span class="tl-tag">' + esc(j.tag) + '</span></div></li>';
    }).join("") + '<li class="tl-line" aria-hidden="true"><i></i></li>';
    var vis = {
      code: '<div class="v-code"><i></i><i></i><i></i><i></i></div>',
      responsive: '<div class="v-resp"><i></i><i></i><i></i></div>',
      orb: '<div class="v-orb"></div>',
      guides: '<div class="v-guides"><b></b></div>',
      gauge: '<div class="v-gauge"><i></i></div>'
    };
    $("#svcGrid").innerHTML = (S.services || []).map(function (s) {
      return '<div class="rv" data-reveal><article class="svc glass"><div class="vis" aria-hidden="true">' + (vis[s.vis] || "") + '</div><h3>' + esc(s.title) + '</h3><p>' + esc(s.text) + '</p></article></div>';
    }).join("");
    var L = S.links || {}, soc = [];
    soc.push('<li><a href="' + esc(L.github) + '" target="_blank" rel="noopener">' + svg("github") + 'GitHub</a></li>');
    if (L.linkedin) soc.push('<li><a href="' + esc(L.linkedin) + '" target="_blank" rel="noopener">' + svg("linkedin") + 'LinkedIn</a></li>');
    if (L.instagram) soc.push('<li><a href="' + esc(L.instagram) + '" target="_blank" rel="noopener">' + svg("instagram") + 'Instagram</a></li>');
    if (L.email) soc.push('<li><a href="mailto:' + esc(L.email) + '">' + svg("mail") + esc(L.email) + '</a></li>');
    $("#socials").innerHTML = soc.join("");
    $$(".menu-nav a").forEach(function (a, i) { a.style.setProperty("--i", i); });
    /* stagger delays for grouped reveals */
    $$("[data-stagger]").forEach(function (g) {
      var step = parseFloat(g.getAttribute("data-stagger")) || 0.08;
      $$(".rv", g).forEach(function (el, i) { el.style.setProperty("--d", (i * step).toFixed(2) + "s"); });
    });
    /* split headings into masked words */
    $$("[data-split]").forEach(function (h) {
      var words = h.textContent.trim().split(/\s+/);
      h.setAttribute("aria-label", words.join(" "));
      h.innerHTML = words.map(function (w, i) { return '<span class="w" aria-hidden="true"><span class="wi" style="--i:' + i + '">' + esc(w) + '</span></span>'; }).join(" ");
    });
    /* scroll-lit paragraph */
    var lead = $("[data-scrubwords]");
    if (lead) lead.innerHTML = lead.textContent.trim().split(/\s+/).map(function (w) { return '<span class="sw">' + esc(w) + '</span>'; }).join(" ");
    /* hero name letters */
    var hn = $("#heroName");
    if (hn) { var t = hn.textContent; hn.setAttribute("aria-label", t); hn.innerHTML = t.split("").map(function (c, i) { return c === " " ? " " : '<span class="hc" aria-hidden="true" style="--i:' + i + '">' + esc(c) + '</span>'; }).join(""); }
  }

  /* ================= intro ================= */
  function introSetup() {
    var intro = $("#intro");
    var site = $("#site");
    var cv = $("#introCanvas"), ctx = cv.getContext("2d");
    var W, H, dpr, cx, cy, R0;
    function size() {
      dpr = Math.min(window.devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight;
      cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cx = W / 2; cy = H * (H > 640 ? 0.33 : 0.3); R0 = Math.min(W, H) * (W < 600 ? 0.2 : 0.19);
    }
    size(); addEventListener("resize", size);
    var N = innerWidth < 600 ? 650 : 1100, pts = [], g = Math.PI * (3 - Math.sqrt(5));
    for (var i = 0; i < N; i++) {
      var y = 1 - (i / (N - 1)) * 2, r = Math.sqrt(1 - y * y), th = i * g;
      pts.push({ x: Math.cos(th) * r, y: y, z: Math.sin(th) * r, c: "hsl(" + Math.round(212 + (y + 1) * 38) + ",100%," + Math.round(66 + (1 - Math.abs(y)) * 10) + "%)", s: 0.8 + Math.random() * 1.1 });
    }
    var st = { dot: 0, rad: 0, glow: 0, explode: 0, spin: 0 }, alive = true, raf = 0, last = performance.now();
    function draw(now) {
      if (!alive) return;
      var dt = Math.min(50, now - last) / 1000; last = now; st.spin += dt * (0.5 + st.explode * 2);
      ctx.globalAlpha = 1; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, W, H);
      var R = R0 * st.rad * (1 + 0.012 * Math.sin(now / 420));
      if (st.glow > 0) {
        var gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, R0 * 2.3);
        gr.addColorStop(0, "rgba(100,130,255," + (0.3 * st.glow * (1 - st.explode)) + ")"); gr.addColorStop(0.45, "rgba(130,90,255," + (0.12 * st.glow * (1 - st.explode)) + ")"); gr.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = gr; ctx.fillRect(cx - R0 * 2.4, cy - R0 * 2.4, R0 * 4.8, R0 * 4.8);
      }
      if (st.dot > 0 && st.rad < 0.98) {
        var dr = 3 + 18 * st.dot, dg = ctx.createRadialGradient(cx, cy, 0, cx, cy, dr * (1 + st.rad * 3));
        dg.addColorStop(0, "rgba(255,255,255," + st.dot + ")"); dg.addColorStop(0.25, "rgba(150,180,255," + 0.8 * st.dot + ")"); dg.addColorStop(1, "rgba(80,100,255,0)");
        ctx.fillStyle = dg; ctx.beginPath(); ctx.arc(cx, cy, dr * (1 + st.rad * 3), 0, 6.2832); ctx.fill();
      }
      if (st.rad > 0.01) {
        var cs = Math.cos(st.spin), sn = Math.sin(st.spin), ct = 0.94, stt = 0.34, ex = st.explode, boost = 1 + ex * ex * 22;
        for (var k = 0; k < pts.length; k++) {
          var p = pts[k], x1 = p.x * cs - p.z * sn, z1 = p.x * sn + p.z * cs, y1 = p.y * ct - z1 * stt, z2 = p.y * stt + z1 * ct;
          var persp = 1 / (1 - z2 * 0.28), sx = cx + x1 * R * boost * persp, sy = cy + y1 * R * boost * persp;
          if (sx < -20 || sx > W + 20 || sy < -20 || sy > H + 20) continue;
          var a = (0.18 + 0.82 * (z2 + 1) / 2) * clamp(st.rad * 1.4, 0, 1) * (1 - clamp((ex - 0.55) / 0.45, 0, 1));
          if (a <= 0.01) continue;
          ctx.globalAlpha = a; ctx.fillStyle = p.c; var sz = p.s * persp * (1 + ex * 2.2); ctx.fillRect(sx - sz / 2, sy - sz / 2, sz, sz);
        }
        ctx.globalAlpha = 1;
      }
      raf = requestAnimationFrame(draw);
    }
    raf = requestAnimationFrame(draw);

    /* text builders */
    function letters(el, text, cls, color) {
      var n = 0;
      el.innerHTML = text.split(" ").map(function (w, wi) {
        return '<span class="wd" aria-hidden="true">' + w.split("").map(function (c) {
          var i = n++; return '<span class="' + cls + '" style="--i:' + i + (color ? ";color:" + color(i) : "") + '">' + esc(c) + '</span>';
        }).join("") + '</span>' + (wi < text.split(" ").length - 1 ? '<span class="sp"> </span>' : "");
      }).join("");
    }
    var welcome = $("#welcome"), nameEl = $("#introName"), role = $("#introRole"), load = $("#load"), bar = $("#loadBar"), pct = $("#loadPct"), enter = $("#enter");
    letters(welcome, "WELCOME TO MY DIGITAL WORLD", "ch");
    letters(nameEl, "AHMED SAYED EBRAHIM", "nc", function (i) { return "hsl(" + (216 + i * 4.2) + " 100% " + (90 - i * 1.3) + "%)"; });
    site.inert = true;

    var ended = false, skipped = false, entered = false;
    function finish() {
      if (ended) return; ended = true; alive = false; cancelAnimationFrame(raf);
      removeEventListener("resize", size); document.removeEventListener("keydown", onKey);
      html.classList.add("ready"); html.classList.remove("locked"); html.classList.add("intro-gone"); html.dataset.intro = "done";
      site.inert = false; $("#intro").style.display = "none";
      window.dispatchEvent(new Event("intro:done"));
    }
    function skip() {
      if (ended || entered) return; skipped = true; entered = true; sessionMark();
      intro.classList.add("fast"); setTimeout(function () { html.classList.add("ready"); }, 120); setTimeout(finish, 520);
    }
    async function doEnter() {
      if (entered || ended) return; entered = true; sessionMark();
      enter.classList.remove("show"); load.classList.add("done");
      var burst = tween(1500, function (e) { st.explode = e; }, ease.inCubic);
      await wait(380); intro.classList.add("leaving");
      await wait(700); html.classList.add("ready"); html.classList.remove("locked");
      await burst; await wait(300); finish();
    }
    function onKey(e) { if (e.key === "Escape") skip(); }
    document.addEventListener("keydown", onKey);
    $("#skipIntro").addEventListener("click", skip);
    enter.addEventListener("click", doEnter);

    var ready = Promise.race([
      Promise.all([document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve(), new Promise(function (r) { if (document.readyState === "complete") r(); else addEventListener("load", r, { once: true }); })]),
      wait(4500)
    ]);
    (async function seq() {
      var chk = function () { if (skipped || ended) throw 0; };
      try {
        await tween(400, function (e) { st.dot = e; }); chk();
        await wait(100); chk();
        tween(1300, function (e) { st.rad = e; st.glow = e; }, ease.outExpo);
        await wait(600); chk();
        welcome.classList.add("show"); await wait(1250); chk();
        welcome.classList.add("out"); await wait(350); chk();
        nameEl.classList.add("show"); await wait(600); chk();
        role.classList.add("show"); load.classList.add("show");
        function setP(v) { bar.style.transform = "scaleX(" + v + ")"; pct.textContent = Math.round(v * 100) + "%"; }
        await tween(1000, function (e) { setP(e * 0.9); }, ease.linear); chk();
        await ready; chk();
        await tween(250, function (e) { setP(0.9 + e * 0.1); }, ease.outCubic); chk();
        await wait(150); chk();
        load.classList.add("done");
        enter.classList.add("show"); await wait(300);
        if (!skipped && !ended) enter.focus({ preventScroll: true });
      } catch (e) { if (e !== 0) { console.error(e); finish(); } }
    })();
  }

  /* ================= scroll system ================= */
  var smooth = { on: false, target: 0, cur: 0, run: false, max: 0 };
  function setupSmoothScroll() {
    if (!fine || reduced) return;
    smooth.on = true; smooth.cur = smooth.target = scrollY;
    function upd() { smooth.max = Math.max(0, document.documentElement.scrollHeight - innerHeight); }
    upd(); addEventListener("resize", upd);
    function loop() {
      var d = smooth.target - smooth.cur;
      if (Math.abs(d) < 0.4) { smooth.cur = smooth.target; window.scrollTo(0, smooth.cur); smooth.run = false; return; }
      smooth.cur += d * 0.105; window.scrollTo(0, smooth.cur); requestAnimationFrame(loop);
    }
    function kick() { if (!smooth.run) { smooth.run = true; requestAnimationFrame(loop); } }
    smooth.kick = kick; smooth.upd = upd;
    addEventListener("wheel", function (e) {
      if (e.ctrlKey || html.classList.contains("locked") || html.classList.contains("menu-open") || e.defaultPrevented) return;
      if (e.target.closest && e.target.closest("textarea,input")) return;
      e.preventDefault(); upd();
      var dy = e.deltaMode === 1 ? e.deltaY * 34 : e.deltaMode === 2 ? e.deltaY * innerHeight : e.deltaY;
      if (!smooth.run) smooth.cur = scrollY;
      smooth.target = clamp(smooth.target + dy * 0.95, 0, smooth.max); kick();
    }, { passive: false });
    addEventListener("scroll", function () {
      if (Math.abs(scrollY - smooth.cur) > 2.5) { smooth.cur = smooth.target = scrollY; }
    }, { passive: true });
  }
  function scrollToY(y) {
    y = Math.max(0, y);
    if (smooth.on) { smooth.upd(); smooth.cur = scrollY; smooth.target = clamp(y, 0, smooth.max); smooth.kick(); }
    else window.scrollTo({ top: y, behavior: reduced ? "auto" : "smooth" });
  }
  function setupLinks() {
    var menu = $("#menu"), btn = $("#menuBtn");
    function setMenu(open) {
      menu.classList.toggle("open", open); html.classList.toggle("menu-open", open);
      btn.setAttribute("aria-expanded", open); $(".mb-label", btn).textContent = open ? "Close" : "Menu";
      if (open) { menu.inert = false; setTimeout(function () { var a = $(".menu-nav a", menu); if (a && menu.classList.contains("open")) a.focus({ preventScroll: true }); }, 450); }
      else { menu.inert = true; }
    }
    btn.addEventListener("click", function () { setMenu(!menu.classList.contains("open")); });
    document.addEventListener("keydown", function (e) {
      if (menu.classList.contains("open")) {
        if (e.key === "Escape") { setMenu(false); btn.focus(); }
        if (e.key === "Tab") { /* keep focus inside menu + toggle button */
          var f = $$("a", menu).concat([btn]); var i = f.indexOf(document.activeElement);
          if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
          else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
        }
      }
    });
    document.addEventListener("click", function (e) {
      var a = e.target.closest && e.target.closest("a[data-link]");
      if (!a) return;
      var h = a.getAttribute("href");
      if (!h || h.charAt(0) !== "#") return;
      var t = h === "#home" ? null : $(h);
      e.preventDefault();
      if (menu.classList.contains("open")) setMenu(false);
      var y = h === "#home" ? 0 : t.getBoundingClientRect().top + scrollY - (h === "#message" ? 140 : 0);
      setTimeout(function () { scrollToY(y); }, menu.classList.contains("open") ? 0 : 0);
      try { history.replaceState(null, "", h); } catch (err) {}
      if (h === "#message") setTimeout(function () { $("#fName").focus({ preventScroll: true }); }, 700);
    });
  }

  /* ================= reveals + scroll-linked effects ================= */
  function setupReveals() {
    var tlItems = $$(".tl-item"), tl = $("#timeline"), lead = $("[data-scrubwords]"), words = lead ? $$(".sw", lead) : [], litN = 0;
    if (!animOn) {
      tlItems.forEach(function (i) { i.classList.add("on"); }); tl.style.setProperty("--p", 1);
    } else {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting || e.boundingClientRect.top < 0) {
            var el = e.target; el.classList.add("in"); io.unobserve(el);
            $$("[data-count]", el).forEach(function (b) {
              var to = +b.getAttribute("data-count"); tween(1600, function (v) { b.textContent = Math.round(to * v); }, ease.outExpo);
            });
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
      $$("[data-reveal],[data-split],.proj,.tl-item").forEach(function (el) { io.observe(el); });
      $$("[data-count]").forEach(function (b) { b.textContent = "0"; });
    }
    var top = $("#top"), prog = $("#progress i"), ticking = false;
    function frame() {
      ticking = false;
      var y = scrollY, vh = innerHeight, max = Math.max(1, document.documentElement.scrollHeight - vh);
      prog.style.transform = "scaleX(" + clamp(y / max, 0, 1) + ")";
      top.classList.toggle("scrolled", y > 30);
      if (animOn && words.length) {
        var r = lead.getBoundingClientRect(), p = clamp((vh * 0.88 - r.top) / (vh * 0.38 + r.height), 0, 1), n = Math.round(p * words.length);
        if (n !== litN) { for (var i = Math.min(n, litN); i < Math.max(n, litN); i++) words[i].classList.toggle("lit", i < n); litN = n; }
      }
      if (animOn && tlItems.length) {
        var tr = tl.getBoundingClientRect(); tl.style.setProperty("--p", clamp((vh * 0.62 - tr.top) / tr.height, 0, 1).toFixed(4));
        tlItems.forEach(function (it) { var nr = $(".tl-node", it).getBoundingClientRect(); it.classList.toggle("on", nr.top < vh * 0.64); });
      }
    }
    function req() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
    addEventListener("scroll", req, { passive: true }); addEventListener("resize", req); frame();
    if (!animOn && words.length) words.forEach(function (w) { w.classList.add("lit"); });
    /* active section */
    var links = $$("[data-sec]"), tops = $$(".top-links a");
    var so = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; var id = e.target.id;
        links.forEach(function (a) { a.classList.toggle("on", a.getAttribute("data-sec") === id); });
        tops.forEach(function (a) { a.classList.toggle("on", a.getAttribute("href") === "#" + id); });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    $$("[data-section]").forEach(function (s) { so.observe(s); });
  }

  /* ================= pointer effects ================= */
  function setupPointerFx() {
    if (!fine || reduced) return;
    /* custom cursor */
    var dot = document.createElement("div"), ring = document.createElement("div");
    dot.className = "cursor-dot"; ring.className = "cursor-ring"; dot.setAttribute("aria-hidden", "true"); ring.setAttribute("aria-hidden", "true");
    document.body.appendChild(dot); document.body.appendChild(ring); html.classList.add("has-cursor");
    var mx = innerWidth / 2, my = innerHeight / 2, rx = mx, ry = my, seen = false;
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "mouse") return; mx = e.clientX; my = e.clientY;
      if (!seen) { seen = true; rx = mx; ry = my; html.classList.add("cursor-on"); }
      var h = e.target.closest && e.target.closest("a,button,[data-tilt],input,textarea,label,[data-cursor]");
      html.classList.toggle("cursor-hover", !!h);
    }, { passive: true });
    document.addEventListener("pointerdown", function () { html.classList.add("cursor-down"); });
    document.addEventListener("pointerup", function () { html.classList.remove("cursor-down"); });
    document.documentElement.addEventListener("mouseleave", function () { html.classList.remove("cursor-on"); seen = false; });
    (function cl() { rx = lerp(rx, mx, 0.16); ry = lerp(ry, my, 0.16); dot.style.transform = "translate(" + mx + "px," + my + "px)"; ring.style.transform = "translate(" + rx + "px," + ry + "px)"; requestAnimationFrame(cl); })();
    /* magnetic buttons */
    $$("[data-magnetic]").forEach(function (el) {
      var inner = el.firstElementChild;
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return; var r = el.getBoundingClientRect(), x = e.clientX - (r.left + r.width / 2), y = e.clientY - (r.top + r.height / 2);
        el.style.transform = "translate(" + (x * 0.26).toFixed(1) + "px," + (y * 0.36).toFixed(1) + "px)";
        if (inner) inner.style.transform = "translate(" + (x * 0.1).toFixed(1) + "px," + (y * 0.14).toFixed(1) + "px)";
      });
      el.addEventListener("pointerleave", function () { el.style.transform = ""; if (inner) inner.style.transform = ""; });
    });
    /* 3D tilt */
    $$("[data-tilt]").forEach(function (el) {
      var max = parseFloat(el.getAttribute("data-tilt-max")) || 9, busy = false, ev;
      el.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return; ev = e;
        if (busy) return; busy = true;
        requestAnimationFrame(function () {
          busy = false; var r = el.getBoundingClientRect(), px = clamp((ev.clientX - r.left) / r.width, 0, 1), py = clamp((ev.clientY - r.top) / r.height, 0, 1);
          el.classList.add("tilting");
          el.style.setProperty("--ry", ((px - 0.5) * 2 * max).toFixed(2) + "deg"); el.style.setProperty("--rx", (-(py - 0.5) * 2 * max).toFixed(2) + "deg");
          el.style.setProperty("--mx", (px * 100).toFixed(1) + "%"); el.style.setProperty("--my", (py * 100).toFixed(1) + "%");
          el.style.setProperty("--px", px.toFixed(3)); el.style.setProperty("--py", py.toFixed(3));
          var orb = $(".v-orb", el); if (orb) { var vr = orb.getBoundingClientRect(); orb.style.setProperty("--mx", clamp(ev.clientX - vr.left, 0, vr.width) + "px"); orb.style.setProperty("--my", clamp(ev.clientY - vr.top, 0, vr.height) + "px"); }
        });
      });
      el.addEventListener("pointerleave", function () {
        el.classList.remove("tilting"); el.style.setProperty("--rx", "0deg"); el.style.setProperty("--ry", "0deg"); el.style.setProperty("--px", ".5"); el.style.setProperty("--py", ".5");
      });
    });
  }

  /* ================= hero: cube, glow parallax, 3D wireframe ================= */
  function setupHero() {
    var g1 = $(".g1"), g2 = $(".g2"), hero = $("#home");
    var cube = $("#cube"), cubeWrap = $(".cube-wrap"), cubeVisible = true, base = 0, px = 0.5, py = 0.5, tx = 0.5, ty = 0.5;
    if (!reduced) {
      document.addEventListener("pointermove", function (e) {
        if (e.pointerType !== "mouse") return; tx = e.clientX / innerWidth; ty = e.clientY / innerHeight;
      }, { passive: true });
      if (window.IntersectionObserver) new IntersectionObserver(function (es) { cubeVisible = es[0].isIntersecting; }).observe(cubeWrap);
      (function par() {
        px = lerp(px, tx, 0.06); py = lerp(py, ty, 0.06);
        g1.style.transform = "translate(" + ((px - 0.5) * -60).toFixed(1) + "px," + ((py - 0.5) * -40).toFixed(1) + "px)";
        g2.style.transform = "translate(" + ((px - 0.5) * 50).toFixed(1) + "px," + ((py - 0.5) * 36).toFixed(1) + "px)";
        if (cubeVisible) { base += 0.25; cube.style.setProperty("--cy", (base + (px - 0.5) * 70).toFixed(1) + "deg"); cube.style.setProperty("--cx", (-22 + (py - 0.5) * -50).toFixed(1) + "deg"); }
        requestAnimationFrame(par);
      })();
    }
    /* wireframe 3D scene drawn with a tiny projection engine */
    var cv = $("#heroCanvas"), ctx = cv.getContext("2d"), W = 0, H = 0, dpr = 1;
    function fit() { dpr = Math.min(window.devicePixelRatio || 1, 1.5); var r = cv.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height); cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    fit(); addEventListener("resize", fit);
    var norm = function (v) { var l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; };
    var phi = (1 + Math.sqrt(5)) / 2;
    var ico = [[-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0], [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi], [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]].map(norm);
    function edgesOf(V) {
      var m = 9; for (var i = 0; i < V.length; i++) for (var j = i + 1; j < V.length; j++) m = Math.min(m, Math.hypot(V[i][0] - V[j][0], V[i][1] - V[j][1], V[i][2] - V[j][2]));
      var E = []; for (var a = 0; a < V.length; a++) for (var b = a + 1; b < V.length; b++) if (Math.hypot(V[a][0] - V[b][0], V[a][1] - V[b][1], V[a][2] - V[b][2]) < m * 1.05) E.push([a, b]);
      return E;
    }
    var octa = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1]];
    var torusV = [], torusE = [], U = 30, Vn = 12, R = 1, rr = 0.34;
    for (var u = 0; u < U; u++) for (var v = 0; v < Vn; v++) {
      var a = u / U * 6.2832, b = v / Vn * 6.2832; torusV.push([(R + rr * Math.cos(b)) * Math.cos(a), rr * Math.sin(b), (R + rr * Math.cos(b)) * Math.sin(a)]);
    }
    for (var u2 = 0; u2 < U; u2++) for (var v2 = 0; v2 < Vn; v2++) {
      var i0 = u2 * Vn + v2; torusE.push([i0, u2 * Vn + (v2 + 1) % Vn]); if (v2 % 3 === 0) torusE.push([i0, ((u2 + 1) % U) * Vn + v2]);
    }
    var shapes = [
      { V: ico, E: edgesOf(ico), s: 1.0, pos: [0, 0, 0], sp: [0.18, 0.3, 0.05], rot: [0.3, 0, 0], col: [120, 160, 255], dots: true },
      { V: torusV, E: torusE, s: 1.75, pos: [0, 0, 0], sp: [0.07, -0.12, 0.1], rot: [1.1, 0.3, 0.2], col: [160, 110, 255], dots: false },
      { V: octa, E: edgesOf(octa), s: 0.3, pos: [1.9, 0.6, 0.3], sp: [0.5, 0.4, 0.2], rot: [0, 0, 0], col: [110, 220, 255], dots: true, orbit: 0.26 },
      { V: octa, E: edgesOf(octa), s: 0.22, pos: [-1.6, -0.9, 0.6], sp: [-0.4, 0.6, 0.1], rot: [0, 0, 0], col: [200, 140, 255], dots: true, orbit: -0.2 }
    ];
    function rot(p, x, y, z) {
      var cx = Math.cos(x), sx = Math.sin(x), cy = Math.cos(y), sy = Math.sin(y), cz = Math.cos(z), sz = Math.sin(z);
      var y1 = p[1] * cx - p[2] * sx, z1 = p[1] * sx + p[2] * cx, x1 = p[0] * cy + z1 * sy, z2 = -p[0] * sy + z1 * cy, x2 = x1 * cz - y1 * sz, y2 = x1 * sz + y1 * cz;
      return [x2, y2, z2];
    }
    var visible = true, mxs = 0.5, mys = 0.5, tmx = 0.5, tmy = 0.5, t = 0, lastT = performance.now();
    if (window.IntersectionObserver) new IntersectionObserver(function (es) { visible = es[0].isIntersecting; if (visible) { lastT = performance.now(); loop(lastT); } }).observe(hero);
    document.addEventListener("pointermove", function (e) { if (e.pointerType === "mouse") { tmx = e.clientX / innerWidth; tmy = e.clientY / innerHeight; } }, { passive: true });
    var running = false;
    function render() {
      ctx.clearRect(0, 0, W, H); ctx.globalCompositeOperation = "lighter"; ctx.lineCap = "round";
      var S0 = Math.min(W, H) * 0.3, cx0 = W * 0.52, cy0 = H * 0.5, gy = (mxs - 0.5) * 0.9, gx = (mys - 0.5) * 0.6;
      shapes.forEach(function (sh) {
        var rx = sh.rot[0] + sh.sp[0] * t + gx, ry = sh.rot[1] + sh.sp[1] * t + gy, rz = sh.rot[2] + sh.sp[2] * t;
        var pos = sh.pos; if (sh.orbit) { var ang = t * sh.orbit; pos = [sh.pos[0] * Math.cos(ang) - sh.pos[2] * Math.sin(ang), sh.pos[1] + Math.sin(t * 0.6 + sh.pos[0]) * 0.15, sh.pos[0] * Math.sin(ang) + sh.pos[2] * Math.cos(ang)]; }
        var gp = rot(pos, gx * 0.6, gy * 0.6, 0);
        var P = sh.V.map(function (v) { var r = rot([v[0] * sh.s, v[1] * sh.s, v[2] * sh.s], rx, ry, rz); var p = rot([r[0] + gp[0], r[1] + gp[1], r[2] + gp[2]], 0, 0, 0); var z = p[2] + 4.4, f = 3.2 / z; return [cx0 + p[0] * f * S0, cy0 - p[1] * f * S0, p[2]]; });
        var c = sh.col;
        sh.E.forEach(function (e) {
          var A = P[e[0]], B = P[e[1]], d = (A[2] + B[2]) / 2, al = clamp(0.38 - d * 0.2, 0.08, 0.75);
          ctx.strokeStyle = "rgba(" + c[0] + "," + c[1] + "," + c[2] + "," + al + ")"; ctx.lineWidth = sh.s > 1.2 ? 0.8 : 1.2;
          ctx.beginPath(); ctx.moveTo(A[0], A[1]); ctx.lineTo(B[0], B[1]); ctx.stroke();
        });
        if (sh.dots) P.forEach(function (p) { var al = clamp(0.55 - p[2] * 0.25, 0.15, 0.95); ctx.fillStyle = "rgba(" + Math.min(255, c[0] + 60) + "," + Math.min(255, c[1] + 50) + ",255," + al + ")"; ctx.beginPath(); ctx.arc(p[0], p[1], 2.2, 0, 6.2832); ctx.fill(); });
      });
      ctx.globalCompositeOperation = "source-over";
    }
    function loop(now) {
      if (reduced) { render(); return; }
      if (!visible || document.hidden) { running = false; return; }
      running = true; var dt = Math.min(0.05, (now - lastT) / 1000); lastT = now; t += dt;
      mxs = lerp(mxs, tmx, 0.05); mys = lerp(mys, tmy, 0.05); render(); requestAnimationFrame(loop);
    }
    document.addEventListener("visibilitychange", function () { if (!document.hidden && visible && !running) { lastT = performance.now(); requestAnimationFrame(loop); } });
    render(); if (!reduced) requestAnimationFrame(loop);
  }

  /* ================= ambient particle field ================= */
  function setupParticles() {
    var cv = $("#bgCanvas");
    if (reduced) { cv.style.display = "none"; return; }
    var ctx = cv.getContext("2d"), W, H, dpr, P = [], n = innerWidth < 700 ? 30 : 62, hidden = false;
    function fit() { dpr = Math.min(window.devicePixelRatio || 1, 1.5); W = innerWidth; H = innerHeight; cv.width = Math.round(W * dpr); cv.height = Math.round(H * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0); }
    fit(); addEventListener("resize", fit);
    for (var i = 0; i < n; i++) P.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.22, vy: (Math.random() - 0.5) * 0.22 - 0.05, r: 0.6 + Math.random() * 1.4 });
    document.addEventListener("visibilitychange", function () { hidden = document.hidden; if (!hidden) requestAnimationFrame(tick); });
    function tick() {
      if (hidden) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < n; i++) {
        var p = P[i]; p.x += p.vx; p.y += p.vy; if (p.x < -10) p.x = W + 10; if (p.x > W + 10) p.x = -10; if (p.y < -10) p.y = H + 10; if (p.y > H + 10) p.y = -10;
        ctx.fillStyle = "rgba(160,185,255,.6)"; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.2832); ctx.fill();
        for (var j = i + 1; j < n; j++) { var q = P[j], d = Math.hypot(p.x - q.x, p.y - q.y); if (d < 120) { ctx.strokeStyle = "rgba(120,150,255," + (0.16 * (1 - d / 120)) + ")"; ctx.lineWidth = 0.7; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); } }
      }
      requestAnimationFrame(tick);
    }
    tick();
  }

  /* ================= contact: aurora light + form ================= */
  function setupContact() {
    var sec = $("#contact"), au = $(".aurora");
    if (!reduced && fine) sec.addEventListener("pointermove", function (e) { var r = au.getBoundingClientRect(); au.style.setProperty("--mx", (e.clientX - r.left) + "px"); au.style.setProperty("--my", (e.clientY - r.top) + "px"); });
    var form = $("#form"), status = $("#formStatus"), btn = $("#submit");
    var rules = [
      ["#fName", "#eName", function (v) { return v.trim().length >= 2 ? "" : "Please enter your name."; }],
      ["#fEmail", "#eEmail", function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address."; }],
      ["#message", "#eMsg", function (v) { return v.trim().length >= 10 ? "" : "Please write at least 10 characters."; }]
    ];
    function check(r, focus) {
      var inp = $(r[0]), err = $(r[1]), msg = r[2](inp.value); err.textContent = msg; inp.closest(".field").classList.toggle("bad", !!msg);
      inp.setAttribute("aria-invalid", msg ? "true" : "false"); if (msg && focus) inp.focus(); return !msg;
    }
    rules.forEach(function (r) { $(r[0]).addEventListener("blur", function () { if ($(r[0]).value) check(r); }); $(r[0]).addEventListener("input", function () { if ($(r[0]).closest(".field").classList.contains("bad")) check(r); }); });
    form.addEventListener("submit", function (e) {
      e.preventDefault(); status.className = "form-status"; status.textContent = "";
      var ok = true, firstBad = true; rules.forEach(function (r) { var v = check(r, firstBad && ok); if (!v) { ok = false; firstBad = false; } });
      if (!ok) return;
      if ($("input[name=_gotcha]").value) return;
      var data = { name: $("#fName").value.trim(), email: $("#fEmail").value.trim(), message: $("#message").value.trim() };
      if (S.formEndpoint) {
        btn.disabled = true; $("span", btn).textContent = "SENDING..."; status.textContent = "Sending your message...";
        fetch(S.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" }, body: JSON.stringify(data) })
          .then(function (r) { if (!r.ok) throw new Error("bad status"); status.className = "form-status ok"; status.textContent = "Thank you! Your message was sent. I'll get back to you soon."; form.reset(); $$(".field", form).forEach(function (f) { f.classList.remove("bad"); }); })
          .catch(function () { status.className = "form-status err"; status.innerHTML = 'Something went wrong while sending. Please try again, or reach me on <a href="' + esc(S.links.github) + '" target="_blank" rel="noopener">GitHub</a>.'; })
          .then(function () { btn.disabled = false; $("span", btn).textContent = "SEND MESSAGE"; });
      } else if (S.links && S.links.email) {
        location.href = "mailto:" + S.links.email + "?subject=" + encodeURIComponent("Portfolio message from " + data.name) + "&body=" + encodeURIComponent(data.message + "\n\n" + data.name + " (" + data.email + ")");
        status.className = "form-status ok"; status.textContent = "Your email app should open with the message ready to send.";
      } else {
        status.className = "form-status err"; status.innerHTML = 'The message form is not connected yet. Please reach me on <a href="' + esc(S.links.github) + '" target="_blank" rel="noopener">GitHub</a> for now.';
      }
    });
  }

  /* ================= boot ================= */
  function boot() {
    render();
    setupLinks(); setupSmoothScroll(); setupReveals(); setupPointerFx(); setupHero(); setupParticles(); setupContact();
    $("#menu").inert = true;
    if (html.dataset.intro === "play") introSetup();
    else if (animOn) requestAnimationFrame(function () { requestAnimationFrame(function () { html.classList.add("ready"); }); });
    else html.classList.add("ready");
    window.__appOK = true;
  }
  try { boot(); } catch (err) {
    console.error(err);
    html.classList.remove("anim", "locked"); html.classList.add("ready", "intro-gone"); html.dataset.intro = "skip"; window.__appOK = true;
    var s = $("#site"); if (s) s.inert = false;
  }
})();
