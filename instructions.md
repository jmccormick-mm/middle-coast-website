# Middle Coast Website - AI-Powered Layout Generator

> **Project Type:** Astro + React + TypeScript + Tailwind static site with AI-powered layout generation

An innovative website project that uses Claude AI to analyze reference websites and generate multiple layout variations for client preview. Built for Middle Coast, a Midwest real estate investment firm.

---

## 📚 Documentation Index

This project has comprehensive documentation split into focused guides:

### 1. **[Architecture Overview](#architecture-overview)** ⬇️
Complete system architecture, tech stack decisions, project structure, and core workflows.

### 2. **[Getting Started Guide](#getting-started-guide)** ⬇️
Step-by-step setup instructions to get your development environment running.

### 3. **[Quick Reference](#quick-reference)** ⬇️
Common commands, file locations, and troubleshooting tips.

---

## 🎯 Project Goals

1. **Generate layout variations** from a reference URL using AI
2. **Preview system** allowing clients to toggle between 4 layout options
3. **Production deployment** of the selected layout
4. **Future-proof architecture** that can scale to include investor portals

---

## 🚀 Quick Start

```bash
# 1. Clone and setup
git clone <repo-url> middle-coast
cd middle-coast
npm install

# 2. Add your API key
echo "ANTHROPIC_API_KEY=your_key_here" > .env.local

# 3. Generate layouts from reference site
npm run generate -- https://www.mwncapital.com/

# 4. Preview locally
npm run dev
# Visit http://localhost:4321/preview

# 5. Deploy for client review
npm run deploy:preview
```

---

## 📁 Project Structure

```
middle-coast/
├── cli/                            # Command-line tools
│   ├── generate.ts                 # Main CLI entry point
│   └── commands/
│       ├── analyze-url.ts          # URL analyzer
│       ├── generate-layouts.ts     # Layout generator
│       └── promote.ts              # Promotion to production
├── src/
│   ├── config/
│   │   └── site-config.ts          # Middle Coast brand config
│   ├── content/
│   │   └── middle-coast.json       # All site content (centralized)
│   ├── layouts/
│   │   ├── generated/              # AI-generated layout options
│   │   │   ├── option-1/           # Faithful recreation
│   │   │   ├── option-2/           # Warm emphasis
│   │   │   ├── option-3/           # Spacious layout
│   │   │   └── option-4/           # Bold hierarchy
│   │   └── production/             # Selected production layout
│   ├── components/
│   │   └── LayoutSwitcher.tsx      # Preview mode UI
│   ├── lib/
│   │   ├── agents/                 # AI agent logic
│   │   └── utils/                  # Helper functions
│   └── pages/
│       ├── index.astro             # Production site
│       └── preview.astro           # Preview with switcher
└── public/
    └── images/                     # Static assets
```

---

