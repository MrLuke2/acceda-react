import json

with open("src/app/page.js", "r", encoding="utf-8") as f:
    content = f.read()

# Typography
content = content.replace(
    "@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@300;400;500;600&display=swap');",
    "@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');"
)
content = content.replace("--font-display: 'Syne', sans-serif;", "--font-display: 'Space Grotesk', sans-serif;")
content = content.replace("--font-body:    'IBM Plex Sans', sans-serif;", "--font-body:    'Inter', sans-serif;\n      --font-code:    'JetBrains Mono', monospace;")

# Colors (Hex vars)
content = content.replace("--bg:        #080C14;", "--bg:        #0C1F4A;")
content = content.replace("--bg-2:      #0D1321;", "--bg-2:      #0A2A66;")
content = content.replace("--bg-card:   #111827;", "--bg-card:   rgba(10,42,102,0.6);")
content = content.replace("--blue:      #1D6AFF;", "--blue:      #1F4FD8;")
content = content.replace("--teal:      #00D4AA;", "--teal:      #10B26C;")

# Colors (Global hex values)
content = content.replace("#1D6AFF", "#1F4FD8")
content = content.replace("#00D4AA", "#10B26C")
content = content.replace("#080C14", "#0C1F4A")
content = content.replace("#0D1321", "#0A2A66")

# Colors (RGBA)
content = content.replace("29,106,255", "31,79,216")
content = content.replace("0,212,170", "16,178,108")

# Messaging
content = content.replace(
    """<div className="eyebrow">AI-Powered Accessibility Platform</div>""",
    """<div className="eyebrow">AI-Powered Accessibility Compliance</div>"""
)
content = content.replace(
    """Compliance<br/>
                <span style={{ color: "var(--blue)" }}>engineered,</span><br/>
                not audited.""",
    """Build Accessible<br/>
                <span style={{ color: "var(--blue)" }}>Software</span><br/>
                Automatically"""
)
content = content.replace(
    """Legacy scanners catch 30–40% of accessibility issues and hand your team a list. Acceda closes the gap — finding every violation, writing every fix, and generating the legal documentation your organization requires.""",
    """AI scans, fixes, and verifies accessibility across your entire product stack. Build accessible, ship confidently."""
)
content = content.replace("Automated Accessibility Scanning", "ACCEDA Scan")
content = content.replace("AI-Powered Smart Remediation", "ACCEDA Fix")
content = content.replace("VPAT & Legal Documentation", "ACCEDA Reports")
content = content.replace("CI/CD Compliance Gate", "ACCEDA CI")
content = content.replace("Human Review Dashboard", "ACCEDA DevKit")
content = content.replace("Audio & Video Captioning", "Audio & Video Captions")

# Tagline updates
content = content.replace("Compliance coverage", "Accessibility CI for modern teams")

with open("src/app/page.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Replacement complete.")
