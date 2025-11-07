# Middle Coast Website - Product Overview

> Static investor website for a Midwest real estate investment firm, built with Astro for simplicity and future extensibility.

---

## Current Product State

### What It Is

Middle Coast Website is a **content-driven static website** designed to showcase Middle Coast, a Midwest-focused real estate investment firm. The site presents the firm's investment philosophy, approach, and provides a way for potential investors to connect.

**Technology Foundation:**
- Astro 5.15.3 (static site generation)
- Tailwind CSS 3.4.18 (styling)
- TypeScript 5.9.3 (type safety)
- Markdown-based content management

**Current Features:**
1. **Four-Section Site**: Hero, About, Investment Approach, Contact
2. **Theme Generation System**: Script to generate multiple visual themes (Professional, Modern, Elegant)
3. **Markdown Content Management**: Easy-to-edit content files in `content/sites/middle-coast/`
4. **Responsive Design**: Mobile-first Tailwind CSS implementation
5. **Calendly Integration**: Direct scheduling integration for investor meetings

### Target Audience

**Primary Users:**
- Potential real estate investors seeking Midwest opportunities
- Institutional partners evaluating Middle Coast as an investment partner
- Industry professionals researching Midwest real estate trends

**Geographic Focus:**
- Midwest United States markets
- Secondary and tertiary cities with strong fundamentals

---

## Aspirational Vision

The README.md documents an ambitious **AI-powered layout generation system** that would enable:

1. **URL Analysis**: Analyze reference websites to extract design patterns
2. **Automated Layout Generation**: Generate 4 design variations using Claude AI
3. **Preview System**: Toggle between layouts with visual switcher
4. **Production Promotion**: Select and deploy chosen layout

**This system is NOT currently implemented.** See [ROADMAP.md](ROADMAP.md) for the implementation path from current state to this vision.

---

## User Workflows

### Current Workflows

**Content Editor Workflow:**
1. Edit markdown files in `content/sites/middle-coast/`
2. Update `config.json` for brand settings (colors, fonts, contact info)
3. Run `npm run dev` to preview changes locally
4. Commit changes to git

**Developer Workflow:**
1. `npm install` - Install dependencies
2. `npm run dev` - Start dev server (localhost:4321)
3. Edit components in `src/components/`
4. `npm run build` - Build for production
5. Deploy `dist/` directory to hosting

**Theme Designer Workflow:**
1. `npm run generate-mockups` - Generate theme variations
2. Copy desired `mockups/middle-coast/tailwind.<theme>.mjs` to root `tailwind.config.mjs`
3. Preview with `npm run dev`
4. Commit chosen theme configuration

### Future Workflows (Aspirational)

See [ROADMAP.md](ROADMAP.md) for planned AI-powered design generation workflows.

---

## Product Values

### Simplicity First
- Minimal dependencies (Astro, Tailwind, TypeScript only)
- Zero client-side JavaScript by default
- Markdown for content = non-technical editors can update

### Performance
- Static site generation = fast page loads
- Optimized assets via Astro's built-in optimization
- Lighthouse scores: 95+ across all metrics

### Extensibility
- Multi-site architecture (`content/sites/`) allows managing multiple clients
- Component-based design enables reusability
- TypeScript provides safe refactoring

### Content-First
- Content separated from presentation
- Structured frontmatter for metadata
- Easy to migrate content between designs

---

## Key Differentiators

1. **Multi-Site Template System**: Not just one site—architecture supports multiple client sites from single codebase
2. **Theme Generation**: Automated theme variation generation for rapid client preview
3. **AI-Ready Architecture**: Foundation prepared for future AI-powered features (see ROADMAP.md)
4. **Developer Experience**: Strict TypeScript, Biome formatting, comprehensive instructions for AI assistants

---

## Success Metrics

**Current (Static Site):**
- Build time: <10 seconds
- Page load time: <1 second
- Lighthouse performance: 95+
- Zero runtime errors

**Future (with AI Features):**
- Layout generation time: <2 minutes per reference URL
- Design variation quality: 80%+ client approval rate
- Migration from Notion: 90%+ content accuracy

---

## Related Documentation

- **[ARCHITECTURE.md](ARCHITECTURE.md)** - Technical architecture and implementation details
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Developer guidelines and workflows
- **[ROADMAP.md](ROADMAP.md)** - Path from current state to AI-powered vision
- **[README.md](README.md)** - Comprehensive project documentation (includes aspirational vision)

---

## Questions or Feedback

This product documentation should evolve with the project. If you notice gaps or inaccuracies while working on the codebase, please update this file to reflect the current reality.
