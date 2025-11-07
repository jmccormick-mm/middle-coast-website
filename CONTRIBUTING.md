# Contributing to Middle Coast Website

> Developer guidelines, workflows, and best practices

---

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Git
- VS Code (recommended) with Astro extension

### Initial Setup

```bash
# Clone repository
git clone <repo-url>
cd middle-coast-website

# Install dependencies
npm install

# Install recommended VS Code extensions
# (VS Code will prompt automatically)

# Start development server
npm run dev
```

---

## Development Workflow

### Standard Development Loop

1. **Create feature branch** (if applicable)
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Start dev server**
   ```bash
   npm run dev
   # → http://localhost:4321
   ```

3. **Make changes**
   - Edit components in `src/components/`
   - Update content in `content/sites/middle-coast/`
   - Modify styles via Tailwind classes

4. **Validate changes**
   ```bash
   npm run build  # Includes type checking
   ```

5. **Commit with descriptive message**
   ```bash
   git add .
   git commit -m "feat: add investor testimonials section"
   ```

### Content Updates

**Editing Content:**

1. Open markdown files in `content/sites/middle-coast/`
2. Edit frontmatter or body content
3. Save and preview in dev server
4. Commit changes

**Updating Site Configuration:**

```bash
# Edit content/sites/middle-coast/config.json
{
  "name": "Middle Coast",
  "tagline": "Updated tagline",
  "colors": { ... }
}
```

---

## Code Standards

### TypeScript Guidelines

Follow `.github/instructions/typescript.instructions.md` for detailed standards. Key points:

**Naming Conventions:**
- PascalCase: Classes, interfaces, types
- camelCase: Variables, functions, properties
- kebab-case: Filenames (`user-profile.ts`)

**Type Safety:**
- Avoid `any` - use `unknown` with type guards
- Define interfaces for component props
- No implicit `any` allowed (strict mode)

**Example Component Props:**
```typescript
interface Props {
  title: string;
  description?: string;
  items: Array<{ id: string; name: string }>;
}

const { title, description, items } = Astro.props;
```

### Astro Guidelines

Follow `.github/instructions/astro.instructions.md` for detailed standards. Key points:

**Component Structure:**
```astro
---
// 1. Imports
import Layout from '../layouts/Layout.astro';

// 2. Props interface
interface Props {
  title: string;
}

// 3. Props destructuring
const { title } = Astro.props;

// 4. Data fetching / logic
const data = await fetchData();
---

<!-- 5. Template (semantic HTML) -->
<section class="py-24 px-6">
  <h2>{title}</h2>
  <!-- ... -->
</section>
```

**Component Design Principles:**
- Server-render by default (zero JavaScript)
- Use `.astro` for static content
- Keep components focused and composable
- Semantic HTML with proper ARIA attributes

### Tailwind CSS Standards

**Utility-First Approach:**
```astro
<!-- ✅ Good: Utility classes -->
<div class="max-w-4xl mx-auto py-24 px-6">

<!-- ❌ Avoid: Custom CSS unless necessary -->
<div class="custom-container">
```

**Responsive Design:**
```astro
<!-- Mobile-first: base → md → lg -->
<h1 class="text-4xl md:text-5xl lg:text-7xl">
  <!-- Scales from 2.25rem → 3rem → 4.5rem -->
</h1>
```

**Semantic Color Names:**
```astro
<!-- ✅ Use design token names from config -->
<div class="bg-charcoal text-soft-white">

<!-- ❌ Avoid raw hex colors in markup -->
<div class="bg-[#1E1F1D]">
```

---

## File Organization

### Where to Put New Code

**Components:**
- `src/components/` - Reusable Astro components
- PascalCase naming (e.g., `HeroSection.astro`)
- Group related components in subdirectories if needed

**Layouts:**
- `src/layouts/` - Page layouts and templates
- Use for shared HTML structure (head, body, nav, footer)

**Pages:**
- `src/pages/` - Currently empty (future routes)
- Astro auto-generates routes from file structure

**Content:**
- `content/sites/<site-name>/` - Markdown content
- `config.json` - Site configuration
- `*.md` - Content files with frontmatter

