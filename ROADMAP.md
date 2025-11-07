# Middle Coast Website - Implementation Roadmap

> Bridging the gap between current static site and AI-powered layout generation vision

---

## Overview

The README.md describes an ambitious AI-powered layout generation system. This roadmap outlines the practical steps to get there from the current simple static site.

**Current State:** ✅ Phase 1 (Static Site) - COMPLETE  
**Next Milestone:** 🚧 Phase 2 (AI Foundation) - NOT STARTED  
**Future Vision:** 📋 Phase 3-4 (Full AI System) - PLANNED

---

## Phase 1: Static Site Foundation ✅ COMPLETE

**Status:** Production-ready static site

**Implemented:**
- ✅ Astro 5.15 setup with TypeScript strict mode
- ✅ Tailwind CSS integration
- ✅ Core components (Hero, About, InvestmentApproach, Contact)
- ✅ Markdown content management
- ✅ Theme generation system (3 variations)
- ✅ Development tooling (Biome, VS Code config)
- ✅ AI assistant instructions (TypeScript, Astro guidelines)

**Deliverables:**
- Deployable static site
- Content editing workflow
- Theme variation generator
- Developer documentation

---

## Phase 2: AI Layout Generation Foundation 🚧 NOT STARTED

**Goal:** Build infrastructure for AI-powered layout generation without full preview system

**Estimated Effort:** 2-3 weeks

### 2.1 Dependencies & Environment Setup

**Tasks:**
- [ ] Add `@anthropic-ai/sdk` dependency
- [ ] Add `commander` for CLI tool framework
- [ ] Add `tsx` for TypeScript execution
- [ ] Add `cheerio` for HTML parsing
- [ ] Create `.env.local` file for `ANTHROPIC_API_KEY`
- [ ] Add `.env.example` with placeholder values
- [ ] Update `.gitignore` to exclude `.env.local`

**Acceptance Criteria:**
- `npm install` succeeds with new dependencies
- Environment variables loadable in Node.js scripts

### 2.2 Content Collections Migration

**Tasks:**
- [ ] Create `src/content.config.ts`
- [ ] Define collection schemas for `about`, `approach`
- [ ] Migrate content from `content/sites/middle-coast/` to `src/content/middle-coast/`
- [ ] Update components to use `getCollection()` and `getEntry()`
- [ ] Run `astro sync` to generate types
- [ ] Validate type safety across components

**Acceptance Criteria:**
- Content loaded via Content Collections API
- TypeScript types auto-generated for content
- All components render correctly with new content source

### 2.3 URL Analysis CLI Tool

**Tasks:**
- [ ] Create `cli/commands/analyze-url.ts`
- [ ] Implement URL fetching with error handling
- [ ] Parse HTML with Cheerio
- [ ] Extract structure, headings, sections
- [ ] Create Claude prompt for URL analysis
- [ ] Parse Claude response to structured JSON
- [ ] Save analysis results to file

**Acceptance Criteria:**
```bash
npm run analyze -- https://example.com
# → Outputs analysis.json with structured data
```

### 2.4 AI Agent System

**Tasks:**
- [ ] Create `src/lib/agents/url-analyzer.ts`
- [ ] Create `src/lib/agents/layout-generator.ts`
- [ ] Create `src/lib/agents/prompts/analyze.ts`
- [ ] Create `src/lib/agents/prompts/generate.ts`
- [ ] Implement Claude API integration
- [ ] Add retry logic and error handling
- [ ] Create rate limiting for API calls

**Acceptance Criteria:**
- Agents can analyze URLs and return structured data
- Claude API integration working with proper error handling
- Prompts produce consistent, parseable outputs

---

## Phase 3: Layout Generation & Preview System 📋 PLANNED

**Goal:** Generate 4 layout variations and enable client preview

**Estimated Effort:** 3-4 weeks

### 3.1 Layout Generation

**Tasks:**
- [ ] Create `cli/generate.ts` main CLI entry point
- [ ] Implement variation engine (4 design strategies)
- [ ] Generate React + TypeScript component code
- [ ] Write generated components to `src/layouts/generated/option-{1-4}/`
- [ ] Apply Middle Coast branding to all variations
- [ ] Validate generated code compiles

**Acceptance Criteria:**
```bash
npm run generate -- https://www.mwncapital.com/
# → Creates src/layouts/generated/option-{1-4}/
# → Each option contains Layout.tsx, Hero.tsx, etc.
```

### 3.2 React Integration

**Tasks:**
- [ ] Add `@astrojs/react` integration
- [ ] Add React 18 and ReactDOM dependencies
- [ ] Create `src/components/LayoutSwitcher.tsx` (React)
- [ ] Implement state management for active layout
- [ ] Add smooth transitions between layouts
- [ ] Style switcher UI (fixed position, professional design)

**Acceptance Criteria:**
- React islands working in Astro
- Layout switcher toggles between 4 options smoothly

### 3.3 Preview Page

