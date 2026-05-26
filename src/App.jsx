/**
 * ARIA Chat Widget — Embeddable
 * ─────────────────────────────
 * Drop this script onto any website (plain HTML, WordPress, Webflow, Shopify, etc.)
 * It self-initialises and injects the floating FAB + chat modal into <body>.
 *
 * USAGE
 * ─────
 * <script src="aria-widget.js"></script>
 *
 * CUSTOMISE (optional) — set before the <script> tag:
 * <script>
 *   window.ARIAWidgetConfig = {
 *     botName:       "ARIA",                          // display name in header
 *     botSubtitle:   "MAXG AI Assistant · Online",    // status line
 *     accentColor:   "#3B82F6",                       // primary blue
 *     darkColor:     "#1D4ED8",                       // deep blue
 *     welcomeMsg:    "Hey! 👋 I'm ARIA …",
 *     quickReplies:  ["AI services","Pricing","Web dev","Database","Book demo","Help"],
 *     replies: {                                      // keyword → reply map
 *       hi:      "Hey there! 👋 …",
 *       default: "Great question! Let me connect you …",
 *     },
 *     slots: [                                        // booking time-slots
 *       { time:"09:00 AM", date:"Mon 26 May", spots:3 },
 *     ],
 *   };
 * </script>
 * <script src="aria-widget.js"></script>
 */

