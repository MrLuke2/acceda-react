"use client";

import DemoForm from "@/components/DemoForm";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import accedaLogo from "./acceda_logo_2.svg";

// ─── Full Brand Token System ─────────────────────────────────────────────────
// Based on ACCEDA Brand Guide v1.0
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      /* ── Brand Core ── */
      --navy:          #0A2A66;   /* Deep Accessibility Blue */
      --signal:        #1F4FD8;   /* Signal Blue */
      --trust:         #0C1F4A;   /* Trust Navy */
      --green:         #10B26C;   /* Validation Green */
      --electric:      #3A7BFF;   /* Electric Blue */
      --yellow:        #FFC247;   /* Accessibility Yellow */
      --soft-gray:     #F4F6F8;   /* Soft Gray — light sections */
      --ui-gray:       #AAB4C2;   /* UI Gray — accessible for non-text contrast on navy */

      /* ── Semantic surface tokens ── */
      --surface-dark:    #0C1F4A;
      --surface-darker:  #080E22;
      --surface-card:    rgba(10,42,102,0.55);
      --surface-card-hi: rgba(31,79,216,0.08);
      --surface-light:   #F4F6F8;
      --surface-white:   #FFFFFF;
      --surface-cream:   #F8FAFF;

      /* ── Semantic accent tokens ── */
      --accent-primary:  #1F4FD8;   /* Signal Blue — interactive */
      --accent-action:   #10B26C;   /* Green — success / CTA */
      --accent-urgency:  #FFC247;   /* Yellow — deadlines / alerts */
      --accent-electric: #3A7BFF;   /* Electric — hover / depth */
      --accent-red:      #FF4D6A;   /* Error / critical */
      --accent-amber:    #FFAA2C;   /* Warning */

      /* ── Border tokens ── */
      --border:          rgba(255,255,255,0.07);
      --border-hi:       rgba(31,79,216,0.35);
      --border-light:    #E2E8F0;
      --border-yellow:   rgba(255,194,71,0.4);

      /* ── Text tokens ── */
      --text-primary:    #FFFFFF;
      --text-secondary:  #CBD5E1;   /* Light Slate — high-contrast secondary text */
      --text-muted:      #94A3B8;   /* Muted — meets contrast for large text */
      --text-dark:       #0F1729;
      --text-dark-sub:   #374151;

      /* ── Dim / alpha tokens ── */
      --blue-dim:        rgba(31,79,216,0.12);
      --green-dim:       rgba(16,178,108,0.10);
      --yellow-dim:      rgba(255,194,71,0.10);
      --electric-dim:    rgba(58,123,255,0.12);
      --red-dim:         rgba(255,77,106,0.10);

      /* ── Typography ── */
      --font-display: 'Space Grotesk', sans-serif;
      --font-body:    'DM Sans', sans-serif;
      --font-mono:    'JetBrains Mono', monospace;
    }

    /* ── Reduced motion ── */
    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    }

    /* ── Skip link ── */
    .skip-link {
      position: absolute; top: -9999px; left: 0; z-index: 9999;
      padding: 12px 24px; background: var(--navy); color: #fff;
      font-weight: 600; text-decoration: none;
      border-radius: 0 0 6px 6px; font-family: var(--font-body);
    }
    .skip-link:focus { top: 0; }

    /* ── Focus rings ── */
    *:focus-visible {
      outline: 2px solid var(--green) !important;
      outline-offset: 3px;
    }

    ::placeholder { color: var(--ui-gray); opacity: 1; }
    html { scroll-behavior: smooth; scroll-padding-top: 80px; }

    body {
      background: var(--surface-dark);
      color: var(--text-primary);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }

    .platform-grid {
      display: grid;
      gap: 16px;
      grid-template-columns: 1fr;
    }
    @media (min-width: 640px) {
      .platform-grid { grid-template-columns: repeat(2, 1fr); }
    }
    @media (min-width: 1024px) {
      .platform-grid { grid-template-columns: repeat(3, 1fr); }
    }

    /* ── Scrollbar ── */
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: var(--surface-darker); }
    ::-webkit-scrollbar-thumb { background: var(--signal); border-radius: 2px; }

    /* ─────────────────────── NAVIGATION ─────────────────────── */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px; height: 68px;
      transition: background 0.3s, border-color 0.3s;
    }
    .nav.scrolled {
      background: rgba(8,14,34,0.94);
      backdrop-filter: blur(24px);
      border-bottom: 1px solid var(--border);
    }
    .nav-logo {
      font-family: var(--font-display); font-size: 22px; font-weight: 800;
      letter-spacing: -0.5px; color: #fff; text-decoration: none;
      display: flex; align-items: center; gap: 10px;
    }
    .nav-links { display: flex; gap: 32px; list-style: none; }
    .nav-links a {
      font-family: var(--font-body); font-size: 14px; font-weight: 400;
      color: var(--text-secondary); text-decoration: none; letter-spacing: 0.01em;
      transition: color 0.2s; padding: 4px 0;
    }
    .nav-links a:hover { color: #fff; }
    .nav-cta { display: flex; align-items: center; gap: 12px; }

    .btn-ghost {
      font-family: var(--font-body); font-size: 14px; font-weight: 500;
      color: var(--text-secondary); background: transparent; border: none;
      cursor: pointer; text-decoration: none; padding: 8px 4px;
      transition: color 0.2s;
    }
    .btn-ghost:hover { color: #fff; }

    .btn-primary {
      font-family: var(--font-body); font-size: 14px; font-weight: 600;
      color: #fff; background: var(--signal); border: none;
      padding: 10px 20px; border-radius: 8px; cursor: pointer;
      letter-spacing: 0.01em; text-decoration: none;
      transition: background 0.2s, transform 0.15s;
      display: inline-flex; align-items: center; gap: 6px;
    }
    .btn-primary:hover { background: var(--electric); transform: translateY(-1px); }

    .btn-primary-lg { font-size: 15px; padding: 14px 32px; border-radius: 10px; }

    .btn-outline-lg {
      font-family: var(--font-body); font-size: 15px; font-weight: 500;
      color: rgba(255,255,255,0.8); background: transparent;
      border: 1.5px solid rgba(255,255,255,0.18);
      padding: 13px 32px; border-radius: 10px; cursor: pointer;
      transition: border-color 0.2s, background 0.2s, color 0.2s;
      text-decoration: none;
    }
    .btn-outline-lg:hover {
      border-color: rgba(255,255,255,0.45);
      background: rgba(255,255,255,0.06);
      color: #fff;
    }

    /* ─────────────────────── LAYOUT ─────────────────────── */
    .container { max-width: 1160px; margin: 0 auto; padding: 0 clamp(16px, 5vw, 24px); }

    /* ─────────────────────── SECTION TYPOGRAPHY ─────────────────────── */
    .eyebrow {
      font-family: var(--font-body); font-size: 11.5px; font-weight: 600;
      letter-spacing: 0.13em; text-transform: uppercase;
      color: var(--green); margin-bottom: 16px;
      display: flex; align-items: center; gap: 10px;
    }
    .eyebrow::before {
      content: ''; display: block; width: 22px; height: 1.5px;
      background: var(--green); flex-shrink: 0;
    }
    .eyebrow.yellow { color: var(--yellow); }
    .eyebrow.yellow::before { background: var(--yellow); }
    .eyebrow.blue { color: var(--signal); }
    .eyebrow.blue::before { background: var(--signal); }

    .section-title {
      font-family: var(--font-display); font-size: clamp(30px,4vw,52px);
      font-weight: 700; line-height: 1.08; letter-spacing: -0.03em;
      color: #fff;
    }
    .section-title.dark { color: var(--text-dark); }
    .section-title .accent-blue   { color: var(--electric); }
    .section-title .accent-green  { color: var(--green); }
    .section-title .accent-yellow { color: var(--yellow); }

    .section-body {
      font-size: 17px; line-height: 1.72; color: var(--text-secondary); font-weight: 300;
    }
    .section-body.dark { color: var(--text-dark-sub); }

    /* ─────────────────────── BADGES ─────────────────────── */
    .badge {
      font-family: var(--font-body); font-size: 11px; font-weight: 600;
      letter-spacing: 0.08em; text-transform: uppercase;
      padding: 5px 12px; border-radius: 20px; border: 1px solid; white-space: nowrap;
    }
    .badge-green  { color: var(--green);    border-color: rgba(16,178,108,0.35);  background: var(--green-dim); }
    .badge-blue   { color: var(--electric); border-color: rgba(58,123,255,0.35);  background: var(--electric-dim); }
    .badge-yellow { color: var(--yellow);   border-color: rgba(255,194,71,0.4);   background: var(--yellow-dim); }
    .badge-dark-green { color: var(--green); border-color: rgba(16,178,108,0.25); background: rgba(16,178,108,0.06); }

    /* ─────────────────────── CARDS ─────────────────────── */
    .stat-card {
      border-radius: 14px; padding: clamp(20px, 5vw, 32px) clamp(16px, 4vw, 28px);
      transition: border-color 0.3s, transform 0.2s;
      border: 1px solid var(--border);
    }
    .stat-card:hover { transform: translateY(-2px); }
    .stat-num {
      font-family: var(--font-display); font-size: clamp(32px, 5vw, 48px); font-weight: 800;
      letter-spacing: -0.05em; line-height: 1;
    }
    .stat-label { font-size: 13.5px; color: var(--text-secondary); margin-top: 8px; line-height: 1.5; }

    .feature-card {
      background: var(--surface-card); border: 1px solid var(--border);
      border-radius: 14px; padding: clamp(20px, 5vw, 32px);
      transition: border-color 0.3s, transform 0.25s, background 0.3s;
      position: relative; overflow: hidden; height: 100%;
    }
    .feature-card::after {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--electric), transparent);
      opacity: 0; transition: opacity 0.3s;
    }
    .feature-card:hover {
      border-color: var(--border-hi);
      transform: translateY(-4px);
      background: rgba(31,79,216,0.07);
    }
    .feature-card:hover::after { opacity: 1; }
    .feature-icon {
      width: 44px; height: 44px; border-radius: 10px;
      background: var(--blue-dim); border: 1px solid rgba(31,79,216,0.2);
      display: grid; place-items: center; margin-bottom: 20px;
    }
    .feature-title {
      font-family: var(--font-display); font-size: 17px; font-weight: 600;
      color: #fff; margin-bottom: 10px; letter-spacing: -0.01em;
    }
    .feature-body { font-size: 13.5px; line-height: 1.7; color: var(--text-secondary); }

    /* Light-background feature card */
    .feature-card-light {
      background: #fff; border: 1px solid var(--border-light);
      border-radius: 14px; padding: clamp(20px, 5vw, 32px);
      transition: border-color 0.3s, transform 0.25s, box-shadow 0.3s;
      position: relative; overflow: hidden; height: 100%;
      box-shadow: 0 4px 16px rgba(10,42,102,0.05);
    }
    .feature-card-light::after {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 3px;
      background: linear-gradient(90deg, var(--signal), var(--electric));
      opacity: 0; transition: opacity 0.3s;
    }
    .feature-card-light:hover {
      border-color: rgba(31,79,216,0.5);
      transform: translateY(-8px);
      box-shadow: 0 24px 48px rgba(31,79,216,0.16), inset 0 0 0 1px rgba(31,79,216,0.1);
    }
    .feature-card-light:hover::after { opacity: 1; }
    .feature-icon-light {
      width: 44px; height: 44px; border-radius: 10px;
      background: var(--blue-dim); border: 1px solid rgba(31,79,216,0.15);
      display: grid; place-items: center; margin-bottom: 20px;
    }
    .feature-title-light {
      font-family: var(--font-display); font-size: 17px; font-weight: 600;
      color: var(--text-dark); margin-bottom: 10px; letter-spacing: -0.01em;
    }
    .feature-body-light { font-size: 13.5px; line-height: 1.7; color: var(--text-dark-sub); }

    .compliance-card { box-shadow: 0 4px 16px rgba(10,42,102,0.05); }
    .compliance-card-indicator {
      position: absolute; top: 0; left: 0; right: 0; height: 3px;
      background: linear-gradient(90deg, #FFC247, #FF9900);
      opacity: 0; transition: opacity 0.3s;
    }
    .compliance-card:hover {
      border-color: rgba(255,194,71,0.5) !important;
      transform: translateY(-8px) !important;
      box-shadow: 0 24px 48px rgba(255,194,71,0.16), inset 0 0 0 1px rgba(255,194,71,0.1) !important;
    }
    .compliance-card:hover .compliance-card-indicator { opacity: 1; }

    .persona-card {
      border: 1px solid var(--border-light); border-radius: 14px; padding: clamp(24px, 6vw, 36px);
      background: #fff; box-shadow: 0 4px 16px rgba(10,42,102,0.05);
      transition: border-color 0.3s, box-shadow 0.3s, transform 0.25s;
      position: relative; overflow: hidden; height: 100%;
    }
    .persona-card::before {
      content: ''; position: absolute; top: 0; left: 0; right: 0;
      height: 3px; background: var(--green);
      transform: scaleX(0); transform-origin: left;
      transition: transform 0.3s ease;
    }
    .persona-card:hover {
      border-color: rgba(16,178,108,0.5);
      box-shadow: 0 24px 48px rgba(16,178,108,0.16), inset 0 0 0 1px rgba(16,178,108,0.1);
      transform: translateY(-8px);
    }
    .persona-card:hover::before { transform: scaleX(1); }
    .persona-role {
      font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
      text-transform: uppercase; color: var(--green); margin-bottom: 14px;
    }
    .persona-title {
      font-family: var(--font-display); font-size: 21px; font-weight: 700;
      color: var(--text-dark); margin-bottom: 14px; letter-spacing: -0.02em;
      line-height: 1.25;
    }
    .persona-body { font-size: 14px; line-height: 1.72; color: var(--text-dark-sub); }
    .persona-divider { width: 32px; height: 2.5px; background: var(--green); margin-top: 24px; border-radius: 2px; }

    /* ─────────────────────── LOGO ROW ─────────────────────── */
    .logo-row {
      display: flex; align-items: center; gap: 48px;
      flex-wrap: wrap; justify-content: center;
    }
    .logo-item {
      font-family: var(--font-display); font-size: 13px; font-weight: 700;
      letter-spacing: 0.04em; text-transform: uppercase;
      color: var(--text-secondary); display: flex; align-items: center; gap: 10px;
      transition: color 0.2s;
    }
    .logo-item:hover { color: #fff; }

    /* ─────────────────────── CTA SECTION ─────────────────────── */
    .cta-section {
      position: relative; overflow: hidden;
      background: linear-gradient(145deg, #0A2A66 0%, #0C1F4A 50%, #080E22 100%);
      border-radius: 20px; border: 1px solid var(--border);
    }
    .cta-glow {
      position: absolute; width: 700px; height: 700px;
      background: radial-gradient(circle, rgba(31,79,216,0.14) 0%, transparent 65%);
      border-radius: 50%; top: 50%; left: 50%; transform: translate(-50%,-50%);
      pointer-events: none;
    }

    /* ─────────────────────── URGENCY BANNER ─────────────────────── */
    .urgency-banner {
      background: linear-gradient(135deg, rgba(255,194,71,0.12) 0%, rgba(255,170,44,0.08) 100%);
      border: 1px solid rgba(255,194,71,0.3);
      border-radius: 10px;
      padding: 14px 20px;
      display: flex; align-items: center; gap: 12px;
      margin-bottom: 28px;
    }
    .urgency-dot {
      width: 8px; height: 8px; border-radius: 50%;
      background: var(--yellow); flex-shrink: 0;
      box-shadow: 0 0 0 4px rgba(255,194,71,0.2);
      animation: pulse-yellow 2s ease-in-out infinite;
    }
    @keyframes pulse-yellow {
      0%,100% { box-shadow: 0 0 0 4px rgba(255,194,71,0.2); }
      50%      { box-shadow: 0 0 0 8px rgba(255,194,71,0.05); }
    }

    /* ─────────────────────── SECTION DIVIDERS ─────────────────────── */
    .section-divider {
      height: 1px;
      background: linear-gradient(90deg, transparent, var(--border-light), transparent);
    }

    /* ─────────────────────── ANIMATIONS ─────────────────────── */
    @keyframes scan-line {
      0%   { top: 0; opacity: 1; }
      90%  { top: 100%; opacity: 1; }
      100% { top: 100%; opacity: 0; }
    }
    @keyframes finding-appear {
      from { opacity: 0; transform: translateX(8px); }
      to   { opacity: 1; transform: translateX(0); }
    }
    @keyframes badge-pop {
      0%   { transform: scale(0.8); opacity: 0; }
      60%  { transform: scale(1.1); }
      100% { transform: scale(1); opacity: 1; }
    }
    @keyframes pulse-ring {
      0%   { transform: scale(1); opacity: 0.6; }
      100% { transform: scale(1.6); opacity: 0; }
    }
    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-10px); }
    }
    @keyframes grid-fade {
      0%,100% { opacity: 0.03; }
      50%      { opacity: 0.065; }
    }
    @keyframes shimmer {
      0%   { background-position: -200% center; }
      100% { background-position: 200% center; }
    }

    /* ─────────────────────── MISC ─────────────────────── */
    .noise {
      position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.022;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
    }
    .grid-bg {
      position: absolute; inset: 0; pointer-events: none;
      background-image:
        linear-gradient(rgba(31,79,216,0.045) 1px, transparent 1px),
        linear-gradient(90deg, rgba(31,79,216,0.045) 1px, transparent 1px);
      background-size: 48px 48px;
      animation: grid-fade 8s ease-in-out infinite;
    }

    /* ─────────────────────── MOBILE ─────────────────────── */
    .mobile-menu-btn {
      display: none; background: transparent; border: none;
      color: #fff; cursor: pointer; padding: 8px;
    }

    @media (max-width: 1024px) {
      .hero-wrapper   { flex-direction: column; text-align: center; gap: 80px !important; }
      .hero-content   { align-items: center; }
      .hero-scanner   { flex: 1 !important; width: 100%; max-width: 480px; align-self: center; margin-top: 110px !important; }
      .problem-wrapper { flex-direction: column; gap: 50px !important; text-align: center; }
      .compliance-wrapper { flex-direction: column; gap: 40px !important; text-align: center; padding: 40px 32px !important; }
    }

    @media (max-width: 768px) {
      .mobile-menu-btn { display: block; }
      .nav { padding: 12px 20px; flex-wrap: wrap; height: auto; min-height: 80px; }
      .nav-links {
        display: none; flex-direction: column; width: 100%;
        padding: 20px 0; gap: 20px; border-top: 1px solid var(--border); margin-top: 10px;
      }
      .nav-links.open { display: flex; }
      .nav-cta { display: none; width: 100%; flex-direction: column; padding-bottom: 24px; gap: 12px; }
      .nav-cta.open { display: flex; }
      .nav-cta .btn-ghost, .nav-cta .btn-primary { width: 100%; justify-content: center; }
      .container { padding: 0 16px; }
      .section-title { font-size: 30px !important; }
      .cta-section { padding: 60px 24px !important; }
      .hero-btns, .compliance-badges { justify-content: center; }
      .logo-row { gap: 24px; }
      .stat-card { padding: 24px; }
      .urgency-banner { flex-direction: column; text-align: center; gap: 8px; padding: 14px 16px; }
      .hero-scanner { padding-top: 50px !important; }
    }
  `}</style>
);

// ─── Icons ──────────────────────────────────────────────────────────────────
const IconScan = ({ color = "var(--signal)" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path d="M3 6V3h3M14 3h3v3M17 14v3h-3M6 17H3v-3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    <rect x="6" y="6" width="8" height="8" rx="1.5" stroke={color} strokeWidth="1.5"/>
    <path d="M8 10h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconShield = ({ color = "var(--signal)" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path d="M10 2L4 4.5V9c0 3.87 2.62 7.25 6 8 3.38-.75 6-4.13 6-8V4.5L10 2Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M7 10l2 2 4-4" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconDoc = ({ color = "var(--signal)" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path d="M11 2H5a1 1 0 00-1 1v14a1 1 0 001 1h10a1 1 0 001-1V8l-5-6Z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M11 2v6h6M7 11h6M7 14h4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconCode = ({ color = "var(--signal)" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path d="M7 6L3 10l4 4M13 6l4 4-4 4M11 4l-2 12" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconReview = ({ color = "var(--signal)" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <circle cx="10" cy="10" r="7" stroke={color} strokeWidth="1.5"/>
    <path d="M10 7v3.5l2.5 1.5" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);
const IconGate = ({ color = "var(--signal)" }) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true" focusable="false">
    <path d="M4 10h12M4 10l3-3M4 10l3 3M16 10l-3-3M16 10l-3 3" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
    <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconCheck = ({ color = "#10B26C", size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
    <path d="M2 7l4 4 6-7" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconX = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
    <path d="M3 3l8 8M11 3l-8 8" stroke="#FF4D6A" strokeWidth="1.6" strokeLinecap="round"/>
  </svg>
);

// ─── Scanner Visualization ───────────────────────────────────────────────────
const ALL_FINDINGS = [
  { id: 1, sev: "critical", msg: "Missing alt text on 14 images",           rule: "WCAG 1.1.1" },
  { id: 2, sev: "critical", msg: "Insufficient color contrast ratio 2.3:1", rule: "WCAG 1.4.3" },
  { id: 3, sev: "high",     msg: "Form inputs lack accessible labels",       rule: "WCAG 1.3.1" },
  { id: 4, sev: "high",     msg: "Keyboard navigation trap detected",        rule: "WCAG 2.1.2" },
  { id: 5, sev: "medium",   msg: "Missing document language attribute",      rule: "WCAG 3.1.1" },
];
const SEV_COLOR = { critical: "#FF4D6A", high: "#FFAA2C", medium: "#3A7BFF" };

function ScannerViz() {
  const [isPaused, setIsPaused] = useState(false);
  const [findings, setFindings] = useState([]);
  const [resolved, setResolved] = useState(0);
  const [scanning, setScanning] = useState(false);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    let cancelled = false;
    const timeouts = [];
    const T = (fn, ms) => { const id = setTimeout(() => { if (!cancelled) fn(); }, ms); timeouts.push(id); };
    const runCycle = () => {
      setFindings([]); setResolved(0); setDone(false); setScanning(true);
      ALL_FINDINGS.forEach((f, i) => T(() => setFindings(p => [...p, f]), 800 + i * 700));
      const afterScan = 800 + ALL_FINDINGS.length * 700 + 400;
      T(() => setScanning(false), afterScan);
      ALL_FINDINGS.forEach((_, i) => T(() => setResolved(i + 1), afterScan + 500 + i * 400));
      const afterResolve = afterScan + 500 + ALL_FINDINGS.length * 400;
      T(() => setDone(true), afterResolve);
      T(runCycle, afterResolve + 3500);
    };
    runCycle();
    return () => { cancelled = true; timeouts.forEach(clearTimeout); };
  }, [isPaused]);

  return (
    <div
      role="region"
      aria-label="ACCEDA scan engine visualization"
      style={{
        background: "rgba(8,14,34,0.9)", border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 40px 100px rgba(0,0,0,0.55), 0 0 0 1px rgba(31,79,216,0.1)",
      }}
    >
      {/* Title bar */}
      <div style={{
        background: "rgba(10,42,102,0.8)", padding: "clamp(10px, 3vw, 14px) clamp(12px, 4vw, 20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
        display: "flex", alignItems: "center", gap: "clamp(6px, 2vw, 10px)",
      }}>
        {["#FF4D6A","#FFAA2C","#10B26C"].map((c, i) => (
          <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "block" }}/>
        ))}
        <span style={{ marginLeft: 12, fontSize: 11.5, color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>
          ACCEDA — audit · {done ? "complete" : scanning ? "scanning..." : "remediating..."}
        </span>
        <button
          onClick={() => setIsPaused(!isPaused)}
          aria-label={isPaused ? "RESUME — resume scan animation" : "PAUSE — pause scan animation"}
          style={{
            background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 6, color: "#fff", fontSize: 10, cursor: "pointer",
            padding: "4px 8px", fontFamily: "var(--font-mono)", transition: "background 0.2s",
            marginLeft: "auto"
          }}
          onMouseOver={e => e.currentTarget.style.background = "rgba(255,255,255,0.12)"}
          onMouseOut={e => e.currentTarget.style.background = "rgba(255,255,255,0.06)"}
        >
          {isPaused ? "▶ RESUME" : "II PAUSE"}
        </button>
        <span style={{
          marginLeft: 12, width: 7, height: 7, borderRadius: "50%",
          background: done ? "#10B26C" : (scanning && !isPaused) ? "#FFAA2C" : "#1F4FD8",
          boxShadow: `0 0 0 3px ${done ? "rgba(16,178,108,0.2)" : (scanning && !isPaused) ? "rgba(255,170,44,0.2)" : "rgba(31,79,216,0.2)"}`,
          animation: (done || isPaused) ? "none" : "pulse-ring 1.5s ease-out infinite",
        }}/>
      </div>

      {/* Target */}
      <div style={{ padding: "clamp(12px, 4vw, 16px) clamp(12px, 4vw, 20px)", borderBottom: "1px solid rgba(255,255,255,0.06)", position: "relative", overflow: "hidden", minHeight: 52 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", marginBottom: 4, fontFamily: "var(--font-mono)" }}>Target</div>
        <div style={{ fontSize: "clamp(12px, 3.5vw, 14px)", color: "rgba(255,255,255,0.85)", fontWeight: 500, fontFamily: "var(--font-mono)", wordBreak: "break-all" }}>useacceda.com/portal</div>
        {scanning && (
          <div style={{
            position: "absolute", left: 0, right: 0, top: 0, height: 2,
            background: "linear-gradient(90deg, transparent, var(--electric), transparent)",
            animation: "scan-line 1.8s ease-in-out infinite",
          }}/>
        )}
      </div>

      {/* Findings */}
      <div style={{ padding: "clamp(12px, 4vw, 16px) clamp(12px, 4vw, 20px)", minHeight: 210, maxHeight: 210, overflowY: "hidden" }}>
        {findings.length === 0 && (
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.25)", paddingTop: 8, fontFamily: "var(--font-mono)" }}>
            Initializing scan engine...
          </div>
        )}
        {findings.map((f, idx) => {
          const isResolved = idx < resolved;
          return (
            <div key={f.id} style={{
              display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 11,
              animation: "finding-appear 0.3s ease-out both",
              opacity: isResolved ? 0.4 : 1,
              transition: "opacity 0.4s",
            }}>
              <span style={{
                fontSize: 9.5, fontWeight: 700, padding: "3px 7px", borderRadius: 4,
                background: isResolved ? "rgba(16,178,108,0.1)" : `${SEV_COLOR[f.sev]}18`,
                color: isResolved ? "var(--green)" : SEV_COLOR[f.sev],
                border: `1px solid ${isResolved ? "rgba(16,178,108,0.3)" : `${SEV_COLOR[f.sev]}40`}`,
                whiteSpace: "nowrap", marginTop: 1, letterSpacing: "0.05em",
                transition: "all 0.4s", fontFamily: "var(--font-mono)",
              }}>
                {isResolved ? "FIXED" : f.sev.toUpperCase()}
              </span>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 12.5, color: isResolved ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.88)",
                  transition: "color 0.4s",
                  textDecoration: isResolved ? "line-through" : "none",
                }}>{f.msg}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 2, fontFamily: "var(--font-mono)" }}>{f.rule}</div>
              </div>
              {isResolved && <div style={{ animation: "badge-pop 0.3s ease-out" }}><IconCheck /></div>}
            </div>
          );
        })}
      </div>

      {/* Progress bar */}
      <div style={{
        padding: "clamp(10px, 3vw, 12px) clamp(12px, 4vw, 20px)", borderTop: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(10,42,102,0.6)", display: "flex", alignItems: "center", gap: 14,
      }}>
        <div style={{ flex: 1, height: 3, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
          <div style={{
            height: "100%", borderRadius: 2,
            background: done ? "var(--green)" : "linear-gradient(90deg, var(--signal), var(--electric))",
            width: `${(resolved / ALL_FINDINGS.length) * 100}%`,
            transition: "width 0.4s ease",
          }}/>
        </div>
        <span style={{
          fontSize: 11, fontFamily: "var(--font-mono)",
          color: done ? "var(--green)" : "rgba(255,255,255,0.4)",
          whiteSpace: "nowrap",
        }}>
          {done ? "✓ All resolved" : `${resolved}/${ALL_FINDINGS.length} resolved`}
        </span>
      </div>
    </div>
  );
}

// ─── Countdown Clock ────────────────────────────────────────────────────────
function CountdownClock({ targetDate, compact = false, large = false, numberColor }) {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, mins: 0, secs: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +new Date(targetDate) - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          mins: Math.floor((difference / 1000 / 60) % 60),
          secs: Math.floor((difference / 1000) % 60),
        });
      }
    };

    const timer = setInterval(calculateTimeLeft, 1000);
    calculateTimeLeft();
    return () => clearInterval(timer);
  }, [targetDate]);

  const Item = ({ val, label }) => (
    <motion.div 
      whileHover={{ scale: 1.1 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      style={{ 
        display: "flex", flexDirection: "column", alignItems: "center", 
        minWidth: compact ? 34 : (large ? "clamp(42px, 12vw, 75px)" : 44),
        cursor: "default"
      }}
    >
      <span style={{ 
        fontFamily: "var(--font-mono)", 
        fontSize: compact ? 14 : (large ? "clamp(20px, 6vw, 36px)" : 18), 
        fontWeight: 800, 
        color: numberColor || (compact ? "inherit" : "var(--yellow)"),
        lineHeight: 1
      }}>
        {val.toString().padStart(2, "0")}
      </span>
      <span style={{ 
        fontSize: compact ? 9 : (large ? 10 : 9), 
        textTransform: "uppercase", 
        letterSpacing: "0.08em", 
        opacity: 0.6, 
        marginTop: compact ? 2 : (large ? 4 : 2),
        fontWeight: large ? 700 : 400,
        textShadow: large ? "0 1px 1px rgba(0,0,0,0.1)" : "none"
      }}>
        {label}
      </span>
    </motion.div>
  );

  const Separator = () => (
    <span style={{ 
      opacity: 0.3, 
      fontSize: compact ? 12 : (large ? "clamp(18px, 5vw, 24px)" : 16), 
      marginTop: compact ? -10 : (large ? "clamp(-16px, -4vw, -22px)" : -14),
      color: numberColor || "inherit"
    }}>:</span>
  );

  return (
    <div style={{ display: "flex", gap: compact ? 8 : (large ? "clamp(6px, 2vw, 24px)" : 12), alignItems: "center", justifyContent: "center" }}>
      <Item val={timeLeft.days} label="Days" />
      <Separator />
      <Item val={timeLeft.hours} label="Hrs" />
      <Separator />
      <Item val={timeLeft.mins} label="Min" />
      <Separator />
      <Item val={timeLeft.secs} label="Sec" />
    </div>
  );
}

// ─── Animated Counter ────────────────────────────────────────────────────────
function AnimatedNumber({ target, suffix = "", duration = 1500, trigger = true }) {
  const [display, setDisplay] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView && resetKey === 0) return;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      setDisplay(Math.round(ease * target));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration, resetKey]);

  // Exposed reset function for parent hover
  useEffect(() => {
    if (trigger === "hover-reset") {
      setResetKey(prev => prev + 1);
    }
  }, [trigger]);

  return <span ref={ref} aria-live="polite">{display}{suffix}</span>;
}

// ─── Interactive Stat Card ──────────────────────────────────────────────────
function InteractiveStatCard({ num, suffix, label, color, bg, border }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const [trigger, setTrigger] = useState(false);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Map card colors to spotlight RGBA
  const getGlowColor = () => {
    if (color === "var(--green)") return "rgba(16,178,108,0.12)";
    if (color === "var(--electric)") return "rgba(31,79,216,0.12)";
    if (color === "var(--yellow)") return "rgba(255,194,71,0.14)";
    return "rgba(31,79,216,0.12)";
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setTrigger("hover-reset")}
      onMouseLeave={() => setTrigger(false)}
      initial="initial"
      whileHover="hover"
      className="stat-card"
      style={{
        background: bg,
        borderColor: border,
        height: "100%",
        position: "relative",
        overflow: "hidden",
        transition: "border-color 0.3s, background 0.3s"
      }}
      variants={{
        initial: { y: 0, boxShadow: "0 0px 0px rgba(0,0,0,0)" },
        hover: { y: -8, boxShadow: `0 24px 48px ${getGlowColor()}, inset 0 0 0 1px ${color}33` }
      }}
    >
      {/* Spotlight Glow - Themed to card type */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, ${getGlowColor()}, transparent 50%)`
          )
        }}
      />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <div className="stat-num" style={{ color: color }}>
          <AnimatedNumber target={num} suffix={suffix} trigger={trigger} />
        </div>
        <p className="stat-label" style={{ color: "var(--text-dark-sub)" }}>{label}</p>
      </div>
    </motion.div>
  );
}