## 🔧 Core Commands

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server (localhost:4321) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run generate -- <url>` | Generate 4 layout variations from URL |
| `npm run promote -- <option>` | Promote option to production |
| `npm run deploy:preview` | Deploy preview to Netlify |
| `npm run deploy:prod` | Deploy production to Netlify |

---

## 💡 How It Works

### 1. URL Analysis
```bash
npm run generate -- https://www.mwncapital.com/
```

- Fetches the reference website
- Extracts HTML structure and content hierarchy
- Sends to Claude API for analysis
- Returns structured JSON with sections, layouts, and patterns

### 2. Layout Generation

- Generates 4 variations:
  - **Option 1:** Faithful recreation of reference structure
  - **Option 2:** Warmer color emphasis (more copper/olive)
  - **Option 3:** More spacious (1.5x spacing)
  - **Option 4:** Bold visual hierarchy (larger type contrast)

- Creates React + TypeScript components with Tailwind CSS
- Uses Middle Coast branding (colors, fonts, content)
- Writes to `src/layouts/generated/option-{1-4}/`

### 3. Preview & Selection

- Visit `/preview` to see all 4 options
- Toggle between layouts with switcher UI
- Deploy preview to Netlify for client review
- Client selects preferred option

### 4. Production Deployment

```bash
npm run promote -- option-3  # Promote selected option
npm run build                # Build production site
npm run deploy:prod          # Deploy to live site
```

---

## 🎨 Brand Configuration

Middle Coast's brand is configured in `src/config/site-config.ts`:

**Colors:**
- Primary: Charcoal (#1E1F1D), Soft White (#F5F4EF)
- Accent: Copper (#A76D3E)
- Supporting: Deep Olive (#3C4037), Warm Gray (#7A7F78)

**Typography:**
- Serif: DM Serif Display (headlines)
- Sans: Montserrat (body)
- Alt: Lora (quotes/subheads)

**Sections:**
- Hero
- About
- Investment Approach
- Contact

---

## 🌐 Deployment

### Preview Deployment (for client review)
```bash
npm run deploy:preview
# Generates: middle-coast-preview-abc123.netlify.app
```

### Production Deployment
```bash
npm run build
npm run deploy:prod
# Deploys to: middlecoast.com (or your domain)
```

---

## 💰 Cost Estimates

| Item | Cost |
|------|------|
| Claude API (per generation) | ~$0.50 |
| Netlify Hosting | Free tier |
| Domain Registration | ~$12/year |
| **Total** | **~$12/year + $0.50 per generation** |

---

## 🔮 Future Enhancements

### Phase 2
- Screenshot generation for each layout
- Regenerate specific sections only
- Custom variation parameters

### Phase 3
- Abstract into reusable package
- Support multiple frameworks (Next.js, Remix)
- Template marketplace

---

<div style="page-break-after: always;"></div>

# Architecture Overview

## Project Overview

An Astro + React + TypeScript + Tailwind project that uses AI agents to generate multiple layout variations from a reference URL, with a preview system for client review and easy production deployment.

---

## Tech Stack

- **Framework:** Astro (static site generation + React islands)
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **AI:** Claude API (Sonnet 4)
- **Deployment:** Netlify
- **Package Manager:** npm/pnpm

---

## Core Workflows

### Workflow 1: Generate Layouts from URL

```bash
# Run CLI tool
npm run generate -- https://www.mwncapital.com/

# What happens:
# 1. Fetches reference URL HTML/CSS
# 2. Analyzes structure, layout patterns, sections
# 3. Calls Claude API to generate 4 React component variations
# 4. Writes components to src/layouts/generated/option-{1-4}/
# 5. Outputs summary of what was generated
```

### Workflow 2: Preview Layouts

```bash
# Start dev server
npm run dev

# Visit http://localhost:4321/preview
# - See all 4 options rendered
# - Toggle between layouts with switcher UI
# - Share this URL with client (or deploy to Netlify preview)
```

### Workflow 3: Deploy Preview for Client

```bash
# Deploy preview to Netlify
npm run deploy:preview

# Gets URL like: middle-coast-preview-abc123.netlify.app
# Send to client for feedback
```

### Workflow 4: Promote to Production

```bash
# Once client selects option (e.g., option-3)
npm run promote -- option-3

# What happens:
# 1. Copies src/layouts/generated/option-3/ to src/layouts/production/
# 2. Updates index.astro to use production layout
# 3. Ready to deploy to main site
```

---

## Key Files Explained

### 1. CLI Entry Point: `cli/generate.ts`

```typescript
#!/usr/bin/env tsx

import { Command } from 'commander';
import { analyzeURL } from './commands/analyze-url';
import { generateLayouts } from './commands/generate-layouts';

const program = new Command();

program
  .name('generate')
  .description('Generate layout variations from a reference URL')
  .argument('<url>', 'Reference URL to analyze')
  .option('-o, --output <path>', 'Output directory', 'src/layouts/generated')
  .action(async (url: string, options) => {
    console.log('🔍 Analyzing reference URL...');
    const analysis = await analyzeURL(url);
    
    console.log('🤖 Generating 4 layout variations...');
    await generateLayouts(analysis, options.output);
    
    console.log('✅ Done! Check src/layouts/generated/');
  });

