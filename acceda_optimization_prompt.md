# ACCEDA — FULL-STACK SITE OPTIMIZATION PROMPT
## Accessibility · SEO · AEO · Performance
### Protocol v1.0 | Autonomous Execution | For Internal AI Agent

---

## ════════════════════════════════════════
## CONTEXT & MISSION
## ════════════════════════════════════════

You are optimizing **useacceda.com** — an enterprise accessibility compliance SaaS platform.
The platform's entire value proposition is accessibility. Any WCAG failure on our own site
is a critical reputational liability. Every fix must be complete, production-ready, and
leave zero warnings.

**Stack:** Next.js (React) | Deployed at https://useacceda.com

**Mission:** Achieve a clean slate — zero accessibility warnings, zero SEO gaps, full
AEO/AI-search visibility — before April 24, 2026 (ADA Title II enforcement deadline).

**Brand Colors (from logo):**
- Primary Blue: #0D1B6E (deep navy)
- Accent Green: #1DB877 (emerald)
- Background: White (#FFFFFF)
- Text: Near-black (#0F0F0F)

---

## ════════════════════════════════════════
## PART 1 — ACCESSIBILITY REMEDIATION
## (WCAG 2.1 AA + WCAG 2.2 AA — Full Compliance)
## ════════════════════════════════════════

### 1.1 — FORM AUTOCOMPLETE (Blocking Warning — Fix First)

The contact/demo form has 4 fields missing `autocomplete` attributes. This violates
WCAG 1.3.5 (Identify Input Purpose) and triggers browser autofill warnings.

**Fix every form field with the correct autocomplete token:**

```html
<!-- Full Name -->
<input
  type="text"
  id="fullName"
  name="fullName"
  autocomplete="name"
  required
  aria-required="true"
  aria-label="Full Name"
  placeholder="Full Name"
/>

<!-- Company -->
<input
  type="text"
  id="company"
  name="company"
  autocomplete="organization"
  required
  aria-required="true"
  aria-label="Company"
  placeholder="Company"
/>

<!-- Work Email -->
<input
  type="email"
  id="workEmail"
  name="workEmail"
  autocomplete="work email"
  required
  aria-required="true"
  aria-label="Work Email"
  placeholder="Work Email"
/>

<!-- Phone Number -->
<input
  type="tel"
  id="phoneNumber"
  name="phoneNumber"
  autocomplete="tel"
  aria-label="Phone Number"
  placeholder="Phone Number"
/>

<!-- ZIP Code -->
<input
  type="text"
  id="zipCode"
  name="zipCode"
  autocomplete="postal-code"
  aria-label="ZIP Code"
  placeholder="ZIP Code"
/>
```

---

### 1.2 — COMPLETE WCAG 2.1 AA AUDIT & REMEDIATION CHECKLIST

Execute every item below. Mark PASS or FIX inline. Do not skip any criterion.

#### PERCEIVABLE

**1.1.1 — Non-text Content (Alt Text)**
- [ ] Every `<img>` has a descriptive, meaningful `alt` attribute
- [ ] The Acceda logo `<img>` uses `alt="Acceda logo"` (not empty, not "logo")
- [ ] Decorative images use `alt=""` and `role="presentation"`
- [ ] The terminal/scanner animation SVG/canvas has a text alternative via `aria-label`
- [ ] Stat counter elements (0%, 0x, 0+) have accessible labels that describe what they count

**1.3.1 — Info and Relationships**
- [ ] All headings use semantic `<h1>` through `<h4>` in correct hierarchy (one `<h1>` per page)
- [ ] Navigation uses `<nav>` with `aria-label="Main navigation"`
- [ ] Form fields use `<label for="...">` linked to input `id`s — NOT just placeholder text
- [ ] Feature cards/sections use `<section>` or `<article>` with appropriate `aria-labelledby`
- [ ] The compliance badges (WCAG 2.2, Section 508, ADA Title II) are marked up as a list (`<ul>`) with readable text — not just visual badges

**1.3.2 — Meaningful Sequence**
- [ ] DOM reading order matches visual order for all sections
- [ ] Mobile reflow does not create a logical disconnect between visual and DOM order

**1.3.3 — Sensory Characteristics**
- [ ] No instruction relies solely on shape, color, size, or visual location (e.g., "click the green button" must also name the button)

**1.3.4 — Orientation (WCAG 2.1)**
- [ ] Content does not lock to portrait or landscape orientation

**1.3.5 — Identify Input Purpose (WCAG 2.1)** ← PRIMARY VIOLATION
- [ ] All form inputs have correct `autocomplete` tokens (see 1.1 above)

**1.4.1 — Use of Color**
- [ ] Status indicators (FAIL/WARN/INFO in the terminal demo) use icons or labels — not just color

**1.4.2 — Audio Control**
- [ ] No auto-playing audio on the page (confirm none is present or add pause control)

**1.4.3 — Contrast Ratio (Text)**
- [ ] All normal text (< 18pt): minimum 4.5:1 contrast ratio against background
- [ ] Large text (≥ 18pt / 14pt bold): minimum 3:1 contrast ratio
- [ ] Body copy on white: verify #0F0F0F passes (it does — confirm)
- [ ] Subheadlines in medium gray: verify contrast — flag anything below 4.5:1
- [ ] Green accent (#1DB877) on white for body text: verify — if below 4.5:1, darken to #0F8A52 for text use only
- [ ] Nav links and footer links: verify contrast
- [ ] Placeholder text in form inputs: verify placeholder contrast ≥ 4.5:1 (often fails — darken placeholder color)
- [ ] "No spam." helper text below CTA: verify contrast

**1.4.4 — Resize Text**
- [ ] Page remains functional and readable at 200% browser zoom without horizontal scrolling
- [ ] Use `rem` units (not `px`) for all font sizes

**1.4.5 — Images of Text**
- [ ] No image files contain text that should be actual HTML text (terminal log, stat counters)
- [ ] If the terminal demo uses an image/canvas — replace with HTML/CSS-rendered text

**1.4.10 — Reflow (WCAG 2.1)**
- [ ] At 320px viewport width (400% zoom on 1280px screen), no horizontal scroll and no loss of content/function

**1.4.11 — Non-text Contrast (WCAG 2.1)**
- [ ] Form input borders achieve 3:1 contrast against adjacent background
- [ ] Focus indicators: 3:1 minimum (see 2.4.7 and 2.4.11)
- [ ] UI components (checkboxes, radio buttons, icon buttons) achieve 3:1

**1.4.12 — Text Spacing (WCAG 2.1)**
- [ ] Page remains readable/functional when these styles are applied simultaneously:
  - Line height to 1.5× font size
  - Letter spacing to 0.12× font size
  - Word spacing to 0.16× font size
  - Spacing after paragraphs to 2× font size

**1.4.13 — Content on Hover or Focus (WCAG 2.1)**
- [ ] Tooltips/dropdowns that appear on hover are: dismissable (Escape), hoverable (pointer can move over them), persistent (don't disappear until dismissed)

---

#### OPERABLE

**2.1.1 — Keyboard**
- [ ] ALL interactive elements are reachable and operable via keyboard (Tab, Shift+Tab, Enter, Space, Arrow keys)
- [ ] Navigation menu: fully keyboard operable
- [ ] CTA buttons: keyboard activatable
- [ ] Form: fully operable via keyboard
- [ ] "Request Demo" external link: keyboard accessible
- [ ] Any animated counter/scanner demo: keyboard accessible or has keyboard-accessible static alternative
- [ ] No keyboard traps anywhere on the page

**2.1.2 — No Keyboard Trap**
- [ ] Tab focus never gets stuck in a modal, widget, or component without an escape path (Escape key)

**2.1.4 — Character Key Shortcuts (WCAG 2.1)**
- [ ] If any single-character keyboard shortcuts exist, provide a mechanism to turn them off or remap

**2.2.1 — Timing Adjustable**
- [ ] If any session timeout exists, provide warning 20 seconds before expiry with option to extend

**2.2.2 — Pause, Stop, Hide**
- [ ] The animated counter (0% counting up, 0x, 0+) provides a mechanism to pause
- [ ] The terminal scanner animation ("Initializing scan engine...") provides a pause/stop control OR completes within 5 seconds
- [ ] Add `prefers-reduced-motion` CSS media query — disable/reduce all animations for users who have it set

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

**2.3.1 — Three Flashes or Below**
- [ ] No content flashes more than 3 times per second

**2.4.1 — Bypass Blocks**
- [ ] Add a "Skip to main content" link as the first focusable element on the page:

```html
<a href="#main-content" class="skip-link">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  top: -9999px;
  left: 0;
  z-index: 9999;
  padding: 0.75rem 1.5rem;
  background: #0D1B6E;
  color: #FFFFFF;
  font-weight: 600;
  text-decoration: none;
  border-radius: 0 0 4px 4px;
}
.skip-link:focus {
  top: 0;
}
```

**2.4.2 — Page Titled**
- [ ] `<title>` tag is descriptive and unique:
  `<title>Acceda — AI-Powered Accessibility Compliance Platform | WCAG, Section 508, ADA</title>`

**2.4.3 — Focus Order**
- [ ] Tab focus order follows logical reading/interaction order (top-left to bottom-right)
- [ ] No element receives focus out of sequence

**2.4.4 — Link Purpose (In Context)**
- [ ] Every link has descriptive, unique text — no bare "Click here", "Learn more", or "Read more"
- [ ] Navigation links: "Platform", "Use Cases", "Compliance", "Pricing", "Docs" — acceptable as-is
- [ ] "Sign Up" and "Request Demo" — add `aria-label` if needed for screen reader context:
  `<a href="#cta" aria-label="Sign Up for Acceda">Sign Up</a>`
- [ ] Footer links (Privacy Policy, Terms, Security, Accessibility Statement): each has distinct descriptive text — verify

**2.4.5 — Multiple Ways**
- [ ] Provide at least two ways to navigate the site (e.g., nav menu + in-page anchor links — currently both present — verify)

**2.4.6 — Headings and Labels**
- [ ] All headings are descriptive and distinguish each section
- [ ] Form labels clearly describe their inputs (not just placeholders)

**2.4.7 — Focus Visible**
- [ ] ALL focusable elements show a clearly visible focus indicator when focused via keyboard
- [ ] Never use `outline: none` or `outline: 0` without replacing with a custom focus indicator
- [ ] Minimum focus ring: 2px solid #0D1B6E or 2px solid #1DB877 with adequate contrast

**2.4.11 — Focus Not Obscured (WCAG 2.2)**
- [ ] When an element receives keyboard focus, it is not entirely hidden by sticky headers, overlays, or other content
- [ ] Sticky nav bar must not cover focused elements — add `scroll-padding-top` to account for nav height

**2.5.1 — Pointer Gestures (WCAG 2.1)**
- [ ] No multi-point gestures required (pinch, swipe) without a single-pointer alternative

**2.5.2 — Pointer Cancellation (WCAG 2.1)**
- [ ] Click/tap actions fire on mouse-up (not mouse-down) OR provide an undo mechanism

**2.5.3 — Label in Name (WCAG 2.1)**
- [ ] Accessible names for interactive elements contain the visible label text (for voice control compatibility)
- [ ] Example: A button labeled "Request Demo" must have an accessible name that includes "Request Demo"

**2.5.4 — Motion Actuation (WCAG 2.1)**
- [ ] No functionality triggered solely by device motion (shake, tilt)

**2.5.7 — Dragging Movements (WCAG 2.2)**
- [ ] Any draggable UI elements also offer a non-drag alternative

**2.5.8 — Target Size Minimum (WCAG 2.2)**
- [ ] All interactive targets (buttons, links, inputs) are at minimum 24×24 CSS pixels
- [ ] Recommended: 44×44px for primary CTAs

---

#### UNDERSTANDABLE

**3.1.1 — Language of Page**
- [ ] `<html lang="en">` is set

**3.1.2 — Language of Parts**
- [ ] Any non-English text segments use `lang` attribute on their containing element

**3.2.1 — On Focus**
- [ ] Focusing an element does not trigger a context change (no auto-submits, no auto-navigation)

**3.2.2 — On Input**
- [ ] Changing a form field value does not auto-submit or navigate

**3.2.3 — Consistent Navigation**
- [ ] Navigation menu appears in the same location and order on all pages

**3.2.4 — Consistent Identification**
- [ ] Components with the same function are identified consistently across the site

**3.3.1 — Error Identification**
- [ ] Form validation errors identify the field in error AND describe the error in text (not just color):
```html
<span role="alert" aria-live="polite" id="emailError">
  Work email is required and must be a valid email address.
</span>
<input aria-describedby="emailError" aria-invalid="true" ... />
```

**3.3.2 — Labels or Instructions**
- [ ] Every form input has a visible `<label>` element (not just placeholder)
- [ ] Required fields marked with `aria-required="true"` AND a visible indicator (asterisk * with legend)
- [ ] Add a form legend: `<p>Fields marked with * are required.</p>`

**3.3.3 — Error Suggestion**
- [ ] When an error occurs and the system knows the correct format, suggest it:
  "Please enter a valid work email address (e.g., name@company.com)"

**3.3.4 — Error Prevention (Legal, Financial, Data)**
- [ ] Form submission provides opportunity to review before final submit (or at minimum, confirmation message)

**3.3.7 — Redundant Entry (WCAG 2.2)**
- [ ] Users are not asked to re-enter information already submitted in the same session

**3.3.8 — Accessible Authentication (WCAG 2.2)**
- [ ] Login/sign-up flows do not rely solely on memorization or cognitive tests without alternatives

---

#### ROBUST

**4.1.1 — Parsing** *(Removed in WCAG 2.2 — still verify basic HTML validity)*
- [ ] No duplicate `id` attributes on the page
- [ ] All HTML tags are properly opened and closed

**4.1.2 — Name, Role, Value**
- [ ] All interactive elements have accessible names (via label, aria-label, or aria-labelledby)
- [ ] Custom components expose correct ARIA roles:
  - Navigation toggles: `role="button"`, `aria-expanded`, `aria-controls`
  - Tab/accordion components: correct ARIA patterns
  - Live stat counters: `aria-live="polite"` or `aria-label` on the container
- [ ] SVG icons used as interactive elements have `aria-hidden="true"` if decorative, or `aria-label` if meaningful

**4.1.3 — Status Messages**
- [ ] Form submission success/error messages are announced to screen readers:
```html
<div role="status" aria-live="polite" aria-atomic="true">
  Thank you — we'll be in touch within one business day.
</div>
```

---

### 1.3 — ACCESSIBILITY STATEMENT PAGE

Create a dedicated `/accessibility` page (linked in the footer as "Accessibility Statement") containing:

1. Acceda's commitment to WCAG 2.1 AA / 2.2 AA conformance
2. Known limitations (if any), with dates and planned remediation
3. Contact method for users to report accessibility issues:
   - Email: accessibility@useacceda.com
   - Response time commitment: 2 business days
4. Date of last accessibility audit
5. Feedback mechanism

---

### 1.4 — ACCESSIBILITY TESTING PROTOCOL

After making all changes above, run this validation stack before shipping:

1. **Automated:** axe DevTools browser extension — scan all pages, resolve all violations
2. **Automated:** WAVE (wave.webaim.org) — resolve all errors and contrast failures
3. **Lighthouse:** Accessibility score must reach 100
4. **Keyboard test:** Tab through entire page — verify all interactive elements are reachable, operable, and have visible focus
5. **Screen reader:** Test with NVDA (Windows) or VoiceOver (Mac/iOS) — verify:
   - Skip link works
   - Form labels announced correctly
   - Error messages announced
   - Live regions (counters, form feedback) announced
6. **Zoom test:** Set browser to 200% and 400% — verify no horizontal scroll, no content loss
7. **Color contrast:** Use Colour Contrast Analyser (by TPGi) on all text/background combinations
8. **Reduced motion:** Set OS to "Reduce Motion" — verify animations stop

---

## ════════════════════════════════════════
## PART 2 — SEO OPTIMIZATION
## (Technical + On-Page + E-E-A-T)
## ════════════════════════════════════════

### 2.1 — HEAD / META TAGS

```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <!-- Primary SEO -->
  <title>Acceda — AI-Powered Accessibility Compliance Platform | WCAG 2.1 AA, Section 508, ADA</title>
  <meta name="description" content="Acceda uses AI to scan, fix, and verify WCAG 2.1 AA, Section 508, and ADA Title II compliance across your entire digital product. Auto-generate VPATs, integrate CI/CD gates, and ship accessible software faster. Trusted by enterprise teams." />
  <meta name="keywords" content="web accessibility compliance, WCAG 2.1 AA, Section 508 compliance, ADA Title II, accessibility audit tool, VPAT generator, AI accessibility, enterprise accessibility platform, automated accessibility testing" />
  <link rel="canonical" href="https://useacceda.com/" />

  <!-- Open Graph (LinkedIn, Slack, social previews) -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content="https://useacceda.com/" />
  <meta property="og:title" content="Acceda — AI-Powered Accessibility Compliance" />
  <meta property="og:description" content="From scan to fix to legal evidence. AI-driven accessibility compliance for enterprise engineering and compliance teams." />
  <meta property="og:image" content="https://useacceda.com/og-image.png" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta property="og:image:alt" content="Acceda platform screenshot showing accessibility scan results and AI-generated code fixes" />
  <meta property="og:site_name" content="Acceda" />
  <meta property="og:locale" content="en_US" />

  <!-- Twitter/X Card -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="@useacceda" />
  <meta name="twitter:title" content="Acceda — AI-Powered Accessibility Compliance" />
  <meta name="twitter:description" content="AI scans, fixes, and verifies WCAG compliance across your entire product stack. Build accessible, ship confidently." />
  <meta name="twitter:image" content="https://useacceda.com/og-image.png" />
  <meta name="twitter:image:alt" content="Acceda accessibility compliance platform" />

  <!-- Indexing directives -->
  <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

  <!-- Favicon package -->
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
  <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />

  <!-- Preconnect for performance -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <!-- Theme color (matches brand navy) -->
  <meta name="theme-color" content="#0D1B6E" />
</head>
```

**Create OG Image:** Design a 1200×630px image at `/public/og-image.png` that includes:
- Acceda logo (top left)
- Headline: "AI-Powered Accessibility Compliance"
- Subtext: "WCAG 2.1 AA · Section 508 · ADA Title II"
- Clean navy (#0D1B6E) background with emerald (#1DB877) accent

---

### 2.2 — TECHNICAL SEO

**robots.txt** — Ensure the following exists at `https://useacceda.com/robots.txt`:
```
User-agent: *
Allow: /

# Allow AI crawlers for AEO visibility
User-agent: GPTBot
Allow: /
User-agent: PerplexityBot
Allow: /
User-agent: ClaudeBot
Allow: /
User-agent: Googlebot
Allow: /

Sitemap: https://useacceda.com/sitemap.xml
```

**CRITICAL NOTE:** Do NOT block AI crawlers. They must be explicitly allowed for AEO visibility.

**sitemap.xml** — Generate at `https://useacceda.com/sitemap.xml`:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://useacceda.com/</loc>
    <lastmod>2026-03-12</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://useacceda.com/accessibility</loc>
    <lastmod>2026-03-12</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>https://useacceda.com/privacy</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  <url>
    <loc>https://useacceda.com/terms</loc>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
</urlset>
```

**Core Web Vitals — Performance Requirements:**
- [ ] Largest Contentful Paint (LCP): < 2.5 seconds
- [ ] First Input Delay (FID) / Interaction to Next Paint (INP): < 200ms
- [ ] Cumulative Layout Shift (CLS): < 0.1
- [ ] All images have explicit `width` and `height` attributes to prevent layout shift
- [ ] Hero image (if any) uses `loading="eager"` and `fetchpriority="high"`
- [ ] All below-fold images use `loading="lazy"`
- [ ] Next.js `<Image>` component used for all images (automatic optimization)
- [ ] Fonts loaded with `display=swap` to prevent FOIT
- [ ] No render-blocking scripts in `<head>` (defer/async everything non-critical)

**HTTPS & Security Headers** (verify in next.config.js or middleware):
```javascript
// next.config.js
const securityHeaders = [
  { key: 'X-DNS-Prefetch-Control', value: 'on' },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
];
```

---

### 2.3 — ON-PAGE SEO

**Heading Hierarchy (verify/enforce):**
```
<h1> — ONE per page: "Build Accessible Software Automation" (or approved hero headline)
  <h2> — "The Problem" section
  <h2> — "The Platform" section  
  <h2> — "Built For Your Team" section
  <h2> — "Every Standard. One Platform." section
  <h2> — "Secure your compliance posture today." (CTA section)
    <h3> — Feature card titles: "ACCEDA Scan", "ACCEDA Fix", etc.
    <h3> — Persona cards: "Engineering Leaders", "QA & Testing Teams", etc.
    <h3> — Compliance items: "WCAG 2.2 Level AA", "Section 508", etc.
```

**Image Alt Text (comprehensive list to fix):**
- `<img src="acceda_logo_2.svg" alt="Acceda — AI-Powered Accessibility Compliance Platform" />`
- Stat counter 0%: alt/aria-label = "Acceda detects up to 100% of WCAG violations, versus 30–40% with legacy tools"
- Terminal demo screenshot: alt = "Acceda scan engine terminal showing detected accessibility violations including color contrast and label issues"
- Any industry icons: alt = "Financial services industry" / "Government and defense" / etc.

**Internal Linking:**
- [ ] CTA links use descriptive `aria-label` (see above)
- [ ] "See the Platform" anchor links to `#platform` section
- [ ] Footer links: Privacy Policy links to `/privacy`, Terms links to `/terms`, Accessibility Statement links to `/accessibility`

---

## ════════════════════════════════════════
## PART 3 — AEO / AI SEARCH OPTIMIZATION
## (Answer Engine Optimization for ChatGPT,
##  Perplexity, Google AI Overviews, etc.)
## ════════════════════════════════════════

### 3.1 — STRUCTURED DATA (JSON-LD)

Add all of the following JSON-LD blocks inside `<script type="application/ld+json">` tags in the `<head>`. Use separate script tags for each schema type.

**Schema 1: Organization**
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Acceda",
  "alternateName": "useacceda",
  "url": "https://useacceda.com",
  "logo": {
    "@type": "ImageObject",
    "url": "https://useacceda.com/_next/static/media/acceda_logo_2.f0668e08.svg",
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
    "url": "https://cal.com/acceda/demo",
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
}
```

**Schema 2: SoftwareApplication**
```json
{
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Acceda",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "url": "https://useacceda.com",
  "description": "AI-powered accessibility compliance platform for enterprise teams. Automated WCAG scanning, code-level remediation, VPAT generation, and CI/CD integration.",
  "offers": {
    "@type": "Offer",
    "url": "https://cal.com/acceda/demo",
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
}
```

**Schema 3: FAQPage (critical for AEO — AI engines pull directly from this)**
```json
{
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
}
```

**Schema 4: WebSite (enables Google Sitelinks search box)**
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Acceda",
  "url": "https://useacceda.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://useacceda.com/?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}
```

---

### 3.2 — FAQ SECTION IN HTML (Visible on Page)

Add a visible FAQ section to the landing page between the "Compliance Coverage" section and the CTA form. This content must exist in real HTML — not just JSON-LD — so AI answer engines can crawl and extract it.

```html
<section id="faq" aria-labelledby="faq-heading">
  <h2 id="faq-heading">Frequently Asked Questions</h2>

  <div class="faq-item">
    <h3>What is the ADA Title II April 24, 2026 deadline?</h3>
    <p>The U.S. Department of Justice finalized a rule requiring all state and local governments, public universities, and covered public entities to make their websites and apps compliant with WCAG 2.1 Level AA by April 24, 2026. Acceda helps organizations meet this deadline with automated scanning, AI-assisted remediation, and audit-ready documentation.</p>
  </div>

  <div class="faq-item">
    <h3>How is Acceda different from axe or Lighthouse?</h3>
    <p>Legacy scanners like axe and Lighthouse detect only 30–40% of WCAG violations and provide no remediation path. Acceda detects significantly more issues using AI, then delivers exact code fixes and guided implementation paths—plus automated VPAT generation and CI/CD integration.</p>
  </div>

  <div class="faq-item">
    <h3>What is a VPAT, and can Acceda generate one automatically?</h3>
    <p>A VPAT (Voluntary Product Accessibility Template) is a formal legal document required by enterprise and government procurement teams. Acceda automatically compiles VPATs from your audit history—eliminating weeks of manual compliance work.</p>
  </div>

  <div class="faq-item">
    <h3>What accessibility standards does Acceda support?</h3>
    <p>Acceda supports WCAG 2.1 AA, WCAG 2.2 AA, Section 508, ADA Title II, and EN 301 549—covering U.S. federal requirements, ADA obligations, and the European Accessibility Act standard.</p>
  </div>

  <div class="faq-item">
    <h3>Can Acceda integrate with our CI/CD pipeline?</h3>
    <p>Yes. Acceda's compliance gate integrates with GitHub Actions, GitLab CI, Jenkins, and other common pipelines to block inaccessible code before it reaches production.</p>
  </div>
</section>
```

---

### 3.3 — CONTENT STRUCTURE FOR AI EXTRACTION

The following rules ensure AI answer engines (ChatGPT, Perplexity, Google AI Overviews) can extract and cite Acceda accurately.

- [ ] All key value propositions are stated in complete sentences within the first 60 words of each section — not just in headlines
- [ ] The hero section contains a full declarative sentence: "Acceda is an AI-powered accessibility compliance platform that automatically detects, fixes, and documents WCAG 2.1 AA, Section 508, and ADA Title II violations for enterprise software teams."
- [ ] Semantic HTML5 tags used throughout: `<main>`, `<nav>`, `<section>`, `<article>`, `<aside>`, `<header>`, `<footer>`
- [ ] Every section has a clear heading that contains the main topic keyword
- [ ] Numbers and statistics are written in HTML text (not baked into images/SVG): "Legacy scanners detect only 30–40% of WCAG violations. Acceda closes that gap."
- [ ] Content does NOT rely solely on JavaScript to render — key text must be present in initial HTML for crawler access
- [ ] No critical content hidden in iframes
- [ ] `<meta name="description">` is a complete, direct answer to "What is Acceda?" (see Part 2.1 above)

---

### 3.4 — BRAND AUTHORITY & E-E-A-T SIGNALS

- [ ] Add a brief "About Acceda" section or strengthen the footer with company founding context
- [ ] Link to any press mentions, case studies, or third-party coverage from the landing page
- [ ] Add trust signals in the CTA section: "SOC 2 Type II" badge with aria-label explaining it means independent security certification
- [ ] Ensure the Acceda Google Business Profile is created or claimed at business.google.com (for Knowledge Panel)
- [ ] Consistent brand name across all properties: "Acceda" (not "ACCEDA" or "useacceda") in prose and social profiles

---

## ════════════════════════════════════════
## PART 4 — IMPLEMENTATION ORDER
## (Execution Priority)
## ════════════════════════════════════════

Execute in this exact order:

**PHASE 1 — Critical Blocking Issues (ship within 24 hours)**
1. Fix all 4+ autocomplete attributes on form fields
2. Add `<html lang="en">` if missing
3. Add "Skip to main content" link
4. Add `<title>` tag (correct format)
5. Add `prefers-reduced-motion` CSS
6. Verify all form labels are visible `<label>` elements
7. Verify no `outline: none` without replacement focus styles

**PHASE 2 — SEO & Crawlability (ship within 48 hours)**
1. Add all meta tags (description, OG, Twitter, robots)
2. Create/verify robots.txt — confirm AI crawlers are NOT blocked
3. Generate sitemap.xml
4. Add all JSON-LD structured data schemas
5. Create OG image (1200×630px)

**PHASE 3 — Full Accessibility Audit (ship within 1 week)**
1. Audit and fix all contrast ratios
2. Fix all ARIA roles, labels, and live regions
3. Keyboard navigation audit and fix
4. Focus indicator audit and fix
5. Image alt text audit and fix
6. Form error handling and validation messages

**PHASE 4 — AEO Content & FAQ (ship within 1 week)**
1. Add FAQ section to page HTML
2. Ensure hero contains full declarative sentence about Acceda
3. Ensure all key content is in HTML (not JavaScript-only)
4. Add Accessibility Statement page

**PHASE 5 — Validation (before April 24, 2026)**
1. Run full axe DevTools scan — zero violations
2. Run WAVE scan — zero errors
3. Lighthouse audit — Accessibility 100, Performance ≥ 90, SEO 100
4. Manual keyboard test
5. Screen reader test (NVDA + VoiceOver)
6. Validate all JSON-LD at https://validator.schema.org

---

## ════════════════════════════════════════
## AUTO-VALIDATION CHECKLIST
## (Run after each phase)
## ════════════════════════════════════════

```
ACCESSIBILITY:
  [ ] Zero axe violations
  [ ] Zero WAVE errors
  [ ] Lighthouse Accessibility = 100
  [ ] Skip link present and functional
  [ ] All form fields: labels + autocomplete
  [ ] Focus indicators visible on all interactive elements
  [ ] prefers-reduced-motion respected
  [ ] All images have alt text
  [ ] Heading hierarchy correct (one h1)
  [ ] html[lang] set

SEO:
  [ ] Title tag: descriptive, < 60 characters
  [ ] Meta description: 150–160 characters, outcome-led
  [ ] OG tags complete
  [ ] Canonical tag present
  [ ] robots.txt: AI crawlers allowed
  [ ] sitemap.xml submitted to Google Search Console
  [ ] Lighthouse SEO = 100
  [ ] Core Web Vitals: LCP < 2.5s, CLS < 0.1, INP < 200ms

AEO / STRUCTURED DATA:
  [ ] Organization schema valid
  [ ] SoftwareApplication schema valid
  [ ] FAQPage schema valid (7 Q&A minimum)
  [ ] WebSite schema valid
  [ ] Validate at https://validator.schema.org — zero errors
  [ ] FAQ section present in visible HTML
  [ ] Key content in HTML (not JS-only)
  [ ] Hero contains full declarative brand description

HARD CONSTRAINTS:
  [ ] No internal architecture exposed
  [ ] No placeholder text anywhere
  [ ] Enterprise tone maintained throughout
  [ ] Acceda's own page is fully WCAG 2.1 AA compliant
```

---

*ACCEDA — The platform that makes the web accessible. Starting with itself.*