// ─── FadeUp ─────────────────────────────────────────────────────────────────
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

// ─── Interactive FAQ Item ──────────────────────────────────────────────────────
function InteractiveFAQItem({ faq, index, isOpen, toggleOpen }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <FadeUp delay={index * 0.08}>
      <motion.div
        onMouseMove={handleMouseMove}
        initial="initial"
        whileHover="hover"
        animate={isOpen ? "open" : "initial"}
        variants={{
          initial: { backgroundColor: "#fff", scale: 1, boxShadow: "0 4px 12px rgba(10,42,102,0.02)" },
          hover: { 
            backgroundColor: "rgba(255, 194, 71, 0.25)",
            boxShadow: "0 12px 30px rgba(10,42,102,0.06)",
            transition: {
              backgroundColor: { duration: 0.2 },
              duration: 0.3
            }
          },
          open: { backgroundColor: "#fff", scale: 1, boxShadow: "0 8px 32px rgba(31,79,216,0.08)" }
        }}
        style={{
          position: "relative",
          border: `1px solid ${isOpen ? "rgba(31,79,216,0.3)" : "rgba(31,79,216,0.08)"}`,
          borderRadius: 14, overflow: "hidden",
          transition: "border 0.2s ease, background 0.2s ease",
        }}
      >
        {/* Spotlight Glow - Warm Blue Tint */}
        <motion.div
          aria-hidden="true"
          style={{
            position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none",
            backgroundImage: useTransform(
              [mouseX, mouseY],
              ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(31,79,216,0.04), transparent 40%)`
            )
          }}
        />

        <button
          id={`faq-btn-${index}`}
          aria-expanded={isOpen}
          aria-controls={`faq-panel-${index}`}
          onClick={toggleOpen}
          style={{
            position: "relative", zIndex: 1,
            width: "100%", textAlign: "left", background: "none", border: "none",
            padding: "22px 28px", display: "flex", justifyContent: "space-between",
            alignItems: "center", cursor: "pointer",
            fontFamily: "var(--font-display)", fontSize: 16.5, fontWeight: 600,
            letterSpacing: "-0.01em", color: var_text_dark,
          }}
        >
          <motion.span
            variants={{
              initial: { color: var_text_dark },
              hover: { color: "var(--signal)" }
            }}
            transition={{ duration: 0.2 }}
          >
            {faq.q}
          </motion.span>
          
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            variants={{
              initial: { scale: 1, backgroundColor: isOpen ? "var(--signal)" : "rgba(31,79,216,0.08)", color: isOpen ? "#fff" : "var(--signal)" },
              hover: { scale: 1.1, backgroundColor: isOpen ? "var(--signal)" : "rgba(31,79,216,0.12)" }
            }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: 30, height: 30, borderRadius: "50%",
              display: "grid", placeItems: "center", flexShrink: 0,
            }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
              <path d="M6 9l6 6 6-6"/>
            </svg>
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-btn-${index}`}
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              style={{ position: "relative", zIndex: 1 }}
            >
              <div style={{ padding: "0 28px 24px", fontSize: 14.5, lineHeight: 1.72, color: "var(--text-dark-sub)" }}>
                {faq.a}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeUp>
  );
}