program.parse();
```

### 2. Site Configuration: `src/config/site-config.ts`

```typescript
export const MIDDLE_COAST_CONFIG = {
  brand: {
    name: 'Middle Coast',
    tagline: 'Quiet Strength. Real Returns.',
  },
  
  colors: {
    primary: {
      charcoal: '#1E1F1D',
      softWhite: '#F5F4EF',
    },
    accent: {
      copper: '#A76D3E',
    },
    supporting: {
      deepOlive: '#3C4037',
      warmGray: '#7A7F78',
    },
  },
  
  typography: {
    fonts: {
      serif: '"DM Serif Display", serif',
      sans: '"Montserrat", sans-serif',
      alt: '"Lora", serif',
    },
  },
  
  sections: [
    'Hero',
    'About', 
    'Approach',
    'Contact',
  ],
} as const;
```

### 3. Content Data: `src/content/middle-coast.json`

All site content is centralized in one JSON file:

```json
{
  "hero": {
    "headline": "Quiet Strength. Real Returns.",
    "subheadline": "Middle Coast invests in...",
    "cta": { "text": "Learn More", "link": "#about" }
  },
  "about": { ... },
  "approach": { ... },
  "contact": { ... }
}
```

### 4. Layout Switcher Component: `src/components/LayoutSwitcher.tsx`

React component that allows toggling between layout options in preview mode:

```tsx
import { useState } from 'react';

export default function LayoutSwitcher({ layouts }) {
  const [activeLayout, setActiveLayout] = useState('option-1');
  const ActiveComponent = layouts[activeLayout].component;
  
  return (
    <>
      {/* Fixed switcher UI */}
      <div className="fixed top-4 right-4 z-50 bg-white shadow-lg rounded-lg p-4">
        {Object.entries(layouts).map(([key, { label }]) => (
          <button
            key={key}
            onClick={() => setActiveLayout(key)}
            className={activeLayout === key ? 'active' : ''}
          >
            {label}
          </button>
        ))}
      </div>
      
      {/* Render active layout */}
      <ActiveComponent />
    </>
  );
}
```

### 5. Preview Page: `src/pages/preview.astro`

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import LayoutSwitcher from '../components/LayoutSwitcher';
import Option1 from '../layouts/generated/option-1/Layout';
import Option2 from '../layouts/generated/option-2/Layout';
import Option3 from '../layouts/generated/option-3/Layout';
import Option4 from '../layouts/generated/option-4/Layout';

const layouts = {
  'option-1': { component: Option1, label: 'Faithful Recreation' },
  'option-2': { component: Option2, label: 'Warm Emphasis' },
  'option-3': { component: Option3, label: 'Spacious' },
  'option-4': { component: Option4, label: 'Bold Hierarchy' },
};
---

<BaseLayout title="Middle Coast - Layout Preview">
  <LayoutSwitcher client:load layouts={layouts} />
</BaseLayout>
```

---

## Environment Setup

### `.env.example`

```bash
# Claude API
ANTHROPIC_API_KEY=your_key_here

# Netlify (optional, for CLI deployment)
NETLIFY_AUTH_TOKEN=your_token_here
NETLIFY_SITE_ID=your_site_id_here
```

### `package.json` Scripts

```json
{
  "name": "middle-coast",
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "generate": "tsx cli/generate.ts",
    "promote": "tsx cli/promote.ts",
    "deploy:preview": "tsx cli/deploy-preview.ts",
    "deploy:prod": "netlify deploy --prod"
  },
  "dependencies": {
    "@anthropic-ai/sdk": "^0.30.0",
    "astro": "^5.0.0",
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "tailwindcss": "^3.4.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/node": "^20.0.0",
    "commander": "^12.0.0",
    "tsx": "^4.7.0",
    "typescript": "^5.3.0"
  }
}
```

---

## Deployment Strategy

### Preview Deployments