**Tasks:**
- [ ] Create `src/pages/preview.astro`
- [ ] Import all 4 generated layout options
- [ ] Integrate `<LayoutSwitcher>` component
- [ ] Add layout labels and descriptions
- [ ] Ensure all layouts use same content data
- [ ] Test responsive behavior

**Acceptance Criteria:**
- `/preview` route displays all 4 layouts
- Can toggle between layouts in browser
- Mobile and desktop layouts work correctly

---

## Phase 4: Production Promotion & Deployment 📋 PLANNED

**Goal:** Select layout and deploy to production

**Estimated Effort:** 1-2 weeks

### 4.1 Promotion Tool

**Tasks:**
- [ ] Create `cli/commands/promote.ts`
- [ ] Implement file copying from `generated/option-X/` to `production/`
- [ ] Update `src/pages/index.astro` to use production layout
- [ ] Create git commit with promotion details
- [ ] Add validation to ensure option exists

**Acceptance Criteria:**
```bash
npm run promote -- option-3
# → Copies option-3 to production/
# → Updates index.astro
# → Creates git commit
```

### 4.2 Deployment Automation

**Tasks:**
- [ ] Set up Netlify deployment
- [ ] Create preview deployment workflow
- [ ] Create production deployment workflow
- [ ] Add environment variable management
- [ ] Configure custom domain (if applicable)

**Acceptance Criteria:**
- Preview deploys on push to any branch
- Production deploys on promotion to `main`
- Preview URLs shareable with clients

### 4.3 Asset Management

**Tasks:**
- [ ] Implement image downloading from reference URLs
- [ ] Store images in `public/migrated-assets/`
- [ ] Update image references in generated layouts
- [ ] Add Astro Image optimization
- [ ] Generate WebP variants

**Acceptance Criteria:**
- Generated layouts include properly referenced images
- Images optimized via Astro Image component

---

## Phase 5: Refinement & Scale 📋 FUTURE

**Goal:** Production-hardened system ready for multiple clients

**Estimated Effort:** Ongoing

### Enhancements

- [ ] Screenshot generation for each layout
- [ ] Regenerate specific sections only
- [ ] Custom variation parameters via CLI flags
- [ ] A/B testing integration
- [ ] Analytics dashboard
- [ ] Multi-client management UI

### Productization

- [ ] Abstract into npm package
- [ ] Support multiple frameworks (Next.js, Remix)
- [ ] Template marketplace
- [ ] SaaS offering for design agencies

---

## Dependencies Between Phases

```
Phase 1 (Complete)
    ↓
Phase 2.1 (Dependencies) ← Must complete first
    ↓
Phase 2.2 (Content Collections) + Phase 2.3 (URL Analysis)
    ↓
Phase 2.4 (AI Agents)
    ↓
Phase 3.1 (Layout Generation) ← Depends on Phase 2
    ↓
Phase 3.2 (React) + Phase 3.3 (Preview)
    ↓
Phase 4 (Production) ← Depends on Phase 3
    ↓
Phase 5 (Future) ← Depends on Phase 4
```

---

## Decision Points

### Before Phase 2

**Decision:** Invest in AI system or focus on manual theming?

**Considerations:**
- AI system: Higher upfront cost, scalable for multiple clients
- Manual theming: Faster to market, lower technical complexity

**Recommendation:** Start Phase 2 if targeting 5+ client sites

### Before Phase 3

**Decision:** React vs. vanilla JavaScript for layout switcher?

**Considerations:**
- React: More robust, better state management
- Vanilla JS: Lighter weight, no build complexity

**Current Choice:** React (already in README spec)

### Before Phase 4

**Decision:** Manual promotion vs. automated approval workflow?

**Considerations:**
- Manual: Simpler, developer-controlled
- Automated: Client can select layout directly

**Current Choice:** Manual promotion (CLI tool)

---

## Success Metrics by Phase

### Phase 2
- [ ] URL analysis accuracy: 90%+
- [ ] Claude API response time: <30s
- [ ] Content Collections migration: 100% type-safe

### Phase 3
- [ ] Layout generation time: <2 minutes
- [ ] Generated code compiles without errors: 100%
- [ ] Client preview load time: <3s

### Phase 4
- [ ] Promotion time: <1 minute
- [ ] Deployment success rate: 99%+
- [ ] Zero-downtime deployments

---

## Open Questions

1. **Content Portability:** How to handle content that doesn't map cleanly to generated layouts?
   - **Proposal:** Manual content mapping configuration file

2. **Brand Consistency:** How to ensure generated layouts match brand guidelines?
   - **Proposal:** Brand guardrails in Claude prompts + post-generation validation

3. **Client Feedback Loop:** How do clients provide feedback on generated layouts?
   - **Proposal:** Phase 5 - Comments/annotations system

4. **Versioning:** How to handle regeneration after client has customized a layout?
   - **Proposal:** Git branches for each generation iteration

---

## Related Documentation

- [PRODUCT.md](PRODUCT.md) - Product vision and current state
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [CONTRIBUTING.md](CONTRIBUTING.md) - Developer guidelines
- [README.md](README.md) - Comprehensive documentation (includes full vision)