**Utilities:**
- `src/utils/` - Shared TypeScript utilities
- Pure functions, helpers, constants

---

## Testing

**Current State:** No automated tests implemented

**Expected Standards (future):**
- Unit tests for utilities (`*.test.ts`)
- Component integration tests
- Run tests before committing

**Manual Testing Checklist:**
1. ✅ `npm run build` succeeds without errors
2. ✅ `npm run preview` - site works in production build
3. ✅ Test on mobile viewport (responsive design)
4. ✅ Check browser console for errors
5. ✅ Validate all links work

---

## Formatting & Linting

**Auto-Format on Save:** Enabled in VS Code (see `.vscode/settings.json`)

**Manual Format:**
```bash
# TypeScript/JavaScript (Biome)
npx @biomejs/biome check ./src --write

# Astro files
# (Auto-formatted by Astro extension)
```

**Type Checking:**
```bash
npm run build  # Includes astro check
# Or separately:
npx astro check
```

---

## Git Workflow

### Branch Strategy

**Current:** Direct commits to `main` (small team)

**Recommended (scaling):**
- `main` - Production-ready code
- `feature/<name>` - New features
- `fix/<name>` - Bug fixes
- `content/<name>` - Content updates

### Commit Messages

**Format:** `<type>: <description>`

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Formatting, no code change
- `refactor:` - Code restructuring
- `content:` - Content updates

**Examples:**
```bash
git commit -m "feat: add investor portal login page"
git commit -m "fix: correct mobile menu alignment"
git commit -m "content: update Q4 performance data"
git commit -m "docs: clarify content editing workflow"
```

---

## Deployment

**Current Process:** Manual deployment (no CI/CD)

**Build for Production:**
```bash
npm run build
# → Outputs to dist/
# → Deploy dist/ to hosting provider
```

**Hosting Options:**
- Netlify: Drag & drop `dist/` folder
- Vercel: Connect git repository
- AWS S3: Upload to bucket, enable static hosting

**Future:** Automated deployment on push to `main`

---

## Common Tasks

### Adding a New Section Component

1. Create `src/components/NewSection.astro`
2. Define props interface
3. Implement component with Tailwind
4. Add content to `content/sites/middle-coast/newsection.md`
5. Import and use in page layout

### Updating Brand Colors

1. Edit `content/sites/middle-coast/config.json`
2. Update `colors` object
3. Run `npm run generate-mockups` to regenerate theme configs
4. Copy desired theme config if needed

### Adding a New Theme Variation

1. Edit `scripts/generate-mockups.mjs`
2. Add new theme to `themes` object:
   ```javascript
   newTheme: {
     name: 'New Theme',
     colors: { primary: '#...', ... },
     fonts: { heading: '...', body: '...' }
   }
   ```
3. Run `npm run generate-mockups`

---

## AI Assistant Guidelines

This project includes comprehensive instructions for AI coding assistants:

**Instruction Files:**
- `.github/instructions/astro.instructions.md` - Astro-specific guidelines
- `.github/instructions/typescript.instructions.md` - TypeScript standards
- `.github/copilot-instructions.md` - High-level project context

**When to Update:**
If you notice AI assistants making repeated mistakes or missing context, update the relevant instruction file.

---

## Getting Help

**Documentation:**
- [PRODUCT.md](PRODUCT.md) - Product overview
- [ARCHITECTURE.md](ARCHITECTURE.md) - Technical architecture
- [ROADMAP.md](ROADMAP.md) - Future plans
- [README.md](README.md) - Comprehensive guide

**External Resources:**
- [Astro Docs](https://docs.astro.build)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

**Issues:** Open GitHub issue for bugs or feature requests

---

## Code Review Checklist

Before requesting review (or self-review):

- [ ] Code follows TypeScript and Astro guidelines
- [ ] No TypeScript errors (`npm run build` succeeds)
- [ ] Components use semantic HTML
- [ ] Responsive design tested (mobile, tablet, desktop)
- [ ] No console errors or warnings
- [ ] Commit messages are descriptive
- [ ] Documentation updated if needed (ARCHITECTURE.md, etc.)
- [ ] No hardcoded values that should be in config
