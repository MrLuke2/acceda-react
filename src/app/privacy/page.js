"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, useScroll } from "framer-motion";
import accedaLogo from "../acceda_logo_2.svg";

// ─── Shared Brand Styling ───────────────────────────────────────────────────
const FontLoader = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=DM+Sans:ital,wght@0,300;0,400;0,500;0,600;1,300&family=JetBrains+Mono:wght@400;500&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --navy:          #0A2A66;
      --signal:        #1F4FD8;
      --trust:         #0C1F4A;
      --green:         #10B26C;
      --electric:      #3A7BFF;
      --yellow:        #FFC247;
      --soft-gray:     #F4F6F8;
      --ui-gray:       #AAB4C2;

      --surface-darker:  #080E22;
      --text-primary:    #FFFFFF;
      --text-secondary:  #CBD5E1;
      --text-muted:      #94A3B8;

      --font-display: 'Space Grotesk', sans-serif;
      --font-body:    'DM Sans', sans-serif;
    }

    body {
      background: var(--surface-darker);
      color: var(--text-primary);
      font-family: var(--font-body);
      -webkit-font-smoothing: antialiased;
      line-height: 1.6;
    }

    .noise {
      position: fixed; top: 0; left: 0; width: 100%; height: 100%;
      pointer-events: none; opacity: 0.05; z-index: 9999;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
    }

    .container { max-width: 800px; margin: 0 auto; padding: 0 clamp(20px, 5vw, 40px); }

    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 100;
      display: flex; align-items: center; justify-content: space-between;
      padding: 0 48px; height: 68px;
    }
    .nav-logo { display: flex; align-items: center; }

    .btn-ghost {
      font-family: var(--font-body); font-size: 14px; font-weight: 500;
      color: var(--text-secondary); background: transparent; border: none;
      cursor: pointer; text-decoration: none; padding: 8px 16px;
      transition: color 0.2s, background 0.2s;
      border-radius: 8px;
    }
    .btn-ghost:hover { color: #fff; background: rgba(255,255,255,0.05); }

    .eyebrow {
      font-family: var(--font-body); font-size: 11px; font-weight: 600;
      letter-spacing: 0.12em; text-transform: uppercase;
      color: var(--yellow); margin-bottom: 16px;
      display: flex; align-items: center; gap: 10px;
    }
    .eyebrow::before {
      content: ''; display: block; width: 20px; height: 1.5px;
      background: var(--yellow);
    }

    .section-title {
      font-family: var(--font-display); font-size: clamp(32px, 5vw, 48px);
      font-weight: 800; line-height: 1.1; letter-spacing: -0.03em;
      margin-bottom: 32px; color: #fff;
    }

    .statement-content section { margin-bottom: 56px; }
    .statement-content h2 { 
      font-family: var(--font-display); font-size: 20px; font-weight: 700;
      color: var(--electric); margin-bottom: 16px; letter-spacing: -0.01em;
    }
    .statement-content p { font-size: 15px; line-height: 1.8; color: var(--text-secondary); margin-bottom: 16px; }
    .statement-content ul { list-style: none; padding: 0; }
    .statement-content li { margin-bottom: 12px; display: flex; align-items: flex-start; gap: 10px; color: var(--text-secondary); font-size: 14.5px; }
    .statement-content li::before { content: '•'; color: var(--yellow); flex-shrink: 0; }

    footer { 
      padding: 60px 0; border-top: 1px solid rgba(255,255,255,0.06);
      margin-top: 80px; text-align: center; font-size: 13px; color: var(--text-muted);
    }
  `}</style>
);

export default function PrivacyPolicy() {
  const [navScrolled, setNavScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on("change", v => setNavScrolled(v > 40));
    return unsub;
  }, [scrollY]);

  return (
    <>
      <FontLoader />
      <div className="noise" aria-hidden="true" />
      
      {/* Background Decor */}
      <div aria-hidden="true" style={{
        position: "fixed", top: "10%", left: "50%", transform: "translateX(-50%)",
        width: 800, height: 600,
        background: "radial-gradient(ellipse, rgba(255,194,71,0.06) 0%, transparent 70%)",
        pointerEvents: "none", zIndex: -1
      }}/>

      <nav className="nav" style={{ background: navScrolled ? "rgba(8,14,34,0.94)" : "rgba(8,14,34,0.7)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
        <a href="/" className="nav-logo">
          <Image src={accedaLogo} alt="Acceda Logo" height={38} loading="eager" style={{ width: "auto" }} />
        </a>
        <a href="/" className="btn-ghost" aria-label="Back to landing page">Back to Home</a>
      </nav>

      <main id="main-content" tabIndex="-1" style={{ paddingTop: 160 }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="eyebrow">Enterprise Trust</div>
            <h1 className="section-title">Privacy Policy</h1>
          </motion.div>
          
          <div className="statement-content">
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h2>Commitment to Privacy</h2>
              <p>
                At Acceda, we believe that privacy is a fundamental human right. Our platform is designed with security and data minimization at its core, ensuring that your organization's data remains protected while you focus on achieving compliance.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h2>Information We Collect</h2>
              <p>
                We collect only the information necessary to provide our services and ensure a secure user experience:
              </p>
              <ul>
                <li>Account Information: Name, work email, and organization details provided during sign-up or demo requests.</li>
                <li>Technical Data: Log data, IP addresses, and device information required for security monitoring and platform performance.</li>
                <li>Usage Patterns: Anonymized data on how our platform is used to help us improve remediation guides and scan accuracy.</li>
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h2>How We Protect Your Data</h2>
              <p>
                Acceda employs enterprise-grade security controls to safeguard your information, including end-to-end encryption for data in transit and at rest. We undergo regular SOC 2 Type I audits to verify the effectiveness of our security posture.
              </p>
              <p>
                We do not sell your personal or organizational data to third parties. Our data processing is limited to providing and improving the Acceda platform.
              </p>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h2>Contact Our Privacy Team</h2>
              <p>
                If you have any questions about our privacy practices or wish to exercise your data rights, please contact us at:
              </p>
              <ul>
                <li>Email: privacy@useacceda.com</li>
                <li>Response Time: Within 2 business days.</li>
              </ul>
            </motion.section>
          </div>
        </div>
      </main>

      <footer>
        <div className="container">
          © 2026 ACCEDA. All rights reserved.
        </div>
      </footer>
    </>
  );
}
