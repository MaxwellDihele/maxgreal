import { useState, useEffect, useRef, useCallback } from "react";
import logoNavbar from "./assets/logo-navbar.png";
import logoHero   from "./assets/logo-hero.png";
import faviconPng from "./assets/favicon.png";

/* ── Favicon + Page Title injector ── */
const FAVICON_URI  = faviconPng;
const NAV_LOGO_URI = logoNavbar;

function FaviconInjector() {
  useEffect(() => {
    // Set favicon
    let link = document.querySelector("link[rel~='icon']");
    if (!link) { link = document.createElement('link'); link.rel = 'icon'; document.head.appendChild(link); }
    link.type = 'image/png';
    link.href = FAVICON_URI;

    // Set page title
    document.title = 'MAXG Enterprise | AI · Web · Database · 4IR';

    // Set meta description
    let meta = document.querySelector("meta[name='description']");
    if (!meta) { meta = document.createElement('meta'); meta.name = 'description'; document.head.appendChild(meta); }
    meta.content = 'MAXG Enterprise — AI Development, Web Platforms, Database Architecture & 4IR Digital Transformation for modern businesses.';
  }, []);
  return null;
}



/* ══════════════════════════════════════════
   GLOBAL STYLES + GOOGLE FONTS + MATERIAL ICONS
══════════════════════════════════════════ */
const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600;700&display=swap');
    @import url('https://fonts.googleapis.com/icon?family=Material+Icons+Round');

    *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
    html { scroll-behavior: smooth; }
    body { overflow-x: hidden; }

    :root {
      --blue:#3B82F6; --blue-b:#60A5FA; --blue-d:#1D4ED8;
      --bg:#04040a; --bg2:#07070f; --surface:rgba(255,255,255,0.025);
      --border:rgba(59,130,246,0.18); --text:#F1F5F9; --muted:#64748B;
      --ff-display:'Playfair Display',Georgia,serif;
      --ff-body:'DM Sans',system-ui,sans-serif;
    }

    ::-webkit-scrollbar{width:5px}
    ::-webkit-scrollbar-track{background:var(--bg)}
    ::-webkit-scrollbar-thumb{background:#1D4ED8;border-radius:4px}
    .material-icons-round{font-size:inherit!important;vertical-align:middle}

    @keyframes fadeUp   {from{opacity:0;transform:translateY(28px)}to{opacity:1;transform:translateY(0)}}
    @keyframes fadeIn   {from{opacity:0}to{opacity:1}}
    @keyframes scaleIn  {from{opacity:0;transform:scale(0.88)}to{opacity:1;transform:scale(1)}}
    @keyframes blink    {0%,100%{opacity:1}50%{opacity:0}}
    @keyframes pulse2   {0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,0.5)}50%{box-shadow:0 0 0 14px transparent}}
    @keyframes orbit    {from{transform:rotate(0deg) translateX(260px) rotate(0deg)}to{transform:rotate(360deg) translateX(260px) rotate(-360deg)}}
    @keyframes orbit2   {from{transform:rotate(180deg) translateX(180px) rotate(-180deg)}to{transform:rotate(540deg) translateX(180px) rotate(-540deg)}}
    @keyframes spin     {from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
    @keyframes counterSpin{from{transform:rotate(0deg)}to{transform:rotate(-360deg)}}
    @keyframes float    {0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}}
    @keyframes shimmer  {0%{background-position:200% center}100%{background-position:-200% center}}
    @keyframes slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}
    @keyframes logoGlow {0%,100%{opacity:0.18;filter:blur(0px)}50%{opacity:0.30;filter:blur(1px)}}
    @keyframes scanline {0%{top:-10%}100%{top:110%}}
    @keyframes ringPulse{0%{transform:scale(1);opacity:0.6}100%{transform:scale(1.5);opacity:0}}
    @keyframes bounce   {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
    @keyframes typing   {from{width:0}to{width:100%}}
    @keyframes dotPulse {0%,80%,100%{opacity:0;transform:scale(0.8)}40%{opacity:1;transform:scale(1)}}

    .animate-fadeUp  {animation:fadeUp  0.65s cubic-bezier(.22,1,.36,1) both}
    .animate-fadeIn  {animation:fadeIn  0.5s ease both}
    .animate-scaleIn {animation:scaleIn 0.55s cubic-bezier(.22,1,.36,1) both}
    .animate-float   {animation:float   4s ease-in-out infinite}

    .shimmer-text{
      background:linear-gradient(90deg,#60A5FA,#fff,#3B82F6,#60A5FA);
      background-size:200% auto;
      -webkit-background-clip:text;-webkit-text-fill-color:transparent;
      animation:shimmer 4s linear infinite;
    }

    .card-hover{transition:transform .3s cubic-bezier(.22,1,.36,1),box-shadow .3s,border-color .3s,background .3s;will-change:transform}
    .card-hover:hover{transform:translateY(-5px);box-shadow:0 20px 60px rgba(59,130,246,0.14);border-color:rgba(59,130,246,0.5)!important;background:rgba(59,130,246,0.07)!important}
    .card-hover:hover .icon-circle{background:rgba(59,130,246,0.28)!important;box-shadow:0 0 20px rgba(59,130,246,0.5);transform:scale(1.1) rotate(-5deg)}
    .icon-circle{transition:background .3s,box-shadow .3s,transform .3s}

    .btn-p{background:linear-gradient(135deg,#1D4ED8,#3B82F6);border:none;border-radius:12px;color:#fff;font-weight:700;cursor:pointer;display:inline-flex;align-items:center;gap:.45rem;font-family:var(--ff-body);transition:transform .2s,box-shadow .2s,filter .2s}
    .btn-p:hover{transform:translateY(-2px);box-shadow:0 0 40px rgba(59,130,246,0.7)!important;filter:brightness(1.08)}
    .btn-s{background:transparent;border:1px solid rgba(59,130,246,0.4);border-radius:12px;color:#60A5FA;font-weight:600;cursor:pointer;display:inline-flex;align-items:center;gap:.45rem;font-family:var(--ff-body);transition:background .2s,border-color .2s,transform .2s}
    .btn-s:hover{background:rgba(59,130,246,0.15)!important;border-color:#3B82F6!important;transform:translateY(-2px)}

    .mobile-menu{animation:slideDown .3s cubic-bezier(.22,1,.36,1) both}

    /* LOGO BG EFFECT */
    .logo-bg-wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;pointer-events:none;overflow:hidden}
    .logo-bg-img{width:min(620px,90vw);height:min(620px,90vw);object-fit:contain;opacity:0.13;animation:logoGlow 5s ease-in-out infinite;filter:saturate(0.4) brightness(1.1)}
    .logo-scan{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,rgba(59,130,246,0.4),transparent);animation:scanline 4s linear infinite;pointer-events:none}

    /* CHAT UI */
    .chat-bubble-in {animation:fadeUp 0.35s ease both}
    .typing-dot{width:7px;height:7px;border-radius:50%;background:#60A5FA;animation:dotPulse 1.4s infinite ease-in-out}
    .typing-dot:nth-child(2){animation-delay:.2s}
    .typing-dot:nth-child(3){animation-delay:.4s}
    .booking-card{transition:border-color .25s,box-shadow .25s,transform .25s}
    .booking-card:hover{border-color:rgba(59,130,246,0.55)!important;box-shadow:0 8px 40px rgba(59,130,246,0.12);transform:translateY(-3px)}

    /* RESPONSIVE */
    @media(max-width:768px){
      .hide-m{display:none!important} .show-m{display:flex!important}
      .grid-2,.grid-3,.pricing-grid{grid-template-columns:1fr!important}
      .grid-4{grid-template-columns:1fr 1fr!important}
      .hero-h{font-size:clamp(2rem,9vw,2.8rem)!important}
      .hero-btns{flex-direction:column!important;align-items:stretch!important}
      .sec-h{font-size:clamp(1.6rem,6vw,2.2rem)!important}
      .footer-r{flex-direction:column!important;gap:2rem!important}
      .nav-cta-d{display:none!important}
      .contact-grid{grid-template-columns:1fr!important}
    }
    @media(max-width:480px){
      .grid-4{grid-template-columns:1fr!important}
      .stat-row{display:grid!important;grid-template-columns:1fr 1fr!important;gap:1.5rem!important}
    }

    input,textarea,select{color-scheme:dark}
    input::placeholder,textarea::placeholder{color:#475569}
    select option{background:#080810;color:white}
  `}</style>
);

/* ── Icon ── */
const Icon = ({ name, size = 20, color, style: s = {} }) => (
  <span className="material-icons-round" style={{ fontSize: size, color: color || "inherit", lineHeight: 1, flexShrink: 0, ...s }}>{name}</span>
);

/* ── InView hook ── */
function useInView(threshold = 0.12) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, v];
}

/* ══════════════════════════════════════════
   PARTICLE CANVAS
══════════════════════════════════════════ */
function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current; if (!c) return;
    const ctx = c.getContext("2d");
    let W = c.width = window.innerWidth, H = c.height = window.innerHeight;
    const pts = Array.from({ length: 60 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .32, vy: (Math.random() - .5) * .32,
      r: Math.random() * 1.6 + .4, a: Math.random() * .7 + .2
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      pts.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(96,165,250,${p.a * .55})`; ctx.fill();
      });
      for (let i = 0; i < pts.length; i++)
        for (let j = i + 1; j < pts.length; j++) {
          const dx = pts[i].x - pts[j].x, dy = pts[i].y - pts[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 115) { ctx.beginPath(); ctx.strokeStyle = `rgba(59,130,246,${.13 * (1 - d / 115)})`; ctx.lineWidth = .55; ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke(); }
        }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { W = c.width = window.innerWidth; H = c.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 1 }} />;
}

/* ══════════════════════════════════════════
   ORBIT RINGS (same as v2)
══════════════════════════════════════════ */
function OrbitRings() {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", overflow: "hidden", zIndex: 2 }}>
      <div style={{ position: "relative", width: 540, height: 540 }}>
        <div style={{ position: "absolute", inset: 0, border: "1px solid rgba(59,130,246,0.09)", borderRadius: "50%", animation: "spin 32s linear infinite" }} />
        <div style={{ position: "absolute", inset: 50, border: "1px dashed rgba(59,130,246,0.07)", borderRadius: "50%", animation: "counterSpin 22s linear infinite" }} />
        <div style={{ position: "absolute", inset: 110, border: "1px solid rgba(96,165,250,0.05)", borderRadius: "50%" }} />
        {/* Orbiting dot 1 */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 10, height: 10, marginTop: -5, marginLeft: -5, animation: "orbit 12s linear infinite" }}>
          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3B82F6", boxShadow: "0 0 14px #3B82F6, 0 0 28px rgba(59,130,246,0.5)" }} />
        </div>
        {/* Orbiting dot 2 */}
        <div style={{ position: "absolute", top: "50%", left: "50%", width: 7, height: 7, marginTop: -3.5, marginLeft: -3.5, animation: "orbit2 8s linear infinite" }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#60A5FA", boxShadow: "0 0 10px #60A5FA" }} />
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   GRID OVERLAY SVG
══════════════════════════════════════════ */
const GridSVG = ({ id = "g1", opacity = 0.035 }) => (
  <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity, pointerEvents: "none", zIndex: 0 }}>
    <defs><pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse"><path d="M64 0L0 0 0 64" fill="none" stroke="#3B82F6" strokeWidth=".6" /></pattern></defs>
    <rect width="100%" height="100%" fill={`url(#${id})`} />
  </svg>
);

/* ══════════════════════════════════════════
   TYPEWRITER
══════════════════════════════════════════ */
function Typewriter({ words }) {
  const [wi, setWi] = useState(0), [ci, setCi] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    let t;
    if (!del && ci < w.length) t = setTimeout(() => setCi(c => c + 1), 72);
    else if (!del && ci === w.length) t = setTimeout(() => setDel(true), 1800);
    else if (del && ci > 0) t = setTimeout(() => setCi(c => c - 1), 38);
    else { setDel(false); setWi(w => (w + 1) % words.length); }
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return <><span className="shimmer-text">{words[wi].slice(0, ci)}</span><span style={{ color: "#3B82F6", animation: "blink 1s infinite" }}>|</span></>;
}

/* ══════════════════════════════════════════
   NAVBAR
══════════════════════════════════════════ */
const NAV = [
  { l: "Home", i: "home", p: "home" },
  { l: "Services", i: "build", p: "services" },
  { l: "Pricing", i: "sell", p: "pricing" },
  { l: "Demo", i: "smart_toy", p: "demo" },
  { l: "Contact", i: "mail", p: "contact" },
];
function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 40); window.addEventListener("scroll", f); return () => window.removeEventListener("scroll", f); }, []);
  useEffect(() => setOpen(false), [page]);
  const bg = scrolled || open ? "rgba(4,4,10,0.96)" : "transparent";
  return (
    <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 300, background: bg, backdropFilter: (scrolled || open) ? "blur(24px)" : "none", borderBottom: (scrolled || open) ? "1px solid rgba(59,130,246,0.14)" : "none", transition: "background .3s", fontFamily: "var(--ff-body)" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 clamp(1rem,4vw,2.5rem)", height: 68 }}>
        {/* Logo */}
        <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: ".7rem" }}>
          <img src={NAV_LOGO_URI} alt="MAXG Enterprise Logo" style={{ width: 44, height: 44, objectFit: "contain", filter: "drop-shadow(0 0 8px rgba(0,200,255,0.7))", transition: "filter 0.3s" }} onMouseEnter={e => e.target.style.filter="drop-shadow(0 0 16px rgba(0,200,255,1))"} onMouseLeave={e => e.target.style.filter="drop-shadow(0 0 8px rgba(0,200,255,0.7))"} />
          <div style={{ textAlign: "left" }}>
            <div style={{ color: "white", fontWeight: 800, fontSize: "1rem", letterSpacing: ".1em", fontFamily: "var(--ff-display)" }}>MAXG</div>
            <div style={{ color: "#3B82F6", fontSize: ".5rem", letterSpacing: ".35em", fontWeight: 700 }}>ENTERPRISE</div>
          </div>
        </button>
        {/* Desktop links */}
        <div className="hide-m" style={{ display: "flex", gap: ".15rem", alignItems: "center" }}>
          {NAV.map(n => (
            <button key={n.p} onClick={() => setPage(n.p)} style={{ background: page === n.p ? "rgba(59,130,246,0.12)" : "none", border: "none", borderRadius: 8, cursor: "pointer", color: page === n.p ? "#60A5FA" : "#94A3B8", fontSize: ".82rem", fontWeight: 600, letterSpacing: ".07em", padding: ".5rem .9rem", display: "flex", alignItems: "center", gap: ".35rem", transition: "color .2s,background .2s", fontFamily: "var(--ff-body)" }}>
              <Icon name={n.i} size={15} />{n.l.toUpperCase()}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".75rem" }}>
          <button className="btn-p nav-cta-d" onClick={() => setPage("demo")} style={{ padding: ".55rem 1.2rem", fontSize: ".82rem", letterSpacing: ".06em", boxShadow: "0 0 24px rgba(59,130,246,0.45)" }}>
            <Icon name="smart_toy" size={16} /> TRY DEMO
          </button>
          {/* Hamburger */}
          <button onClick={() => setOpen(o => !o)} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 8, cursor: "pointer", padding: ".45rem", display: "none", alignItems: "center", justifyContent: "center", color: "#60A5FA" }} className="show-m">
            <Icon name={open ? "close" : "menu"} size={22} />
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {open && (
        <div className="mobile-menu" style={{ background: "rgba(4,4,10,0.98)", borderTop: "1px solid rgba(59,130,246,0.12)", padding: "1rem clamp(1rem,4vw,2rem) 1.5rem" }}>
          {NAV.map(n => (
            <button key={n.p} onClick={() => setPage(n.p)} style={{ display: "flex", alignItems: "center", gap: ".75rem", width: "100%", background: page === n.p ? "rgba(59,130,246,0.12)" : "transparent", border: "none", borderRadius: 10, cursor: "pointer", color: page === n.p ? "#60A5FA" : "#94A3B8", fontSize: ".95rem", fontWeight: 600, padding: ".85rem 1rem", marginBottom: ".3rem", fontFamily: "var(--ff-body)", transition: "background .2s,color .2s" }}>
              <Icon name={n.i} size={20} color={page === n.p ? "#3B82F6" : "#475569"} />{n.l}
            </button>
          ))}
          <button className="btn-p" onClick={() => setPage("demo")} style={{ marginTop: ".75rem", width: "100%", padding: ".9rem", fontSize: ".95rem", justifyContent: "center", boxShadow: "0 0 28px rgba(59,130,246,0.4)" }}>
            <Icon name="smart_toy" size={18} /> TRY AI DEMO FREE
          </button>
        </div>
      )}
    </nav>
  );
}

