# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

AI-powered static site generator for Middle Coast, a Midwest real estate investment firm. The project uses Claude API to analyze reference websites and generate React/TypeScript layouts with Tailwind CSS, built on Astro.

**Core Workflow:**
1. Analyze reference URL (extract structure, sections, patterns)
2. Generate React components using Claude API
3. Write components to `src/layouts/production/`
4. Deploy static site

## Essential Commands

### Development
```bash
npm run dev                    # Start dev server (localhost:4321)
npm run build                  # Type-check and build for production
npm run preview                # Preview production build
```

### Testing (TDD Workflow)
```bash
npm test                       # Run tests in watch mode
npm run test:run               # Run tests once
npm run test:tdd               # TDD mode with verbose output
npm run test:ui                # Launch Vitest UI
npm run test:coverage          # Generate coverage report
```

### Code Quality
```bash
npm run lint                   # Lint and fix with Biome
npm run lint:fix               # Lint and fix all issues
```

### AI Layout Generation
```bash
npm run generate -- <url>      # Generate layout from reference URL
                               # Example: npm run generate -- https://www.mwncapital.com/
```

### Running Single Tests
```bash
# Watch mode for specific file
npx vitest src/lib/agents/layout-generator.test.ts

# Run specific test once
npx vitest run src/lib/agents/layout-generator.test.ts

# Run tests matching pattern
npx vitest --grep "should parse components"
```

## Architecture Overview

### Tech Stack
- **Framework:** Astro 5 (static site generation)
- **UI:** React 19 + TypeScript
- **Styling:** Tailwind CSS 4
- **AI:** Claude API (Anthropic SDK)
- **Testing:** Vitest + happy-dom
- **Linting:** Biome
- **Package Manager:** npm

### Key Directories
```
cli/                           # CLI tools for layout generation
├── generate.ts                # Main entry point
└── commands/
    ├── analyze-url.ts         # URL analyzer (Cheerio + Claude)
    └── generate-layouts.ts    # Layout generator orchestrator

src/
├── config/
│   └── site-config.ts         # Brand config (colors, fonts, sections)
├── content/
│   └── middle-coast.json      # All site content (centralized)
├── lib/
│   ├── agents/                # AI agent logic
│   │   ├── layout-generator.ts        # Claude API integration
│   │   ├── url-analyzer.ts            # URL analysis agent
│   │   ├── variation-engine.ts        # Future: multi-variation support
│   │   └── prompts/                   # Prompt templates
│   │       ├── analyze.ts
│   │       ├── generate.ts
│   │       └── variations.ts
│   └── utils/
│       └── file-writer.ts     # Writes generated components to disk
└── layouts/
    └── production/            # Generated layout components live here
```

### AI Generation Pipeline

**Input:** Reference URL (e.g., `https://www.mwncapital.com/`)

**Step 1: URL Analysis** (`cli/commands/analyze-url.ts`)
- Fetches HTML with `fetch()`
- Extracts headings, sections, content with Cheerio
- Sends to Claude Sonnet 4 for structural analysis
- Returns JSON with `sections[]`, `layoutPatterns[]`, `colorUsage`

**Step 2: Layout Generation** (`src/lib/agents/layout-generator.ts`)
- Builds comprehensive prompt using `prompts/generate.ts`
- Includes URL analysis, Middle Coast content, brand config
- Calls Claude API (Sonnet 3.5, 8K tokens)
- Parses response using `parseComponentsFromResponse()` to extract `<Component>` XML tags
- Returns map of `{ filename: code }`

**Step 3: File Writing** (`src/lib/utils/file-writer.ts`)
- Creates `src/layouts/production/` directory
- Writes `.tsx` files to disk
- Validates filenames (prevents directory traversal)

### Component Extraction Format

Claude API returns components wrapped in XML tags:
```xml
<Component name="Hero">
export default function Hero() {
  return <div>...</div>
}
</Component>

<Component name="About">
interface AboutProps { ... }
export default function About() { ... }
</Component>
```

