<!-- Based on: https://github.com/github/awesome-copilot/blob/main/instructions/astro.instructions.md -->
---
applyTo: "**/*.astro,**/*.ts,**/*.js,**/*.md,**/*.mdx"
description: "Astro development standards and best practices for the Middle Coast website"
---

# Astro Development Guidelines

## Project Context
- Astro 5.x with Islands Architecture and Content Layer API
- TypeScript for type safety and better DX with auto-generated types
- Content-driven website for real estate investment firm
- Server-first rendering with selective client-side hydration
- Static site generation (SSG) by default
- Enhanced performance with modern content loading and build optimizations

## Development Standards

### Architecture
- Embrace the Islands Architecture: server-render by default, hydrate selectively
- Organize content with Content Collections for type-safe Markdown management
- Structure projects by feature or content type for scalability
- Use component-based architecture with clear separation of concerns
- Implement progressive enhancement patterns
- Follow Multi-Page App (MPA) approach over Single-Page App (SPA) patterns

### TypeScript Integration
- Configure `tsconfig.json` with recommended settings (extends "astro/tsconfigs/strict")
- Types auto-generated in `.astro/types.d.ts`
- Run `astro sync` to generate/update type definitions
- Define component props with TypeScript interfaces
- Leverage auto-generated types for content collections

### Component Design
- Use `.astro` components for static, server-rendered content
- Import framework components only when interactivity is needed
- Follow Astro's component script structure: frontmatter at top, template below
- Use meaningful component names following PascalCase convention
- Keep components focused and composable
- Implement proper prop validation and default values

### Content Collections
- Define collections using Content Layer API in `src/content.config.ts`
- Use `glob()` loader for file-based content management
- Leverage enhanced performance and scalability with the new loading system
- Use type-safe queries with `getCollection()` and `getEntry()`
- Structure content with frontmatter validation and auto-generated types

### Performance Optimization
- Default to zero JavaScript - only add interactivity where needed
- Use client directives strategically (`client:load`, `client:idle`, `client:visible`)
- Implement lazy loading for images and components
- Optimize static assets with Astro's built-in optimization
- Leverage Content Layer API for faster content loading and builds
- Minimize bundle size by avoiding unnecessary client-side JavaScript

### Styling with Tailwind CSS
- Use Tailwind utility classes for consistent styling
- Follow mobile-first responsive design principles
- Ensure accessibility with semantic HTML and proper ARIA attributes
- Use Tailwind's design system for consistent spacing, colors, and typography
- Implement component-level styles when Tailwind utilities aren't sufficient

### SEO and Meta Management
- Use proper meta tags for each page
- Implement Open Graph and Twitter Card metadata
- Use semantic HTML structure for better accessibility and SEO
- Optimize page titles and descriptions for search engines
- Generate proper heading hierarchy (h1, h2, h3, etc.)

### Image Optimization
- Use Astro's `<Image />` component for automatic optimization
- Implement responsive images with proper srcset generation
- Provide proper alt text for accessibility
- Lazy load images below the fold
- Optimize images at build time for better performance

### Data Fetching
- Fetch data at build time in component frontmatter
- Use dynamic imports for conditional data loading
- Implement proper error handling for external API calls
- Handle loading states and fallbacks appropriately

## Key Astro v5.0 Features
- Use `<ClientRouter />` for view transitions (replaces `<ViewTransitions />`)
- Leverage Content Layer API with `glob()` and `file()` loaders
- Auto-generated types in `.astro/types.d.ts` (run `astro sync`)
- Enhanced performance with modern content loading

## Implementation Guidelines

### Development Workflow
1. Use TypeScript template for new components
2. Configure Content Layer API with appropriate loaders
3. Set up TypeScript with `astro sync` for type generation
4. Create layout components with Islands Architecture
5. Implement content pages with SEO and performance optimization

### Astro-Specific Best Practices
- **Islands Architecture**: Server-first with selective hydration using client directives
- **Content Layer API**: Use `glob()` loaders for scalable content management
- **Zero JavaScript**: Default to static rendering, add interactivity only when needed
- **Type Safety**: Leverage auto-generated types from Content Collections
- **Performance**: Optimize with built-in image optimization and minimal client bundles