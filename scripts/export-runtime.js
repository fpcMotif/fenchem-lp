(() => {
  const X = window.__EXPORT__;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

  document.documentElement.style.scrollBehavior = "smooth";

  const onScroll = (fn) => {
    let frame = 0;
    const run = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        fn();
      });
    };
    addEventListener("scroll", run, { passive: true });
    addEventListener("resize", run);
    fn();
  };

  function setupReveals() {
    const targets = $$("[data-ex-final-style],[data-ex-final-class]");
    targets.forEach((el) => {
      const finalStyle = el.getAttribute("data-ex-final-style");
      const finalClass = el.getAttribute("data-ex-final-class");
      const siblings = el.parentElement ? [...el.parentElement.children] : [];
      const delay = reduce ? 0 : Math.min(siblings.indexOf(el), 5) * 70;
      const io = new IntersectionObserver(
        (entries) => {
          if (!entries.some((e) => e.isIntersecting)) return;
          io.disconnect();
          if (finalClass !== null) el.className = finalClass;
          if (finalStyle === null) return;
          el.style.transition = reduce
            ? "opacity 200ms linear"
            : `opacity 800ms ${EASE} ${delay}ms, transform 800ms ${EASE} ${delay}ms`;
          el.style.cssText = finalStyle + ";transition:" + el.style.transition;
          setTimeout(() => el.style.removeProperty("transition"), 1200 + delay);
        },
        { rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(el);
    });
  }

  function setupHeroAndInk() {
    if (reduce) return;
    const hero = $("#top");
    const par = hero?.children[1];
    const content = hero?.children[2];
    const inkP = $("[data-ex='ink']");
    const phrases = inkP ? $$(":scope > span[style*='opacity']", inkP) : [];
    const total = phrases.reduce((n, p) => n + p.textContent.length, 0) || 1;
    let acc = 0;
    const ranges = phrases.map((p) => {
      const s = acc / total;
      acc += p.textContent.length;
      return [s, acc / total];
    });
    onScroll(() => {
      if (hero && par && content) {
        const b = hero.getBoundingClientRect();
        const t = clamp(-b.top / b.height, 0, 1);
        par.style.transform = t ? `translateY(${t * 18}%)` : "none";
        content.style.transform = t ? `translateY(${t * -120}px)` : "none";
        content.style.opacity = String(clamp(1 - t / 0.75, 0, 1));
      }
      if (inkP && phrases.length) {
        const b = inkP.getBoundingClientRect();
        const t = clamp((0.85 * innerHeight - b.top) / (0.4 * innerHeight + b.height), 0, 1);
        phrases.forEach((p, i) => {
          const [s, e] = ranges[i];
          p.style.opacity = (0.16 + 0.84 * clamp((t - s) / (e - s), 0, 1)).toFixed(3);
        });
      }
    });
  }

  function setupCampus() {
    const stage = $("#campus")?.children[0];
    const frame = stage?.children[0];
    const img = frame && $("img", frame);
    if (!stage || !frame || !img) return;
    if (reduce) {
      frame.style.clipPath = "none";
      return;
    }
    const FROM = { top: 17, side: 22, bottom: 13, radius: 44 };
    let max = 0;
    onScroll(() => {
      const b = stage.getBoundingClientRect();
      const p = clamp((innerHeight - b.top) / (0.45 * innerHeight + b.height / 2), 0, 1);
      max = Math.max(max, p);
      const t = 1 - (1 - max) ** 3;
      const k = 1 - t;
      frame.style.clipPath =
        t >= 1
          ? "inset(0%)"
          : `inset(${FROM.top * k}% ${FROM.side * k}% ${FROM.bottom * k}% ${FROM.side * k}% round ${FROM.radius * k}px)`;
      img.style.transform = t >= 1 ? "none" : `scale(${lerp(1.22, 1, t)})`;
    });
  }

  function setupQuadrants() {
    const cards = $$("#strengths article");
    if (!cards.length) return;
    const grid = cards[0].parentElement;
    const badge = grid.lastElementChild;
    const dirs = [
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 1],
    ];
    const q = matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)");
    onScroll(() => {
      if (!q.matches) {
        cards.forEach((c) => (c.style.transform = "none"));
        badge.style.transform = "none";
        return;
      }
      const b = grid.getBoundingClientRect();
      const approach = clamp((innerHeight - b.top) / (0.4 * innerHeight + b.height / 2), 0, 1);
      const apart = 1 - approach;
      cards.forEach((c, i) => {
        const [dx, dy] = dirs[i];
        c.style.transform = `translateX(${apart * dx * 56}px) translateY(${apart * dy * 40}px)`;
      });
      const pass = clamp((innerHeight - b.top) / (innerHeight + b.height), 0, 1);
      badge.style.transform = `rotate(${pass * 180}deg)`;
    });
  }

  function setupHeader() {
    const header = $("header");
    if (!header || !X.header) return;
    const links = $$("nav a", header).filter((a) => a.getAttribute("href")?.startsWith("#"));
    const navLinks = links.slice(0, X.nav.length);
    const button = $("button[aria-controls]", header);
    let menu = null;
    let menuOpen = false;
    const solid = () => {
      header.className = scrollY > 8 || menuOpen ? X.header.solid : X.header.top;
    };
    addEventListener("scroll", solid, { passive: true });
    solid();

    const ids = navLinks.map((a) => a.getAttribute("href").slice(1));
    const mark = (list, cls, id) =>
      list.forEach((a, i) => {
        const on = a.getAttribute("href").slice(1) === id;
        a.className = on ? cls[i].on : cls[i].off;
        if (on) a.setAttribute("aria-current", "location");
        else a.removeAttribute("aria-current");
      });
    const crossing = new Set();
    const spy = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) crossing.add(e.target.id);
          else crossing.delete(e.target.id);
        }
        const active = ids.find((id) => crossing.has(id));
        mark(navLinks, X.nav, active);
        if (menu) mark($$("a", menu), X.menuLinks, active);
      },
      { rootMargin: "-40% 0px -59% 0px" },
    );
    ids.forEach((id) => document.getElementById(id) && spy.observe(document.getElementById(id)));

    if (!button || !X.menu) return;
    const tpl = document.createElement("template");
    const setMenu = (open) => {
      if (open === menuOpen) return;
      menuOpen = open;
      button.setAttribute("aria-expanded", String(open));
      button.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
      button.innerHTML = open ? X.menu.closeIcon : X.menu.openIcon;
      solid();
      const shown = { opacity: 1, transform: "translateY(0px)" };
      const hidden = { opacity: 0, transform: "translateY(-8px)" };
      const timing = { duration: reduce ? 150 : 200, easing: EASE };
      if (open) {
        tpl.innerHTML = X.menu.html;
        menu = tpl.content.firstElementChild;
        menu.id = button.getAttribute("aria-controls");
        header.appendChild(menu);
        menu.animate([hidden, shown], timing);
        $$("a", menu).forEach((a) => a.addEventListener("click", () => setMenu(false)));
        return;
      }
      const gone = menu;
      gone.animate([shown, hidden], timing).finished.then(
        () => gone.remove(),
        () => gone.remove(),
      );
      menu = null;
    };
    button.addEventListener("click", () => setMenu(!menuOpen));
    header.addEventListener("keydown", (e) => e.key === "Escape" && setMenu(false));
  }

  function setupNews() {
    const items = $$("#news ul > li");
    if (!items.length || !X.news) return;
    const tpl = document.createElement("template");
    const state = items.map((li) => {
      const wrap = li.firstElementChild;
      const button = $("button", wrap);
      const icon = $("[aria-hidden] > span", button);
      if (icon)
        icon.style.transition = reduce ? "none" : "transform 300ms cubic-bezier(0.2, 0, 0, 1)";
      return { wrap, button, icon };
    });
    const timing = { duration: reduce ? 0 : 250, easing: EASE };
    const panelOf = (s) => document.getElementById(s.button.getAttribute("aria-controls"));
    const isOpen = (s) => s.button.getAttribute("aria-expanded") === "true";
    const setOpen = (s, i, open) => {
      s.button.setAttribute("aria-expanded", String(open));
      if (s.icon) s.icon.style.transform = open ? "rotate(45deg)" : "none";
      if (open) {
        tpl.innerHTML = X.news[i];
        const panel = tpl.content.firstElementChild;
        panel.id = s.button.getAttribute("aria-controls");
        panel.style.overflow = "hidden";
        s.wrap.appendChild(panel);
        const h = panel.scrollHeight;
        panel
          .animate(
            [
              { height: "0px", opacity: 0 },
              { height: h + "px", opacity: 1 },
            ],
            timing,
          )
          .finished.then(
            () => (panel.style.height = "auto"),
            () => undefined,
          );
        return;
      }
      const panel = panelOf(s);
      if (!panel) return;
      panel.style.overflow = "hidden";
      const h = panel.offsetHeight;
      panel
        .animate(
          [
            { height: h + "px", opacity: 1 },
            { height: "0px", opacity: 0 },
          ],
          { ...timing, fill: "forwards" },
        )
        .finished.then(
          () => !isOpen(s) && panel.remove(),
          () => undefined,
        );
    };
    state.forEach((s, i) =>
      s.button.addEventListener("click", () => {
        const willOpen = !isOpen(s);
        state.forEach((o, j) => o !== s && isOpen(o) && setOpen(o, j, false));
        setOpen(s, i, willOpen);
      }),
    );
  }

  function setupLiquid() {
    const hero = $("#top");
    const canvas = hero && $("canvas", hero);
    const heroImage = hero && $("img", hero);
    const gl = canvas?.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl || !heroImage) return;
    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = compile(gl.VERTEX_SHADER, X.shaders.vertex);
    const fs = compile(gl.FRAGMENT_SHADER, X.shaders.fragment);
    const program = gl.createProgram();
    if (!vs || !fs || !program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
    const U = (n) => gl.getUniformLocation(program, n);
    const uTex = U("uTex"),
      uRes = U("uRes"),
      uImg = U("uImg"),
      uTime = U("uTime"),
      uPointer = U("uPointer"),
      uAmt = U("uPointerAmt");
    const resize = () => {
      const scale = Math.min(devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.round(canvas.clientWidth * scale));
      const h = Math.max(1, Math.round(canvas.clientHeight * scale));
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    let ready = false,
      frame = 0,
      visible = true;
    const start = performance.now();
    const ptr = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, amt: 0, target: 0 };
    const draw = (now) => {
      if (!ready) return;
      ptr.x += (ptr.tx - ptr.x) * 0.08;
      ptr.y += (ptr.ty - ptr.y) * 0.08;
      ptr.amt += (ptr.target - ptr.amt) * 0.05;
      gl.uniform1f(uTime, reduce ? 12 : (now - start) / 1000);
      gl.uniform2f(uPointer, ptr.x, ptr.y);
      gl.uniform1f(uAmt, reduce ? 0 : ptr.amt);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
    const loop = (now) => {
      draw(now);
      frame = !reduce && visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!frame) frame = requestAnimationFrame(loop);
    };
    const src = new Image();
    src.onload = () => {
      try {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, gl.createTexture());
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, src);
      } catch {
        return;
      }
      gl.uniform1i(uTex, 0);
      gl.uniform2f(uImg, src.naturalWidth, src.naturalHeight);
      ready = true;
      resize();
      draw(performance.now());
      canvas.style.opacity = "1";
      kick();
    };
    src.src = heroImage.getAttribute("src");
    const host = canvas.parentElement.parentElement;
    host.addEventListener("pointermove", (e) => {
      const b = canvas.getBoundingClientRect();
      ptr.tx = (e.clientX - b.left) / b.width;
      ptr.ty = (e.clientY - b.top) / b.height;
      ptr.target = 1;
      kick();
    });
    host.addEventListener("pointerleave", () => (ptr.target = 0));
    new ResizeObserver(() => {
      resize();
      if (reduce) draw(performance.now());
    }).observe(canvas);
    new IntersectionObserver(([e]) => {
      visible = e?.isIntersecting ?? true;
      if (visible) kick();
    }).observe(canvas);
    document.addEventListener("visibilitychange", () => !document.hidden && kick());
  }

  setupHeader();
  setupReveals();
  setupHeroAndInk();
  setupCampus();
  setupQuadrants();
  setupNews();
  setupLiquid();
})();