// ─── FAQ Accordion ───────────────────────────────────────────────────────────
function FAQAccordion({ faqs }) {
  const [openIndex, setOpenIndex] = useState(null);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      {faqs.map((faq, index) => (
        <InteractiveFAQItem 
          key={index} 
          faq={faq} 
          index={index} 
          isOpen={openIndex === index} 
          toggleOpen={() => setOpenIndex(openIndex === index ? null : index)} 
        />
      ))}
    </div>
  );
}

// ─── Interactive Feature Card ────────────────────────────────────────────────
function InteractiveFeatureCard({ icon, title, body }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      style={{ height: "100%", position: "relative" }}
      className="feature-card-light"
    >
      {/* Spotlight Glow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, rgba(31,79,216,0.12), transparent 50%)`
          )
        }}
      />
      
      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className="feature-icon-light"
          variants={{
            initial: { scale: 1, backgroundColor: "var(--blue-dim)", borderColor: "rgba(31,79,216,0.15)" },
            hover: { scale: 1.15, rotate: 6, backgroundColor: "rgba(31,79,216,0.12)", borderColor: "rgba(31,79,216,0.4)" }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          style={{ 
            color: "#10B26C",
            filter: "drop-shadow(0 0 8px rgba(16,178,108,0.6))" 
          }}
        >
          {icon}
        </motion.div>
        
        <motion.h3
          id={`feature-${title.replace(/\s+/g, '-').toLowerCase()}`}
          className="feature-title-light"
          variants={{
            initial: { y: 0, color: "var(--text-dark)" },
            hover: { y: -2, color: "var(--signal)" }
          }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="feature-body-light"
          variants={{
            initial: { opacity: 0.8 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.2 }}
        >
          {body}
        </motion.p>
      </div>
    </motion.article>
  );
}

// ─── Interactive Persona Card ────────────────────────────────────────────────
function InteractivePersonaCard({ role, title, body, index }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.article
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      style={{ height: "100%", position: "relative" }}
      className="persona-card"
      aria-labelledby={`persona-${index}`}
    >
      {/* Spotlight Glow - Teal Green */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, rgba(16,178,108,0.12), transparent 50%)`
          )
        }}
      />
      
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", height: "100%" }}>
        <div className="persona-role">{role}</div>
        
        <motion.h3
          id={`persona-${index}`}
          className="persona-title"
          variants={{
            initial: { y: 0, color: "var(--text-dark)" },
            hover: { y: -2, color: "var(--green)" }
          }}
          transition={{ duration: 0.2 }}
        >
          {title}
        </motion.h3>
        
        <motion.p
          className="persona-body"
          variants={{
            initial: { opacity: 0.8 },
            hover: { opacity: 1 }
          }}
          transition={{ duration: 0.2 }}
        >
          {body}
        </motion.p>
        
        <div style={{ flex: 1 }} />
        
        <motion.div 
          className="persona-divider" 
          aria-hidden="true" 
          variants={{
            initial: { width: 32, opacity: 0.6, filter: "drop-shadow(0 0 0px rgba(16,178,108,0))" },
            hover: { width: 48, opacity: 1, filter: "drop-shadow(0 0 8px rgba(16,178,108,0.6))" }
          }}
          transition={{ duration: 0.2 }}
        />
      </div>
    </motion.article>
  );
}

// ─── Interactive Form Wrapper ────────────────────────────────────────────────
function InteractiveFormWrapper({ children }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      onMouseMove={handleMouseMove}
      style={{
        position: "relative",
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 20,
        padding: "40px",
        overflow: "hidden",
        boxShadow: "0 24px 80px rgba(0,0,0,0.2)"
      }}
    >
      {/* Spotlight Glow - Yellow */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 0,
          pointerEvents: "none",
          backgroundImage: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(500px circle at ${x}px ${y}px, rgba(255,194,71,0.08), transparent 45%)`
          )
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}

