/* ===== 智能问数 · 交互 ===== */
(function () {
  var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var progress = document.getElementById('navProgress');
  var nameEl = document.getElementById('presName');
  var descEl = document.getElementById('presDesc');

  /* ---------- 导航状态 / 滚动进度 ---------- */
  function onScroll() {
    if (!nav) return;
    var y = window.scrollY || document.documentElement.scrollTop;
    nav.classList.toggle('is-scrolled', y > 40);
    if (y <= 40) nav.classList.remove('is-open');
    if (progress) {
      var h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? Math.min(100, (y / h) * 100) : 0) + '%';
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 移动端菜单 ---------- */
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('is-open'); });
    document.querySelectorAll('#navMenu a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('is-open'); });
    });
  }

  /* ---------- 滚动入场（同组错峰） ---------- */
  var items = document.querySelectorAll('.reveal');
  items.forEach(function (el) {
    var p = el.parentElement;
    if (!p) return;
    var sibs = p.querySelectorAll(':scope > .reveal'), idx = 0;
    for (var k = 0; k < sibs.length; k++) { if (sibs[k] === el) { idx = k; break; } }
    if (idx) el.style.transitionDelay = Math.min(idx, 6) * 70 + 'ms';
  });
  if ('IntersectionObserver' in window && items.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- 数字滚动 ---------- */
  function countUp(el) {
    var to = parseFloat(el.getAttribute('data-to')) || 0;
    var pre = el.getAttribute('data-prefix') || '';
    var suf = el.getAttribute('data-suffix') || '';
    if (reduce) { el.textContent = pre + to + suf; return; }
    var t0 = performance.now();
    function step(now) {
      var p = Math.min(1, (now - t0) / 1200);
      el.textContent = pre + Math.round(to * (1 - Math.pow(1 - p, 3))) + suf;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var nums = document.querySelectorAll('[data-to]');
  if (nums.length) {
    if ('IntersectionObserver' in window) {
      var ioN = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { countUp(e.target); ioN.unobserve(e.target); } });
      }, { threshold: 0.5 });
      nums.forEach(function (n) { ioN.observe(n); });
    } else { nums.forEach(countUp); }
  }

  /* ---------- 卡片光标聚光 ---------- */
  var glowSel = '.dual__card,.pres__card,.lf,.tl,.lv,.two__col,.compat__card,.sec,.found__col,.ind,.result .res';
  document.querySelectorAll(glowSel).forEach(function (el) {
    el.addEventListener('mousemove', function (e) {
      var r = el.getBoundingClientRect();
      el.style.setProperty('--mx', (e.clientX - r.left) + 'px');
      el.style.setProperty('--my', (e.clientY - r.top) + 'px');
    });
  });

  /* ---------- 首屏概念图 3D 跟随 ---------- */
  var media = document.querySelector('.hero__media');
  var mock = document.querySelector('.mk--hero');
  if (media && mock && !reduce) {
    media.addEventListener('mousemove', function (e) {
      var r = media.getBoundingClientRect();
      var cx = (e.clientX - r.left) / r.width - 0.5;
      var cy = (e.clientY - r.top) / r.height - 0.5;
      mock.style.setProperty('--ry', (cx * 7).toFixed(2) + 'deg');
      mock.style.setProperty('--rx', (-cy * 5).toFixed(2) + 'deg');
    });
    media.addEventListener('mouseleave', function () {
      mock.style.setProperty('--ry', '0deg');
      mock.style.setProperty('--rx', '0deg');
    });
  }

  /* ---------- 按钮磁吸 ---------- */
  document.querySelectorAll('.hero__cta .btn, .nav__right .btn--primary, .cta__act .btn').forEach(function (btn) {
    btn.addEventListener('mousemove', function (e) {
      var r = btn.getBoundingClientRect();
      var x = (e.clientX - r.left - r.width / 2) / r.width;
      var y = (e.clientY - r.top - r.height / 2) / r.height;
      btn.style.transform = 'translate(' + (x * 6).toFixed(1) + 'px,' + (y * 4 - 1).toFixed(1) + 'px)';
    });
    btn.addEventListener('mouseleave', function () { btn.style.transform = ''; });
  });

  /* ---------- 场景背景轮播 ---------- */
  var scen = document.getElementById('scen');
  if (scen) {
    var slides = scen.querySelectorAll('.scen__slide');
    var dotBox = document.getElementById('scDots');
    var sPrev = document.getElementById('scPrev');
    var sNext = document.getElementById('scNext');
    var idx = 0, timer = null, paused = false, DUR = 5600, dots = [];

    for (var si = 0; si < slides.length; si++) {
      var dot = document.createElement('button');
      dot.setAttribute('aria-label', '第 ' + (si + 1) + ' 个场景');
      dot.setAttribute('data-i', si);
      if (dotBox) dotBox.appendChild(dot);
      dots.push(dot);
    }
    function paintDots() {
      for (var k = 0; k < dots.length; k++) dots[k].className = (k === idx ? 'on' : '');
    }
    function go(n) {
      idx = (n + slides.length) % slides.length;
      for (var k = 0; k < slides.length; k++) slides[k].classList.toggle('is-on', k === idx);
      paintDots();
    }
    function play() { stop(); timer = setInterval(function () { if (!paused) go(idx + 1); }, DUR); }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }

    dots.forEach(function (d) {
      d.addEventListener('click', function (e) { e.preventDefault(); go(+d.getAttribute('data-i')); play(); });
    });
    if (sPrev) sPrev.addEventListener('click', function () { go(idx - 1); play(); });
    if (sNext) sNext.addEventListener('click', function () { go(idx + 1); play(); });
    scen.addEventListener('mouseenter', function () { paused = true; });
    scen.addEventListener('mouseleave', function () { paused = false; });

    var sx = 0, sy = 0, dragging = false, moved = 0;
    scen.addEventListener('pointerdown', function (e) { sx = e.clientX; sy = e.clientY; dragging = true; moved = 0; });
    scen.addEventListener('pointermove', function (e) {
      if (!dragging) return;
      moved = Math.max(moved, Math.abs(e.clientX - sx));
    });
    scen.addEventListener('pointerup', function (e) {
      if (!dragging) return;
      dragging = false;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) { go(idx + (dx < 0 ? 1 : -1)); play(); }
    });
    scen.addEventListener('click', function (e) {
      if (moved > 46) { e.preventDefault(); e.stopPropagation(); }
    }, true);

    document.addEventListener('visibilitychange', function () {
      if (document.hidden) stop(); else play();
    });
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) play(); else stop(); });
      }, { threshold: 0.25 }).observe(scen);
    } else { play(); }
    paintDots();
  }

  /* ---------- 首屏粒子 ---------- */
  var canvas = document.getElementById('fx');
  if (canvas && !reduce) {
    var ctx = canvas.getContext('2d');
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    var W = 0, H = 0, pts = [], raf = null, alive = true;
    var mouse = { x: -9999, y: -9999, on: false };
    var trail = [];

    function resize() {
      var r = canvas.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      var n = Math.max(34, Math.min(96, Math.round((W * H) / 17000)));
      pts = [];
      for (var i = 0; i < n; i++) {
        pts.push({
          x: Math.random() * W, y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.32, vy: (Math.random() - 0.5) * 0.32,
          r: 0.9 + Math.random() * 1.5
        });
      }
    }
    function frame() {
      if (!alive) return;
      ctx.clearRect(0, 0, W, H);
      for (var i = 0; i < pts.length; i++) {
        var p = pts[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        if (mouse.on) {
          var mx = p.x - mouse.x, my = p.y - mouse.y;
          var md = Math.sqrt(mx * mx + my * my);
          if (md < 130 && md > 0.1) { p.x += (mx / md) * 0.7; p.y += (my / md) * 0.7; }
        }
      }
      for (var a = 0; a < pts.length; a++) {
        for (var b = a + 1; b < pts.length; b++) {
          var dx = pts[a].x - pts[b].x, dy = pts[a].y - pts[b].y;
          var d2 = dx * dx + dy * dy;
          if (d2 < 12100) {
            ctx.strokeStyle = 'rgba(120,175,255,' + ((1 - Math.sqrt(d2) / 110) * 0.26).toFixed(3) + ')';
            ctx.lineWidth = 0.7;
            ctx.beginPath(); ctx.moveTo(pts[a].x, pts[a].y); ctx.lineTo(pts[b].x, pts[b].y); ctx.stroke();
          }
        }
      }
      if (mouse.on) {
        for (var k = 0; k < pts.length; k++) {
          var ddx = pts[k].x - mouse.x, ddy = pts[k].y - mouse.y;
          var dd = Math.sqrt(ddx * ddx + ddy * ddy);
          if (dd < 180) {
            ctx.strokeStyle = 'rgba(91,224,197,' + ((1 - dd / 180) * 0.5).toFixed(3) + ')';
            ctx.lineWidth = 0.8;
            ctx.beginPath(); ctx.moveTo(pts[k].x, pts[k].y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
          }
        }
      }
      for (var j = 0; j < pts.length; j++) {
        ctx.beginPath();
        ctx.arc(pts[j].x, pts[j].y, pts[j].r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(160,200,255,.75)';
        ctx.fill();
      }
      for (var t = trail.length - 1; t >= 0; t--) {
        var s = trail[t];
        s.life -= 0.022; s.x += s.vx; s.y += s.vy; s.vx *= 0.97; s.vy *= 0.97;
        if (s.life <= 0) { trail.splice(t, 1); continue; }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * s.life, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(120,220,255,' + (s.life * 0.75).toFixed(3) + ')';
        ctx.fill();
      }
      raf = requestAnimationFrame(frame);
    }
    resize(); frame();
    window.addEventListener('resize', resize);

    var hero = document.querySelector('.hero');
    hero.addEventListener('mousemove', function (e) {
      var r = canvas.getBoundingClientRect();
      var nx = e.clientX - r.left, ny = e.clientY - r.top;
      mouse.x = nx; mouse.y = ny; mouse.on = true;
      for (var i = 0; i < 2; i++) {
        if (trail.length > 90) break;
        trail.push({
          x: nx + (Math.random() - 0.5) * 8, y: ny + (Math.random() - 0.5) * 8,
          vx: (Math.random() - 0.5) * 0.7, vy: (Math.random() - 0.5) * 0.7,
          r: 1 + Math.random() * 2.2, life: 1
        });
      }
    });
    hero.addEventListener('mouseleave', function () { mouse.on = false; });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (en) {
          if (en.isIntersecting) { if (!alive) { alive = true; frame(); } }
          else { alive = false; if (raf) cancelAnimationFrame(raf); }
        });
      }, { threshold: 0.02 }).observe(hero);
    }
    document.addEventListener('visibilitychange', function () {
      if (document.hidden) { alive = false; if (raf) cancelAnimationFrame(raf); }
      else if (W > 0) { alive = true; frame(); }
    });
  }

  /* ---------- 双引擎：斜切 静态 / 动态 ---------- */
  var splits = document.querySelectorAll('.split');
  if (splits.length) {
    var sleep = function (ms) { return new Promise(function (r) { setTimeout(r, ms); }); };
    splits.forEach(function (sp) {
      var q = sp.querySelector('.split__q');
      var steps = sp.querySelectorAll('.split__steps span');
      var bars = sp.querySelectorAll('.split__bars i');
      var lines = sp.querySelectorAll('.split__lines i');
      var cite = sp.querySelector('.split__cite');
      var fig = sp.querySelector('.split__fig');
      var mode = sp.getAttribute('data-mode');
      var TEXT = mode === 'query' ? '统计各类合同的合同数量' : '合同验收标准怎么约定的？';
      var on = false, running = false;

      function reset() {
        q.textContent = ''; q.classList.remove('is-done');
        Array.prototype.forEach.call(steps, function (x) { x.classList.remove('is-on'); });
        Array.prototype.forEach.call(bars, function (x) { x.style.height = '0'; });
        Array.prototype.forEach.call(lines, function (x) { x.classList.remove('is-on'); x.style.width = '0'; });
        if (cite) cite.classList.remove('is-on');
        if (fig) fig.classList.remove('is-on');
      }

      async function loop() {
        running = true;
        while (on) {
          reset();
          await sleep(320);
          for (var i = 1; i <= TEXT.length; i++) {
            if (!on) { running = false; return; }
            q.textContent = TEXT.slice(0, i);
            await sleep(42);
          }
          q.classList.add('is-done');
          await sleep(240);
          if (mode === 'query') {
            var hs = ['36%', '62%', '88%', '54%'];
            for (var k = 0; k < steps.length; k++) {
              if (!on) { running = false; return; }
              steps[k].classList.add('is-on');
              await sleep(220);
            }
            await sleep(140);
            for (var j = 0; j < bars.length; j++) {
              if (!on) { running = false; return; }
              bars[j].style.height = hs[j];
              await sleep(110);
            }
          } else {
            var ws = [94, 80, 62];
            for (var m = 0; m < lines.length; m++) {
              if (!on) { running = false; return; }
              lines[m].style.width = ws[m] + '%';
              lines[m].classList.add('is-on');
              await sleep(320);
            }
            if (cite) { await sleep(260); cite.classList.add('is-on'); }
            if (fig) { await sleep(360); fig.classList.add('is-on'); }
          }
          await sleep(2800);
        }
        running = false;
      }

      sp.addEventListener('mousemove', function (e) {
        var r = sp.getBoundingClientRect();
        var x = (e.clientX - r.left) / r.width;
        var y = (e.clientY - r.top) / r.height;
        var left = (x + y) < 1;
        sp.classList.toggle('is-left', left);
        sp.classList.toggle('is-right', !left);
      });
      sp.addEventListener('mouseleave', function () { sp.classList.remove('is-left', 'is-right'); });

      if (reduce) {
        q.textContent = TEXT; q.classList.add('is-done');
        Array.prototype.forEach.call(steps, function (x) { x.classList.add('is-on'); });
        Array.prototype.forEach.call(lines, function (x, i) { x.style.width = [94, 80, 62][i] + '%'; x.classList.add('is-on'); });
        Array.prototype.forEach.call(bars, function (x, i) { x.style.height = ['36%', '62%', '88%', '54%'][i]; });
        if (cite) cite.classList.add('is-on');
        if (fig) fig.classList.add('is-on');
      } else if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting) { if (!running) { on = true; loop(); } }
            else { on = false; }
          });
        }, { threshold: 0.25 }).observe(sp);
      } else { on = true; loop(); }
    });
  }

  /* ---------- 32 种呈现：每卡轮播，速率不同 ---------- */
  var presCards = document.querySelectorAll('.pres__card');
  if (presCards.length) {
    var C = '<div class="pv-card pv-card--sm">',
        CW = '<div class="pv-card pv-card--sm pv-wide">',
        CR = '<div class="pv-card pv-card--sm pv-rows">';
    var TPL = [
      [ // 01 结论与边界（7）
        C + '<span class="pv-badge">未达标</span><b class="pv-big">42<em>μg/m³</em></b>' +
          '<div class="pv-meter"><i></i></div></div>',
        C + '<span class="pv-kicker">结论</span><p class="pv-txt">整体平稳，7 月为低点</p>' +
          '<span class="pv-sub">较去年同期 +1.2 个百分点</span></div>',
        C + '<span class="pv-badge ok">底线 35</span><b class="pv-big">42<em>当前</em></b>' +
          '<div class="pv-meter pv-meter--limit"><i></i></div></div>',
        C + '<div class="pv-warn"><b>已超底线 7 μg/m³</b>' +
          '<span>建议 24 小时内复测并核查来源</span></div></div>',
        C + '<span class="pv-kicker">分级</span><div class="pv-scale"><i class="s1"></i><i class="s2"></i>' +
          '<i class="s3 on"></i><i class="s4"></i></div><span class="pv-sub">当前：橙色预警</span></div>',
        C + '<span class="pv-kicker">剩余额度</span><b class="pv-big">72<em>%</em></b>' +
          '<div class="pv-meter pv-meter--ok"><i></i></div></div>',
        C + '<div class="pv-lock"><svg viewBox="0 0 24 24"><rect x="5" y="10" width="14" height="10" rx="2"/>' +
          '<path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><b>需授权查看</b></div>' +
          '<span class="pv-sub">已给 3 条替代问法</span></div>'
      ],
      [ // 02 清单 · 跳转 · 导航（5）
        CR + '<div class="pv-row" style="animation-delay:.05s"><b>01</b>市中区<span>1,842</span></div>' +
          '<div class="pv-row" style="animation-delay:.15s"><b>02</b>高新区<span>1,466</span></div>' +
          '<div class="pv-row" style="animation-delay:.25s"><b>03</b>青神县<span>968</span></div></div>',
        CR + '<div class="pv-row" style="animation-delay:.05s"><b>01</b>某断面<i class="pv-tag hi">高</i></div>' +
          '<div class="pv-row" style="animation-delay:.15s"><b>02</b>某企业<i class="pv-tag">中</i></div>' +
          '<div class="pv-row" style="animation-delay:.25s"><b>03</b>某站点<i class="pv-tag">中</i></div></div>',
        C + '<div class="pv-file"><svg viewBox="0 0 24 24"><path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4"/></svg>' +
          '<div><b>合同明细.pdf</b><span>2.4 MB · 第 12 页</span></div></div></div>',
        C + '<div class="pv-btn">查看全部 12 条 <i>→</i></div><span class="pv-sub">跳转到明细页</span></div>',
        C + '<div class="pv-navchip"><i class="on">概览</i><i>明细</i><i>趋势</i></div>' +
          '<span class="pv-sub">同级导航 · 可下钻</span></div>'
      ],
      [ // 03 时间趋势（4）
        C + '<span class="pv-kicker">本月</span><b class="pv-big pv-big--down" style="font-size:20px;margin:2px 0 4px">↓ 6.7<em>%</em></b>' +
          '<svg class="pv-svg" viewBox="0 0 200 34" style="max-height:34px"><polyline points="2,30 34,26 66,18 98,12 130,16 162,8 198,4" ' +
          'fill="none" stroke="#12a594" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"/></svg></div>',
        CW + '<svg class="pv-line pv-line--sm" viewBox="0 0 260 62" preserveAspectRatio="none">' +
          '<g stroke="#eef1f6" stroke-width="1"><line x1="0" y1="18" x2="260" y2="18"/><line x1="0" y1="40" x2="260" y2="40"/></g>' +
          '<polyline points="2,46 46,40 90,30 134,22 178,14 222,20 258,10" fill="none" stroke="#2b6bff" stroke-width="2.2" ' +
          'stroke-linejoin="round" stroke-linecap="round"/></svg><span class="pv-cap">近 12 个月</span></div>',
        CW + '<svg class="pv-line pv-line--sm" viewBox="0 0 260 62" preserveAspectRatio="none">' +
          '<path d="M2,50 L46,44 L90,34 L134,26 L178,18 L222,24 L258,12 L258,62 L2,62 Z" fill="rgba(43,107,255,.14)"/>' +
          '<polyline points="2,50 46,44 90,34 134,26 178,18 222,24 258,12" fill="none" stroke="#2b6bff" stroke-width="2.2" ' +
          'stroke-linejoin="round" stroke-linecap="round"/></svg><span class="pv-cap">累计量级</span></div>',
        CW + '<svg class="pv-svg" viewBox="0 0 200 70">' +
          '<g stroke="#e05252" stroke-width="1.2"><line x1="22" y1="10" x2="22" y2="56"/>' +
          '<line x1="64" y1="6" x2="64" y2="52"/><line x1="106" y1="14" x2="106" y2="60"/><line x1="148" y1="8" x2="148" y2="50"/></g>' +
          '<g fill="#e05252"><rect x="16" y="22" width="12" height="26" rx="1.5"/><rect x="100" y="28" width="12" height="24" rx="1.5"/></g>' +
          '<g fill="#12a594"><rect x="58" y="16" width="12" height="24" rx="1.5"/><rect x="142" y="18" width="12" height="22" rx="1.5"/></g>' +
          '</svg><span class="pv-cap">开高低收</span></div>'
      ],
      [ // 04 比较排序（6）
        C + '<div class="pv-cmp"><div><span>今年</span><b>42</b></div><i>vs</i>' +
          '<div><span>去年</span><b class="muted">35</b></div></div><span class="pv-sub">降幅 6.7%</span></div>',
        CW + '<div class="pv-bars pv-bars--sm"><i style="--h:46%"></i><i style="--h:72%"></i><i style="--h:95%"></i>' +
          '<i style="--h:58%"></i><i style="--h:34%"></i></div><span class="pv-cap">各市州排名</span></div>',
        CW + '<div class="pv-hrow"><span>甲</span><i style="--w:92%"></i><em>92</em></div>' +
          '<div class="pv-hrow"><span>乙</span><i style="--w:74%"></i><em>74</em></div>' +
          '<div class="pv-hrow"><span>丙</span><i style="--w:51%"></i><em>51</em></div>' +
          '<span class="pv-cap">横向排序</span></div>',
        CW + '<div class="pv-combo"><div class="pv-combo__bars">' +
          '<i style="--h:52%"></i><i style="--h:70%"></i><i style="--h:44%"></i><i style="--h:86%"></i></div>' +
          '<svg viewBox="0 0 200 60" preserveAspectRatio="none"><polyline points="10,44 60,32 110,36 190,14" ' +
          'fill="none" stroke="#ff9f43" stroke-width="2" stroke-linejoin="round"/></svg></div>' +
          '<span class="pv-cap">柱 + 线组合</span></div>',
        CW + '<svg class="pv-svg" viewBox="0 0 200 80"><g stroke="#e6ecf6" fill="none">' +
          '<polygon points="100,10 176,36 148,72 52,72 24,36"/><polygon points="100,26 152,44 134,62 66,62 48,44"/></g>' +
          '<polygon points="100,14 168,38 142,68 58,68 32,38" fill="rgba(43,107,255,.14)" stroke="#2b6bff" stroke-width="1.8"/>' +
          '</svg><span class="pv-cap">五维对比</span></div>',
        CW + '<div class="pv-water"><i style="--h:22%;--x:0"></i><i style="--h:38%;--x:44"></i>' +
          '<i style="--h:18%;--x:88"></i><i style="--h:26%;--x:132"></i></div>' +
          '<span class="pv-cap">逐项增减</span></div>'
      ],
      [ // 05 构成占比（5）
        CW + '<div class="pv-row" style="animation-delay:.05s"><b>1</b>工业源<i class="pv-bar" style="--w:64%"></i><span>52.8%</span></div>' +
          '<div class="pv-row" style="animation-delay:.15s"><b>2</b>移动源<i class="pv-bar" style="--w:29%"></i><span>24.0%</span></div>' +
          '<div class="pv-row" style="animation-delay:.25s"><b>3</b>其他<i class="pv-bar" style="--w:16%"></i><span>23.2%</span></div></div>',
        CW + '<svg class="pv-svg" viewBox="0 0 200 78"><g>' +
          '<path d="M52,39 L52,6 A33,33 0 0 1 85,39 Z" fill="#2b6bff"/>' +
          '<path d="M52,39 L85,39 A33,33 0 0 1 60,70 Z" fill="#7fb0ff"/>' +
          '<path d="M52,39 L60,70 A33,33 0 0 1 52,6 Z" fill="#cfe0ff"/></g>' +
          '<g font-size="8" fill="#5b6472"><text x="98" y="26">工业源 52.8%</text><text x="98" y="44">移动源 24.0%</text>' +
          '<text x="98" y="62">其他 23.2%</text></g></svg></div>',
        C + '<div class="pv-donut"><svg viewBox="0 0 92 92">' +
          '<circle cx="46" cy="46" r="34" stroke="#eef2f8" stroke-width="11"/>' +
          '<circle class="d1" cx="46" cy="46" r="34" stroke-dasharray="108 999" style="--len:108"/>' +
          '<circle class="d2" cx="46" cy="46" r="34" stroke-dasharray="62 999" style="--len:62"/>' +
          '<circle class="d3" cx="46" cy="46" r="34" stroke-dasharray="44 999" style="--len:44"/></svg>' +
          '<div class="pv-legend"><div><i style="background:#2b6bff"></i>52.8%</div>' +
          '<div><i style="background:#7fb0ff"></i>24.0%</div></div></div>',
        CW + '<div class="pv-tree"><i style="width:52%;height:100%"></i>' +
          '<div><i style="width:100%;height:58%"></i><i style="width:100%;height:38%;margin-top:2px"></i></div>' +
          '<div><i style="width:100%;height:42%"></i><i style="width:100%;height:54%;margin-top:2px"></i></div></div>' +
          '<span class="pv-cap">面积占比</span></div>',
        CW + '<svg class="pv-svg" viewBox="0 0 200 80">' +
          '<g transform="translate(78,40) rotate(-90)">' +
          '<circle r="11" fill="#2b6bff"/>' +
          '<circle r="19" fill="none" stroke="#7fb0ff" stroke-width="9" stroke-dasharray="72 999"/>' +
          '<circle r="19" fill="none" stroke="#9ec6ff" stroke-width="9" stroke-dasharray="48 999" stroke-dashoffset="-76"/>' +
          '<circle r="30" fill="none" stroke="#cfe0ff" stroke-width="8" stroke-dasharray="96 999"/>' +
          '<circle r="30" fill="none" stroke="#bcd8ff" stroke-width="8" stroke-dasharray="60 999" stroke-dashoffset="-100"/>' +
          '</g>' +
          '<g font-size="8" fill="#5b6472"><text x="124" y="36">一级 3 类</text>' +
          '<text x="124" y="52">二级 5 类</text></g></svg></div>'
      ],
      [ // 06 分布与流程（5）
        CW + '<div class="pv-scen"><i class="on">乐观 78%</i><i>中性 62%</i><i>悲观 41%</i></div>' +
          '<span class="pv-sub">按三情景给出区间</span></div>',
        CW + '<div class="pv-hist pv-hist--sm"><i style="--h:22%"></i><i style="--h:44%"></i><i style="--h:88%"></i>' +
          '<i style="--h:76%"></i><i style="--h:52%"></i><i style="--h:30%"></i><i style="--h:16%"></i><i style="--h:8%"></i></div>' +
          '<span class="pv-cap">集中在 30–50 区间</span></div>',
        CW + '<svg class="pv-svg" viewBox="0 0 200 70"><g stroke="#2b6bff" stroke-width="1.4" fill="none">' +
          '<path d="M30,35 L52,35"/><path d="M148,35 L170,35"/><path d="M30,22 L30,48"/><path d="M170,22 L170,48"/>' +
          '<rect x="52" y="18" width="96" height="34" rx="3"/><path d="M78,18 L78,52"/></g>' +
          '<g fill="#7fb0ff"><circle cx="20" cy="35" r="2.5"/><circle cx="180" cy="30" r="2.5"/></g></svg>' +
          '<span class="pv-cap">中位数与离群值</span></div>',
        CW + '<svg class="pv-svg" viewBox="0 0 200 70"><g fill="#2b6bff" opacity=".85">' +
          '<circle cx="30" cy="50" r="3"/><circle cx="48" cy="44" r="3"/><circle cx="62" cy="40" r="3"/>' +
          '<circle cx="86" cy="34" r="3"/><circle cx="104" cy="30" r="3"/><circle cx="120" cy="26" r="3"/>' +
          '<circle cx="140" cy="20" r="3"/><circle cx="158" cy="18" r="3"/><circle cx="176" cy="12" r="3"/></g>' +
          '<g stroke="#e6ecf6"><line x1="16" y1="58" x2="186" y2="58"/><line x1="16" y1="10" x2="16" y2="58"/></g></svg>' +
          '<span class="pv-cap">相关性散点</span></div>',
        CW + '<div class="pv-funnel"><i style="width:100%;--d:.05s"></i><i style="width:74%;--d:.15s"></i>' +
          '<i style="width:48%;--d:.25s"></i></div><span class="pv-cap">受理 → 处置 → 闭环</span></div>'
      ]
    ];
    var SPEED = [2800, 3300, 3800, 4300, 4800, 5400];

    presCards.forEach(function (card, gi) {
      var chips = card.querySelectorAll('.chipx');
      var mini = document.createElement('div');
      mini.className = 'pres__mini';
      card.insertBefore(mini, card.querySelector('.pres__chips'));

      var idx = 0, timer = null, paused = false, visible = false;
      function paint() {
        for (var i = 0; i < chips.length; i++) chips[i].classList.toggle('on', i === idx);
        mini.innerHTML = (TPL[gi] && TPL[gi][idx]) || TPL[0][0];
      }
      function start() {
        if (timer) clearInterval(timer);
        timer = setInterval(function () {
          if (paused || !visible) return;
          idx = (idx + 1) % chips.length;
          paint();
        }, SPEED[gi]);
      }
      card.addEventListener('mouseenter', function () { paused = true; });
      card.addEventListener('mouseleave', function () { paused = false; });
      chips.forEach(function (c, i) {
        c.addEventListener('click', function () {
          idx = i; paint(); start();
          if (nameEl) nameEl.textContent = c.textContent;
          if (descEl) descEl.textContent = c.getAttribute('data-d') || '';
        });
      });
      paint();
      if ('IntersectionObserver' in window) {
        new IntersectionObserver(function (es) {
          es.forEach(function (e) { visible = e.isIntersecting; });
        }, { threshold: 0.15 }).observe(card);
      } else { visible = true; }
      start();
    });

    if (nameEl && presCards[0]) {
      var first = presCards[0].querySelector('.chipx');
      nameEl.textContent = first.textContent;
      descEl.textContent = first.getAttribute('data-d') || '';
    }
  }
})();
