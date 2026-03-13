export const viewport = {
  themeColor: "#0A2A66",
};

export const metadata = {
  title: "Acceda — AI-Powered Accessibility Compliance Platform | WCAG 2.1 AA, Section 508, ADA",
  description: "Acceda uses AI to scan, fix, and verify WCAG 2.1 AA, Section 508, and ADA Title II compliance across your entire digital product. Auto-generate VPATs, integrate CI/CD gates, and ship accessible software faster. Trusted by enterprise teams.",
  keywords: "web accessibility compliance, WCAG 2.1 AA, Section 508 compliance, ADA Title II, accessibility audit tool, VPAT generator, AI accessibility, enterprise accessibility platform, automated accessibility testing",
  alternates: {
    canonical: process.env.NEXT_PUBLIC_APP_URL + "/",
  },
  openGraph: {
    type: "website",
    url: process.env.NEXT_PUBLIC_APP_URL + "/",
    title: "Acceda — AI-Powered Accessibility Compliance",
    description: "From scan to fix to legal evidence. AI-driven accessibility compliance for enterprise engineering and compliance teams.",
    siteName: "Acceda",
    images: [{
      url: process.env.NEXT_PUBLIC_APP_URL + "/og-image.png",
      width: 1200,
      height: 630,
      alt: "Acceda platform screenshot showing accessibility scan results and AI-generated code fixes",
    }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@useacceda",
    title: "Acceda — AI-Powered Accessibility Compliance",
    description: "AI scans, fixes, and verifies WCAG compliance across your entire product stack. Build accessible, ship confidently.",
    images: [{
      url: process.env.NEXT_PUBLIC_APP_URL + "/og-image.png",
      alt: "Acceda accessibility compliance platform",
    }],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Acceda",
    "alternateName": "useacceda",
    "url": process.env.NEXT_PUBLIC_APP_URL,
    "logo": {
      "@type": "ImageObject",
      "url": `${process.env.NEXT_PUBLIC_APP_URL}/_next/static/media/acceda_logo_2.f0668e08.svg`,
      "width": 200,
      "height": 60
    },
    "description": "Acceda is an AI-powered accessibility compliance platform that automatically scans, remediates, and documents WCAG 2.1 AA, Section 508, and ADA Title II compliance for enterprise software teams.",
    "foundingDate": "2025",
    "sameAs": [
      "https://www.linkedin.com/company/useacceda",
      "https://twitter.com/useacceda"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "sales",
      "url": process.env.NEXT_PUBLIC_CAL_DEMO_URL,
      "availableLanguage": "English"
    },
    "knowsAbout": [
      "Web Accessibility",
      "WCAG 2.1 Compliance",
      "ADA Title II",
      "Section 508",
      "Accessibility Auditing",
      "VPAT Documentation",
      "CI/CD Accessibility Testing"
    ]
  };

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "Acceda",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "url": process.env.NEXT_PUBLIC_APP_URL,
    "description": "AI-powered accessibility compliance platform for enterprise teams. Automated WCAG scanning, code-level remediation, VPAT generation, and CI/CD integration.",
    "offers": {
      "@type": "Offer",
      "url": process.env.NEXT_PUBLIC_CAL_DEMO_URL,
      "description": "Enterprise pricing — request a demo"
    },
    "featureList": [
      "Automated WCAG 2.1 AA accessibility scanning",
      "AI-generated code fix recommendations",
      "Automated VPAT document generation",
      "CI/CD accessibility gate integration",
      "Audio and video transcription and captioning",
      "Human review dashboard for ambiguous findings",
      "Compliance coverage for WCAG 2.2, Section 508, ADA Title II, EN 301 549"
    ],
    "audience": {
      "@type": "BusinessAudience",
      "audienceType": "Enterprise engineering, QA, and compliance teams"
    }
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Acceda?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acceda is an AI-powered accessibility compliance platform that helps enterprise software teams achieve and maintain WCAG 2.1 AA, Section 508, and ADA Title II compliance. It automatically scans websites and web applications for accessibility violations, provides AI-generated code fixes, auto-compiles VPAT documentation, and integrates into CI/CD pipelines to prevent inaccessible code from shipping."
        }
      },
      {
        "@type": "Question",
        "name": "How does Acceda differ from axe or Lighthouse?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Legacy tools like axe and Lighthouse detect only 30–40% of WCAG violations and provide no remediation path. Acceda closes that gap by detecting a significantly higher percentage of issues using AI, then providing exact code diffs and step-by-step fix guides for every finding—plus automated VPAT generation and CI/CD integration that legacy tools lack entirely."
        }
      },
      {
        "@type": "Question",
        "name": "What compliance standards does Acceda support?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acceda supports WCAG 2.1 Level AA, WCAG 2.2 Level AA, Section 508 of the Rehabilitation Act, ADA Title II, and EN 301 549 (the European accessibility standard). These cover the primary legal requirements for enterprise organizations in the United States, government agencies, and businesses selling digital products in Europe."
        }
      },
      {
        "@type": "Question",
        "name": "What is the ADA Title II April 24, 2026 deadline?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "On April 24, 2024, the U.S. Department of Justice finalized a rule under Title II of the ADA requiring all public entities—including state and local governments, public universities, and public healthcare organizations—to make their websites and mobile apps compliant with WCAG 2.1 Level AA by April 24, 2026 (for entities serving populations of 50,000 or more). Acceda helps organizations meet this deadline through automated scanning, AI-assisted remediation, and audit-ready compliance documentation."
        }
      },
      {
        "@type": "Question",
        "name": "What is a VPAT and how does Acceda automate it?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "A VPAT (Voluntary Product Accessibility Template) is a formal legal document that describes how a software product or digital service conforms to accessibility standards, including Section 508 and WCAG. Enterprise and government procurement teams require VPATs before purchasing software. Acceda automatically compiles VPAT documentation from your audit history, dramatically reducing the manual effort previously required from compliance officers."
        }
      },
      {
        "@type": "Question",
        "name": "How does Acceda integrate with CI/CD pipelines?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acceda's CI/CD gate integrates directly into your existing development pipeline (GitHub Actions, GitLab CI, Jenkins, and others). It automatically blocks pull requests or merges that introduce new accessibility violations, preventing inaccessible code from ever reaching production. This shifts accessibility left in the development lifecycle, reducing the cost and effort of post-release remediation."
        }
      },
      {
        "@type": "Question",
        "name": "Which industries does Acceda serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Acceda is purpose-built for high-compliance industries including financial services, government and defense, healthcare technology, enterprise SaaS, and e-commerce—any sector where digital accessibility compliance carries legal risk or is a procurement requirement."
        }
      }
    ]
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Acceda",
    "url": process.env.NEXT_PUBLIC_APP_URL,
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": `${process.env.NEXT_PUBLIC_APP_URL}/?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <html lang="en">
      <head>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}