"use client";

import DemoForm from "@/components/DemoForm";
import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import accedaLogo from "./acceda_logo_2.svg";

// ─── Google Fonts ───────────────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg:        #0C1F4A;
      --bg-2:      #0A2A66;
      --bg-card:   rgba(10,42,102,0.6);
      --border:    rgba(255,255,255,0.07);
      --border-hi: rgba(31,79,216,0.35);
      --blue:      #1F4FD8;
      --blue-dim:  rgba(31,79,216,0.12);
      --teal:      #10B26C;
      --teal-dim:  rgba(16,178,108,0.10);
      --white:     #FFFFFF;
      --gray-1:    #F1F5F9;
      --gray-2:    #94A3B8;
      --gray-3:    #475569;
      --red:       #FF4D6A;
      --amber:     #FFAA2C;
      --font-display: 'Space Grotesk', sans-serif;
      --font-body:    'Inter', sans-serif;
      --font-code:    'JetBrains Mono', monospace;
    }

    html { scroll-behavior: smooth; scroll-padding-top: 80px; }

    body {
      background: var(--bg);
      color: var(--white);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
    }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--bg); }
    ::-webkit-scrollbar-thumb { background: var(--blue); border-radius: 2px; }

    /* ── Nav ── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px; height: 68px;
      background: rgba(8,12,20,0.82);
      backdrop-filter: blur(20px);
      border-bottom: 1px solid var(--border);
      transition: border-color 0.3s;
    }
    .nav-logo {
      font-family: var(--font-display); font-size: 22px; font-weight: 800;
      letter-spacing: -0.5px; color: var(--white); text-decoration: none;
      display: flex; align-items: center; gap: 10px;
    }
    .nav-logo-mark {
      width: 28px; height: 28px; border-radius: 7px;
      background: var(--blue); display: grid; place-items: center;
    }
    .nav-links {
      display: flex; gap: 32px; list-style: none;
    }
    .nav-links a {
      font-size: 14px; font-weight: 400; color: var(--gray-2);
      text-decoration: none; letter-spacing: 0.01em;
      transition: color 0.2s;
    }
    .nav-links a:hover { color: var(--white); }
    .nav-cta {
      display: flex; align-items: center; gap: 12px;
    }
    .btn-ghost {
      font-family: var(--font-body); font-size: 14px; font-weight: 500;
      color: var(--gray-2); background: transparent; border: none;
      cursor: pointer; letter-spacing: 0.01em;
      transition: color 0.2s; text-decoration: none; padding: 8px 4px;
    }
    .btn-ghost:hover { color: var(--white); }
    .btn-primary {
      font-family: var(--font-body); font-size: 14px; font-weight: 500;
      color: var(--white); background: var(--blue); border: none;
      padding: 10px 20px; border-radius: 8px; cursor: pointer;
      letter-spacing: 0.01em; text-decoration: none;
      transition: opacity 0.2s, transform 0.15s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
    .btn-primary-lg {
      font-size: 15px; padding: 14px 32px; border-radius: 10px;
    }
    .btn-outline-lg {
      font-family: var(--font-body); font-size: 15px; font-weight: 500;
      color: var(--blue); background: transparent;
      border: 1.5px solid rgba(31,79,216,0.4);
      padding: 13px 32px; border-radius: 10px; cursor: pointer;
      letter-spacing: 0.01em; transition: border-color 0.2s, background 0.2s;
      text-decoration: none;
    }
    .btn-outline-lg:hover { border-color: var(--blue); background: var(--blue-dim); }

    /* ── Layout ── */
    .container { max-width: 1160px; margin: 0 auto; padding: 0 24px; }

    /* ── Section headings ── */
    .eyebrow {
      font-family: var(--font-body); font-size: 12px; font-weight: 500;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--teal); margin-bottom: 16px;
      display: flex; align-items: center; gap: 8px;
    }
    .eyebrow::before {
      content: ''; display: block; width: 20px; height: 1.5px;
      background: var(--teal);
    }
    .section-title {
      font-family: var(--font-display); font-size: clamp(32px,4vw,52px);
      font-weight: 700; line-height: 1.1; letter-spacing: -0.03em;
      color: var(--white);
    }
    .section-title .accent { color: var(--blue); }
    .section-body {
      font-size: 17px; line-height: 1.7; color: var(--gray-2); font-weight: 300;
      max-width: 560px;
    }

    /* ── Scanner animation ── */
    @keyframes scan-line {
      0%   { top: 0; opacity: 1; }
      90%  { top: 100%; opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    @keyframes finding-appear {
      from { opacity: 0; transform: translateX(6px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes badge-pop {
      0%   { transform: scale(0.8); opacity: 0; }
      60%  { transform: scale(1.08); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.5); opacity: 0; }
    }
    @keyframes counter-up { from { opacity: 0; } to { opacity: 1; } }
    @keyframes grid-fade {
      0%,100% { opacity: 0.03; }
      50%      { opacity: 0.07; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-8px); }
    }

    /* ── Noise overlay ── */
    .noise {
      position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.025;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }

    /* ── Grid bg ── */
    .grid-bg {
      position: absolute; inset: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(31,79,216,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(31,79,216,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
      animation: grid-fade 8s ease-in-out infinite;
    }

    /* ── Stat cards ── */
    .stat-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 12px; padding: 28px 32px;
      transition: border-color 0.3s;
    }
    .stat-card:hover { border-color: var(--border-hi); }
    .stat-num {
      font-family: var(--font-display); font-size: 44px; font-weight: 800;
      letter-spacing: -0.04em; line-height: 1;
    }
    .stat-label { font-size: 14px; color: var(--gray-2); margin-top: 6px; }

    /* ── Feature card ── */
    .feature-card {
      background: var(--bg-card); border: 1px solid var(--border);
      border-radius: 14px; padding: 32px;
      transition: border-color 0.3s, transform 0.3s;
      position: relative; overflow: hidden;
    }
    .feature-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 1px; background: linear-gradient(90deg, transparent, var(--blue-dim), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .feature-card:hover { border-color: var(--border-hi); transform: translateY(-3px); }
    .feature-card:hover::before { opacity: 1; }
    .feature-icon {
      width: 44px; height: 44px; border-radius: 10px;
      background: var(--blue-dim); border: 1px solid rgba(31,79,216,0.2);
      display: grid; place-items: center; margin-bottom: 20px;
    }
    .feature-title {
      font-family: var(--font-display); font-size: 17px; font-weight: 600;
      color: var(--white); margin-bottom: 10px; letter-spacing: -0.01em;
    }
    .feature-body { font-size: 14px; line-height: 1.65; color: var(--gray-2); }

    /* ── Persona card ── */
    .persona-card {
      border: 1px solid var(--border); border-radius: 14px; padding: 36px;
      background: linear-gradient(135deg, rgba(255,255,255,0.04) 0%, transparent 100%);
      transition: border-color 0.3s;
      position: relative;
    }
    .persona-card:hover { border-color: var(--border-hi); }
    .persona-role {
      font-size: 12px; font-weight: 500; letter-spacing: 0.1em;
      text-transform: uppercase; color: var(--blue); margin-bottom: 16px;
    }
    .persona-title {
      font-family: var(--font-display); font-size: 22px; font-weight: 700;
      color: var(--white); margin-bottom: 14px; letter-spacing: -0.02em;
      line-height: 1.2;
    }
    .persona-body { font-size: 14px; line-height: 1.7; color: var(--gray-2); }
    .persona-divider {
      width: 32px; height: 2px; background: var(--teal); margin-top: 24px;
    }

    /* ── Compliance badge ── */
    .compliance-badges {
      display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px;
    }
    .badge {
      font-size: 11px; font-weight: 500; letter-spacing: 0.08em;
      text-transform: uppercase; padding: 5px 12px; border-radius: 20px;
      border: 1px solid; white-space: nowrap;
    }
    .badge-teal { color: var(--teal); border-color: rgba(16,178,108,0.3); background: var(--teal-dim); }
    .badge-blue { color: var(--blue); border-color: rgba(31,79,216,0.3); background: var(--blue-dim); }

    /* ── CTA section ── */
    .cta-section {
      position: relative; overflow: hidden;
      background: linear-gradient(135deg, #0A2A66 0%, #0C1F4A 100%);
      border-top: 1px solid var(--border);
      border-radius: 20px;
    }
    .cta-glow {
      position: absolute; width: 600px; height: 600px;
      background: radial-gradient(circle, rgba(31,79,216,0.12) 0%, transparent 70%);
      border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%,-50%);
      pointer-events: none;
    }

    /* ── Logo row ── */
    .logo-row {
      display: flex; align-items: center; gap: 48px;
      flex-wrap: wrap; justify-content: center;
    }
    .logo-item {
      font-family: var(--font-display); font-size: 13px; font-weight: 600;
      letter-spacing: 0.06em; text-transform: uppercase;
      color: var(--gray-3); opacity: 0.65;
      transition: opacity 0.2s;
    }
    .logo-item:hover { opacity: 1; }

    /* ── Responsive ── */
    .mobile-menu-btn {
      display: none; background: transparent; border: none;
      color: var(--white); cursor: pointer; padding: 8px;
    }

    @media (max-width: 1024px) {
      .hero-wrapper { flex-direction: column; text-align: center; gap: 50px !important; }
      .hero-content { align-items: center; }
      .hero-scanner { flex: 1 !important; width: 100%; max-width: 480px; align-self: center; }
      .problem-wrapper { flex-direction: column; gap: 50px !important; text-align: center; }
      .compliance-wrapper { flex-direction: column; gap: 40px !important; text-align: center; padding: 40px 32px !important; }
    }

    @media (max-width: 768px) {
      .mobile-menu-btn { display: block; }
      .nav { padding: 0 20px; flex-wrap: wrap; height: auto; min-height: 68px; }
      .nav-links { 
        display: none; flex-direction: column; width: 100%; 
        padding: 20px 0; gap: 20px; border-top: 1px solid var(--border); margin-top: 10px;
      }
      .nav-links.open { display: flex; }
      .nav-cta { display: none; width: 100%; flex-direction: column; padding-bottom: 24px; gap: 12px; }
      .nav-cta.open { display: flex; }
      .nav-cta .btn-ghost, .nav-cta .btn-primary { width: 100%; justify-content: center; }
      
      .container { padding: 0 16px; }
      .section-title { font-size: 32px !important; }
      .cta-section { padding: 60px 24px !important; }
      .hero-btns, .compliance-badges { justify-content: center; }
      .logo-row { gap: 24px; }
      .stat-card { padding: 24px; }
    }
  `}</style>
);

// ─── Icons ──────────────────────────────────────────────────────────────────
const IconScan = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M3 6V3h3M14 3h3v3M17 14v3h-3M6 17H3v-3" stroke="#1F4FD8" strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="6" y="6" width="8" height="8" rx="1.5" stroke="#1F4FD8" strokeWidth="1.5"/>
    <path d="M8 10h4" stroke="#1F4FD8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconShield = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M10 2L4 4.5V9c0 3.87 2.62 7.25 6 8 3.38-.75 6-4.13 6-8V4.5L10 2Z" stroke="#1F4FD8" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M7 10l2 2 4-4" stroke="#1F4FD8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconDoc = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M11 2H5a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V8l-5-6Z" stroke="#1F4FD8" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M11 2v6h6M7 11h6M7 14h4" stroke="#1F4FD8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconCode = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M7 6L3 10l4 4M13 6l4 4-4 4M11 4l-2 12" stroke="#1F4FD8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconReview = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <circle cx="10" cy="10" r="7" stroke="#1F4FD8" strokeWidth="1.5"/>
    <path d="M10 7v3.5l2.5 1.5" stroke="#1F4FD8" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconGate = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M4 10h12M4 10l3-3M4 10l3 3M16 10l-3-3M16 10l-3 3" stroke="#1F4FD8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCheck = ({ color = "#10B26C" }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
    <path d="M2 7l4 4 6-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// ─── Scanner Visualization ───────────────────────────────────────────────────
const ALL_FINDINGS = [
  { id: 1, sev: "critical", msg: "Missing alt text on 14 images",        rule: "WCAG 1.1.1" },
  { id: 2, sev: "critical", msg: "Insufficient color contrast ratio 2.3:1", rule: "WCAG 1.4.3" },
  { id: 3, sev: "high",     msg: "Form inputs lack accessible labels",    rule: "WCAG 1.3.1" },
  { id: 4, sev: "high",     msg: "Keyboard navigation trap detected",     rule: "WCAG 2.1.2" },
  { id: 5, sev: "medium",   msg: "Missing document language attribute",   rule: "WCAG 3.1.1" },
];
const SEV_COLOR = { critical: "#FF4D6A", high: "#FFAA2C", medium: "#1F4FD8" };

function ScannerViz() {
  const [findings, setFindings] = useState([]);
  const [resolved, setResolved] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);
  const sevColor = SEV_COLOR;

  useEffect(() => {
    let cancelled = false;
    let timeouts = [];
    const T = (fn, ms) => { const id = setTimeout(() => { if (!cancelled) fn(); }, ms); timeouts.push(id); };
    const cleanup = () => { cancelled = true; timeouts.forEach(clearTimeout); };

    const runCycle = () => {
      setFindings([]);
      setResolved(0);
      setDone(false);
      setScanning(true);

      ALL_FINDINGS.forEach((finding, idx) => {
        T(() => setFindings(prev => [...prev, finding]), 800 + idx * 700);
      });

      const afterScan = 800 + ALL_FINDINGS.length * 700 + 400;
      T(() => setScanning(false), afterScan);

      ALL_FINDINGS.forEach((_, idx) => {
        T(() => setResolved(idx + 1), afterScan + 500 + idx * 400);
      });

      const afterResolve = afterScan + 500 + ALL_FINDINGS.length * 400;
      T(() => setDone(true), afterResolve);
      T(runCycle, afterResolve + 3500);
    };

    runCycle();
    return cleanup;
  }, []);

  return (
    <div style={{
      background: "var(--bg-card)", border: "1px solid var(--border)",
      borderRadius: 16, overflow: "hidden", fontFamily: "var(--font-body)",
      boxShadow: "0 32px 80px rgba(0,0,0,0.5)",
    }}>
      {/* Terminal bar */}
      <div style={{
        background: "#0A2A66", padding: "12px 20px",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", gap: 8,
      }}>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF4D6A", display: "block" }}/>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFAA2C", display: "block" }}/>
        <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#10B26C", display: "block" }}/>
        <span style={{ marginLeft: 12, fontSize: 12, color: "var(--gray-3)", letterSpacing: "0.04em" }}>
          acceda — audit · {done ? "complete" : scanning ? "scanning..." : "remediating..."}
        </span>
        <span style={{
          marginLeft: "auto", width: 7, height: 7, borderRadius: "50%",
          background: done ? "#10B26C" : scanning ? "#FFAA2C" : "#1F4FD8",
          boxShadow: `0 0 0 3px ${done ? "rgba(16,178,108,0.2)" : scanning ? "rgba(255,170,44,0.2)" : "rgba(31,79,216,0.2)"}`,
          animation: done ? "none" : "pulse-ring 1.5s ease-out infinite",
        }}/>
      </div>

      {/* Scan target */}
      <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", position: "relative", overflow: "hidden", height: 56 }}>
        <div style={{ fontSize: 12, color: "var(--gray-3)", marginBottom: 4 }}>Target</div>
        <div style={{ fontSize: 13, color: "var(--gray-1)", fontWeight: 500 }}>useacceda.com/portal</div>
        {scanning && (
          <div style={{
            position: "absolute", left: 0, right: 0, top: 0, height: 2,
            background: "linear-gradient(90deg, transparent, var(--blue), transparent)",
            animation: "scan-line 1.8s ease-in-out infinite",
          }}/>
        )}
      </div>

      {/* Findings list */}
      <div style={{ padding: "16px 20px", minHeight: 200, maxHeight: 200, overflowY: "hidden" }}>
        {findings.length === 0 && (
          <div style={{ fontSize: 12, color: "var(--gray-3)", paddingTop: 8 }}>Initializing scan engine...</div>
        )}
        {findings.map((f, idx) => {
          const isResolved = idx < resolved;
          return (
            <div key={f.id} style={{
              display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 10,
              animation: "finding-appear 0.3s ease-out both",
              opacity: isResolved ? 0.45 : 1,
              transition: "opacity 0.4s",
            }}>
              <span style={{
                fontSize: 10, fontWeight: 600, padding: "2px 7px", borderRadius: 4,
                background: isResolved ? "rgba(16,178,108,0.1)" : `${sevColor[f.sev]}18`,
                color: isResolved ? "var(--teal)" : sevColor[f.sev],
                border: `1px solid ${isResolved ? "rgba(16,178,108,0.3)" : `${sevColor[f.sev]}40`}`,
                whiteSpace: "nowrap", marginTop: 1, letterSpacing: "0.04em",
                transition: "all 0.4s",
              }}>
                {isResolved ? "FIXED" : f.sev.toUpperCase()}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, color: isResolved ? "var(--gray-3)" : "var(--gray-1)", transition: "color 0.4s", textDecoration: isResolved ? "line-through" : "none" }}>
                  {f.msg}
                </div>
                <div style={{ fontSize: 11, color: "var(--gray-3)", marginTop: 2 }}>{f.rule}</div>
              </div>
              {isResolved && (
                <div style={{ animation: "badge-pop 0.3s ease-out" }}>
                  <IconCheck />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Status bar */}
      <div style={{
        padding: "12px 20px", borderTop: "1px solid var(--border)",
        background: "#0A2A66", display: "flex", alignItems: "center", gap: 16,
      }}>
        <div style={{ flex: 1, height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: done ? "var(--teal)" : "var(--blue)",
            width: done ? "100%" : `${(resolved / ALL_FINDINGS.length) * 100}%`,
            transition: "width 0.4s ease, background 0.4s",
          }}/>
        </div>
        <span style={{ fontSize: 11, color: done ? "var(--teal)" : "var(--gray-2)", whiteSpace: "nowrap" }}>
          {done ? "✓ All issues resolved" : `${resolved}/${ALL_FINDINGS.length} resolved`}
        </span>
      </div>
    </div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "", duration = 1500 }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return <span ref={ref}>{display}{suffix}</span>;
}

// ─── Fade-up wrapper ─────────────────────────────────────────────────────────
function FadeUp({ children, delay = 0, style = {} }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      style={style}
    >
      {children}
    </motion.div>
  );
}

// ─── Main Component ──────────────────────────────────────────────────────────
export default function AccedaLandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", v => setNavScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  const features = [
    { icon: <IconScan />,   title: "ACCEDA Scan",    body: "Deep-crawl your web applications for WCAG violations. Every page, every state, every interaction — surfaced and prioritized automatically." },
    { icon: <IconCode />,   title: "ACCEDA Fix",         body: "Receive exact code diffs and step-by-step implementation guides for every finding. Your engineers ship fixes in minutes, not sprints." },
    { icon: <IconDoc />,    title: "ACCEDA Reports",           body: "Auto-compile your full audit history into compliance-ready Voluntary Product Accessibility Templates on demand." },
    { icon: <IconGate />,   title: "ACCEDA CI",               body: "Block non-compliant code from merging. Accessibility guardrails integrate directly into the pipeline your team already uses." },
    { icon: <IconReview />, title: "ACCEDA DevKit",              body: "Structured workflows for ambiguous findings automated scanners can't confidently classify. Clarity at every decision point." },
    { icon: <IconShield />, title: "Audio & Video Captions",            body: "Automatically transcribe and caption media assets. Every video and audio file — made accessible without manual effort." },
  ];

  const personas = [
    { role: "Engineering Leaders", title: "Ship faster without compliance friction.", body: "Acceda integrates directly into the development lifecycle. Findings surface before code merges — not after production deploys. Your team moves at full velocity, protected." },
    { role: "QA & Testing Teams",  title: "Eliminate ambiguity from every review cycle.", body: "The Human Review dashboard structures complex accessibility decisions with guided resolution workflows. No more guesswork. No more missed edge cases." },
    { role: "Compliance Officers", title: "Audit-ready evidence. Always.", body: "Automated VPAT compilation and a full audit trail that holds up under legal scrutiny. Enterprise and government deliverables — generated, not assembled manually." },
  ];

  const stats = [
    { num: 97, suffix: "%", label: "of WCAG violations detected — vs. 30–40% with legacy tools", color: "var(--teal)" },
    { num: 12, suffix: "x", label: "faster remediation with AI-generated code fix guides",       color: "var(--blue)" },
    { num: 100, suffix: "+", label: "enterprise teams protecting compliance posture with Acceda", color: "var(--white)" },
  ];

  return (
    <>
      <FontLoader />
      <div className="noise" />

      {/* ── Navigation ──────────────────────────────────────────── */}
      <nav className="nav" style={{
        borderBottomColor: navScrolled ? "var(--border)" : "transparent",
        background: navScrolled ? "rgba(8,12,20,0.92)" : "transparent",
      }}>
        {/* Logo */}
        <a href="#" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <Image src={accedaLogo} alt="Acceda Logo" height={55} priority style={{ width: "auto" }} />
        </a>

        {/* Desktop links — center */}
        <ul className={`nav-links ${mobileMenuOpen ? 'open' : ''}`}>
          {[
            { label: "Platform",   href: "#platform" },
            { label: "Use Cases",  href: "#use-cases" },
            { label: "Compliance", href: "#compliance" },
            { label: "Pricing",    href: "#cta" },
            { label: "Docs",       href: "#" },
          ].map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        {/* CTA buttons — right */}
        <div className={`nav-cta ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#cta" className="btn-ghost">Sign Up</a>
          <a href="https://cal.com/acceda/demo"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary">
            Request Demo <IconArrow />
          </a>
        </div>

        {/* Mobile toggle — only visible on small screens */}
        <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </nav>
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section style={{ position: "relative", overflow: "hidden", paddingTop: 160, paddingBottom: 120 }}>
        <div className="grid-bg" />
        {/* Radial glow */}
        <div style={{
          position: "absolute", top: "10%", left: "50%", transform: "translateX(-50%)",
          width: 800, height: 600,
          background: "radial-gradient(ellipse, rgba(31,79,216,0.10) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>

        <div className="container">
          <div className="hero-wrapper" style={{ display: "flex", gap: 80, alignItems: "center" }}>
            {/* Left: Copy */}
            <div className="hero-content" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <div className="eyebrow">AI-Powered Accessibility Compliance</div>
              </motion.div>

              <motion.h1
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "clamp(40px,5vw,68px)", lineHeight: 1.0,
                  letterSpacing: "-0.04em", color: "var(--white)", marginBottom: 28,
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              >
                <span style={{ color: "var(--teal)" }}>USE</span>ACCEDA<br/>
                <span style={{ color: "var(--blue)" }}>Build Accessible</span><br/>
                Software Automatically
              </motion.h1>

              <motion.p
                className="section-body"
                style={{ marginBottom: 40, fontSize: 18 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.35 }}
              >
                AI scans, fixes, and verifies accessibility across your entire product stack. Build accessible, ship confidently.
              </motion.p>

              <motion.div
                className="hero-btns"
                style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.48 }}
              >
                <a href="https://cal.com/acceda/demo" 
                   target="_blank" 
                   rel="noopener noreferrer"
                   className="btn-primary btn-primary-lg">
                  Request an Enterprise Trial <IconArrow />
                </a>
                <a href="#platform" className="btn-outline-lg">See the Platform</a>
              </motion.div>

              <motion.div
                className="compliance-badges"
                style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.55, delay: 0.6 }}
              >
                {["WCAG 2.2 AA", "Section 508", "ADA Title II"].map(b => (
                  <span key={b} className="badge badge-teal">{b}</span>
                ))}
              </motion.div>
            </div>

            {/* Right: Scanner viz */}
            <motion.div
              className="hero-scanner"
              style={{ flex: "0 0 480px", minWidth: 0, animation: "float 5s ease-in-out infinite" }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <ScannerViz />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Industries ─────────────────────────────────────────── */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "44px 0", background: "var(--bg-card)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 32 }}>
            <p style={{ fontSize: 13, color: "var(--blue)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600 }}>
              Purpose-built for high-compliance industries
            </p>
          </div>
          <div className="logo-row">
            {[
              { label: "Financial Services", color: "var(--blue)" },
              { label: "Gov & Defense", color: "var(--teal)" },
              { label: "Healthcare Tech", color: "var(--white)" },
              { label: "Enterprise SaaS", color: "var(--amber)" },
              { label: "E-Commerce", color: "var(--red)" }
            ].map(l => (
              <div key={l.label} className="logo-item" style={{ 
                fontFamily: "var(--font-display)", 
                fontSize: 16, 
                fontWeight: 700,
                letterSpacing: "0.02em",
                color: "var(--white)",
                opacity: 0.9,
                display: "flex",
                alignItems: "center",
                gap: 12
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: l.color }}></span>
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <section style={{ padding: "100px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {stats.map((s, i) => (
              <FadeUp key={i} delay={i * 0.12}>
                <div className="stat-card">
                  <div className="stat-num" style={{ color: s.color }}>
                    <AnimatedNumber target={s.num} suffix={s.suffix} />
                  </div>
                  <p className="stat-label">{s.label}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Problem Statement ─────────────────────────────────────── */}
      <section style={{ padding: "100px 0", background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <div className="problem-wrapper" style={{ display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }}>
            <FadeUp style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column" }}>
              <div className="eyebrow" style={{ display: "flex" }}>The Problem</div>
              <h2 className="section-title" style={{ marginBottom: 24 }}>
                Legacy scanners leave<br/>
                your organization <span className="accent">exposed.</span>
              </h2>
              <p className="section-body" style={{ marginBottom: 32 }}>
                Traditional tools identify a fraction of actual WCAG violations — then hand your team an ambiguous list with no path to resolution. Engineers spend sprint cycles on guesswork. Compliance officers manually assemble legal documentation. And the 60–70% of issues that go undetected remain a litigation liability.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Only 30–40% WCAG coverage with axe / Lighthouse",
                  "Ambiguous findings with no guided resolution path",
                  "VPATs assembled manually — weeks of compliance work",
                  "No CI/CD integration — issues discovered post-release",
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--gray-2)" }}>
                    <span style={{ color: "var(--red)", marginTop: 2, flexShrink: 0 }}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M3 3l8 8M11 3l-8 8" stroke="#FF4D6A" strokeWidth="1.6" strokeLinecap="round"/>
                      </svg>
                    </span>
                    {p}
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* Problem visual */}
            <FadeUp delay={0.15} style={{ flex: 1, minWidth: 280 }}>
              <div style={{
                background: "var(--bg-card)", border: "1px solid var(--border)",
                borderRadius: 14, overflow: "hidden",
                boxShadow: "0 24px 60px rgba(0,0,0,0.4)",
              }}>
                <div style={{ background: "#0A2A66", padding: "12px 16px", borderBottom: "1px solid var(--border)", display: "flex", gap: 8, alignItems: "center" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF4D6A", display:"block" }}/>
                  <span style={{ fontSize: 11, color: "var(--gray-3)", letterSpacing: "0.04em" }}>legacy-scanner — output.log</span>
                </div>
                <div style={{ padding: "20px", fontFamily: "monospace", fontSize: 12, lineHeight: 2 }}>
                  {[
                    { t: "FAIL", c: "#FF4D6A", msg: "color-contrast (17 elements)" },
                    { t: "WARN", c: "#FFAA2C", msg: "image-alt — needs-review" },
                    { t: "WARN", c: "#FFAA2C", msg: "label — needs-review" },
                    { t: "INFO", c: "var(--gray-3)", msg: "aria-hidden-focus — manual check required" },
                    { t: "INFO", c: "var(--gray-3)", msg: "link-name — manual check required" },
                  ].map((l, i) => (
                    <div key={i} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                      <span style={{ color: l.c, fontWeight: 700, width: 36, flexShrink: 0, fontSize: 10, letterSpacing: "0.05em" }}>{l.t}</span>
                      <span style={{ color: "var(--gray-2)" }}>{l.msg}</span>
                    </div>
                  ))}
                  <div style={{ marginTop: 12, paddingTop: 12, borderTop: "1px solid var(--border)", color: "var(--gray-3)", fontSize: 11 }}>
                    Scanned 1 page · 5 issues reported · 0 fixes provided
                  </div>
                </div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────── */}
      <section id="platform" style={{ padding: "120px 0" }}>
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="eyebrow" style={{ justifyContent: "center" }}>The Platform</div>
              <h2 className="section-title" style={{ marginBottom: 20 }}>
                From scan to evidence,<br/><span className="accent">automatically.</span>
              </h2>
              <p className="section-body" style={{ margin: "0 auto", textAlign: "center" }}>
                Acceda manages the entire accessibility compliance lifecycle — detection, remediation, review, and legal documentation — in a single integrated platform.
              </p>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 16 }}>
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.07} style={{ height: "100%" }}>
                <div className="feature-card" style={{ height: "100%" }}>
                  <div className="feature-icon">{f.icon}</div>
                  <div className="feature-title">{f.title}</div>
                  <p className="feature-body">{f.body}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Personas ─────────────────────────────────────────────── */}
      <section id="use-cases" style={{ padding: "100px 0", background: "var(--bg-2)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="container">
          <FadeUp>
            <div style={{ marginBottom: 60 }}>
              <div className="eyebrow">Built For Your Team</div>
              <h2 className="section-title">
                The right tool for<br/>every stakeholder.
              </h2>
            </div>
          </FadeUp>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {personas.map((p, i) => (
              <FadeUp key={i} delay={i * 0.1} style={{ height: "100%" }}>
                <div className="persona-card" style={{ height: "100%" }}>
                  <div className="persona-role">{p.role}</div>
                  <div className="persona-title">{p.title}</div>
                  <p className="persona-body">{p.body}</p>
                  <div className="persona-divider"/>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── Compliance Coverage ───────────────────────────────────── */}
      <section id="compliance" style={{ padding: "100px 0" }}>
        <div className="container">
          <FadeUp>
            <div className="compliance-wrapper" style={{
              background: "var(--bg-card)", border: "1px solid var(--border)",
              borderRadius: 20, padding: "56px 64px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              flexWrap: "wrap", gap: 40,
            }}>
              <div style={{ flex: 1, minWidth: 260, display: "flex", flexDirection: "column" }}>
                <div className="eyebrow" style={{ display: "flex" }}>Compliance Coverage</div>
                <h2 className="section-title" style={{ fontSize: "clamp(26px,3.5vw,40px)", marginBottom: 16 }}>
                  Every standard.<br/>One platform.
                </h2>
                <p className="section-body" style={{ fontSize: 15 }}>
                  Acceda is purpose-built for the standards your legal and compliance teams require — with the evidence trail to back every claim.
                </p>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { label: "WCAG 2.2 Level AA",   desc: "Web Content Accessibility Guidelines" },
                  { label: "Section 508",           desc: "Federal Rehabilitation Act compliance" },
                  { label: "ADA Title II",          desc: "Americans with Disabilities Act" },
                  { label: "EN 301 549",            desc: "European accessibility standard" },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{
                      width: 24, height: 24, borderRadius: 6, background: "var(--teal-dim)",
                      border: "1px solid rgba(16,178,108,0.25)", display: "grid", placeItems: "center", flexShrink: 0,
                    }}>
                      <IconCheck />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: "var(--white)" }}>{c.label}</div>
                      <div style={{ fontSize: 12, color: "var(--gray-3)" }}>{c.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────── */}
      <section id="cta" style={{ padding: "0 0 100px" }}>
        <div className="container">
          <FadeUp>
            <div className="cta-section" style={{ padding: "96px 48px", textAlign: "center" }}>
              <div className="cta-glow" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="eyebrow" style={{ justifyContent: "center" }}>Get Started</div>
                <h2 style={{
                  fontFamily: "var(--font-display)", fontSize: "clamp(32px,4.5vw,56px)",
                  fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08,
                  color: "var(--white)", marginBottom: 20,
                }}>
                  Secure your compliance<br/>posture today.
                </h2>
                <p className="section-body" style={{ margin: "0 auto 44px", textAlign: "center", maxWidth: 480 }}>
                  Integrate Acceda into your engineering workflow and ship accessible products with confidence — backed by audit-ready evidence.
                </p>
              <div style={{ maxWidth: 480, margin: "0 auto" }}>
                <DemoForm />
              </div>
              <div className="compliance-badges" style={{ justifyContent: "center", marginTop: 32 }}>
                {["SOC 2 Type II", "WCAG 2.2 AA", "Section 508", "ADA Title II"].map(b => (
                  <span key={b} className="badge badge-blue">{b}</span>
                ))}
              </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ── Footer ───────────────────────────────────────────────── */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 0" }}>
        <div className="container">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 24 }}>
            <a href="#" className="nav-logo">
              <Image src={accedaLogo} alt="Acceda Logo" height={75} style={{ width: "auto" }} />
            </a>
            <div style={{ display: "flex", gap: 32, flexWrap: "wrap" }}>
              {["Privacy Policy", "Terms of Service", "Security", "Accessibility Statement"].map(l => (
                <a key={l} href="#" style={{ fontSize: 13, color: "var(--gray-3)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseOver={e => e.target.style.color = "var(--gray-2)"}
                  onMouseOut={e => e.target.style.color = "var(--gray-3)"}
                >{l}</a>
              ))}
            </div>
            <div style={{ fontSize: 12, color: "var(--gray-3)" }}>
              © 2026 Acceda. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
