# Middle Coast Website - Architecture

> Technical architecture documentation for the Astro-based static site

---

## System Overview

**Current State:** Production-ready static site foundation with content management and theme generation.

**Technology Stack:**
- **Framework:** Astro 5.15.3 (static site generation, Islands Architecture)
- **Styling:** Tailwind CSS 3.4.18 (utility-first CSS)
- **Language:** TypeScript 5.9.3 (strict mode)
- **Content:** Markdown with gray-matter frontmatter parsing
- **Tooling:** Biome 2.3.4 (linting/formatting), Astro Check (type validation)

---

## Project Structure

```
middle-coast-website/
├── .env.local                      # API keys (gitignored)
├── .env.example                    # Template for env vars
├── astro.config.mjs
├── tailwind.config.mjs
├── package.json
├── cli/
│   ├── generate.ts                 # Main CLI entry point
│   └── commands/
│       ├── analyze-url.ts          # Fetch and analyze reference URL
│       ├── generate-layouts.ts     # Generate 4 variations
│       └── deploy-preview.ts       # Deploy to Netlify preview
├── src/
│   ├── config/
│   │   └── site-config.ts          # Middle Coast brand config
│   ├── content/
│   │   └── middle-coast.json       # Centralized content (copy, images)
│   ├── layouts/
│   │   ├── BaseLayout.astro        # Wrapper for all layouts
│   │   ├── generated/              # AI-generated layouts
│   │   │   ├── option-1/
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── About.tsx
│   │   │   │   ├── Approach.tsx
│   │   │   │   ├── Contact.tsx
│   │   │   │   └── Layout.tsx      # Composes all sections
│   │   │   ├── option-2/
│   │   │   ├── option-3/
│   │   │   └── option-4/
│   │   └── production/             # Selected production layout
│   │       └── Layout.tsx
│   ├── components/
│   │   ├── LayoutSwitcher.tsx      # Preview mode switcher UI
│   │   └── ui/                     # Shared components (buttons, etc)
│   ├── lib/
│   │   ├── agents/
│   │   │   ├── url-analyzer.ts     # Analyzes reference URL structure
│   │   │   ├── layout-generator.ts # Generates React components via Claude
│   │   │   ├── variation-engine.ts # Creates 4 variations
│   │   │   └── prompts/            # Claude API prompts
│   │   │       ├── analyze.ts
│   │   │       ├── generate.ts
│   │   │       └── variations.ts
│   │   └── utils/
│   │       ├── file-writer.ts      # Writes generated components to disk
│   │       └── deploy.ts           # Netlify deployment helper
│   ├── pages/
│   │   ├── index.astro             # Production site (uses production layout)
│   │   └── preview.astro           # Preview with layout switcher
│   └── styles/
│       └── globals.css             # Tailwind + custom styles
└── public/
    └── images/                     # Static images
```
---

## Core Components

### 1. Layout System

**`src/layouts/Layout.astro`** - Base HTML document
- Meta tags for SEO
- Font loading (Google Fonts: DM Serif Display, Montserrat)
- Tailwind CSS integration
- Semantic HTML5 structure

**Component Props Pattern:**
```typescript
interface Props {
  title: string;
  description?: string;
}
```

### 2. Content Components

**`Hero.astro`** - Full-screen hero section
- Props: name, tagline, description, calendlyUrl
- CTA buttons: "Get in Touch" (anchor link) + "Schedule a Call" (Calendly)
- Responsive typography (5xl/7xl)

**`About.astro`** - Content section
- Props: title, content (multi-paragraph string)
- Auto-splits content on `\n\n` into paragraphs
- Centered layout, max-width constraint

**`InvestmentApproach.astro`** - 4-pillar grid
- Props: title, pillars (array of {title, description})
- 2-column grid on desktop, single column mobile
- Dark background (charcoal) with light text

**`Contact.astro`** - Contact form
- Non-functional form (no backend yet)
- Calendly integration link
- Form fields: firstName, lastName, email, message

---

## Content Management

### Content Storage

**Location:** `content/sites/middle-coast/`

**Files:**
- `config.json` - Site configuration (colors, fonts, contact info)
- `about.md` - About section markdown
- `approach.md` - Investment approach with frontmatter pillars

### Content Loading Pattern

Components receive data via props (currently hardcoded or from manual imports). Future: Content Collections API.

**Example `approach.md` frontmatter:**
```yaml
---
title: "Investment Approach"
pillars:
  - title: "Market Selection"
    description: "We target Midwest markets..."
  - title: "Rigorous Diligence"
    description: "Every investment undergoes..."
---
```

---

## Styling Architecture

### Tailwind Configuration

**`tailwind.config.mjs`** - Minimal configuration
```javascript
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {},
  plugins: [],
};
```

**Theme Extension (via mockup generator):**
- Custom colors: charcoal, soft-white, copper, deep-olive, warm-gray
- Custom fonts: DM Serif Display (headings), Montserrat (body)

### Design Tokens (from config.json)

```json
{
  "colors": {
    "primary": "#1E1F1D",    // Charcoal
    "secondary": "#F5F4EF",   // Soft White
    "accent": "#A76D3E"       // Copper
  },
  "fonts": {
    "heading": "DM Serif Display",
    "body": "Montserrat"
  }
}
```

