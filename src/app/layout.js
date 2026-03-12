export const metadata = {
  title: "ACCEDA — Accessibility. Automated.",
  description: "AI-powered accessibility compliance. Scan, fix, and verify WCAG 2.1 AA, Section 508, and ADA Title II automatically.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}