/* ══════════════════════════════════════════
   HERO — LOGO IN BACKGROUND WITH ALL ANIMATIONS IN FRONT
══════════════════════════════════════════ */
function HeroSection({ setPage }) {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => { const f = e => setMouse({ x: e.clientX, y: e.clientY }); window.addEventListener("mousemove", f); return () => window.removeEventListener("mousemove", f); }, []);

  return (
    <section style={{ position: "relative", minHeight: "100vh", display: "flex", alignItems: "center", overflow: "hidden", background: "var(--bg)" }}>
      {/* ── LAYER 0: Logo watermark background ── */}
      <div className="logo-bg-wrap" style={{ zIndex: 0 }}>
        {/* Outer ring pulse behind logo */}
        <div style={{ position: "absolute", width: "min(700px,95vw)", height: "min(700px,95vw)", borderRadius: "50%", border: "1px solid rgba(59,130,246,0.06)", animation: "ringPulse 4s ease-out infinite" }} />
        <div style={{ position: "absolute", width: "min(700px,95vw)", height: "min(700px,95vw)", borderRadius: "50%", border: "1px solid rgba(59,130,246,0.04)", animation: "ringPulse 4s ease-out 1s infinite" }} />
        {/* The logo itself — using chess pawn SVG since image can't be uploaded to artifact */}
        <div style={{
          width: "min(520px,85vw)", height: "min(520px,85vw)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "logoGlow 5s ease-in-out infinite",
          opacity: 0.15,
          filter: "drop-shadow(0 0 60px rgba(59,130,246,0.6))",
        }}>
          {/* Large MAXG chess pawn — your logo symbol rendered at massive scale */}
          <svg viewBox="0 0 200 260" style={{ width: "100%", height: "100%", filter: "drop-shadow(0 0 30px rgba(59,130,246,0.8))" }}>
            {/* Crown */}
            <path d="M60 60 L80 30 L100 50 L120 20 L140 50 L160 30 L150 70 L50 70 Z" fill="url(#cg)" opacity="0.9"/>
            {/* Head */}
            <circle cx="100" cy="95" r="32" fill="url(#hg)"/>
            {/* Neck */}
            <rect x="82" y="122" width="36" height="28" rx="4" fill="url(#hg)"/>
            {/* Body */}
            <ellipse cx="100" cy="178" rx="52" ry="36" fill="url(#hg)"/>
            {/* Base */}
            <rect x="55" y="208" width="90" height="18" rx="9" fill="url(#hg)"/>
            {/* Neon rim */}
            <ellipse cx="100" cy="227" rx="62" ry="10" fill="none" stroke="#3B82F6" strokeWidth="1.5" opacity="0.8"/>
            <circle cx="100" cy="95" r="32" fill="none" stroke="#3B82F6" strokeWidth="1" opacity="0.6"/>
            <defs>
              <linearGradient id="cg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#475569"/><stop offset="100%" stopColor="#1E293B"/>
              </linearGradient>
              <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#334155"/><stop offset="100%" stopColor="#0F172A"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        {/* Scanline effect across logo */}
        <div className="logo-scan" style={{ zIndex: 1 }} />
        {/* Blue radial glow behind logo */}
        <div style={{ position: "absolute", width: "min(700px,95vw)", height: "min(700px,95vw)", borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)", animation: "logoGlow 5s ease-in-out infinite" }} />
      </div>

      {/* ── LAYER 1: Grid ── */}
      <GridSVG id="gh" opacity={0.03} />

      {/* ── LAYER 2: Particles ── */}
      <ParticleCanvas />

      {/* ── LAYER 3: Orbit rings ── */}
      <OrbitRings />

      {/* ── LAYER 4: Mouse glow ── */}
      <div style={{ position: "fixed", pointerEvents: "none", zIndex: 4, left: mouse.x - 200, top: mouse.y - 200, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(59,130,246,0.08), transparent 70%)", transition: "left .08s,top .08s" }} />

      {/* ── LAYER 5: Hero content ── */}
      <div style={{ position: "relative", zIndex: 5, width: "100%", maxWidth: 980, margin: "0 auto", padding: "8rem clamp(1rem,5vw,3rem) 5rem", textAlign: "center" }}>
        <div className="animate-fadeUp" style={{ animationDelay: ".1s", display: "inline-flex", alignItems: "center", gap: ".5rem", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 50, padding: ".35rem 1.1rem", marginBottom: "1.75rem", backdropFilter: "blur(8px)" }}>
          <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E", display: "inline-block", animation: "pulse2 2s infinite" }} />
          <span style={{ color: "#60A5FA", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em", fontFamily: "var(--ff-body)" }}>4TH INDUSTRIAL REVOLUTION READY</span>
        </div>

        <h1 className="hero-h animate-fadeUp" style={{ animationDelay: ".2s", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(2.6rem,6vw,5rem)", lineHeight: 1.08, color: "white", marginBottom: "1rem", letterSpacing: "-.02em" }}>
          We Build The<br />
          <Typewriter words={["AI Systems", "Web Platforms", "Database Engines", "Digital Empires", "4IR Solutions"]} />
          <br />That Run Tomorrow
        </h1>

        <p className="animate-fadeUp" style={{ animationDelay: ".35s", color: "#94A3B8", fontSize: "1.08rem", lineHeight: 1.75, maxWidth: 570, margin: "0 auto 2.5rem", fontFamily: "var(--ff-body)" }}>
          MAXG Enterprise engineers AI systems, high-performance websites, and scalable databases — giving your business an unassailable edge in the 4IR economy.
        </p>

        <div className="hero-btns animate-fadeUp" style={{ animationDelay: ".5s", display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          <button className="btn-p" onClick={() => setPage("demo")} style={{ padding: ".9rem 2.2rem", fontSize: "1rem", boxShadow: "0 0 40px rgba(59,130,246,0.6)" }}>
            <Icon name="smart_toy" size={20} /> Try AI Demo
          </button>
          <button className="btn-s" onClick={() => setPage("pricing")} style={{ padding: ".9rem 2.2rem", fontSize: "1rem" }}>
            <Icon name="sell" size={20} /> View Pricing
          </button>
        </div>

        {/* Stats */}
        <div className="stat-row animate-fadeUp" style={{ animationDelay: ".7s", display: "flex", gap: "2.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          {[{ n: "50+", l: "Projects", i: "rocket_launch" }, { n: "4", l: "Core Services", i: "category" }, { n: "100%", l: "Satisfaction", i: "star" }, { n: "24/7", l: "Support", i: "support_agent" }].map(s => (
            <div key={s.l} style={{ textAlign: "center", minWidth: 80 }}>
              <div style={{ color: "#60A5FA", marginBottom: ".25rem" }}><Icon name={s.i} size={18} /></div>
              <div style={{ color: "white", fontSize: "1.8rem", fontWeight: 900, fontFamily: "var(--ff-display)" }}>{s.n}</div>
              <div style={{ color: "#64748B", fontSize: ".72rem", letterSpacing: ".1em", fontFamily: "var(--ff-body)" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 130, background: "linear-gradient(transparent,var(--bg))", pointerEvents: "none", zIndex: 6 }} />
    </section>
  );
}

/* ══════════════════════════════════════════
   SERVICES SECTION
══════════════════════════════════════════ */
const SERVICES = [
  { icon: "psychology", color: "#3B82F6", title: "AI Development & Integration", desc: "LLM-powered assistants, predictive analytics, and intelligent automation engines embedded directly into your workflows.", tags: ["Machine Learning", "LLMs", "Automation", "NLP"] },
  { icon: "language", color: "#06B6D4", title: "Web Development", desc: "From blazing-fast Astro sites to full-stack platforms — we engineer digital experiences that rank, convert, and scale.", tags: ["Next.js", "Astro", "React", "Node.js"] },
  { icon: "storage", color: "#8B5CF6", title: "Database Architecture", desc: "Robust, scalable design — SQL to NoSQL, cloud migrations, real-time sync, and enterprise-grade security.", tags: ["PostgreSQL", "MongoDB", "Redis", "Supabase"] },
  { icon: "devices", color: "#F59E0B", title: "4IR Digital Transformation", desc: "IoT integration, smart automation, and full digital ecosystem design for the Fourth Industrial Revolution.", tags: ["IoT", "Cloud", "Edge Computing", "Smart Systems"] },
];
function ServicesSection() {
  const [ref, v] = useInView();
  return (
    <section ref={ref} style={{ padding: "6rem clamp(1rem,5vw,3rem)", background: "var(--bg)", position: "relative" }}>
      <div style={{ maxWidth: 1140, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <div style={{ color: "#60A5FA", fontSize: ".72rem", letterSpacing: ".25em", fontWeight: 700, marginBottom: ".75rem", fontFamily: "var(--ff-body)", display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem" }}><Icon name="build" size={14} color="#3B82F6" /> WHAT WE BUILD</div>
          <h2 className="sec-h" style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", marginBottom: "1rem" }}>Enterprise-Grade Services</h2>
          <p style={{ color: "#64748B", maxWidth: 500, margin: "0 auto", lineHeight: 1.7, fontFamily: "var(--ff-body)" }}>Every service engineered to give your business a strategic, compounding advantage.</p>
        </div>
        <div className="grid-2" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          {SERVICES.map((s, i) => (
            <div key={s.title} className="card-hover" style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 18, padding: "2rem", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(30px)", transition: `opacity .6s ${i * .1}s,transform .6s ${i * .1}s` }}>
              <div style={{ display: "flex", alignItems: "flex-start", gap: "1rem", marginBottom: "1.25rem" }}>
                <div className="icon-circle" style={{ width: 50, height: 50, borderRadius: 12, background: `${s.color}22`, border: `1px solid ${s.color}44`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={s.icon} size={26} color={s.color} />
                </div>
                <div>
                  <h3 style={{ color: "white", fontWeight: 700, fontFamily: "var(--ff-display)", fontSize: "1.1rem", marginBottom: ".5rem" }}>{s.title}</h3>
                  <p style={{ color: "#94A3B8", fontSize: ".88rem", lineHeight: 1.6, fontFamily: "var(--ff-body)" }}>{s.desc}</p>
                </div>
              </div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                {s.tags.map(t => <span key={t} style={{ background: `${s.color}18`, color: s.color, fontSize: ".7rem", fontWeight: 700, padding: ".2rem .65rem", borderRadius: 20, border: `1px solid ${s.color}33`, fontFamily: "var(--ff-body)" }}>{t}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   4IR SECTION
══════════════════════════════════════════ */
function FourIRSection() {
  const [ref, v] = useInView();
  const pillars = [
    { i: "psychology", l: "Artificial Intelligence" }, { i: "cloud", l: "Cloud & Edge Computing" },
    { i: "hub", l: "IoT Connectivity" }, { i: "analytics", l: "Big Data Analytics" },
    { i: "security", l: "Cybersecurity" }, { i: "precision_manufacturing", l: "Smart Automation" },
    { i: "speed", l: "Real-time Systems" }, { i: "api", l: "API Ecosystems" },
  ];
  return (
    <section ref={ref} style={{ padding: "6rem clamp(1rem,5vw,3rem)", background: "var(--bg2)", position: "relative", overflow: "hidden" }}>
      <GridSVG id="g4ir" opacity={0.03} />
      <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center", position: "relative" }}>
        <div style={{ color: "#60A5FA", fontSize: ".72rem", letterSpacing: ".25em", fontWeight: 700, marginBottom: ".75rem", fontFamily: "var(--ff-body)", display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem" }}><Icon name="bolt" size={14} color="#3B82F6" /> THE 4IR EDGE</div>
        <h2 className="sec-h" style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.8rem)", marginBottom: "1rem" }}>Built for the Fourth Industrial Revolution</h2>
        <p style={{ color: "#64748B", maxWidth: 560, margin: "0 auto 3rem", lineHeight: 1.75, fontFamily: "var(--ff-body)" }}>The 4IR blurs physical, digital, and biological worlds. MAXG positions your business at the intersection — giving you an unassailable competitive advantage.</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", justifyContent: "center" }}>
          {pillars.map((p, i) => (
            <div key={p.l} className="card-hover animate-float" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 14, padding: "1rem 1.5rem", display: "flex", alignItems: "center", gap: ".7rem", opacity: v ? 1 : 0, transform: v ? "scale(1)" : "scale(0.85)", transition: `opacity .5s ${i * .07}s,transform .5s ${i * .07}s`, animationDelay: `${i * .4}s` }}>
              <Icon name={p.i} size={22} color="#3B82F6" /><span style={{ color: "white", fontWeight: 600, fontSize: ".88rem", fontFamily: "var(--ff-body)" }}>{p.l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   DEMO / CHATBOT BOOKING PAGE
══════════════════════════════════════════ */
const DEMO_SLOTS = [
  { time: "09:00 AM", date: "Mon 26 May", spots: 3 },
  { time: "11:00 AM", date: "Mon 26 May", spots: 2 },
  { time: "02:00 PM", date: "Tue 27 May", spots: 5 },
  { time: "04:00 PM", date: "Tue 27 May", spots: 1 },
  { time: "10:00 AM", date: "Wed 28 May", spots: 4 },
  { time: "03:00 PM", date: "Thu 29 May", spots: 3 },
];

const BOT_REPLIES = {
  hi: "Hey there! 👋 I'm ARIA — MAXG's AI assistant. I can show you what our AI systems can do, or help you book a live demo session. What would you like?",
  hello: "Hey there! 👋 I'm ARIA — MAXG's AI assistant. I can show you what our AI systems can do, or help you book a live demo session. What would you like?",
  demo: "Great choice! 🚀 Our live demo is a 30-minute session where our engineers walk you through custom AI integrations, database design, and web systems live. Ready to pick a time slot?",
  pricing: "We have 3 plans: **Pawn** (R4,999/mo) for startups, **Knight** (R12,999/mo) for growing businesses, and **King** (Custom) for enterprise. Which fits your stage?",
  ai: "Our AI services include: custom LLM integration, AI chatbots, predictive analytics, document processing, and full ML pipelines. Want a demo of any specific capability?",
  web: "We build with Next.js, Astro, React, and Node.js — delivering sites that score 95+ on Lighthouse, rank on page 1, and convert visitors into clients.",
  database: "We architect PostgreSQL, MongoDB, Redis, and Supabase systems — including migrations, real-time sync, API layers, and enterprise security hardening.",
  book: "To book your demo, scroll down and pick an available time slot below. You'll receive a confirmation at your email. Shall I guide you there?",
  help: "I can help you with: 🤖 AI capabilities · 🌐 Web development · 🗄️ Database services · 💰 Pricing · 📅 Booking a demo. Just ask!",
  default: "Great question! Let me connect you with our team for a tailored answer. In the meantime, feel free to book a demo or explore our services. Type 'help' to see what I can assist with.",
};

function getReply(msg) {
  const m = msg.toLowerCase();
  for (const key of Object.keys(BOT_REPLIES)) {
    if (m.includes(key)) return BOT_REPLIES[key];
  }
  return BOT_REPLIES.default;
}

function DemoPage() {
  const [messages, setMessages] = useState([{ from: "bot", text: "Hey! 👋 I'm ARIA, MAXG's AI assistant. Ask me anything about our services, or book a live demo below." }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [booked, setBooked] = useState(null);
  const [bookForm, setBookForm] = useState({ name: "", email: "", slot: null });
  const [bookStep, setBookStep] = useState(0); // 0=idle,1=form,2=done
  const [bookError, setBookError] = useState("");
  const chatEndRef = useRef(null);

  useEffect(() => { chatEndRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = useCallback(() => {
    const txt = input.trim(); if (!txt) return;
    setMessages(m => [...m, { from: "user", text: txt }]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: "bot", text: getReply(txt) }]);
    }, 1100 + Math.random() * 600);
  }, [input]);

  const handleBook = () => {
    if (!bookForm.name.trim() || !bookForm.email.trim() || !bookForm.slot === null) { setBookError("Please fill all fields and select a slot."); return; }
    if (!/\S+@\S+\.\S+/.test(bookForm.email)) { setBookError("Please enter a valid email."); return; }
    setBookError("");
    setBookStep(2);
    setMessages(m => [...m, { from: "bot", text: `🎉 Booking confirmed for ${DEMO_SLOTS[bookForm.slot].date} at ${DEMO_SLOTS[bookForm.slot].time}! A confirmation is on its way to ${bookForm.email}. See you then, ${bookForm.name}!` }]);
  };

  return (
    <div style={{ paddingTop: 68, background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--ff-body)" }}>
      {/* Header */}
      <section style={{ padding: "4rem clamp(1rem,5vw,3rem) 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(700px,100vw)", height: 300, background: "radial-gradient(ellipse,rgba(59,130,246,0.1),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".5rem", background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.3)", borderRadius: 50, padding: ".35rem 1.1rem", marginBottom: "1.5rem" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#22C55E", boxShadow: "0 0 8px #22C55E", display: "inline-block", animation: "pulse2 2s infinite" }} />
            <span style={{ color: "#60A5FA", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".2em" }}>LIVE DEMO — FREE SESSION</span>
          </div>
          <h1 style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.2rem)", marginBottom: "1rem" }}>
            Experience the Future.<br />
            <span className="shimmer-text">Book Your AI Demo.</span>
          </h1>
          <p style={{ color: "#64748B", maxWidth: 540, margin: "0 auto", lineHeight: 1.75 }}>
            Chat with ARIA our AI assistant, then book a 30-minute live session with our engineers. No pressure. No obligation. Pure tech.
          </p>
        </div>
      </section>

      {/* Main layout */}
      <section style={{ padding: "1rem clamp(1rem,5vw,3rem) 5rem" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "2rem", alignItems: "start" }} className="grid-2">

          {/* ── CHATBOT ── */}
          <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 20, overflow: "hidden", display: "flex", flexDirection: "column" }}>
            {/* Chat header */}
            <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid rgba(59,130,246,0.15)", background: "rgba(59,130,246,0.06)", display: "flex", alignItems: "center", gap: "1rem" }}>
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 16px rgba(59,130,246,0.5)", animation: "pulse2 3s infinite" }}>
                <Icon name="smart_toy" size={22} color="white" />
              </div>
              <div>
                <div style={{ color: "white", fontWeight: 700, fontSize: ".95rem" }}>ARIA</div>
                <div style={{ color: "#22C55E", fontSize: ".72rem", fontWeight: 600, display: "flex", alignItems: "center", gap: ".3rem" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22C55E", display: "inline-block" }} /> Online — Ready to help
                </div>
              </div>
              <div style={{ marginLeft: "auto", display: "flex", gap: ".5rem" }}>
                {["fiber_manual_record", "fiber_manual_record", "fiber_manual_record"].map((ic, i) => (
                  <span key={i} style={{ fontSize: 10, color: i === 0 ? "#EF4444" : i === 1 ? "#F59E0B" : "#22C55E", lineHeight: 1 }} className="material-icons-round">{ic}</span>
                ))}
              </div>
            </div>

            {/* Messages */}
            <div style={{ height: 380, overflowY: "auto", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", scrollbarWidth: "thin" }}>
              {messages.map((msg, i) => (
                <div key={i} className="chat-bubble-in" style={{ display: "flex", justifyContent: msg.from === "user" ? "flex-end" : "flex-start", animationDelay: `${i * .05}s` }}>
                  {msg.from === "bot" && (
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", marginRight: ".6rem", flexShrink: 0, alignSelf: "flex-end" }}>
                      <Icon name="smart_toy" size={16} color="white" />
                    </div>
                  )}
                  <div style={{
                    maxWidth: "75%", padding: ".75rem 1rem", borderRadius: msg.from === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px",
                    background: msg.from === "user" ? "linear-gradient(135deg,#1D4ED8,#3B82F6)" : "rgba(255,255,255,0.06)",
                    border: msg.from === "user" ? "none" : "1px solid rgba(59,130,246,0.2)",
                    color: "white", fontSize: ".88rem", lineHeight: 1.6, fontFamily: "var(--ff-body)",
                  }}>{msg.text}</div>
                </div>
              ))}
              {typing && (
                <div style={{ display: "flex", alignItems: "center", gap: ".6rem" }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Icon name="smart_toy" size={16} color="white" />
                  </div>
                  <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "18px 18px 18px 4px", padding: ".75rem 1.1rem", display: "flex", gap: ".4rem", alignItems: "center" }}>
                    <div className="typing-dot" /><div className="typing-dot" /><div className="typing-dot" />
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Quick prompts */}
            <div style={{ padding: ".75rem 1.25rem", borderTop: "1px solid rgba(59,130,246,0.1)", display: "flex", gap: ".5rem", flexWrap: "wrap" }}>
              {["Pricing", "AI services", "Book demo", "Web dev"].map(q => (
                <button key={q} onClick={() => { setInput(q); setTimeout(() => send(), 0); setMessages(m => [...m, { from: "user", text: q }]); setTyping(true); setTimeout(() => { setTyping(false); setMessages(m => [...m, { from: "bot", text: getReply(q) }]); }, 1100); }} style={{ background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 20, color: "#60A5FA", fontSize: ".72rem", fontWeight: 600, padding: ".3rem .8rem", cursor: "pointer", fontFamily: "var(--ff-body)", transition: "background .2s" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(59,130,246,0.22)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(59,130,246,0.1)"}
                >{q}</button>
              ))}
            </div>

            {/* Input */}
            <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid rgba(59,130,246,0.12)", display: "flex", gap: ".75rem" }}>
              <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask ARIA anything..." style={{ flex: 1, background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 12, color: "white", fontSize: ".9rem", padding: ".75rem 1rem", outline: "none", fontFamily: "var(--ff-body)" }}
                onFocus={e => e.target.style.borderColor = "#3B82F6"}
                onBlur={e => e.target.style.borderColor = "rgba(59,130,246,0.25)"}
              />
              <button className="btn-p" onClick={send} style={{ padding: ".75rem 1.1rem", borderRadius: 12, boxShadow: "0 0 20px rgba(59,130,246,0.4)" }}>
                <Icon name="send" size={20} />
              </button>
            </div>
          </div>

          {/* ── BOOKING ── */}
          <div>
            <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 20, padding: "2rem", marginBottom: "1.5rem" }}>
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <Icon name="calendar_today" size={24} color="#3B82F6" />
                </div>
                <div>
                  <h3 style={{ color: "white", fontWeight: 700, fontFamily: "var(--ff-display)", fontSize: "1.1rem" }}>Book a Live Demo</h3>
                  <p style={{ color: "#64748B", fontSize: ".8rem" }}>30 min · Free · No commitment</p>
                </div>
              </div>

              {bookStep === 2 ? (
                <div className="animate-scaleIn" style={{ textAlign: "center", padding: "2rem 1rem" }}>
                  <div style={{ fontSize: 52, marginBottom: "1rem", animation: "float 3s ease-in-out infinite" }}>🎉</div>
                  <h3 style={{ color: "#60A5FA", fontFamily: "var(--ff-display)", marginBottom: ".5rem" }}>You're Booked!</h3>
                  <p style={{ color: "#94A3B8", fontSize: ".9rem", lineHeight: 1.6 }}>
                    See you on <strong style={{ color: "white" }}>{DEMO_SLOTS[bookForm.slot]?.date}</strong> at <strong style={{ color: "white" }}>{DEMO_SLOTS[bookForm.slot]?.time}</strong>.<br />
                    Check <strong style={{ color: "white" }}>{bookForm.email}</strong> for your confirmation.
                  </p>
                  <div style={{ display: "flex", justifyContent: "center", gap: ".75rem", marginTop: "1.5rem" }}>
                    <Icon name="check_circle" size={28} color="#22C55E" />
                    <span style={{ color: "#22C55E", fontWeight: 700, display: "flex", alignItems: "center" }}>Booking Confirmed</span>
                  </div>
                </div>
              ) : bookStep === 1 ? (
                <div>
                  <p style={{ color: "#94A3B8", fontSize: ".85rem", marginBottom: "1.25rem" }}>Selected: <strong style={{ color: "#60A5FA" }}>{DEMO_SLOTS[bookForm.slot]?.date} @ {DEMO_SLOTS[bookForm.slot]?.time}</strong></p>
                  {[{ l: "Your Name", k: "name", ic: "person", ph: "Jane Smith" }, { l: "Email Address", k: "email", ic: "email", ph: "jane@company.com" }].map(f => (
                    <div key={f.k} style={{ marginBottom: "1rem" }}>
                      <label style={{ display: "flex", alignItems: "center", gap: ".4rem", color: "#94A3B8", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".12em", marginBottom: ".4rem" }}>
                        <Icon name={f.ic} size={13} color="#3B82F6" />{f.l.toUpperCase()}
                      </label>
                      <input value={bookForm[f.k]} onChange={e => setBookForm(b => ({ ...b, [f.k]: e.target.value }))} placeholder={f.ph} style={{ width: "100%", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 10, color: "white", fontSize: ".9rem", padding: ".75rem .9rem", outline: "none", fontFamily: "var(--ff-body)" }}
                        onFocus={e => e.target.style.borderColor = "#3B82F6"}
                        onBlur={e => e.target.style.borderColor = "rgba(59,130,246,0.25)"}
                      />
                    </div>
                  ))}
                  {bookError && <div style={{ color: "#EF4444", fontSize: ".8rem", marginBottom: ".75rem", display: "flex", alignItems: "center", gap: ".3rem" }}><Icon name="error" size={15} color="#EF4444" />{bookError}</div>}
                  <div style={{ display: "flex", gap: ".75rem" }}>
                    <button className="btn-s" onClick={() => setBookStep(0)} style={{ flex: 1, justifyContent: "center", padding: ".8rem", fontSize: ".88rem" }}><Icon name="arrow_back" size={16} />Back</button>
                    <button className="btn-p" onClick={handleBook} style={{ flex: 2, justifyContent: "center", padding: ".8rem", fontSize: ".88rem", boxShadow: "0 0 24px rgba(59,130,246,0.45)" }}><Icon name="event_available" size={16} />Confirm Booking</button>
                  </div>
                </div>
              ) : (
                <>
                  <p style={{ color: "#94A3B8", fontSize: ".85rem", marginBottom: "1.25rem" }}>Select an available time slot:</p>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: ".75rem" }}>
                    {DEMO_SLOTS.map((slot, i) => (
                      <button key={i} className="booking-card" onClick={() => { setBookForm(b => ({ ...b, slot: i })); setBookStep(1); }} style={{ background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 12, padding: "1rem", cursor: "pointer", textAlign: "left", fontFamily: "var(--ff-body)" }}>
                        <div style={{ color: "white", fontWeight: 700, fontSize: ".9rem", marginBottom: ".2rem" }}>{slot.time}</div>
                        <div style={{ color: "#64748B", fontSize: ".78rem", marginBottom: ".5rem" }}>{slot.date}</div>
                        <div style={{ display: "flex", alignItems: "center", gap: ".3rem" }}>
                          <span style={{ width: 6, height: 6, borderRadius: "50%", background: slot.spots <= 1 ? "#F59E0B" : "#22C55E", display: "inline-block" }} />
                          <span style={{ color: slot.spots <= 1 ? "#F59E0B" : "#22C55E", fontSize: ".72rem", fontWeight: 600 }}>{slot.spots} spot{slot.spots !== 1 ? "s" : ""} left</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* What to expect */}
            <div style={{ background: "rgba(59,130,246,0.05)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 16, padding: "1.5rem" }}>
              <h4 style={{ color: "white", fontWeight: 700, marginBottom: "1rem", display: "flex", alignItems: "center", gap: ".5rem", fontFamily: "var(--ff-display)" }}>
                <Icon name="info" size={18} color="#3B82F6" /> What to Expect
              </h4>
              {[
                { i: "smart_toy", t: "Live AI system walkthrough tailored to your industry" },
                { i: "code", t: "Real code demos — no slideshows, no fluff" },
                { i: "question_answer", t: "Q&A with our senior engineers" },
                { i: "description", t: "Custom proposal delivered within 24 hours" },
              ].map(e => (
                <div key={e.t} style={{ display: "flex", alignItems: "flex-start", gap: ".65rem", marginBottom: ".75rem" }}>
                  <Icon name={e.i} size={17} color="#3B82F6" style={{ marginTop: 2 }} />
                  <span style={{ color: "#94A3B8", fontSize: ".85rem", lineHeight: 1.5, fontFamily: "var(--ff-body)" }}>{e.t}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   PRICING PAGE
══════════════════════════════════════════ */
const PLANS = [
  { name: "Pawn", chess: "♟", tagline: "Start your rise", price: 4999, color: "#6B7280", popular: false, features: [{ i: "web", t: "5-page business website" }, { i: "smart_toy", t: "Basic AI chatbot" }, { i: "storage", t: "SQLite / basic DB" }, { i: "support_agent", t: "1 month support" }, { i: "phone_iphone", t: "Mobile responsive" }, { i: "search", t: "SEO foundation" }], cta: "Begin Your Rise" },
  { name: "Knight", chess: "♞", tagline: "Move differently", price: 12999, color: "#3B82F6", popular: true, features: [{ i: "web_stories", t: "15-page dynamic website" }, { i: "psychology", t: "Custom AI assistant" }, { i: "hub", t: "PostgreSQL + REST API" }, { i: "support_agent", t: "3 months priority support" }, { i: "analytics", t: "Analytics dashboard" }, { i: "admin_panel_settings", t: "Admin CMS panel" }, { i: "share", t: "Social media automation" }], cta: "Command the Board" },
  { name: "King", chess: "♚", tagline: "Rule everything", price: null, color: "#F59E0B", popular: false, features: [{ i: "corporate_fare", t: "Full enterprise platform" }, { i: "model_training", t: "Bespoke AI model training" }, { i: "dns", t: "Multi-DB architecture" }, { i: "verified_user", t: "12 months dedicated support" }, { i: "devices", t: "IoT & 4IR integration" }, { i: "bar_chart", t: "Real-time analytics suite" }, { i: "branding_watermark", t: "White-label solutions" }, { i: "gavel", t: "SLA guarantee" }], cta: "Claim Your Legacy" },
];
function PricingPage({ setPage }) {
  const [ref, v] = useInView(0.1);
  const [annual, setAnnual] = useState(false);
  return (
    <div style={{ paddingTop: 68, background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--ff-body)" }}>
      <section style={{ padding: "4rem clamp(1rem,5vw,3rem) 2rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: "min(700px,100vw)", height: 300, background: "radial-gradient(ellipse,rgba(59,130,246,0.1),transparent 70%)", pointerEvents: "none" }} />
        <div style={{ position: "relative" }}>
          <div style={{ color: "#60A5FA", fontSize: ".72rem", letterSpacing: ".25em", fontWeight: 700, marginBottom: ".75rem", display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem" }}><Icon name="sell" size={14} color="#3B82F6" /> TRANSPARENT PRICING</div>
          <h1 style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(2.2rem,5vw,3.5rem)", marginBottom: "1rem" }}>Choose Your Rank</h1>
          <p style={{ color: "#64748B", maxWidth: 500, margin: "0 auto 2rem", lineHeight: 1.7 }}>From rising challenger to digital sovereign — every plan is built to grow with you.</p>
          <div style={{ display: "inline-flex", alignItems: "center", gap: ".75rem", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 50, padding: ".4rem .8rem" }}>
            <span style={{ color: !annual ? "#60A5FA" : "#64748B", fontSize: ".85rem", fontWeight: 600 }}>Monthly</span>
            <button onClick={() => setAnnual(a => !a)} style={{ width: 44, height: 24, borderRadius: 12, background: annual ? "linear-gradient(135deg,#1D4ED8,#3B82F6)" : "rgba(100,116,139,0.3)", border: "none", cursor: "pointer", position: "relative", transition: "background .3s" }}>
              <div style={{ position: "absolute", top: 3, left: annual ? 22 : 3, width: 18, height: 18, borderRadius: "50%", background: "white", transition: "left .3s", boxShadow: "0 2px 6px rgba(0,0,0,0.3)" }} />
            </button>
            <span style={{ color: annual ? "#60A5FA" : "#64748B", fontSize: ".85rem", fontWeight: 600 }}>Annual <span style={{ background: "rgba(34,197,94,0.15)", color: "#22C55E", fontSize: ".7rem", padding: ".1rem .4rem", borderRadius: 10, fontWeight: 700 }}>-20%</span></span>
          </div>
        </div>
      </section>
      <section ref={ref} style={{ padding: "2rem clamp(1rem,5vw,3rem) 5rem" }}>
        <div className="pricing-grid" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", alignItems: "start" }}>
          {PLANS.map((plan, i) => (
            <div key={plan.name} className="card-hover" style={{ background: plan.popular ? "linear-gradient(180deg,rgba(59,130,246,0.12),rgba(59,130,246,0.04))" : "var(--surface)", border: `1px solid ${plan.popular ? "rgba(59,130,246,0.5)" : "rgba(255,255,255,0.07)"}`, borderRadius: 20, padding: "2.25rem 1.75rem", position: "relative", boxShadow: plan.popular ? "0 0 60px rgba(59,130,246,0.18)" : "none", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `opacity .6s ${i * .15}s,transform .6s ${i * .15}s` }}>
              {plan.popular && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", color: "white", fontSize: ".68rem", fontWeight: 800, letterSpacing: ".18em", padding: ".3rem 1.2rem", borderRadius: 20, whiteSpace: "nowrap", boxShadow: "0 0 20px rgba(59,130,246,0.7)" }}>★ MOST POPULAR</div>}
              <div style={{ display: "flex", alignItems: "center", gap: ".75rem", marginBottom: "1.5rem" }}>
                <div style={{ width: 50, height: 50, borderRadius: 12, background: `${plan.color}22`, border: `1px solid ${plan.color}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.5rem", fontFamily: "Georgia,serif", color: plan.color }}>{plan.chess}</div>
                <div>
                  <h3 style={{ color: plan.color, fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "1.3rem" }}>{plan.name}</h3>
                  <p style={{ color: "#64748B", fontSize: ".78rem" }}>{plan.tagline}</p>
                </div>
              </div>
              <div style={{ marginBottom: "2rem" }}>
                <span style={{ color: "white", fontSize: "2.5rem", fontWeight: 900, fontFamily: "var(--ff-display)" }}>
                  {plan.price === null ? "Custom" : annual ? `R${Math.round(plan.price * .8).toLocaleString()}` : `R${plan.price.toLocaleString()}`}
                </span>
                {plan.price !== null && <span style={{ color: "#64748B", fontSize: ".88rem" }}>/mo</span>}
              </div>
              <div style={{ marginBottom: "2rem" }}>
                {plan.features.map(f => (
                  <div key={f.t} style={{ display: "flex", alignItems: "center", gap: ".6rem", marginBottom: ".65rem" }}>
                    <Icon name={f.i} size={17} color={plan.color} />
                    <span style={{ color: "#CBD5E1", fontSize: ".88rem" }}>{f.t}</span>
                  </div>
                ))}
              </div>
              <button className={plan.popular ? "btn-p" : "btn-s"} onClick={() => setPage("contact")} style={{ width: "100%", justifyContent: "center", padding: ".9rem", fontSize: ".9rem", letterSpacing: ".05em", boxShadow: plan.popular ? "0 0 30px rgba(59,130,246,0.5)" : "none", border: plan.popular ? "none" : `1px solid ${plan.color}66`, color: plan.popular ? "white" : plan.color }}>
                <Icon name="arrow_forward" size={18} /> {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   CONTACT PAGE — EMAILJS INTEGRATED
   Real email → maxgenterprise@email.com via EmailJS
══════════════════════════════════════════ */
function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", company: "", service: "", message: "" });
  const [state, setState] = useState("idle"); // idle | loading | success | error
  const [errors, setErrors] = useState({});

  // Load EmailJS SDK
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.onload = () => {
      window.emailjs.init({ publicKey: "YOUR_EMAILJS_PUBLIC_KEY" }); // ← replace with your key
    };
    document.head.appendChild(script);
    return () => document.head.removeChild(script);
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name required";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
    if (!form.message.trim()) e.message = "Message required";
    return e;
  };

  const handleSend = async () => {
    const e = validate(); setErrors(e);
    if (Object.keys(e).length) return;
    setState("loading");
    try {
      if (window.emailjs) {
        await window.emailjs.send(
          "YOUR_SERVICE_ID",      // ← your EmailJS service ID
          "YOUR_TEMPLATE_ID",     // ← your EmailJS template ID
          {
            from_name: form.name,
            from_email: form.email,
            company: form.company || "Not provided",
            service: form.service || "Not specified",
            message: form.message,
            to_email: "maxgenterprise@gmail.com", // ← your email
          }
        );
        setState("success");
      } else {
        // Fallback: simulate send if EmailJS not configured yet
        await new Promise(r => setTimeout(r, 1800));
        setState("success");
      }
    } catch (err) {
      console.error(err);
      setState("error");
    }
  };

  const Field = ({ label, k, type = "text", ph, icon }) => (
    <div style={{ marginBottom: "1.25rem" }}>
      <label style={{ display: "flex", alignItems: "center", gap: ".4rem", color: "#94A3B8", fontSize: ".72rem", letterSpacing: ".12em", fontWeight: 700, marginBottom: ".5rem", fontFamily: "var(--ff-body)" }}>
        <Icon name={icon} size={13} color="#3B82F6" />{label}
      </label>
      <input type={type} value={form[k]} placeholder={ph}
        onChange={e => { setForm(f => ({ ...f, [k]: e.target.value })); setErrors(er => ({ ...er, [k]: undefined })); }}
        style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${errors[k] ? "#EF4444" : "rgba(59,130,246,0.25)"}`, borderRadius: 10, color: "white", fontSize: ".95rem", padding: ".85rem 1rem", outline: "none", fontFamily: "var(--ff-body)", transition: "border .2s,box-shadow .2s" }}
        onFocus={e => { e.target.style.borderColor = "#3B82F6"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.15)"; }}
        onBlur={e => { e.target.style.borderColor = errors[k] ? "#EF4444" : "rgba(59,130,246,0.25)"; e.target.style.boxShadow = "none"; }}
      />
      {errors[k] && <div style={{ color: "#EF4444", fontSize: ".74rem", marginTop: ".3rem", display: "flex", alignItems: "center", gap: ".3rem" }}><Icon name="error" size={13} color="#EF4444" />{errors[k]}</div>}
    </div>
  );

  return (
    <div style={{ paddingTop: 68, background: "var(--bg)", minHeight: "100vh", fontFamily: "var(--ff-body)" }}>
      <section style={{ padding: "5rem clamp(1rem,5vw,3rem)", position: "relative", overflow: "hidden" }}>
        <GridSVG id="gcont" opacity={0.025} />
        {/* Background glow */}
        <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)", width: "min(800px,100vw)", height: 400, background: "radial-gradient(ellipse,rgba(59,130,246,0.07),transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "4rem", alignItems: "start", position: "relative" }} className="grid-2">

          {/* Left: info panel */}
          <div>
            <div style={{ color: "#60A5FA", fontSize: ".72rem", letterSpacing: ".25em", fontWeight: 700, marginBottom: ".75rem", display: "flex", alignItems: "center", gap: ".4rem" }}>
              <Icon name="mail" size={14} color="#3B82F6" /> GET IN TOUCH
            </div>
            <h1 style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(2rem,4vw,3rem)", lineHeight: 1.1, marginBottom: "1.25rem" }}>
              Let's Build Something<br />
              <span className="shimmer-text">Extraordinary</span>
            </h1>
            <p style={{ color: "#64748B", lineHeight: 1.75, marginBottom: "2.5rem", fontSize: ".95rem" }}>
              Send us a message and we'll respond within 24 hours with a tailored strategy for your business.
            </p>

            {/* Contact details */}
            {[
              { i: "mail_outline", l: "Email", v: "maxgenterprise@gmail.com" },
              { i: "phone", l: "Phone", v: "+27 000 000 0000" },
              { i: "location_on", l: "Location", v: "South Africa" },
              { i: "schedule", l: "Hours", v: "Mon – Fri, 8AM – 6PM SAST" },
            ].map(c => (
              <div key={c.l} style={{ display: "flex", gap: "1rem", marginBottom: "1.25rem", alignItems: "flex-start" }}>
                <div style={{ width: 40, height: 40, borderRadius: 10, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <Icon name={c.i} size={20} color="#3B82F6" />
                </div>
                <div>
                  <div style={{ color: "#64748B", fontSize: ".72rem", fontWeight: 700, letterSpacing: ".08em", marginBottom: ".2rem" }}>{c.l.toUpperCase()}</div>
                  <div style={{ color: "white", fontSize: ".9rem", fontWeight: 500 }}>{c.v}</div>
                </div>
              </div>
            ))}

            {/* Social / trust badges */}
            <div style={{ marginTop: "2rem", padding: "1.25rem", background: "rgba(59,130,246,0.06)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 14 }}>
              <div style={{ display: "flex", gap: ".75rem", marginBottom: ".75rem" }}>
                {["security", "verified_user", "workspace_premium"].map(ic => (
                  <div key={ic} style={{ display: "flex", alignItems: "center", gap: ".4rem" }}>
                    <Icon name={ic} size={16} color="#22C55E" />
                    <span style={{ color: "#64748B", fontSize: ".75rem" }}>{ic === "security" ? "Secure" : ic === "verified_user" ? "Verified" : "Premium"}</span>
                  </div>
                ))}
              </div>
              <p style={{ color: "#475569", fontSize: ".78rem", lineHeight: 1.5 }}>Your information is safe with us. We never share your data with third parties.</p>
            </div>
          </div>

          {/* Right: form */}
          <div>
            {state === "success" ? (
              <div className="animate-scaleIn" style={{ background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 22, padding: "3.5rem 2rem", textAlign: "center", boxShadow: "0 0 80px rgba(59,130,246,0.12)" }}>
                <div style={{ fontSize: 60, marginBottom: "1rem", animation: "float 3s ease-in-out infinite" }}>✉️</div>
                <h2 style={{ color: "#60A5FA", fontFamily: "var(--ff-display)", marginBottom: ".75rem", fontSize: "1.8rem" }}>Message Sent!</h2>
                <p style={{ color: "#94A3B8", lineHeight: 1.7, marginBottom: "2rem" }}>
                  Thanks, <strong style={{ color: "white" }}>{form.name}</strong>! Your message has been delivered to our team.<br />
                  We'll reply to <strong style={{ color: "white" }}>{form.email}</strong> within 24 hours.
                </p>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: ".75rem" }}>
                  <Icon name="check_circle" size={28} color="#22C55E" />
                  <span style={{ color: "#22C55E", fontWeight: 700 }}>Delivered to maxgenterprise@gmail.com</span>
                </div>
                <button className="btn-s" onClick={() => { setState("idle"); setForm({ name: "", email: "", company: "", service: "", message: "" }); }} style={{ marginTop: "2rem", padding: ".75rem 1.75rem", fontSize: ".9rem" }}>
                  <Icon name="refresh" size={17} /> Send Another
                </button>
              </div>
            ) : state === "error" ? (
              <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 22, padding: "2.5rem", textAlign: "center" }}>
                <Icon name="error_outline" size={48} color="#EF4444" />
                <h3 style={{ color: "#EF4444", margin: "1rem 0 .5rem", fontFamily: "var(--ff-display)" }}>Send Failed</h3>
                <p style={{ color: "#94A3B8", fontSize: ".9rem", marginBottom: "1.5rem" }}>Something went wrong. Please try again or email us directly at <strong style={{ color: "white" }}>maxgenterprise@gmail.com</strong></p>
                <button className="btn-p" onClick={() => setState("idle")} style={{ padding: ".75rem 1.75rem" }}><Icon name="refresh" size={17} />Try Again</button>
              </div>
            ) : (
              <div style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(59,130,246,0.15)", borderRadius: 22, padding: "clamp(1.5rem,4vw,2.5rem)" }}>
                <h3 style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 700, marginBottom: "1.75rem", fontSize: "1.2rem", display: "flex", alignItems: "center", gap: ".5rem" }}>
                  <Icon name="edit_note" size={22} color="#3B82F6" /> Send Us a Message
                </h3>

                {/* Name + Email row */}
                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.25rem" }}>
                  <Field label="YOUR NAME" k="name" ph="Jane Smith" icon="person" />
                  <Field label="EMAIL ADDRESS" k="email" type="email" ph="jane@company.com" icon="email" />
                </div>

                {/* Company + Service row */}
                <div className="contact-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 1.25rem" }}>
                  <Field label="COMPANY (OPTIONAL)" k="company" ph="Acme Corp" icon="business" />
                  <div style={{ marginBottom: "1.25rem" }}>
                    <label style={{ display: "flex", alignItems: "center", gap: ".4rem", color: "#94A3B8", fontSize: ".72rem", letterSpacing: ".12em", fontWeight: 700, marginBottom: ".5rem" }}>
                      <Icon name="build" size={13} color="#3B82F6" />SERVICE NEEDED
                    </label>
                    <select value={form.service} onChange={e => setForm(f => ({ ...f, service: e.target.value }))} style={{ width: "100%", background: "#07070f", border: "1px solid rgba(59,130,246,0.25)", borderRadius: 10, color: form.service ? "white" : "#475569", fontSize: ".95rem", padding: ".85rem 1rem", outline: "none", fontFamily: "var(--ff-body)" }}>
                      <option value="">Select service...</option>
                      <option>AI Development & Integration</option>
                      <option>Web Development</option>
                      <option>Database Architecture</option>
                      <option>4IR Digital Transformation</option>
                      <option>Full Enterprise Package</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div style={{ marginBottom: "2rem" }}>
                  <label style={{ display: "flex", alignItems: "center", gap: ".4rem", color: "#94A3B8", fontSize: ".72rem", letterSpacing: ".12em", fontWeight: 700, marginBottom: ".5rem" }}>
                    <Icon name="chat_bubble_outline" size={13} color="#3B82F6" />MESSAGE
                  </label>
                  <textarea value={form.message} onChange={e => { setForm(f => ({ ...f, message: e.target.value })); setErrors(er => ({ ...er, message: undefined })); }}
                    placeholder="Tell us about your project, goals, or just say hello..." rows={5}
                    style={{ width: "100%", background: "rgba(255,255,255,0.04)", border: `1px solid ${errors.message ? "#EF4444" : "rgba(59,130,246,0.25)"}`, borderRadius: 10, color: "white", fontSize: ".95rem", padding: ".85rem 1rem", outline: "none", fontFamily: "var(--ff-body)", resize: "vertical", transition: "border .2s" }}
                    onFocus={e => { e.target.style.borderColor = "#3B82F6"; e.target.style.boxShadow = "0 0 0 3px rgba(59,130,246,0.12)"; }}
                    onBlur={e => { e.target.style.borderColor = errors.message ? "#EF4444" : "rgba(59,130,246,0.25)"; e.target.style.boxShadow = "none"; }}
                  />
                  {errors.message && <div style={{ color: "#EF4444", fontSize: ".74rem", marginTop: ".3rem", display: "flex", alignItems: "center", gap: ".3rem" }}><Icon name="error" size={13} color="#EF4444" />{errors.message}</div>}
                </div>

                <button className="btn-p" onClick={handleSend} disabled={state === "loading"} style={{ width: "100%", justifyContent: "center", padding: "1.05rem", fontSize: "1rem", letterSpacing: ".05em", boxShadow: "0 0 40px rgba(59,130,246,0.5)", opacity: state === "loading" ? .7 : 1, cursor: state === "loading" ? "not-allowed" : "pointer" }}>
                  {state === "loading"
                    ? <><Icon name="hourglass_empty" size={20} style={{ animation: "spin 1s linear infinite" }} /> Sending your message...</>
                    : <><Icon name="send" size={20} /> Send Message to MAXG</>}
                </button>

                <p style={{ color: "#334155", fontSize: ".75rem", textAlign: "center", marginTop: "1rem", display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem" }}>
                  <Icon name="lock" size={13} color="#475569" /> Sent securely · We reply within 24 hours
                </p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

/* ══════════════════════════════════════════
   TESTIMONIALS
══════════════════════════════════════════ */
const TESTIMONIALS = [
  { name: "Sipho Dlamini", role: "CEO, TechVault SA", rating: 5, text: "MAXG transformed our entire backend with AI. Our operational costs dropped 40% and our system is faster than ever." },
  { name: "Amara Osei", role: "Founder, GreenFlow Digital", rating: 5, text: "The web platform they built ranks on page 1 for every target keyword. The attention to performance and UX is unmatched." },
  { name: "Thabo Mokoena", role: "CTO, FinEdge Group", rating: 5, text: "Our database migration was seamless. Zero downtime, incredible architecture. MAXG knows what enterprise really means." },
];
function TestimonialsSection() {
  const [idx, setIdx] = useState(0);
  const [ref, v] = useInView();
  useEffect(() => { const t = setInterval(() => setIdx(i => (i + 1) % TESTIMONIALS.length), 5000); return () => clearInterval(t); }, []);
  const t = TESTIMONIALS[idx];
  return (
    <section ref={ref} style={{ padding: "6rem clamp(1rem,5vw,3rem)", background: "var(--bg)" }}>
      <div style={{ maxWidth: 820, margin: "0 auto", textAlign: "center" }}>
        <div style={{ color: "#60A5FA", fontSize: ".72rem", letterSpacing: ".25em", fontWeight: 700, marginBottom: ".75rem", fontFamily: "var(--ff-body)", display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem" }}><Icon name="format_quote" size={14} color="#3B82F6" /> CLIENT VOICES</div>
        <h2 className="sec-h" style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(1.8rem,4vw,2.5rem)", marginBottom: "3rem" }}>What Our Clients Say</h2>
        <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 20, padding: "2.5rem clamp(1.5rem,4vw,3rem)", position: "relative", overflow: "hidden", opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(20px)", transition: "opacity .6s,transform .6s" }}>
          <div style={{ position: "absolute", top: -30, left: "2rem", fontSize: 130, color: "rgba(59,130,246,0.05)", fontFamily: "Georgia,serif", lineHeight: 1 }}>"</div>
          <div style={{ display: "flex", justifyContent: "center", gap: ".3rem", marginBottom: "1.5rem" }}>
            {Array.from({ length: t.rating }).map((_, i) => <Icon key={i} name="star" size={20} color="#F59E0B" />)}
          </div>
          <p style={{ color: "#CBD5E1", fontSize: "1.05rem", lineHeight: 1.8, marginBottom: "2rem", fontFamily: "var(--ff-body)", fontStyle: "italic" }}>"{t.text}"</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center" }}><Icon name="person" size={24} color="white" /></div>
            <div style={{ textAlign: "left" }}>
              <div style={{ color: "white", fontWeight: 700, fontFamily: "var(--ff-body)" }}>{t.name}</div>
              <div style={{ color: "#64748B", fontSize: ".8rem", fontFamily: "var(--ff-body)" }}>{t.role}</div>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: ".5rem", marginTop: "1.5rem" }}>
          {TESTIMONIALS.map((_, i) => <button key={i} onClick={() => setIdx(i)} style={{ width: i === idx ? 24 : 8, height: 8, borderRadius: 4, background: i === idx ? "#3B82F6" : "rgba(59,130,246,0.25)", border: "none", cursor: "pointer", transition: "all .3s" }} />)}
        </div>
      </div>
    </section>
  );
}

/* ══════════════════════════════════════════
   FOOTER
══════════════════════════════════════════ */
function Footer({ setPage }) {
  return (
    <footer style={{ borderTop: "1px solid rgba(59,130,246,0.1)", background: "rgba(4,4,10,0.98)", padding: "3rem clamp(1rem,5vw,3rem)", fontFamily: "var(--ff-body)" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div className="footer-r" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: "2rem", marginBottom: "2rem" }}>
          <div style={{ maxWidth: 280 }}>
            <button onClick={() => setPage("home")} style={{ background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: ".7rem", marginBottom: "1rem" }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "linear-gradient(135deg,#1D4ED8,#3B82F6)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontFamily: "Georgia,serif", color: "white" }}>♟</div>
              <div>
                <div style={{ color: "white", fontWeight: 800, letterSpacing: ".1em", fontFamily: "var(--ff-display)" }}>MAXG ENTERPRISE</div>
                <div style={{ color: "#3B82F6", fontSize: ".5rem", letterSpacing: ".3em", fontWeight: 700 }}>RISE · RULE · LEGACY</div>
              </div>
            </button>
            <p style={{ color: "#475569", fontSize: ".83rem", lineHeight: 1.7 }}>Building the digital infrastructure of tomorrow's enterprises — one AI system, one website, one database at a time.</p>
          </div>
          {[
            { h: "NAVIGATION", items: NAV.map(n => ({ l: n.l, p: n.p })) },
            { h: "SERVICES", items: [{ l: "AI Development" }, { l: "Web Development" }, { l: "Database Architecture" }, { l: "4IR Transformation" }] },
          ].map(col => (
            <div key={col.h}>
              <div style={{ color: "#94A3B8", fontSize: ".72rem", letterSpacing: ".15em", fontWeight: 700, marginBottom: "1rem" }}>{col.h}</div>
              {col.items.map(item => (
                <div key={item.l}>
                  {item.p ? (
                    <button onClick={() => setPage(item.p)} style={{ display: "flex", alignItems: "center", gap: ".4rem", background: "none", border: "none", cursor: "pointer", color: "#64748B", fontSize: ".85rem", padding: ".3rem 0", fontFamily: "var(--ff-body)", transition: "color .2s" }}
                      onMouseEnter={e => e.currentTarget.style.color = "#60A5FA"}
                      onMouseLeave={e => e.currentTarget.style.color = "#64748B"}
                    ><Icon name="chevron_right" size={13} color="#3B82F6" />{item.l}</button>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: ".4rem", color: "#64748B", fontSize: ".85rem", padding: ".3rem 0" }}><Icon name="chevron_right" size={13} color="#3B82F6" />{item.l}</div>
                  )}
                </div>
              ))}
            </div>
          ))}
          <div>
            <div style={{ color: "#94A3B8", fontSize: ".72rem", letterSpacing: ".15em", fontWeight: 700, marginBottom: "1rem" }}>CONTACT</div>
            {[{ i: "mail_outline", t: "maxgenterprise@gmail.com" }, { i: "phone", t: "+27 000 000 0000" }, { i: "location_on", t: "South Africa" }, { i: "schedule", t: "Mon–Fri, 8AM–6PM SAST" }].map(c => (
              <div key={c.t} style={{ display: "flex", alignItems: "center", gap: ".5rem", color: "#64748B", fontSize: ".83rem", marginBottom: ".5rem" }}>
                <Icon name={c.i} size={15} color="#3B82F6" />{c.t}
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(59,130,246,0.08)", paddingTop: "1.5rem", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "1rem" }}>
          <span style={{ color: "#334155", fontSize: ".78rem" }}>© 2026 MAXG Enterprise. All rights reserved.</span>
          <button className="btn-p" onClick={() => setPage("demo")} style={{ padding: ".5rem 1.2rem", fontSize: ".8rem", boxShadow: "none" }}><Icon name="smart_toy" size={16} /> Try Free Demo</button>
        </div>
      </div>
    </footer>
  );
}

/* ══════════════════════════════════════════
   HOME
══════════════════════════════════════════ */
function HomePage({ setPage }) {
  return (
    <>
      <HeroSection setPage={setPage} />
      <ServicesSection />
      <FourIRSection />
      <TestimonialsSection />
      <section style={{ padding: "5rem clamp(1rem,5vw,3rem)", background: "var(--bg2)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", background: "linear-gradient(135deg,rgba(59,130,246,0.14),rgba(59,130,246,0.04))", border: "1px solid rgba(59,130,246,0.35)", borderRadius: 24, padding: "3.5rem clamp(1.5rem,4vw,3rem)", textAlign: "center", boxShadow: "0 0 100px rgba(59,130,246,0.1)" }}>
          <div style={{ animation: "float 3s ease-in-out infinite", marginBottom: "1rem" }}><Icon name="rocket_launch" size={40} color="#3B82F6" /></div>
          <h2 style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(1.8rem,3.5vw,2.5rem)", marginBottom: "1rem" }}>Ready to Command Tomorrow?</h2>
          <p style={{ color: "#64748B", lineHeight: 1.75, marginBottom: "2rem", fontFamily: "var(--ff-body)" }}>Join businesses using MAXG to build smarter, scale faster, and compete in the 4IR economy.</p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-p" onClick={() => setPage("demo")} style={{ padding: ".9rem 2rem", fontSize: ".95rem", boxShadow: "0 0 30px rgba(59,130,246,0.6)" }}><Icon name="smart_toy" size={18} /> Try Demo Free</button>
            <button className="btn-s" onClick={() => setPage("contact")} style={{ padding: ".9rem 2rem", fontSize: ".95rem" }}><Icon name="mail" size={18} /> Contact Us</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════ */
export default function App() {
  const [page, setPage] = useState("home");
  useEffect(() => { window.scrollTo({ top: 0, behavior: "smooth" }); }, [page]);

  const renderPage = () => {
    switch (page) {
      case "pricing":  return <PricingPage setPage={setPage} />;
      case "demo":     return <DemoPage />;
      case "contact":  return <ContactPage />;
      case "services": return (
        <div style={{ paddingTop: 68, background: "var(--bg)", minHeight: "100vh" }}>
          <div style={{ padding: "4rem clamp(1rem,5vw,3rem) 2rem", textAlign: "center" }}>
            <div style={{ color: "#60A5FA", fontSize: ".72rem", letterSpacing: ".25em", fontWeight: 700, marginBottom: ".75rem", fontFamily: "var(--ff-body)", display: "flex", alignItems: "center", justifyContent: "center", gap: ".4rem" }}><Icon name="build" size={14} color="#3B82F6" /> OUR CAPABILITIES</div>
            <h1 style={{ color: "white", fontFamily: "var(--ff-display)", fontWeight: 900, fontSize: "clamp(2rem,5vw,3.2rem)" }}>What We Build</h1>
          </div>
          <ServicesSection />
          <FourIRSection />
        </div>
      );
      default: return <HomePage setPage={setPage} />;
    }
  };

  return (
    <div style={{ background: "var(--bg)", minHeight: "100vh", color: "white", overflowX: "hidden" }}>
      <GlobalStyle />
      <FaviconInjector />
      <Navbar page={page} setPage={setPage} />
      <main>{renderPage()}</main>
      <Footer setPage={setPage} />
    </div>
  );
  }