```bash
# Deploy preview branch to Netlify
netlify deploy --dir=dist --alias=preview-$(git rev-parse --short HEAD)

# Generates URL like:
# preview-abc123--middle-coast.netlify.app
```

### Production Deployment

```bash
# Build production site
npm run build

# Deploy to production
npm run deploy:prod
```

### Branch Strategy

- `main` - Production site (uses src/layouts/production/)
- `generated-{timestamp}` - Generated layouts (automatic, from CLI)
- `feature/*` - Manual feature work

---

## Development Workflow Example

### Day 1: Generate Initial Layouts

```bash
# 1. Generate layouts from reference
npm run generate -- https://www.mwncapital.com/

# Output:
# ✅ Generated option-1 (Faithful Recreation)
# ✅ Generated option-2 (Warm Emphasis)
# ✅ Generated option-3 (Spacious)
# ✅ Generated option-4 (Bold Hierarchy)

# 2. Review locally
npm run dev
# Visit http://localhost:4321/preview

# 3. Deploy for client review
npm run deploy:preview
# Share URL with client
```

### Day 2: Client Feedback

```bash
# Client says: "I like option-3 but can we make the hero bolder?"

# Option A: Regenerate option-3 with tweaked prompt
npm run generate -- https://www.mwncapital.com/ --variation=3 --override="Make hero section bolder"

# Option B: Manually edit src/layouts/generated/option-3/Hero.tsx
```

### Day 3: Promote to Production

```bash
# Client approves option-3
npm run promote -- option-3

# What happens:
# - Copies option-3/ to production/
# - Updates index.astro if needed
# - Commits changes

# Deploy to production
npm run build
npm run deploy:prod
```

---

<div style="page-break-after: always;"></div>

# Getting Started Guide

This guide will walk you through setting up and running the AI layout generator for the first time.

---

## Prerequisites

- Node.js 18+ installed
- npm or pnpm package manager
- Anthropic API key ([get one here](https://console.anthropic.com/))
- Git
- Code editor (VS Code recommended with GitHub Copilot)

---

## Step 1: Initialize Project

```bash
# Create new Astro project with React + Tailwind
npm create astro@latest middle-coast

# When prompted, select:
# - Template: Empty
# - TypeScript: Yes (Strict)
# - Install dependencies: Yes
# - Initialize git: Yes

cd middle-coast

# Add React integration
npx astro add react

# Add Tailwind integration
npx astro add tailwind
```

---

## Step 2: Install Additional Dependencies

```bash
# AI & CLI tools
npm install @anthropic-ai/sdk commander tsx cheerio

# Dev dependencies
npm install -D @types/node
```

---

## Step 3: Set Up Environment Variables

```bash
# Create .env.local file
touch .env.local

# Add your API key
echo "ANTHROPIC_API_KEY=your_actual_key_here" >> .env.local

# Create example file for reference
cp .env.local .env.example
# Edit .env.example and replace the key with placeholder text
```

**In `.env.example`:**
```bash
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx
NETLIFY_AUTH_TOKEN=optional_for_cli_deployments
NETLIFY_SITE_ID=optional_for_cli_deployments
```

---

## Step 4: Create Project Structure

```bash
# Create directory structure
mkdir -p cli/commands
mkdir -p src/{config,content,layouts/{generated,production},components/ui,lib/{agents/prompts,utils}}

# Create initial files
touch cli/generate.ts
touch cli/commands/{analyze-url.ts,generate-layouts.ts,promote.ts}
touch src/config/site-config.ts
touch src/content/middle-coast.json
touch src/lib/agents/{url-analyzer.ts,layout-generator.ts,variation-engine.ts}
touch src/lib/agents/prompts/{analyze.ts,generate.ts,variations.ts}
touch src/lib/utils/{file-writer.ts,extract-code.ts}
touch src/components/LayoutSwitcher.tsx
```

---

## Step 5: Configure Package.json Scripts

Edit `package.json` and add these scripts:

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "generate": "tsx cli/generate.ts",
    "promote": "tsx cli/commands/promote.ts"
  }
}
```

---

## Step 6: Create Core Configuration Files

### 6.1 Tailwind CSS Configuration (`src/styles/globals.css`)

Tailwind 4.1+ uses CSS-based configuration instead of JavaScript config files. Create your global CSS file:

```css
@import "tailwindcss";