---

## Theme Generation System

**Script:** `scripts/generate-mockups.mjs`

**Purpose:** Generate multiple theme variations for client preview

**Themes:**
1. **Professional** - Current Middle Coast branding (charcoal, copper, serif)
2. **Modern** - Blue accent, Inter font, clean aesthetic
3. **Elegant** - Gold accent, Playfair Display, luxury feel

**Output:** `mockups/middle-coast/`
- `config-professional.json`
- `config-modern.json`
- `config-elegant.json`
- `tailwind.professional.mjs`
- `tailwind.modern.mjs`
- `tailwind.elegant.mjs`

**Usage:**
```bash
npm run generate-mockups  # Generate all themes
cp mockups/middle-coast/tailwind.modern.mjs tailwind.config.mjs  # Apply theme
npm run dev  # Preview
```

---

## Build Pipeline

### Development
```bash
npm run dev
# → astro dev
# → Dev server on http://localhost:4321
# → Hot module replacement enabled
```

### Production Build
```bash
npm run build
# → astro check (TypeScript validation)
# → astro build (static generation)
# → Output to dist/
```

### Type Checking
```bash
npx astro check
# → Validates TypeScript across .astro files
# → Auto-generated types in .astro/types.d.ts
```

---

## TypeScript Configuration

**`tsconfig.json`** - Strict mode
```json
{
  "extends": "astro/tsconfigs/strict"
}
```

**Type Generation:**
- Astro auto-generates types in `.astro/types.d.ts`
- Run `astro sync` to regenerate types
- VS Code integration via Astro extension

---

## Development Tooling

### VS Code Configuration

**Extensions (`.vscode/extensions.json`):**
- `astro-build.astro-vscode` - Astro language support
- `bradlc.vscode-tailwindcss` - Tailwind IntelliSense
- `esbenp.prettier-vscode` - Prettier formatting
- `ms-vscode.vscode-typescript-next` - Latest TypeScript

**Settings (`.vscode/settings.json`):**
- Format on save: enabled
- Biome for TS/JS, Prettier for JSON/MD
- Astro formatter for .astro files
- Tailwind class completion

### Linting & Formatting

**Biome:** TypeScript/JavaScript linting and formatting
```bash
npx @biomejs/biome check ./src
npx @biomejs/biome lint --write ./src
```

**Prettier:** JSON and Markdown formatting (via VS Code)

---

## Architectural Decisions

### 1. Static Site Generation (SSG) Only

**Decision:** Pure static generation, no server-side rendering (SSR)

**Rationale:**
- Marketing site doesn't need dynamic data
- Maximum performance and security
- Deployable to any static host (Netlify, Vercel, S3)
- Future: Can add SSR for investor portal sections

### 2. Islands Architecture

**Decision:** Server-first rendering, zero JavaScript by default

**Rationale:**
- No client-side interactivity needed currently
- Faster page loads, better SEO
- Future: Add islands for interactive features (e.g., layout switcher)

### 3. Content-First Architecture

**Decision:** Separate content from presentation

**Rationale:**
- Non-technical users can edit Markdown
- Content portable between designs
- Prepares for Content Collections API migration

### 4. Multi-Site Structure

**Decision:** `content/sites/` allows multiple client sites in one repo

**Rationale:**
- Reusable component library across clients
- Shared tooling and build pipeline
- Potential for white-label template product

### 5. TypeScript Strict Mode

**Decision:** Strict TypeScript configuration

**Rationale:**
- Catch errors at compile time
- Better autocomplete and refactoring
- Self-documenting code via types

---

## Future Architecture (See ROADMAP.md)

### Planned Enhancements

1. **Content Collections Migration**
   - Move from manual imports to Astro Content Collections API
   - Type-safe content queries
   - Auto-generated TypeScript types from frontmatter schemas

2. **AI Integration Layer**
   - Claude API integration for layout generation
   - Prompt engineering system for design variations
   - Asset processing pipeline

3. **Preview System**
   - React islands for layout switcher UI
   - Dynamic layout loading
   - Client-side state management

4. **Backend Services**
   - Contact form submission (Netlify Forms or serverless function)
   - Analytics integration
   - A/B testing infrastructure

---

## Performance Characteristics

**Current Benchmarks:**
- Build time: ~3 seconds (small site)
- Page size: ~50KB (including fonts)
- First Contentful Paint: <0.5s
- Time to Interactive: <0.5s (no JavaScript)

**Lighthouse Scores (typical):**
- Performance: 100
- Accessibility: 95+
- Best Practices: 100
- SEO: 100

---

## Deployment Strategy

**Current:** Manual deployment (no CI/CD configured)

**Build Output:** `dist/` directory (static HTML/CSS/assets)

**Compatible Hosts:**
- Netlify (recommended)
- Vercel
- AWS S3 + CloudFront
- GitHub Pages
- Any static file server

**Future:** Automated deployment on push to `main` branch

---

## Related Documentation

- **[PRODUCT.md](PRODUCT.md)** - Product overview and user workflows
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Developer guidelines
- **[ROADMAP.md](ROADMAP.md)** - Future enhancements and migration path
- **[.github/instructions/](/.github/instructions/)** - AI assistant coding guidelines