The parser (`parseComponentsFromResponse`) extracts these into `Hero.tsx`, `About.tsx`, etc.

### Brand Configuration

Middle Coast brand is defined in `src/config/site-config.ts`:

**Colors:**
- Primary: Charcoal (#1E1F1D), Soft White (#F5F4EF)
- Accent: Copper (#A76D3E)
- Supporting: Deep Olive (#3C4037), Warm Gray (#7A7F78)

**Typography:**
- Serif: DM Serif Display (headlines)
- Sans: Montserrat (body)
- Alt: Lora (quotes/subheads)

**Sections:** Hero, About, Approach, Contact

### Content Architecture

All site content lives in `src/content/middle-coast.json` as centralized JSON. This includes:
- Hero headline, subheadline, CTA
- About section text
- Approach pillars (Trust, Execution, Stewardship, Pride of Place)
- Contact info

The generation prompt injects this content so Claude generates components that use Middle Coast's actual copy.

## Development Patterns

### Test-Driven Development (TDD)
This project uses Vitest with TDD workflow:

1. Write failing test first
2. Run `npm run test:tdd` (watch mode with verbose output)
3. Implement minimal code to pass
4. Refactor
5. Repeat

**Test file location:** Place `.test.ts` files alongside source files (e.g., `layout-generator.test.ts` next to `layout-generator.ts`)

**Coverage thresholds:** 80% statements/functions, 70% branches (configured in `vitest.config.ts`)

### Module System
Uses ES modules with `.js` extensions in imports (even for `.ts` files):
```typescript
// ✅ Correct
import { generateLayout } from './layout-generator.js';

// ❌ Wrong (will cause module resolution errors)
import { generateLayout } from './layout-generator';
```

### Environment Variables
Required: `ANTHROPIC_API_KEY` in `.env.local`

Load with `dotenv` or set in shell before running `npm run generate`.

### Error Handling
- All async functions should wrap Claude API calls in try/catch
- Throw descriptive errors with context (e.g., `"Layout generation failed: ${error.message}"`)
- Log progress with console statements (this is a CLI tool, logging is expected)

## Common Tasks

### Regenerate Layout
```bash
# Delete old layout
rm -rf src/layouts/production/*

# Generate fresh layout
npm run generate -- https://www.mwncapital.com/

# View locally
npm run dev
```

### Debug Claude API Response
The generator logs response length and extracted component count. If extraction fails:
1. Check `parseComponentsFromResponse()` in `layout-generator.ts`
2. Verify Claude returns `<Component name="...">` tags
3. Increase `max_tokens` if response is truncated

### Update Prompt Template
Edit `src/lib/agents/prompts/generate.ts` to change how Claude generates components.

Key sections:
- Component structure requirements
- Tailwind usage guidelines
- Middle Coast brand application

### Add New Section
1. Add section to `src/config/site-config.ts` sections array
2. Add content to `src/content/middle-coast.json`
3. Update prompt in `prompts/generate.ts` to reference new section
4. Regenerate layout

## Troubleshooting

### "Module not found" errors
Ensure imports use `.js` extensions (ES module requirement)

### "No valid components extracted"
Claude response format doesn't match expected XML tags. Check:
- Prompt template in `prompts/generate.ts`
- Response parsing in `layout-generator.ts:parseComponentsFromResponse()`

### Type errors during build
Run `npm run build` to see Astro type-check output. Common issues:
- Missing React imports
- Incorrect Astro component syntax

### Tests failing
Run `npm run test:coverage` to see what's not covered. Check:
- Mock setup in test files
- Async/await usage
- Test isolation (each test should be independent)

## Future Enhancements

**Phase 2 (Multi-Variation Support):**
- Generate 4 layout variations (faithful, warm, spacious, bold)
- Preview page with layout switcher
- Promote command to copy selected option to production

**Phase 3 (Template System):**
- Abstract into reusable package
- Support multiple frameworks (Next.js, Remix)
- Template marketplace