(function () {
  "use strict";

  /* ── Config merge ── */
  var cfg = Object.assign(
    {
      botName: "ARIA",
      botSubtitle: "MAXG AI Assistant · Online",
      social: {
        whatsapp:  "",
        instagram: "",
        facebook:  "",
        tiktok:    "",
        twitter:   "",
      },
      supportEmail: "support@maxg.co.za",
      accentColor: "#3B82F6",
      darkColor: "#1D4ED8",
      welcomeMsg:
        "Hey! 👋 I'm ARIA, MAXG's AI assistant. Ask me anything about our services, or type 'help' to see what I can do.",
      quickReplies: ["AI services", "Pricing", "Web dev", "Database", "Book demo", "Help"],
      replies: {
        hi: "Hey there! 👋 I'm ARIA — MAXG's AI assistant. I can show you what our AI systems can do, or help you book a live demo session. What would you like?",
        hello: "Hey there! 👋 I'm ARIA — MAXG's AI assistant. I can show you what our AI systems can do, or help you book a live demo session. What would you like?",
        demo: "Great choice! 🚀 Our live demo is a 30-minute session where our engineers walk you through custom AI integrations, database design, and web systems — live. Ready to pick a time slot?",
        pricing: "We have 3 plans: Pawn (R4,999/mo) for startups, Knight (R12,999/mo) for growing businesses, and King (Custom) for enterprise. Which fits your stage?",
        ai: "Our AI services include: custom LLM integration, AI chatbots, predictive analytics, document processing, and full ML pipelines. Want a demo of any specific capability?",
        web: "We build with Next.js, Astro, React, and Node.js — delivering sites that score 95+ on Lighthouse, rank on page 1, and convert visitors into clients.",
        database:
          "We architect PostgreSQL, MongoDB, Redis, and Supabase systems — including migrations, real-time sync, API layers, and enterprise security hardening.",
        book: "To book your demo, open the Booking tab in this chat. You'll receive a confirmation email. Shall I guide you there?",
        help: "I can help with: 🤖 AI capabilities · 🌐 Web development · 🗄️ Database services · 💰 Pricing · 📅 Booking a demo. Just ask!",
        iot: "We integrate IoT sensors, edge computing, and real-time dashboards into your operations — turning raw machine data into actionable intelligence.",
        support:
          "All plans include post-launch support. Knight gets 3 months priority support, and King clients get a dedicated 12-month SLA-backed engineer.",
        default:
          "Great question! Let me connect you with our team for a tailored answer. Feel free to book a demo or type 'help' to see everything I can assist with.",
      },
      slots: [
        { time: "09:00 AM", date: "Mon 26 May", spots: 3 },
        { time: "11:00 AM", date: "Mon 26 May", spots: 2 },
        { time: "02:00 PM", date: "Tue 27 May", spots: 5 },
        { time: "04:00 PM", date: "Tue 27 May", spots: 1 },
        { time: "10:00 AM", date: "Wed 28 May", spots: 4 },
        { time: "03:00 PM", date: "Thu 29 May", spots: 3 },
      ],
    },
    window.ARIAWidgetConfig || {}
  );

  /* ── Bot reply logic ── calls Node Edge API ┒ FastAPI ┒ DeepSeek */
  async function getReply(msg) {
    // Fall back to keyword replies if no apiUrl configured
    if (!cfg.apiUrl) {
      var m = msg.toLowerCase();
      var keys = Object.keys(cfg.replies);
      for (var i = 0; i < keys.length; i++) {
        if (keys[i] !== "default" && m.includes(keys[i])) return cfg.replies[keys[i]];
      }
      return cfg.replies.default;
    }
    try {
      var headers = { "Content-Type": "application/json" };
      if (cfg.apiSecret) headers["X-ARIA-Secret"] = cfg.apiSecret;
      var res = await fetch(cfg.apiUrl, {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ message: msg }),
      });
      if (!res.ok) throw new Error("API " + res.status);
      var data = await res.json();
      return data.reply || cfg.replies.default;
    } catch (err) {
      console.warn("ARIA API error:", err);
      return "I'm having trouble connecting right now. Please try again shortly!";
    }
  }

  /* ── Inject Google Material Icons (idempotent) ── */
  if (!document.getElementById("aria-material-icons")) {
    var link = document.createElement("link");
    link.id = "aria-material-icons";
    link.rel = "stylesheet";
    link.href = "https://fonts.googleapis.com/icon?family=Material+Icons+Round";
    document.head.appendChild(link);
  }

  /* ── Inject scoped CSS ── */
  var STYLE_ID = "aria-widget-styles";
  if (!document.getElementById(STYLE_ID)) {
    var style = document.createElement("style");
    style.id = STYLE_ID;
    style.textContent = [
      "@keyframes aria-slideUp{from{opacity:0;transform:translateY(30px) scale(.96)}to{opacity:1;transform:translateY(0) scale(1)}}",
      "@keyframes aria-fadeIn{from{opacity:0}to{opacity:1}}",
      "@keyframes aria-msgIn{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}",
      "@keyframes aria-dot{0%,80%,100%{opacity:0;transform:scale(.7)}40%{opacity:1;transform:scale(1)}}",
      "@keyframes aria-pulse{0%,100%{box-shadow:0 0 0 0 rgba(59,130,246,.5)}50%{box-shadow:0 0 0 10px transparent}}",
      "@keyframes aria-spin{to{transform:rotate(360deg)}}",
      "@keyframes aria-glow{0%,100%{opacity:.55}50%{opacity:1}}",
      "@keyframes aria-ringOut{0%{transform:scale(1);opacity:.4}100%{transform:scale(1.55);opacity:0}}",
      "#aria-fab{all:unset;position:fixed;bottom:2rem;right:2rem;z-index:2147483640;width:62px;height:62px;border-radius:50%;background:linear-gradient(135deg,#1D4ED8,#3B82F6);cursor:pointer;display:flex;align-items:center;justify-content:center;box-shadow:0 8px 32px rgba(59,130,246,.5);animation:aria-pulse 2.5s infinite;transition:transform .2s;}",
      "#aria-fab:hover{transform:scale(1.12);}",
      "#aria-fab .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:28px;color:#fff;line-height:1;}",
      "#aria-fab .aria-badge{position:absolute;top:-3px;right:-3px;width:20px;height:20px;border-radius:50%;background:#22C55E;border:2.5px solid #fff;display:flex;align-items:center;justify-content:center;box-shadow:0 0 8px #22C55E;font-size:8px;color:#fff;font-weight:900;font-family:system-ui,sans-serif;}",
      "#aria-overlay{position:fixed;inset:0;z-index:2147483641;background:rgba(2,2,8,.82);backdrop-filter:blur(8px);-webkit-backdrop-filter:blur(8px);animation:aria-fadeIn .22s ease both;}",
      "#aria-modal{position:fixed;z-index:2147483642;bottom:2rem;right:2rem;width:min(400px,96vw);height:min(640px,88vh);display:flex;flex-direction:column;background:linear-gradient(160deg,rgba(7,7,20,.98),rgba(4,4,14,.99));border:1px solid rgba(59,130,246,.38);border-radius:22px;box-shadow:0 0 80px rgba(59,130,246,.22),0 40px 100px rgba(0,0,0,.8);overflow:hidden;animation:aria-slideUp .32s cubic-bezier(.22,1,.36,1) both;font-family:'DM Sans',system-ui,sans-serif;}",
      "#aria-modal .aria-topbar{position:absolute;top:0;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#1D4ED8,#3B82F6,#60A5FA,#3B82F6,#1D4ED8,transparent);animation:aria-glow 3s ease-in-out infinite;}",
      "#aria-modal .aria-header{padding:1rem 1.2rem;border-bottom:1px solid rgba(59,130,246,.13);background:rgba(59,130,246,.055);display:flex;align-items:center;gap:.8rem;flex-shrink:0;}",
      "#aria-modal .aria-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#1a3a8f,#2563eb,#3B82F6);display:flex;align-items:center;justify-content:center;box-shadow:0 0 0 2px rgba(59,130,246,.3),0 0 18px rgba(59,130,246,.5);animation:aria-pulse 3s infinite;flex-shrink:0;position:relative;}",
      "#aria-modal .aria-avatar .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:22px;color:#fff;line-height:1;}",
      "#aria-modal .aria-avatar .aria-online{position:absolute;bottom:1px;right:1px;width:10px;height:10px;border-radius:50%;background:#22C55E;border:2px solid rgba(4,4,14,.99);box-shadow:0 0 6px #22C55E;}",
      "#aria-modal .aria-hinfo{flex:1;min-width:0;}",
      "#aria-modal .aria-hname{color:#fff;font-weight:800;font-size:.95rem;letter-spacing:.03em;}",
      "#aria-modal .aria-hstatus{color:#22C55E;font-size:.68rem;font-weight:700;display:flex;align-items:center;gap:.35rem;}",
      "#aria-modal .aria-hstatus span{width:5px;height:5px;border-radius:50%;background:#22C55E;display:inline-block;animation:aria-pulse 2s infinite;}",
      "#aria-modal .aria-tabs{display:flex;border-bottom:1px solid rgba(59,130,246,.13);flex-shrink:0;}",
      "#aria-modal .aria-tab{flex:1;padding:.6rem;background:transparent;border:none;color:#475569;font-size:.75rem;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:.35rem;font-family:'DM Sans',system-ui,sans-serif;letter-spacing:.05em;transition:color .18s,background .18s;border-bottom:2px solid transparent;}",
      "#aria-modal .aria-tab.active{color:#60A5FA;border-bottom-color:#3B82F6;background:rgba(59,130,246,.06);}",
      "#aria-modal .aria-tab .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:15px;line-height:1;}",
      "#aria-modal .aria-messages{flex:1;overflow-y:auto;padding:1.2rem;display:flex;flex-direction:column;gap:.85rem;scrollbar-width:thin;scrollbar-color:rgba(59,130,246,.35) transparent;}",
      "#aria-modal .aria-messages::-webkit-scrollbar{width:4px;}",
      "#aria-modal .aria-messages::-webkit-scrollbar-thumb{background:rgba(59,130,246,.35);border-radius:4px;}",
      ".aria-msg-row{display:flex;align-items:flex-end;gap:.5rem;animation:aria-msgIn .3s ease both;}",
      ".aria-msg-row.user{flex-direction:row-reverse;}",
      ".aria-msg-bubble{max-width:78%;padding:.75rem 1rem;border-radius:18px 18px 18px 4px;background:rgba(255,255,255,.055);border:1px solid rgba(59,130,246,.18);color:#fff;font-size:.85rem;line-height:1.65;word-break:break-word;}",
      ".aria-msg-row.user .aria-msg-bubble{border-radius:18px 18px 4px 18px;background:linear-gradient(135deg,#1D4ED8,#3B82F6);border:none;box-shadow:0 4px 20px rgba(59,130,246,.3);}",
      ".aria-msg-avt{width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;}",
      ".aria-msg-avt.bot{background:linear-gradient(135deg,#1a3a8f,#2563eb);box-shadow:0 0 8px rgba(59,130,246,.35);}",
      ".aria-msg-avt.user{background:rgba(59,130,246,.12);border:1px solid rgba(59,130,246,.28);}",
      ".aria-msg-avt .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:14px;color:#fff;line-height:1;}",
      ".aria-typing-dot{width:7px;height:7px;border-radius:50%;background:#60A5FA;animation:aria-dot 1.4s infinite ease-in-out;}",
      "#aria-modal .aria-quick-bar{padding:.55rem 1rem;border-top:1px solid rgba(59,130,246,.09);display:flex;gap:.4rem;flex-wrap:wrap;background:rgba(0,0,0,.18);flex-shrink:0;}",
      ".aria-quick-btn{background:rgba(59,130,246,.09);border:1px solid rgba(59,130,246,.22);border-radius:20px;color:#60A5FA;font-size:.68rem;font-weight:700;padding:.28rem .75rem;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;letter-spacing:.04em;transition:background .18s,border-color .18s,transform .18s;}",
      ".aria-quick-btn:hover{background:rgba(59,130,246,.22);border-color:rgba(59,130,246,.55);transform:translateY(-1px);}",
      "#aria-modal .aria-input-row{padding:.85rem 1rem;border-top:1px solid rgba(59,130,246,.1);display:flex;gap:.6rem;background:rgba(0,0,0,.28);flex-shrink:0;}",
      "#aria-input{flex:1;background:rgba(255,255,255,.045);border:1px solid rgba(59,130,246,.22);border-radius:11px;color:#fff;font-size:.87rem;padding:.7rem .9rem;outline:none;font-family:'DM Sans',system-ui,sans-serif;transition:border-color .18s,box-shadow .18s;}",
      "#aria-input:focus{border-color:#3B82F6;box-shadow:0 0 0 3px rgba(59,130,246,.14);}",
      "#aria-input::placeholder{color:#475569;}",
      "#aria-send{background:linear-gradient(135deg,#1D4ED8,#3B82F6);border:none;border-radius:11px;cursor:pointer;padding:.7rem .95rem;flex-shrink:0;display:flex;align-items:center;justify-content:center;box-shadow:0 0 18px rgba(59,130,246,.4);transition:transform .18s,filter .18s,opacity .18s;}",
      "#aria-send:hover:not(:disabled){transform:translateY(-2px);filter:brightness(1.1);}",
      "#aria-send:disabled{opacity:.45;cursor:not-allowed;}",
      "#aria-send .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:19px;color:#fff;line-height:1;}",
      "#aria-close-btn{background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:8px;width:32px;height:32px;display:flex;align-items:center;justify-content:center;cursor:pointer;color:#64748B;flex-shrink:0;transition:background .18s,color .18s,border-color .18s;}",
      "#aria-close-btn:hover{background:rgba(239,68,68,.18);color:#EF4444;border-color:rgba(239,68,68,.4);}",
      "#aria-close-btn .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:16px;line-height:1;}",
      /* Booking tab */
      "#aria-book-panel{flex:1;overflow-y:auto;padding:1.2rem;display:flex;flex-direction:column;gap:.85rem;scrollbar-width:thin;scrollbar-color:rgba(59,130,246,.35) transparent;}",
      "#aria-book-panel::-webkit-scrollbar{width:4px;}",
      "#aria-book-panel::-webkit-scrollbar-thumb{background:rgba(59,130,246,.35);border-radius:4px;}",
      ".aria-slots-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:.55rem;}",
      ".aria-slot-btn{all:unset;background:rgba(59,130,246,.055);border:1px solid rgba(59,130,246,.18);border-radius:12px;padding:.85rem .75rem;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;transition:border-color .22s,transform .22s,background .22s;}",
      ".aria-slot-btn:hover{border-color:rgba(59,130,246,.6);transform:translateY(-2px);background:rgba(59,130,246,.1);}",
      ".aria-slot-time{color:#fff;font-weight:700;font-size:.85rem;margin-bottom:.12rem;}",
      ".aria-slot-date{color:#64748B;font-size:.7rem;margin-bottom:.4rem;}",
      ".aria-slot-spots{font-size:.66rem;font-weight:700;display:flex;align-items:center;gap:.3rem;}",
      ".aria-form-label{display:flex;align-items:center;gap:.35rem;color:#64748B;font-size:.66rem;font-weight:700;letter-spacing:.14em;margin-bottom:.4rem;font-family:'DM Sans',system-ui,sans-serif;}",
      ".aria-form-label .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:12px;color:#3B82F6;line-height:1;}",
      ".aria-form-input{width:100%;box-sizing:border-box;background:rgba(255,255,255,.04);border:1px solid rgba(59,130,246,.22);border-radius:10px;color:#fff;font-size:.87rem;padding:.72rem .9rem;outline:none;font-family:'DM Sans',system-ui,sans-serif;transition:border-color .18s,box-shadow .18s;margin-bottom:.9rem;}",
      ".aria-form-input:focus{border-color:#3B82F6;box-shadow:0 0 0 3px rgba(59,130,246,.13);}",
      ".aria-form-input::placeholder{color:#475569;}",
      ".aria-btn-primary{all:unset;display:flex;align-items:center;justify-content:center;gap:.4rem;width:100%;box-sizing:border-box;padding:.82rem;border-radius:11px;background:linear-gradient(135deg,#1D4ED8,#3B82F6);color:#fff;font-weight:700;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;font-size:.87rem;box-shadow:0 0 22px rgba(59,130,246,.45);transition:filter .18s,transform .18s;text-align:center;}",
      ".aria-btn-primary:hover{filter:brightness(1.1);transform:translateY(-2px);}",
      ".aria-btn-ghost{all:unset;display:flex;align-items:center;justify-content:center;gap:.4rem;padding:.78rem;border-radius:11px;border:1px solid rgba(59,130,246,.28);color:#60A5FA;font-weight:600;cursor:pointer;font-family:'DM Sans',system-ui,sans-serif;font-size:.87rem;transition:background .18s;text-align:center;}",
      ".aria-btn-ghost:hover{background:rgba(59,130,246,.1);}",
      ".aria-btn-ghost .aria-icon,.aria-btn-primary .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:15px;line-height:1;color:inherit;}",
      ".aria-error{display:flex;align-items:center;gap:.4rem;color:#EF4444;font-size:.75rem;margin-bottom:.75rem;font-family:'DM Sans',system-ui,sans-serif;}",
      ".aria-error .aria-icon{font-family:'Material Icons Round';font-style:normal;font-size:13px;color:#EF4444;line-height:1;}",
      ".aria-success-box{text-align:center;padding:2rem 1rem;animation:aria-msgIn .4s ease both;}",

      /* Social screen */
      "#aria-social-panel{flex:1;overflow-y:auto;padding:1.4rem 1.2rem;display:flex;flex-direction:column;gap:1rem;}",
      ".aria-social-header{text-align:center;padding:.5rem 0 .8rem;}",
      ".aria-social-title{color:#fff;font-family:'Playfair Display',Georgia,serif;font-weight:900;font-size:1.15rem;margin-bottom:.3rem;}",
      ".aria-social-sub{color:#64748B;font-size:.78rem;line-height:1.6;}",
      ".aria-social-links{display:flex;flex-direction:column;gap:.6rem;}",
      ".aria-social-link{all:unset;display:flex;align-items:center;gap:.9rem;padding:.9rem 1rem;border-radius:14px;border:1px solid rgba(255,255,255,.08);cursor:pointer;transition:transform .2s,border-color .2s,background .2s;font-family:'DM Sans',system-ui,sans-serif;}",
      ".aria-social-link:hover{transform:translateX(4px);}",
      ".aria-social-icon{width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;padding:10px;box-sizing:border-box;}",
      ".aria-social-info{flex:1;}",
      ".aria-social-name{color:#fff;font-weight:700;font-size:.88rem;}",
      ".aria-social-desc{color:#64748B;font-size:.7rem;margin-top:.1rem;}",
      ".aria-social-arrow{color:#475569;font-family:'Material Icons Round';font-style:normal;font-size:16px;line-height:1;}",
      ".aria-social-divider{display:flex;align-items:center;gap:.75rem;margin:.2rem 0;}",
      ".aria-social-divider-line{flex:1;height:1px;background:rgba(255,255,255,.07);}",
      ".aria-social-divider-text{color:#475569;font-size:.68rem;font-weight:700;letter-spacing:.15em;font-family:'DM Sans',system-ui,sans-serif;}",
      /* Link confirm overlay */
      "#aria-link-confirm{position:absolute;inset:0;z-index:10;background:rgba(2,2,8,.92);backdrop-filter:blur(8px);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2rem;text-align:center;border-radius:22px;animation:aria-fadeIn .2s ease both;}",
      "#aria-link-confirm .aria-confirm-icon{font-size:48px;margin-bottom:1rem;}",
      "#aria-link-confirm h3{color:#fff;font-family:'Playfair Display',Georgia,serif;font-weight:900;font-size:1.2rem;margin:0 0 .5rem;}",
      "#aria-link-confirm p{color:#94A3B8;font-size:.85rem;line-height:1.65;margin:0 0 1.5rem;}",
      "#aria-link-confirm .aria-confirm-btns{display:flex;gap:.7rem;width:100%;}",
      "@media(max-width:480px){#aria-modal{bottom:0;right:0;left:0;width:100%;border-radius:22px 22px 0 0;height:min(640px,88vh);}.aria-slots-grid{grid-template-columns:1fr 1fr;}}",
    ].join("");
    document.head.appendChild(style);
  }

  /* ── Icon helper ── */
  function icon(name, size) {
    var s = document.createElement("span");
    s.className = "aria-icon";
    s.textContent = name;
    if (size) s.style.fontSize = size + "px";
    return s;
  }

  /* ── Widget state ── */
  var state = {
    open: false,
    tab: "chat",
    screen: "social", // 'social' | 'chat' | 'book'
    messages: [{ from: "bot", text: cfg.welcomeMsg }],
    typing: false,
    typingTimer: null,
    bookStep: 0, // 0=slots, 1=form, 2=done
    bookSlot: null,
    bookName: "",
    bookEmail: "",
    bookError: "",
  };

  /* ── DOM refs ── */
  var fab, overlay, modal, msgContainer, inputEl, sendBtn, quickBar;
  var bookPanel, chatSection, socialPanel, confirmOverlay;

  /* ── Build FAB ── */
  function buildFab() {
    fab = document.createElement("button");
    fab.id = "aria-fab";
    fab.title = "Chat with " + cfg.botName;
    fab.setAttribute("aria-label", "Open chat with " + cfg.botName);
    fab.appendChild(icon("smart_toy", 28));
    var badge = document.createElement("div");
    badge.className = "aria-badge";
    badge.textContent = "AI";
    fab.appendChild(badge);
    fab.addEventListener("click", openModal);
    document.body.appendChild(fab);
  }

  /* ── Build modal ── */
  function buildModal() {
    /* overlay */
    overlay = document.createElement("div");
    overlay.id = "aria-overlay";
    overlay.addEventListener("click", closeModal);

    /* modal */
    modal = document.createElement("div");
    modal.id = "aria-modal";
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", cfg.botName + " chat");

    /* top glow bar */
    var topBar = document.createElement("div");
    topBar.className = "aria-topbar";
    modal.appendChild(topBar);

    /* header */
    var header = document.createElement("div");
    header.className = "aria-header";

    var avatar = document.createElement("div");
    avatar.className = "aria-avatar";
    avatar.appendChild(icon("smart_toy", 22));
    var onlineDot = document.createElement("div");
    onlineDot.className = "aria-online";
    avatar.appendChild(onlineDot);
    header.appendChild(avatar);

    var hinfo = document.createElement("div");
    hinfo.className = "aria-hinfo";
    var hname = document.createElement("div");
    hname.className = "aria-hname";
    hname.textContent = cfg.botName;
    var hstatus = document.createElement("div");
    hstatus.className = "aria-hstatus";
    var dot = document.createElement("span");
    hstatus.appendChild(dot);
    hstatus.appendChild(document.createTextNode(cfg.botSubtitle));
    hinfo.appendChild(hname);
    hinfo.appendChild(hstatus);
    header.appendChild(hinfo);

    var closeBtn = document.createElement("button");
    closeBtn.id = "aria-close-btn";
    closeBtn.setAttribute("aria-label", "Close chat");
    closeBtn.appendChild(icon("close", 16));
    closeBtn.addEventListener("click", closeModal);
    header.appendChild(closeBtn);
    modal.appendChild(header);

    /* tabs */
    var tabsRow = document.createElement("div");
    tabsRow.className = "aria-tabs";

    var tabChat = document.createElement("button");
    tabChat.className = "aria-tab active";
    tabChat.dataset.tab = "chat";
    tabChat.appendChild(icon("chat", 15));
    tabChat.appendChild(document.createTextNode(" Chat"));
    tabChat.addEventListener("click", function () { switchScreen("chat"); });

    var tabSocial = document.createElement("button");
    tabSocial.className = "aria-tab";
    tabSocial.dataset.tab = "social";
    tabSocial.appendChild(icon("groups", 15));
    tabSocial.appendChild(document.createTextNode(" Connect"));
    tabSocial.addEventListener("click", function () { switchScreen("social"); });
    tabsRow.insertBefore(tabSocial, tabsRow.firstChild);

    var tabBook = document.createElement("button");
    tabBook.className = "aria-tab";
    tabBook.dataset.tab = "book";
    tabBook.appendChild(icon("calendar_today", 15));
    tabBook.appendChild(document.createTextNode(" Book Demo"));
    tabBook.addEventListener("click", function () { switchScreen("book"); });

    tabsRow.appendChild(tabChat);
    tabsRow.appendChild(tabBook);
    modal.appendChild(tabsRow);

    /* ── Chat section ── */
    chatSection = document.createElement("div");
    chatSection.id = "aria-chat-section";
    chatSection.style.cssText = "display:flex;flex-direction:column;flex:1;min-height:0;overflow:hidden;";

    msgContainer = document.createElement("div");
    msgContainer.className = "aria-messages";
    msgContainer.id = "aria-messages";
    chatSection.appendChild(msgContainer);

    quickBar = document.createElement("div");
    quickBar.className = "aria-quick-bar";
    cfg.quickReplies.forEach(function (q) {
      var btn = document.createElement("button");
      btn.className = "aria-quick-btn";
      btn.textContent = q;
      btn.addEventListener("click", function () { dispatchMessage(q); });
      quickBar.appendChild(btn);
    });
    chatSection.appendChild(quickBar);

    var inputRow = document.createElement("div");
    inputRow.className = "aria-input-row";
    inputEl = document.createElement("input");
    inputEl.id = "aria-input";
    inputEl.type = "text";
    inputEl.placeholder = "Ask " + cfg.botName + " anything…";
    inputEl.setAttribute("autocomplete", "off");
    inputEl.addEventListener("input", updateSendBtn);
    inputEl.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && !e.shiftKey) sendMsg();
    });
    sendBtn = document.createElement("button");
    sendBtn.id = "aria-send";
    sendBtn.setAttribute("aria-label", "Send");
    sendBtn.appendChild(icon("send", 19));
    sendBtn.addEventListener("click", sendMsg);
    inputRow.appendChild(inputEl);
    inputRow.appendChild(sendBtn);
    chatSection.appendChild(inputRow);
    modal.appendChild(chatSection);

    /* ── Booking section ── */
    bookPanel = document.createElement("div");
    bookPanel.id = "aria-book-panel";
    bookPanel.style.display = "none";
    modal.appendChild(bookPanel);

    /* ── Social section ── */
    socialPanel = document.createElement("div");
    socialPanel.id = "aria-social-panel";
    modal.appendChild(socialPanel);

    document.body.appendChild(overlay);
    document.body.appendChild(modal);

    renderMessages();
    renderBookStep();
    renderSocialPanel();

    /* Start on social screen if any links are configured */
    var hasSocial = cfg.social && Object.values(cfg.social).some(function(v){ return v && v.trim(); });
    if (hasSocial) {
      switchScreen("social");
    } else {
      switchScreen("chat");
    }

    /* No auto-focus: prevents mobile keyboard popup */

    /* Esc key */
    document.addEventListener("keydown", escHandler);
  }

  function escHandler(e) {
    if (e.key === "Escape") closeModal();
  }

  /* ── Screen / tab switching ── */
  function switchScreen(screen) {
    state.screen = screen;
    // Update tab highlights
    modal.querySelectorAll(".aria-tab").forEach(function (t) {
      t.classList.toggle("active", t.dataset.tab === screen);
    });
    // Hide all panels
    if (chatSection) chatSection.style.display = "none";
    if (bookPanel)   bookPanel.style.display   = "none";
    if (socialPanel) socialPanel.style.display  = "none";
    // Show the right one
    if (screen === "chat") {
      chatSection.style.display = "flex";
      /* no auto-focus */
    } else if (screen === "book") {
      bookPanel.style.display = "flex";
      renderBookStep();
    } else {
      socialPanel.style.display = "flex";
    }
  }
  // Alias for backward compat
  function switchTab(tab) { switchScreen(tab); }

  /* ── Open / close ── */
  function openModal() {
    if (state.open) return;
    state.open = true;
    fab.style.display = "none";
    buildModal();
  }

  function closeModal() {
    if (!state.open) return;
    state.open = false;
    document.removeEventListener("keydown", escHandler);
    if (overlay) overlay.remove();
    if (modal) modal.remove();
    overlay = modal = msgContainer = inputEl = sendBtn = quickBar = bookPanel = chatSection = null;
    fab.style.display = "flex";
    setTimeout(function () { fab.style.display = ""; }, 0);
  }

  /* ── Message rendering ── */
  function renderMessages() {
    if (!msgContainer) return;
    msgContainer.innerHTML = "";
    state.messages.forEach(function (msg, i) {
      msgContainer.appendChild(buildMsgRow(msg.from, msg.text, i * 0.04));
    });
    if (state.typing) {
      var typingRow = document.createElement("div");
      typingRow.className = "aria-msg-row";
      typingRow.style.animation = "aria-msgIn .25s ease both";
      var avt = document.createElement("div");
      avt.className = "aria-msg-avt bot";
      avt.appendChild(icon("smart_toy", 14));
      var bubble = document.createElement("div");
      bubble.className = "aria-msg-bubble";
      bubble.style.cssText = "display:flex;gap:.38rem;align-items:center;padding:.82rem 1rem;";
      [0, 1, 2].forEach(function (j) {
        var dot = document.createElement("div");
        dot.className = "aria-typing-dot";
        dot.style.animationDelay = j * 0.2 + "s";
        bubble.appendChild(dot);
      });
      typingRow.appendChild(avt);
      typingRow.appendChild(bubble);
      msgContainer.appendChild(typingRow);
    }
    msgContainer.scrollTop = msgContainer.scrollHeight;
  }

  function buildMsgRow(from, text, delay) {
    var row = document.createElement("div");
    row.className = "aria-msg-row" + (from === "user" ? " user" : "");
    row.style.animationDelay = Math.min(delay, 0.4) + "s";

    var avt = document.createElement("div");
    avt.className = "aria-msg-avt " + from;
    avt.appendChild(icon(from === "bot" ? "smart_toy" : "person", 14));

    var bubble = document.createElement("div");
    bubble.className = "aria-msg-bubble";
    bubble.textContent = text;

    row.appendChild(avt);
    row.appendChild(bubble);
    return row;
  }

  /* ── Sending messages ── */
  async function dispatchMessage(text) {
    if (!text.trim()) return;
    state.messages.push({ from: "user", text: text.trim() });
    if (inputEl) inputEl.value = "";
    state.typing = true;
    updateSendBtn();
    renderMessages();

    // Run API call + min typing delay in parallel so animation always shows
    var minDelay = new Promise(function(res){ setTimeout(res, 850 + Math.floor(Math.random() * 550)); });
    try {
      var results = await Promise.all([ getReply(text.trim()), minDelay ]);
      var reply = results[0];
      state.typing = false;
      state.messages.push({ from: "bot", text: reply });
      renderMessages();
      // Nudge to email after 4 bot replies
      var botCount = state.messages.filter(function(m){ return m.from === "bot"; }).length;
      if (botCount === 4) {
        await new Promise(function(res){ setTimeout(res, 1000); });
        state.messages.push({ from: "bot", text: "Still need help? Click Email Us in the Connect tab and our team will get back to you within 24 hours!" });
        renderMessages();
      }
    } catch (err) {
      state.typing = false;
      state.messages.push({ from: "bot", text: "Something went wrong. Please try again!" });
    }
    updateSendBtn();
    renderMessages();
  }

  function sendMsg() {
    if (!inputEl || state.typing) return;
    var text = inputEl.value;
    if (!text.trim()) return;
    dispatchMessage(text);
  }

  function updateSendBtn() {
    if (!sendBtn || !inputEl) return;
    // Disable ONLY while bot is replying; empty input is fine (user can still focus+type)
    sendBtn.disabled = state.typing;
    sendBtn.style.opacity = state.typing ? "0.45" : "1";
    sendBtn.style.cursor = state.typing ? "not-allowed" : "pointer";
  }


  /* ── Booking rendering ── */
  function renderBookStep() {
    if (!bookPanel) return;
    bookPanel.innerHTML = "";
    if (state.bookStep === 2) {
      renderBookSuccess();
    } else if (state.bookStep === 1) {
      renderBookForm();
    } else {
      renderBookSlots();
    }
  }

  function renderBookSlots() {
    var label = document.createElement("p");
    label.style.cssText = "color:#64748B;font-size:.82rem;margin:0 0 .8rem;font-family:'DM Sans',system-ui,sans-serif;";
    label.textContent = "Select an available time slot:";
    bookPanel.appendChild(label);

    var grid = document.createElement("div");
    grid.className = "aria-slots-grid";
    cfg.slots.forEach(function (slot, i) {
      var btn = document.createElement("button");
      btn.className = "aria-slot-btn";
      var time = document.createElement("div");
      time.className = "aria-slot-time";
      time.textContent = slot.time;
      var date = document.createElement("div");
      date.className = "aria-slot-date";
      date.textContent = slot.date;
      var spotsWrap = document.createElement("div");
      spotsWrap.className = "aria-slot-spots";
      var dot = document.createElement("span");
      var isLow = slot.spots <= 1;
      dot.style.cssText = "width:6px;height:6px;border-radius:50%;background:" + (isLow ? "#F59E0B" : "#22C55E") + ";box-shadow:0 0 5px " + (isLow ? "#F59E0B" : "#22C55E") + ";display:inline-block;";
      var spotsText = document.createElement("span");
      spotsText.style.color = isLow ? "#F59E0B" : "#22C55E";
      spotsText.textContent = slot.spots + " spot" + (slot.spots !== 1 ? "s" : "");
      spotsWrap.appendChild(dot);
      spotsWrap.appendChild(spotsText);
      btn.appendChild(time);
      btn.appendChild(date);
      btn.appendChild(spotsWrap);
      btn.addEventListener("click", function () {
        state.bookSlot = i;
        state.bookStep = 1;
        renderBookStep();
      });
      grid.appendChild(btn);
    });
    bookPanel.appendChild(grid);
  }

  function renderBookForm() {
    var slot = cfg.slots[state.bookSlot];
    /* selected slot pill */
    var pill = document.createElement("div");
    pill.style.cssText = "display:flex;align-items:center;gap:.5rem;padding:.6rem .9rem;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.2);border-radius:10px;margin-bottom:1rem;font-family:'DM Sans',system-ui,sans-serif;font-size:.82rem;color:#60A5FA;font-weight:600;";
    pill.appendChild(icon("schedule", 15));
    pill.appendChild(document.createTextNode(" " + slot.date + " at " + slot.time));
    bookPanel.appendChild(pill);

    /* fields */
    [
      { label: "YOUR NAME", key: "bookName", iconName: "person", ph: "Jane Smith", type: "text" },
      { label: "EMAIL ADDRESS", key: "bookEmail", iconName: "email", ph: "jane@company.com", type: "email" },
    ].forEach(function (f) {
      var lbl = document.createElement("label");
      lbl.className = "aria-form-label";
      lbl.appendChild(icon(f.iconName, 12));
      lbl.appendChild(document.createTextNode(f.label));
      bookPanel.appendChild(lbl);
      var inp = document.createElement("input");
      inp.className = "aria-form-input";
      inp.type = f.type;
      inp.placeholder = f.ph;
      inp.value = state[f.key] || "";
      inp.addEventListener("input", function () { state[f.key] = inp.value; state.bookError = ""; renderError(); });
      inp.addEventListener("focus", function () { inp.style.borderColor = "#3B82F6"; inp.style.boxShadow = "0 0 0 3px rgba(59,130,246,.13)"; });
      inp.addEventListener("blur", function () { inp.style.borderColor = "rgba(59,130,246,.22)"; inp.style.boxShadow = "none"; });
      bookPanel.appendChild(inp);
    });

    /* error */
    var errEl = document.createElement("div");
    errEl.className = "aria-error";
    errEl.id = "aria-book-error";
    if (state.bookError) {
      errEl.appendChild(icon("error", 13));
      errEl.appendChild(document.createTextNode(state.bookError));
    } else {
      errEl.style.display = "none";
    }
    bookPanel.appendChild(errEl);

    /* buttons */
    var btnRow = document.createElement("div");
    btnRow.style.cssText = "display:flex;gap:.6rem;margin-top:.25rem;";
    var backBtn = document.createElement("button");
    backBtn.className = "aria-btn-ghost";
    backBtn.style.flex = "1";
    backBtn.appendChild(icon("arrow_back", 15));
    backBtn.appendChild(document.createTextNode(" Back"));
    backBtn.addEventListener("click", function () { state.bookStep = 0; state.bookError = ""; renderBookStep(); });
    var confirmBtn = document.createElement("button");
    confirmBtn.className = "aria-btn-primary";
    confirmBtn.style.flex = "2";
    confirmBtn.appendChild(icon("event_available", 15));
    confirmBtn.appendChild(document.createTextNode(" Confirm Booking"));
    confirmBtn.addEventListener("click", submitBooking);
    btnRow.appendChild(backBtn);
    btnRow.appendChild(confirmBtn);
    bookPanel.appendChild(btnRow);
  }

  function renderError() {
    var errEl = document.getElementById("aria-book-error");
    if (!errEl) return;
    errEl.innerHTML = "";
    if (state.bookError) {
      errEl.style.display = "flex";
      errEl.appendChild(icon("error", 13));
      errEl.appendChild(document.createTextNode(state.bookError));
    } else {
      errEl.style.display = "none";
    }
  }

  function submitBooking() {
    var name = (state.bookName || "").trim();
    var email = (state.bookEmail || "").trim();
    if (!name || !email || state.bookSlot === null) {
      state.bookError = "Please fill all fields and select a slot.";
      renderError();
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      state.bookError = "Please enter a valid email address.";
      renderError();
      return;
    }
    state.bookError = "";
    state.bookStep = 2;
    renderBookStep();
  }

  function renderBookSuccess() {
    var slot = cfg.slots[state.bookSlot];
    var box = document.createElement("div");
    box.className = "aria-success-box";
    var emoji = document.createElement("div");
    emoji.style.cssText = "font-size:52px;margin-bottom:1rem;display:inline-block;";
    emoji.textContent = "🎉";
    var h3 = document.createElement("h3");
    h3.style.cssText = "color:#60A5FA;margin:0 0 .6rem;font-family:'Playfair Display',Georgia,serif;font-weight:900;font-size:1.5rem;";
    h3.textContent = "You're Booked!";
    var p = document.createElement("p");
    p.style.cssText = "color:#94A3B8;line-height:1.7;font-size:.88rem;font-family:'DM Sans',system-ui,sans-serif;margin:0;";
    p.innerHTML = "Your demo is confirmed for <strong style='color:#fff'>" + slot.date + "</strong> at <strong style='color:#fff'>" + slot.time + "</strong>.<br>A confirmation is heading to <strong style='color:#fff'>" + (state.bookEmail || "") + "</strong>.";
    var confirm = document.createElement("div");
    confirm.style.cssText = "display:inline-flex;align-items:center;gap:.55rem;margin-top:1.4rem;padding:.6rem 1.3rem;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.3);border-radius:50px;";
    confirm.appendChild(icon("check_circle", 18));
    confirm.querySelector(".aria-icon").style.color = "#22C55E";
    var confText = document.createElement("span");
    confText.style.cssText = "color:#22C55E;font-weight:700;font-size:.82rem;font-family:'DM Sans',system-ui,sans-serif;";
    confText.textContent = "Booking Confirmed";
    confirm.appendChild(confText);
    box.appendChild(emoji);
    box.appendChild(h3);
    box.appendChild(p);
    box.appendChild(confirm);
    bookPanel.appendChild(box);
  }


  /* ── Social panel rendering ── */
  // Simple Icons CDN
  var SOCIAL_META = {
    whatsapp:  { name: "WhatsApp",    desc: "Chat with us directly",  icon: "whatsapp",  bg: "#25D366", confirm: "Opening WhatsApp" },
    instagram: { name: "Instagram",   desc: "See our latest work",    icon: "instagram", bg: "linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)", confirm: "Opening Instagram" },
    facebook:  { name: "Facebook",    desc: "Follow our page",        icon: "facebook",  bg: "#1877F2", confirm: "Opening Facebook" },
    tiktok:    { name: "TikTok",      desc: "Watch our videos",       icon: "tiktok",    bg: "#010101", border: "1px solid rgba(255,255,255,.15)", confirm: "Opening TikTok" },
    twitter:   { name: "X (Twitter)", desc: "Follow our updates",     icon: "x",         bg: "#000000", border: "1px solid rgba(255,255,255,.15)", confirm: "Opening X (Twitter)" },
  }

  function renderSocialPanel() {
    if (!socialPanel) return;
    socialPanel.innerHTML = "";

    var social = cfg.social || {};
    var hasLinks = Object.keys(SOCIAL_META).some(function(k){ return social[k] && social[k].trim(); });

    /* Header */
    var hdr = document.createElement("div");
    hdr.className = "aria-social-header";
    var title = document.createElement("div");
    title.className = "aria-social-title";
    title.textContent = "Connect with Us";
    var sub = document.createElement("div");
    sub.className = "aria-social-sub";
    sub.textContent = hasLinks
      ? "Reach us on your favourite platform, or chat with ARIA below."
      : "Chat with ARIA or send us an email — we reply within 24 hours.";
    hdr.appendChild(title);
    hdr.appendChild(sub);
    socialPanel.appendChild(hdr);

    /* Social link buttons */
    if (hasLinks) {
      var linksWrap = document.createElement("div");
      linksWrap.className = "aria-social-links";
      Object.keys(SOCIAL_META).forEach(function(key) {
        var url = social[key];
        if (!url || !url.trim()) return;
        var meta = SOCIAL_META[key];
        var btn = document.createElement("button");
        btn.className = "aria-social-link";
        btn.style.cssText = "background:rgba(255,255,255,.035);border-color:rgba(255,255,255,.1);";
        btn.addEventListener("mouseenter", function(){ btn.style.borderColor = "rgba(59,130,246,.45)"; btn.style.background = "rgba(59,130,246,.07)"; });
        btn.addEventListener("mouseleave", function(){ btn.style.borderColor = "rgba(255,255,255,.1)"; btn.style.background = "rgba(255,255,255,.035)"; });

        var iconBox = document.createElement("div");
        iconBox.className = "aria-social-icon";
        iconBox.style.cssText = "background:" + meta.bg + ";display:flex;align-items:center;justify-content:center;";
        if (meta.border) iconBox.style.border = meta.border;
        var img = document.createElement("img");
        img.src = "https://cdn.simpleicons.org/" + meta.icon + "/ffffff";
        img.alt = meta.name;
        img.width = 22;
        img.height = 22;
        img.style.cssText = "display:block;";
        img.onerror = function(){ img.style.display="none"; };
        iconBox.appendChild(img);

        var info = document.createElement("div");
        info.className = "aria-social-info";
        var nm = document.createElement("div");
        nm.className = "aria-social-name";
        nm.textContent = meta.name;
        var dc = document.createElement("div");
        dc.className = "aria-social-desc";
        dc.textContent = meta.desc;
        info.appendChild(nm);
        info.appendChild(dc);

        var arrow = document.createElement("span");
        arrow.className = "aria-social-arrow";
        arrow.textContent = "open_in_new";

        btn.appendChild(iconBox);
        btn.appendChild(info);
        btn.appendChild(arrow);
        btn.addEventListener("click", function() { showLinkConfirm(url, meta); });
        linksWrap.appendChild(btn);
      });
      socialPanel.appendChild(linksWrap);

      /* Divider */
      var div = document.createElement("div");
      div.className = "aria-social-divider";
      var l1 = document.createElement("div"); l1.className = "aria-social-divider-line";
      var l2 = document.createElement("div"); l2.className = "aria-social-divider-line";
      var dt = document.createElement("div"); dt.className = "aria-social-divider-text"; dt.textContent = "OR";
      div.appendChild(l1); div.appendChild(dt); div.appendChild(l2);
      socialPanel.appendChild(div);
    }

    /* Chat with ARIA button */
    var chatBtn = document.createElement("button");
    chatBtn.className = "aria-btn-primary";
    chatBtn.style.cssText = "width:100%;box-sizing:border-box;";
    chatBtn.appendChild(icon("smart_toy", 15));
    chatBtn.appendChild(document.createTextNode(" Chat with ARIA"));
    chatBtn.addEventListener("click", function() { switchScreen("chat"); });
    socialPanel.appendChild(chatBtn);

    /* Email us button */
    var emailBtn = document.createElement("button");
    emailBtn.className = "aria-btn-ghost";
    emailBtn.style.cssText = "width:100%;box-sizing:border-box;margin-top:.4rem;";
    emailBtn.appendChild(icon("email", 15));
    emailBtn.appendChild(document.createTextNode(" Email Us"));
    emailBtn.addEventListener("click", function() { openEmailFallback(); });
    socialPanel.appendChild(emailBtn);
  }

  /* ── Link confirm overlay ── */
  function showLinkConfirm(url, meta) {
    // Remove any existing confirm
    var existing = modal.querySelector("#aria-link-confirm");
    if (existing) existing.remove();

    confirmOverlay = document.createElement("div");
    confirmOverlay.id = "aria-link-confirm";

    var emojiEl = document.createElement("div");
    emojiEl.className = "aria-confirm-icon";
    emojiEl.style.cssText = "width:56px;height:56px;border-radius:14px;display:flex;align-items:center;justify-content:center;margin:0 auto 1rem;background:" + meta.bg + ";padding:12px;box-sizing:border-box;";
    var cImg = document.createElement("img");
    cImg.src = "https://cdn.simpleicons.org/" + meta.icon + "/ffffff";
    cImg.alt = meta.name;
    cImg.style.cssText = "width:28px;height:28px;display:block;";
    cImg.onerror = function(){ cImg.style.display="none"; };
    emojiEl.appendChild(cImg);

    var h3 = document.createElement("h3");
    h3.textContent = meta.confirm;

    var p = document.createElement("p");
    p.textContent = "You're about to open " + meta.name + " in a new tab. ARIA will still be here when you return!";

    var btns = document.createElement("div");
    btns.className = "aria-confirm-btns";

    var cancelBtn = document.createElement("button");
    cancelBtn.className = "aria-btn-ghost";
    cancelBtn.style.flex = "1";
    cancelBtn.appendChild(icon("arrow_back", 15));
    cancelBtn.appendChild(document.createTextNode(" Back"));
    cancelBtn.addEventListener("click", function() { confirmOverlay.remove(); });

    var goBtn = document.createElement("button");
    goBtn.className = "aria-btn-primary";
    goBtn.style.flex = "2";
    goBtn.appendChild(icon("open_in_new", 15));
    goBtn.appendChild(document.createTextNode(" Open " + meta.name));
    goBtn.addEventListener("click", function() {
      window.open(url, "_blank", "noopener,noreferrer");
      confirmOverlay.remove();
    });

    btns.appendChild(cancelBtn);
    btns.appendChild(goBtn);
    confirmOverlay.appendChild(emojiEl);
    confirmOverlay.appendChild(h3);
    confirmOverlay.appendChild(p);
    confirmOverlay.appendChild(btns);
    modal.appendChild(confirmOverlay);
  }

  /* ── Email fallback ── */
  function openEmailFallback() {
    var email = cfg.supportEmail || "support@maxg.co.za";
    var subject = encodeURIComponent("Enquiry via ARIA Chat Widget");
    var body = encodeURIComponent("Hi MAXG team,\n\nI was chatting with ARIA and have a question:\n\n[Your message here]\n\nThanks!");
    window.open("mailto:" + email + "?subject=" + subject + "&body=" + body);
  }

  /* ── Init ── */
  function init() {
    buildFab();
    /* Show fab with slight delay */
    fab.style.opacity = "0";
    fab.style.transform = "scale(0.7)";
    setTimeout(function () {
      fab.style.transition = "opacity .4s, transform .4s";
      fab.style.opacity = "1";
      fab.style.transform = "scale(1)";
    }, 800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
