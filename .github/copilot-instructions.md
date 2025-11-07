# Middle Coast Website - Copilot Instructions

> Project-wide context and guidelines for AI-powered development

---

## Project Context

This is a **static Astro website** for Middle Coast, a Midwest real estate investment firm. The current implementation is a production-ready static site. The aspirational vision (documented in README.md) includes AI-powered layout generation, but this is NOT yet implemented.

### Key Documentation

Read these files to understand the project context:

* **[Product Vision and Goals](../PRODUCT.md)**: High-level overview of current state and aspirational vision
* **[System Architecture and Design](../ARCHITECTURE.md)**: Technical stack, components, and architectural decisions
* **[Contributing Guidelines](../CONTRIBUTING.md)**: Developer workflows, code standards, and best practices
* **[Implementation Roadmap](../ROADMAP.md)**: Path from current static site to AI-powered system

### Technology Stack (Current)

- **Framework:** Astro 5.15.3 (static site generation)
- **Styling:** Tailwind CSS 3.4.18
- **Language:** TypeScript 5.9.3 (strict mode)
- **Content:** Markdown with gray-matter frontmatter
- **Tooling:** Biome (linting/formatting), Astro Check (type validation)

**No AI dependencies currently installed.** See ROADMAP.md for planned additions.

---

## Development Guidelines

### Code Standards

Follow these instruction files for language-specific standards:

* **TypeScript:** `.github/instructions/typescript.instructions.md`
* **Astro:** `.github/instructions/astro.instructions.md`

**Key Principles:**
- Strict TypeScript (no `any`, explicit types)
- Server-first rendering (zero JavaScript by default)
- Semantic HTML with proper accessibility
- Mobile-first responsive design
- Component-based architecture

### File Organization

```
src/
  ├── components/       # Reusable Astro components
  ├── layouts/          # Page layouts and templates
  ├── pages/            # Routes (currently empty)
  └── utils/            # Shared utilities

content/sites/middle-coast/
  ├── config.json       # Site configuration
  └── *.md              # Content files
```

### Common Patterns

**Component Props:**
```typescript
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
```

**Responsive Tailwind:**
```astro
<h1 class="text-4xl md:text-5xl lg:text-7xl">
```

---

## Documentation Maintenance

### When to Update Documentation

If you notice any of the following while working on the code:

1. **Incomplete information** - Documentation missing key details
2. **Conflicting information** - Docs contradict actual implementation
3. **Stale information** - Documentation describes features that don't exist or have changed
4. **Missing architecture decisions** - New patterns not documented in ARCHITECTURE.md

### How to Suggest Updates

When you identify documentation gaps:

1. **Mention it in your response** to the user
2. **Propose specific updates** to the relevant file
3. **Explain the gap** you discovered

Example:
> "I noticed ARCHITECTURE.md doesn't document the theme generation system. I recommend adding a section explaining how `scripts/generate-mockups.mjs` works and its relationship to the Tailwind configuration."

---

## Critical Notes for AI Assistants

### ⚠️ README vs. Reality

**IMPORTANT:** The README.md describes an AI-powered layout generation system (CLI tools, Claude API, React preview system, etc.). **This system does NOT exist in the current codebase.**

**Current reality:**
- Simple static Astro site
- Markdown content management
- Theme variation script (not AI-powered)
- No CLI tools, no AI dependencies, no React

**When working on this project:**
1. ✅ Implement features based on **actual codebase** (see ARCHITECTURE.md)
2. ❌ Don't assume README features exist
3. ✅ Refer to ROADMAP.md for planned future features
4. ❌ Don't import packages that aren't in package.json

### Project Structure Awareness

**Actual structure:**
- `src/components/` has 4 components: Hero, About, InvestmentApproach, Contact
- `src/pages/` is empty (no routes defined yet)
- `src/layouts/` has only Layout.astro
- No `src/lib/` directory exists
- No CLI tools in `cli/` directory

**If asked to implement README features:**
Clarify with the user that these features are aspirational and not yet implemented. Refer to ROADMAP.md for the implementation plan.

---

## Common Tasks

### Adding a New Section

1. Create component in `src/components/NewSection.astro`
2. Define props interface with TypeScript
3. Use Tailwind utility classes for styling
4. Add content to `content/sites/middle-coast/newsection.md`
5. Import and use in layout

### Updating Content

1. Edit markdown files in `content/sites/middle-coast/`
2. Update frontmatter or body content
3. Run `npm run dev` to preview
4. No build step needed for content changes in dev mode

### Creating a New Theme

1. Edit `scripts/generate-mockups.mjs`
2. Add theme to `themes` object with colors and fonts
3. Run `npm run generate-mockups`
4. Copy generated config to `tailwind.config.mjs`

---

## Error Prevention

### Common Mistakes to Avoid

1. **Assuming features from README exist**
   - ❌ Importing from `cli/generate.ts` (doesn't exist)
   - ❌ Using `@anthropic-ai/sdk` (not installed)
   - ❌ Referencing React components that don't exist

2. **TypeScript errors**
   - ❌ Using `any` type
   - ❌ Missing props interfaces
   - ❌ Importing non-existent files

3. **Astro-specific issues**
   - ❌ Adding `client:load` without React installed
   - ❌ Using wrong file extensions in imports
   - ❌ Not following frontmatter → template structure

### Validation Checklist

Before suggesting code changes:
- [ ] Check file exists in codebase (don't assume from README)
- [ ] Verify dependencies in package.json
- [ ] Ensure TypeScript types are correct
- [ ] Follow Astro component structure
- [ ] Use existing Tailwind classes from config

---

## Getting Context

### Before Making Changes

1. **Read relevant documentation:**
   - PRODUCT.md for product context
   - ARCHITECTURE.md for technical details
   - CONTRIBUTING.md for code standards
   - ROADMAP.md for future plans

2. **Check actual files:**
   - `package.json` for dependencies
   - `src/` for existing components
   - `content/` for content structure

3. **Validate assumptions:**
   - Don't assume README features are implemented
   - Check ROADMAP.md phase status

### When Uncertain

If you're unsure whether a feature exists:
1. Check ROADMAP.md for implementation status
2. Search codebase for relevant imports/files
3. Ask the user for clarification

---

## Quality Standards

### Code Quality

- **TypeScript:** Strict mode, no `any`, explicit types
- **Components:** Single responsibility, focused, reusable
- **Styling:** Tailwind utilities, semantic HTML, mobile-first
- **Performance:** Zero JavaScript by default, optimized builds

### Documentation Quality

- **Accuracy:** Reflect actual implementation, not aspirational features
- **Completeness:** Include all necessary context for developers
- **Clarity:** Use examples, avoid jargon
- **Maintenance:** Update when code changes

---

## Special Considerations

### Multi-Site Architecture

The `content/sites/` structure suggests this could become a template system for multiple clients. Keep this in mind when:
- Creating reusable components
- Designing configuration systems
- Structuring content schemas

### Future AI Integration

When working on features that will eventually integrate with AI:
- Keep concerns separated (content, presentation, logic)
- Use TypeScript interfaces that could be auto-generated later
- Document assumptions and constraints

---

## Questions?

If you encounter scenarios not covered by this documentation or the instruction files, suggest updates to keep this document helpful and current.

**Remember:** This is a living document. Update it when you discover gaps or inaccuracies.
