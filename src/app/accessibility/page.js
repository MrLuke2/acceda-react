import React from "react";

export const metadata = {
  title: "Accessibility Statement | Acceda",
  description: "Acceda's commitment to WCAG 2.1 AA / 2.2 AA conformance and accessibility compliance.",
};

export default function AccessibilityStatement() {
  return (
    <main id="main-content" tabIndex="-1" style={{ padding: "120px 24px", maxWidth: 800, margin: "0 auto", fontFamily: "var(--font-body)", color: "var(--white)" }}>
      <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(32px, 5vw, 48px)", marginBottom: 32 }}>Accessibility Statement</h1>
      
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, marginBottom: 16, color: "var(--blue)" }}>Our Commitment</h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--gray-2)" }}>
          Acceda is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards to achieve WCAG 2.1 AA and WCAG 2.2 AA conformance across our entire platform.
        </p>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, marginBottom: 16, color: "var(--blue)" }}>Feedback & Support</h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--gray-2)" }}>
          We welcome your feedback on the accessibility of Acceda. If you encounter any accessibility barriers on our platform, please contact us:
        </p>
        <ul style={{ listStyleType: "disc", paddingLeft: 24, marginTop: 12, color: "var(--gray-2)", lineHeight: 1.8 }}>
          <li>Email: <a href="mailto:accessibility@useacceda.com" style={{ color: "var(--teal)", textDecoration: "underline" }}>accessibility@useacceda.com</a></li>
          <li>Response Time Commitment: We aim to respond to accessibility feedback within 2 business days.</li>
        </ul>
      </section>

      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontSize: 24, marginBottom: 16, color: "var(--blue)" }}>Known Limitations</h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--gray-2)" }}>
          Currently, there are no known limitations or outstanding critical accessibility violations on our primary landing page. We actively scan and remediate our application infrastructure using our own compliance platform.
        </p>
      </section>

      <section>
        <h2 style={{ fontSize: 24, marginBottom: 16, color: "var(--blue)" }}>Audit Information</h2>
        <p style={{ fontSize: 16, lineHeight: 1.8, color: "var(--gray-2)" }}>
          <strong>Date of last audit:</strong> March 12, 2026.
        </p>
      </section>
    </main>
  );
}