@theme {
  /* Brand Colors */
  --color-charcoal: #1e1f1d;
  --color-soft-white: #f5f4ef;
  --color-copper: #a76d3e;
  --color-deep-olive: #3c4037;
  --color-warm-gray: #7a7f78;

  /* Typography */
  --font-serif: "DM Serif Display", serif;
  --font-sans: "Montserrat", sans-serif;
  --font-alt: "Lora", serif;

  /* Spacing scale (optional - extends default) */
  --spacing-section: 4rem;
}

/* Global styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-sans);
  color: var(--color-charcoal);
  background: var(--color-soft-white);
  line-height: 1.6;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
}

/* Smooth scrolling for anchor links */
html {
  scroll-behavior: smooth;
}
```

**Usage in components:**

```tsx
// Use custom colors with the color- prefix

  Headline
  Body text

```

**Note:** If you need a JavaScript config file for advanced customization, you can still create `tailwind.config.ts`, but it's no longer the recommended approach for Tailwind 4.1+.

### 6.2 TypeScript Config (`tsconfig.json`)

Add these path aliases:

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"],
      "@/components/*": ["./src/components/*"],
      "@/lib/*": ["./src/lib/*"],
      "@/config/*": ["./src/config/*"]
    }
  }
}
```

### 6.3 Site Configuration (`src/config/site-config.ts`)

```typescript
export const MIDDLE_COAST_CONFIG = {
  brand: {
    name: 'Middle Coast',
    tagline: 'Quiet Strength. Real Returns.',
  },
  
  colors: {
    primary: {
      charcoal: '#1E1F1D',
      softWhite: '#F5F4EF',
    },
    accent: {
      copper: '#A76D3E',
    },
    supporting: {
      deepOlive: '#3C4037',
      warmGray: '#7A7F78',
    },
  },
  
  typography: {
    fonts: {
      serif: '"DM Serif Display", serif',
      sans: '"Montserrat", sans-serif',
      alt: '"Lora", serif',
    },
  },
  
  sections: [
    'Hero',
    'About', 
    'Approach',
    'Contact',
  ],
} as const;

export type SectionName = typeof MIDDLE_COAST_CONFIG.sections[number];
```

### 6.4 Content Data (`src/content/middle-coast.json`)

```json
{
  "hero": {
    "headline": "Quiet Strength. Real Returns.",
    "subheadline": "Middle Coast invests in and operates multifamily and mixed-use real estate throughout the Midwest. We build safe, modern, affordable communities that residents are proud to call home.",
    "cta": {
      "text": "Learn More",
      "link": "#about"
    }
  },
  
  "about": {
    "headline": "Building Enduring Value from the Heart of America",
    "body": [
      "Middle Coast is a private real estate investment and operating firm focused on building enduring value through disciplined execution.",
      "Rooted in the Midwest, we blend precision, integrity, and innovation to deliver lasting impact for our investors, lenders, and communities."
    ]
  },
  
  "approach": {
    "headline": "We treat capital like it's our own. Because it is.",
    "subheadline": "Our team blends operational discipline with Midwestern pragmatism. Every project is executed with precision and long-term vision.",
    "pillars": [
      {
        "title": "Trust",
        "description": "Every relationship earned through action"
      },
      {
        "title": "Execution",
        "description": "Precision, discipline, relentless follow-through"
      },
      {
        "title": "Stewardship",
        "description": "Building long-term prosperity, not short-term gains"
      },
      {
        "title": "Pride of Place",
        "description": "Investing in properties that elevate communities"
      }
    ]
  },
  
  "contact": {
    "headline": "Let's Build Together",
    "email": "info@middlecoast.com"
  }
}
```

---

## Step 7: Test the Setup