// ─── Interactive Compliance Card ─────────────────────────────────────────────
function InteractiveComplianceCard({ std }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      className="compliance-card"
      style={{
        background: "#fff", border: "1px solid var(--border-light)", borderRadius: 16,
        padding: "clamp(20px, 4vw, 28px) clamp(16px, 3vw, 24px)", display: "flex", flexDirection: "column", gap: 16,
        transition: "border-color 0.3s, transform 0.25s, box-shadow 0.3s", cursor: "default",
        position: "relative", overflow: "hidden", height: "100%"
      }}
    >
      <div className="compliance-card-indicator" aria-hidden="true" />
      
      {/* Spotlight Glow - using the user requested FFC247 base with high transparency */}
      <motion.div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0, bottom: 0,
          zIndex: 0, pointerEvents: "none",
          backgroundImage: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(450px circle at ${x}px ${y}px, rgba(255,194,71,0.14), transparent 50%)`
          )
        }}
      />

      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 16 }}>
        <motion.div
          variants={{
            initial: { scale: 1, backgroundColor: std.bg, borderColor: std.border },
            hover: { scale: 1.15, rotate: 6, backgroundColor: "rgba(255,194,71,0.12)", borderColor: "rgba(255,194,71,0.4)" }
          }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
          style={{
            width: 44, height: 44, borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            color: std.color, border: "1px solid"
          }}
        >
          <IconCheck size={18} color="currentColor" />
        </motion.div>
        
        <div>
          <motion.h4
            variants={{
              initial: { y: 0, color: "var(--text-dark)" },
              hover: { y: -2, color: "#FF9900" }
            }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "clamp(15px, 3vw, 16px)", fontWeight: 700, marginBottom: 6 }}
          >
            {std.label}
          </motion.h4>
          <motion.p
            variants={{
              initial: { opacity: 0.8 },
              hover: { opacity: 1 }
            }}
            transition={{ duration: 0.2 }}
            style={{ fontSize: "clamp(13px, 2.5vw, 14px)", color: "var(--text-dark-sub)", lineHeight: 1.5, marginBottom: 0 }}
          >
            {std.desc}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Interactive Problem Terminal ─────────────────────────────────────────────
function InteractiveProblemTerminal() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      initial="initial"
      whileHover="hover"
      variants={{
        initial: { scale: 1, x: 0, y: 0 },
        hover: { 
          scale: 1.01,
          transition: {
            duration: 0.1,
            repeat: 3,
            repeatType: "reverse"
          }
        }
      }}
      style={{
        background: "rgba(8,14,34,0.9)", border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: 14, overflow: "hidden",
        boxShadow: "0 24px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,77,106,0.08)",
        position: "relative",
        cursor: "crosshair"
      }}
    >
      {/* Spotlight Glow - Red/Warning Tint */}
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage: useTransform(
            [mouseX, mouseY],
            ([x, y]) => `radial-gradient(400px circle at ${x}px ${y}px, rgba(255,77,106,0.12), transparent 50%)`
          )
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{ background: "rgba(10,42,102,0.7)", padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", gap: 6, alignItems: "center" }}>
          <motion.span 
            animate={{ opacity: [0.4, 1, 0.4] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{ width: 8, height: 8, borderRadius: "50%", background: "#FF4D6A", display: "block" }}
          />
          <span style={{ fontSize: 10.5, color: "rgba(255,255,255,0.3)", fontFamily: "var(--font-mono)", letterSpacing: "0.04em" }}>legacy-scanner — output.log</span>
        </div>
        <div style={{ padding: "20px 18px", fontFamily: "var(--font-mono)", fontSize: 12, lineHeight: 2.1 }}>
          {[
            { t: "FAIL", c: "#FF4D6A", msg: "color-contrast (17 elements)" },
            { t: "WARN", c: "#FFAA2C", msg: "image-alt — needs-review" },
            { t: "WARN", c: "#FFAA2C", msg: "label — needs-review" },
            { t: "INFO", c: "var(--text-muted)", msg: "aria-hidden-focus — manual check required" },
            { t: "INFO", c: "var(--text-muted)", msg: "link-name — manual check required" },
          ].map((l, i) => (
            <motion.div 
              key={i} 
              whileHover={{ x: 4, transition: { duration: 0.2 } }}
              style={{ display: "flex", gap: 14, alignItems: "baseline" }}
            >
              <span style={{ color: l.c, fontWeight: 700, width: 36, flexShrink: 0, fontSize: 10, letterSpacing: "0.06em" }}>{l.t}</span>
              <span style={{ color: "rgba(255,255,255,0.55)" }}>{l.msg}</span>
            </motion.div>
          ))}
          <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,0.07)", color: "rgba(255,255,255,0.25)", fontSize: 11 }}>
            Scanned 1 page · 5 issues reported · 0 fixes provided
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// CSS variable helpers for JSX (avoids string interpolation in template literals)
const var_border_light = "#E2E8F0";
const var_text_dark = "#0F1729";

// ─── Data ────────────────────────────────────────────────────────────────────
const features = [
  { icon: <IconScan color="#1F4FD8" />,   title: "Detection",              body: "Deep-crawl your web applications for WCAG violations. Every page, every state, every interaction — surfaced and prioritized automatically." },
  { icon: <IconCode color="#1F4FD8" />,   title: "Review",               body: "Receive exact code diffs and step-by-step implementation guides for every finding. Your engineers ship fixes in minutes, not sprints." },
  { icon: <IconReview color="#1F4FD8" />, title: "Remediation",            body: "Structured workflows for ambiguous findings automated scanners can't confidently classify. Clarity at every decision point." },
  { icon: <IconDoc color="#1F4FD8" />,    title: "Report",           body: "Auto-compile your full audit history into compliance-ready Voluntary Product Accessibility Templates on demand." },
  { icon: <IconGate color="#1F4FD8" />,   title: "CI/CD",                body: "Block non-compliant code from merging. Accessibility guardrails integrate directly into the pipeline your team already uses." },
  { icon: <IconShield color="#1F4FD8" />, title: "Audio & Video Captions",   body: "Automatically transcribe and caption media assets. Every video and audio file — made accessible without manual effort." },
];

const personas = [
  { role: "Engineering Leaders", title: "Ship faster without compliance friction.", body: "ACCEDA integrates directly into the development lifecycle. Findings surface before code merges — not after production deploys. Your team moves at full velocity, protected." },
  { role: "QA & Testing Teams",  title: "Eliminate ambiguity from every review cycle.", body: "The Human Review dashboard structures complex accessibility decisions with guided resolution workflows. No more guesswork. No more missed edge cases." },
  { role: "Compliance Officers", title: "Audit-ready evidence. Always.", body: "Automated VPAT compilation and a full audit trail that holds up under legal scrutiny. Enterprise and government deliverables — generated, not assembled manually." },
];

const stats = [
  { num: 97,  suffix: "%", label: "of WCAG violations detected — vs. 30–40% with legacy tools", color: "var(--electric)", bg: "rgba(58,123,255,0.06)",  border: "rgba(58,123,255,0.15)" },
  { num: 12,  suffix: "x", label: "faster remediation with AI-curated code fix guides",        color: "var(--green)",    bg: "rgba(16,178,108,0.06)",  border: "rgba(16,178,108,0.15)" },,
  { num: 100, suffix: "+", label: "enterprise teams protecting compliance posture with ACCEDA",   color: "var(--yellow)",   bg: "rgba(255,194,71,0.06)",  border: "rgba(255,194,71,0.18)" },
];

const faqs = [
  { q: "What is the ADA Title II April 24, 2026 deadline?",               a: "The U.S. Department of Justice finalized a rule requiring all state and local governments, public universities, and covered public entities to make their websites and apps compliant with WCAG 2.1 Level AA by April 24, 2026. ACCEDA helps organizations meet this deadline with automated scanning, AI-assisted remediation, and audit-ready documentation." },
  { q: "How is ACCEDA different from Axe or Lighthouse?",                  a: "Legacy scanners like Axe and Lighthouse detect only 30–40% of WCAG violations and provide no remediation path. ACCEDA detects significantly more issues using AI, then delivers exact code fixes and guided implementation paths — plus automated VPAT generation and CI/CD integration." },
  { q: "What is a VPAT, and can ACCEDA generate one automatically?",       a: "A VPAT (Voluntary Product Accessibility Template) is a formal legal document required by enterprise and government procurement teams. ACCEDA automatically compiles VPATs from your audit history — eliminating weeks of manual compliance work." },
  { q: "What accessibility standards does ACCEDA support?",                a: "ACCEDA supports WCAG 2.1 AA, WCAG 2.2 AA, Section 508, ADA Title II, and EN 301 549 — covering U.S. federal requirements, ADA obligations, and the European Accessibility Act standard." },
  { q: "Can ACCEDA integrate with our CI/CD pipeline?",                    a: "Yes. ACCEDA's compliance gate integrates with GitHub Actions, GitLab CI, Jenkins, and other common pipelines to block inaccessible code before it reaches production." },
];

// ─── Main Page ───────────────────────────────────────────────────────────────
export default function AccedaLandingPage() {
  const [navScrolled, setNavScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", v => setNavScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <FontLoader />
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <div className="noise" aria-hidden="true" />

      <main id="main-content" tabIndex="-1">
        {/* ════════════════════════════════════════════════════════
            NAVIGATION
        ════════════════════════════════════════════════════════ */}
        <nav aria-label="Main navigation" className={`nav ${navScrolled || mobileMenuOpen ? "scrolled" : ""}`}>
        <a href="#" className="nav-logo" onClick={() => setMobileMenuOpen(false)}
           aria-label="Acceda — return to top">
          <Image src={accedaLogo} alt="ACCEDA — AI-Powered Accessibility Compliance Platform" height={52} priority style={{ width: "auto" }} />
        </a>

        <ul className={`nav-links ${mobileMenuOpen ? "open" : ""}`}>
          {[
            { label: "Platform",   href: "#platform" },
            { label: "Use Cases",  href: "#use-cases" },
            { label: "Compliance", href: "#compliance" },
            { label: "Pricing",    href: "#cta" },
            { label: "Docs",       href: "#footer" },
          ].map(l => (
            <li key={l.label}>
              <a href={l.href} onClick={() => setMobileMenuOpen(false)}>{l.label}</a>
            </li>
          ))}
        </ul>

        <div className={`nav-cta ${mobileMenuOpen ? "open" : ""}`}>
          <a href="#cta" className="btn-ghost">Sign Up</a>
          <a href="https://cal.com/acceda/demo" target="_blank" rel="noopener noreferrer" className="btn-primary">
            Request Demo <IconArrow />
          </a>
        </div>

        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true" focusable="false">
            {mobileMenuOpen ? <path d="M18 6L6 18M6 6l12 12"/> : <path d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </nav>

      {/* ════════════════════════════════════════════════════════
          HERO — Dark navy, full brand drama
      ════════════════════════════════════════════════════════ */}
      <section
        id="hero"
        style={{ position: "relative", overflow: "hidden", paddingTop: 160, paddingBottom: 130, background: "var(--surface-darker)" }}
      >
        <div className="grid-bg" aria-hidden="true" />
        {/* Dual radial glows — blue left, green right */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "-10%", left: "20%",
          width: 700, height: 600,
          background: "radial-gradient(ellipse, rgba(31,79,216,0.13) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>
        <div aria-hidden="true" style={{
          position: "absolute", bottom: "0%", right: "5%",
          width: 400, height: 400,
          background: "radial-gradient(ellipse, rgba(16,178,108,0.08) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>

        <div className="container">
          <div className="hero-wrapper" style={{ display: "flex", gap: 80, alignItems: "center" }}>
            {/* Left: Copy */}
            <div className="hero-content" style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.15 }}
              >
                <div className="eyebrow">Compliance-Ready Accessibility Platform</div>
              </motion.div>

              <motion.h1
                style={{
                  fontFamily: "var(--font-display)", fontWeight: 800,
                  fontSize: "clamp(38px,5vw,66px)", lineHeight: 1.0,
                  letterSpacing: "-0.04em", color: "#fff", marginBottom: 28,
                }}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}
              >
                ACCEDA<br/>
                <span style={{ color: "var(--electric)" }}>Compliance at</span><br/>
                Speed and Scale
              </motion.h1>

              <motion.p
                className="section-body"
                style={{ marginBottom: 40, fontSize: 17.5, maxWidth: 520 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.36 }}
              >
                ACCEDA is an AI-powered accessibility compliance platform that automatically detects, fixes, and documents WCAG 2.1 AA, Section 508, and ADA Title II violations for enterprise software teams.
              </motion.p>

              <motion.div
                className="hero-btns"
                style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 44 }}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.48 }}
              >
                <a href="https://cal.com/acceda/demo" target="_blank" rel="noopener noreferrer"
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
                {["WCAG 2.2 AA", "Section 508", "ADA Title II", "SOC 2 Type II"].map(b => (
                  <span key={b} className="badge badge-green">{b}</span>
                ))}
              </motion.div>
            </div>

            {/* Right: Scanner */}
            <motion.div
              className="hero-scanner"
              style={{ flex: "0 0 480px", minWidth: 0, animation: "float 5s ease-in-out infinite", position: "relative" }}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Urgency banner overlapping scanner */}
              <div 
                className="urgency-banner" 
                role="note" 
                aria-label="ADA Title II deadline notice"
                style={{
                  position: "absolute",
                  top: -85,
                  left: "50%",
                  transform: "translateX(-50%)",
                  width: "calc(100% - 32px)",
                  maxWidth: 440,
                  zIndex: 10,
                  backdropFilter: "blur(12px)",
                  boxShadow: "0 10px 40px rgba(0,0,0,0.3)",
                  background: "linear-gradient(135deg, rgba(8,14,34,0.85) 0%, rgba(10,42,102,0.75) 100%)"
                }}
              >
                <span className="urgency-dot" aria-hidden="true" />
                <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <span style={{ fontSize: 13, color: "var(--yellow)", fontWeight: 600 }}>
                    ADA Title II deadline:
                  </span>
                  <span style={{ fontSize: 12.5, color: "rgba(255,255,255,0.85)", lineHeight: 1.4 }}>
                    April 24, 2026 — organizations must comply with WCAG 2.1 AA
                  </span>
                </div>
              </div>
              <ScannerViz />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          INDUSTRIES — Thin dark band
      ════════════════════════════════════════════════════════ */}
      <section
        style={{ background: "rgba(8,14,34,0.98)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "40px 0" }}
        aria-label="Industries served"
      >
        <div className="container">
          <p style={{ textAlign: "center", fontSize: 11.5, color: "var(--electric)", letterSpacing: "0.13em", textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
            Purpose-built for high-compliance industries
          </p>
          <div className="logo-row">
            {[
              { label: "Financial Services", color: "var(--electric)" },
              { label: "Gov & Defense",      color: "var(--green)" },
              { label: "Healthcare Tech",    color: "#fff" },
              { label: "Enterprise SaaS",    color: "var(--yellow)" },
              { label: "E-Commerce",         color: "#FF4D6A" },
            ].map(l => (
              <div key={l.label} className="logo-item">
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: l.color, flexShrink: 0 }} aria-hidden="true" />
                {l.label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          STATS — Light section (Soft Gray) — SECTION RHYTHM BREAK
      ════════════════════════════════════════════════════════ */}
      <section style={{ background: "var(--surface-light)", padding: "clamp(60px, 10vw, 100px) 0" }} aria-label="Platform statistics">
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {stats.map((s, i) => (
              <FadeUp key={i} delay={i * 0.12} style={{ height: "100%" }}>
                <InteractiveStatCard {...s} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PROBLEM — Back to dark, with visual depth
      ════════════════════════════════════════════════════════ */}
      <section
        style={{ padding: "110px 0", background: "var(--surface-dark)", borderTop: "1px solid var(--border)" }}
        aria-labelledby="problem-heading"
      >
        <div className="container">
          <div className="problem-wrapper" style={{ display: "flex", gap: 80, alignItems: "center", flexWrap: "wrap" }}>
            <FadeUp style={{ flex: 1, minWidth: 280, display: "flex", flexDirection: "column" }}>
              <div className="eyebrow">The Problem</div>
              <h2 id="problem-heading" className="section-title" style={{ marginBottom: 24 }}>
                Legacy scanners leave<br/>
                your organization{" "}
                <span className="accent-blue">exposed.</span>
              </h2>
              <p className="section-body" style={{ marginBottom: 32, maxWidth: 500 }}>
                Traditional tools identify a fraction of actual WCAG violations — then hand your team an ambiguous list with no path to resolution. Engineers spend sprint cycles on guesswork. Compliance officers manually assemble legal documentation. And the 60–70% of issues that go undetected remain a litigation liability.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {[
                  "Only 30–40% WCAG coverage with axe / Lighthouse",
                  "Ambiguous findings with no guided resolution path",
                  "VPATs assembled manually — weeks of compliance work",
                  "No CI/CD integration — issues discovered post-release",
                ].map((p, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "var(--text-secondary)" }}>
                    <span style={{ marginTop: 2, flexShrink: 0 }}><IconX /></span>
                    {p}
                  </div>
                ))}
              </div>
            </FadeUp>

            <FadeUp delay={0.15} style={{ flex: 1, minWidth: 280 }}>
              <InteractiveProblemTerminal />
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FEATURES / PLATFORM — Light (white/cream) — RHYTHM BREAK
      ════════════════════════════════════════════════════════ */}
      <section
        id="platform"
        style={{ padding: "clamp(80px, 12vw, 120px) 0", background: "var(--surface-cream)" }}
        aria-labelledby="platform-heading"
      >
        <div className="container">
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 72 }}>
              <div className="eyebrow blue" style={{ justifyContent: "center" }}>The Platform</div>
              <h2 id="platform-heading" className="section-title dark" style={{ marginBottom: 20 }}>
                Build Accessible,{" "}
                <span style={{ color: "var(--signal)" }}>Ship Confidently.</span>
              </h2>
              <p className="section-body dark" style={{ margin: "0 auto", textAlign: "center", maxWidth: 540 }}>
                ACCEDA manages the entire accessibility compliance lifecycle — detection, remediation, review, and legal documentation — in a single integrated platform.
              </p>
            </div>
          </FadeUp>

          <div className="platform-grid">
            {features.map((f, i) => (
              <FadeUp key={i} delay={i * 0.07} style={{ height: "100%" }}>
                <InteractiveFeatureCard icon={f.icon} title={f.title} body={f.body} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          PERSONAS — Back to dark
      ════════════════════════════════════════════════════════ */}
      <section
        id="use-cases"
        style={{ padding: "clamp(80px, 12vw, 110px) 0", background: "var(--surface-dark)", borderTop: "1px solid var(--border)" }}
        aria-labelledby="personas-heading"
      >
        <div className="container">
          <FadeUp>
            <div style={{ marginBottom: 64 }}>
              <div className="eyebrow">Built For Your Team</div>
              <h2 id="personas-heading" className="section-title">
                The right tool for<br/>every stakeholder.
              </h2>
            </div>
          </FadeUp>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
            {personas.map((p, i) => (
              <FadeUp key={i} delay={i * 0.1} style={{ height: "100%" }}>
                <InteractivePersonaCard role={p.role} title={p.title} body={p.body} index={i} />
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FAQ — Light cream, clean cards
      ════════════════════════════════════════════════════════ */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        style={{ padding: "110px 0", background: "#F4F6F8", borderTop: "1px solid var(--border-light)" }}
      >
        <div className="container" style={{ maxWidth: 780 }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: 52 }}>
              <div className="eyebrow blue" style={{ justifyContent: "center" }}>Knowledge Base</div>
              <h2 id="faq-heading" className="section-title dark" style={{ fontSize: "clamp(26px,3.5vw,42px)" }}>
                Frequently Asked Questions
              </h2>
            </div>
            <FAQAccordion faqs={faqs} />
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          COMPLIANCE — Refined & Mobile Optimized
      ════════════════════════════════════════════════════════ */}
      <section
        id="compliance"
        style={{ padding: "clamp(80px, 12vw, 120px) 0", background: "var(--surface-cream)", borderTop: "1px solid var(--border-light)", borderBottom: "1px solid var(--border-light)", position: "relative", overflow: "hidden" }}
        aria-labelledby="compliance-heading"
      >
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <FadeUp>
            <div style={{ textAlign: "center", marginBottom: "clamp(40px, 8vw, 64px)" }}>
              <div className="eyebrow blue" style={{ justifyContent: "center" }}>Compliance Coverage</div>
              <h2 id="compliance-heading" className="section-title dark" style={{ fontSize: "clamp(30px, 5vw, 44px)", marginBottom: 16 }}>
                Every standard. One platform.
              </h2>
              <p className="section-body dark" style={{ fontSize: "clamp(15px, 2vw, 18px)", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
                ACCEDA is purpose-built for the standards your legal and compliance teams require — with the evidence trail to back every claim.
              </p>
            </div>
          </FadeUp>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 400px), 1fr))",
            gap: "clamp(24px, 4vw, 40px)",
            alignItems: "stretch"
          }}>
            {/* Countdown / Urgency Card */}
            <FadeUp delay={0.1}>
              <div style={{
                background: "linear-gradient(135deg, #FFC247 0%, #FF9900 100%)",
                borderRadius: 20, padding: "clamp(32px, 6vw, 48px) clamp(20px, 4vw, 48px)",
                display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center",
                textAlign: "center", boxShadow: "0 12px 40px rgba(255, 153, 0, 0.2)",
                height: "100%", position: "relative", overflow: "hidden", color: "#0C1F4A"
              }}>
                <div style={{ position: "absolute", top: -50, right: -50, width: 250, height: 250, background: "rgba(255,255,255,0.25)", filter: "blur(40px)", borderRadius: "50%", pointerEvents: "none" }} />
                
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                  <span style={{ fontSize: 24 }} aria-hidden="true">⚠️</span>
                  <span style={{ fontSize: "clamp(13px, 3vw, 15px)", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    US Government Deadline
                  </span>
                </div>
                
                <h3 style={{ fontSize: "clamp(22px, 4vw, 28px)", fontWeight: 800, lineHeight: 1.1, marginBottom: 32, letterSpacing: "-0.02em", color: "#080E22" }}>
                  April 24, 2026
                </h3>

                <div style={{ background: "rgba(255,255,255,0.25)", padding: "clamp(16px, 3vw, 24px)", borderRadius: 16, width: "100%", boxShadow: "inset 0 1px 12px rgba(0,0,0,0.06)" }}>
                  <CountdownClock targetDate="2026-04-24T00:00:00" large numberColor="#0C1F4A" />
                </div>

                <p style={{ marginTop: 24, fontSize: "clamp(14px, 3.5vw, 16px)", fontWeight: 600, opacity: 0.9, lineHeight: 1.45, color: "#080E22" }}>
                  ADA Title II Mandatory Transition.<br />Is your organization ready?
                </p>
              </div>
            </FadeUp>

            {/* Standards Grid */}
            <FadeUp delay={0.2} style={{ display: "flex", flexDirection: "column" }}>
              <div style={{
                display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(max(200px, 40%), 1fr))", gap: "clamp(16px, 3vw, 24px)",
                height: "100%", alignContent: "flex-start"
              }}>
                {[
                  { label: "WCAG 2.1 AA", desc: "Core Web Content Accessibility Guidelines", bg: "var(--blue-dim)", border: "rgba(58,123,255,0.2)", color: "var(--trust)" },
                  { label: "Section 508", desc: "Federal Rehabilitation Act compliance", bg: "var(--blue-dim)", border: "rgba(58,123,255,0.2)", color: "var(--trust)" },
                  { label: "ADA Title II", desc: "Americans with Disabilities Act", bg: "var(--blue-dim)", border: "rgba(58,123,255,0.2)", color: "var(--trust)" },
                  { label: "SOC 2 Type II", desc: "Enterprise Data Security Standard", bg: "var(--blue-dim)", border: "rgba(58,123,255,0.2)", color: "var(--trust)" },
                ].map((std) => (
                  <InteractiveComplianceCard key={std.label} std={std} />
                ))}
              </div>
            </FadeUp>

          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          CTA — Deep dark with full brand drama
      ════════════════════════════════════════════════════════ */}
      <section
        id="cta"
        style={{ position: "relative", overflow: "hidden", padding: "clamp(80px, 10vw, 100px) 0", background: "var(--surface-darker)" }}
        aria-labelledby="cta-heading"
      >
        <div className="grid-bg" aria-hidden="true" />
        {/* Dual radial glows — matching Hero style */}
        <div aria-hidden="true" style={{
          position: "absolute", top: "25%", left: "calc(5% - 40px)",
          width: 500, height: 400,
          background: "radial-gradient(ellipse, rgba(255,194,71,0.07) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>

        <div className="container">
          <FadeUp>
            <div className="cta-section" style={{ padding: "96px 48px", textAlign: "center" }}>
              <div className="cta-glow" aria-hidden="true" />
              <div style={{ position: "relative", zIndex: 1 }}>
                <div className="eyebrow yellow" style={{ justifyContent: "center" }}>Get Started</div>
                <h2
                  id="cta-heading"
                  style={{
                    fontFamily: "var(--font-display)", fontSize: "clamp(30px,4.5vw,54px)",
                    fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.08,
                    color: "#fff", marginBottom: 20,
                  }}
                >
                  Secure your compliance<br/>posture today.
                </h2>
                <p className="section-body" style={{ margin: "0 auto 44px", textAlign: "center", maxWidth: 480 }}>
                  Integrate ACCEDA into your engineering workflow and ship accessible products with confidence — backed by audit-ready evidence.
                </p>
                <div style={{ maxWidth: 520, margin: "0 auto" }}>
                  <InteractiveFormWrapper>
                    <DemoForm />
                  </InteractiveFormWrapper>
                </div>
                <ul
                  style={{ listStyle: "none", padding: 0, margin: "32px 0 0", display: "flex", justifyContent: "center", gap: 10, flexWrap: "wrap" }}
                  aria-label="Compliance certifications"
                >
                  {[
                    { label: "WCAG 2.2 AA",    aria: null },
                    { label: "Section 508",    aria: null },
                    { label: "ADA Title II",   aria: null },
                    { label: "SOC 2 Type II",  aria: "SOC 2 Type II certified for enterprise security" },
                  ].map(b => (
                    <li key={b.label} style={{ margin: 0 }}>
                      <span className="badge badge-yellow" aria-label={b.aria || undefined}>{b.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </FadeUp>
        </div>
      </section>

      {/* ════════════════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════════════════ */}
      </main>
      <footer id="footer" style={{ position: "relative", overflow: "hidden", background: "var(--surface-darker)", borderTop: "1px solid var(--border)", padding: "52px 0" }}>
        <div className="grid-bg" style={{ opacity: 0.04 }} />
        {/* Subtle footer glows */}
        <div aria-hidden="true" style={{
          position: "absolute", bottom: "-10%", right: "-5%",
          width: 500, height: 400,
          background: "radial-gradient(ellipse, rgba(255,194,71,0.06) 0%, transparent 65%)",
          pointerEvents: "none",
        }}/>
        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 32 }}>
            <div style={{ maxWidth: 320 }}>
              <a href="#" className="nav-logo" style={{ display: "inline-block", marginBottom: 18 }}>
                <Image src={accedaLogo} alt="ACCEDA logo" height={38} style={{ width: "auto" }} />
              </a>
              <p style={{ fontSize: 13, lineHeight: 1.65, color: "var(--text-secondary)", marginBottom: 0 }}>
                ACCEDA is a trusted compliance partner for enterprise engineering teams. We automate digital accessibility to ensure WCAG 2.1 AA, Section 508, and ADA Title II conformance across large product portfolios.
              </p>
            </div>
            <nav aria-label="Footer navigation" style={{ display: "flex", gap: 28, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
              {[
                { label: "Privacy Policy",        href: "/privacy" },
                { label: "Terms of Service",       href: "/terms" },
                { label: "Accessibility Statement",href: "/accessibility" },
              ].map(l => (
                <a
                  key={l.label}
                  href={l.href}
                  style={{ fontSize: 13, color: "var(--text-muted)", textDecoration: "none", transition: "color 0.2s" }}
                  onMouseOver={e => e.currentTarget.style.color = "#fff"}
                  onMouseOut={e => e.currentTarget.style.color = "var(--text-muted)"}
                >
                  {l.label}
                </a>
              ))}
            </nav>
          </div>
          <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 40, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,0.04)" }}>
            © 2026 ACCEDA. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  );
}