```bash
# Verify directory structure
ls -la src/layouts/generated  # Should exist (empty for now)
ls -la src/content            # Should have middle-coast.json

# Verify environment
cat .env.local | grep ANTHROPIC  # Should show your key

# Verify dependencies
npm list @anthropic-ai/sdk     # Should be installed
npm list commander             # Should be installed
npm list tsx                   # Should be installed
```

---

## Step 8: Commit Initial Setup

```bash
# Add .env.local to gitignore
echo ".env.local" >> .gitignore

# Commit the base structure
git add .
git commit -m "feat: initial project setup"
```

---

## What's Next?

Now that the foundation is set up, you need to build:

1. **URL Analyzer** - Fetches and analyzes reference URLs
2. **Layout Generator** - Generates React components via Claude
3. **Preview System** - Allows toggling between layouts
4. **Promotion Tool** - Copies selected layout to production

---

## Common Issues & Solutions

### Issue: "Module not found" errors

**Solution:** Make sure all imports use correct extensions:
```typescript
// ✅ Correct
import { analyzeURL } from './commands/analyze-url.js';

// ❌ Wrong (even in TypeScript!)
import { analyzeURL } from './commands/analyze-url';
```

### Issue: "ANTHROPIC_API_KEY is not defined"

**Solution:** Make sure .env.local exists and tsx can read it:
```bash
# Install dotenv-cli
npm install -D dotenv-cli

# Update script in package.json
"generate": "dotenv -e .env.local -- tsx cli/generate.ts"
```

### Issue: Claude returns markdown instead of JSON

**Solution:** Strip markdown code blocks before parsing:
```typescript
let jsonText = responseText.trim();
if (jsonText.startsWith('```')) {
  jsonText = jsonText.replace(/```(?:json)?\n?/g, '').replace(/```\n?$/g, '');
}
const analysis = JSON.parse(jsonText);
```

---

<div style="page-break-after: always;"></div>

# Quick Reference

## Common Commands

```bash
# Development
npm run dev                          # Start dev server
npm run build                        # Build for production
npm run preview                      # Preview production build

# Generation
npm run generate -- <url>            # Generate 4 layouts from URL
npm run promote -- <option-number>   # Promote option to production

# Deployment
npm run deploy:preview               # Deploy preview to Netlify
npm run deploy:prod                  # Deploy production to Netlify
```

---

## File Locations

| What | Where |
|------|-------|
| Generated layouts | `src/layouts/generated/option-{1-4}/` |
| Production layout | `src/layouts/production/` |
| Brand configuration | `src/config/site-config.ts` |
| Site content | `src/content/middle-coast.json` |
| Preview page | `src/pages/preview.astro` |
| Production page | `src/pages/index.astro` |

---

## Variation Styles

1. **Option 1: Faithful** - As close to reference as possible
2. **Option 2: Warm** - More copper/olive, inviting feel
3. **Option 3: Spacious** - 1.5x spacing, airier layout
4. **Option 4: Bold** - Stronger typography, dramatic hierarchy

---

## URLs

- **Local dev:** http://localhost:4321
- **Local preview:** http://localhost:4321/preview
- **Production:** https://middlecoast.com (or your domain)
- **Preview deploy:** https://preview-{hash}--middle-coast.netlify.app

---

## Troubleshooting

### Generation fails
- Check `ANTHROPIC_API_KEY` in `.env.local`
- Verify reference URL is accessible
- Check console for API errors

### Preview shows errors
- Ensure all 4 options are generated
- Check component imports in `preview.astro`
- Verify content in `middle-coast.json`

### Deployment fails
- Run `npm run build` to check for build errors
- Verify Netlify credentials
- Check `dist/` directory exists

---

## Support

- **Documentation:** This file
- **Architecture details:** See "Architecture Overview" section above
- **Setup guide:** See "Getting Started Guide" section above
- **Issues:** [GitHub Issues](your-repo-url/issues)

---

## License

[Add your license here]

```
middle-coast/
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