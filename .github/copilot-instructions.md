# Middle Coast Website - GitHub Copilot Instructions

This is a static investor website for Middle Coast, a Midwest real estate investment firm. The project is built with Astro 5.x for simplicity, performance, and future extensibility.

## Project Overview

**Technology Stack:**
- Astro 5.x with Islands Architecture
- TypeScript for type safety
- Tailwind CSS for styling
- Content Collections for structured content
- Static site generation (SSG) by default

**Project Structure:**
- `src/components/` - Reusable Astro components
- `src/layouts/` - Page layout templates
- `src/pages/` - Route pages and API endpoints
- `content/sites/middle-coast/` - Markdown content and configuration
- `themes/` - Theme configuration

## Development Principles

1. **Performance First**: Server-side rendering by default, minimal JavaScript
2. **Content-Driven**: Use Content Collections for structured, type-safe content management
3. **Maintainable**: Clear separation of concerns, readable code, comprehensive TypeScript types
4. **Professional**: Clean, accessible design suitable for financial services industry

## Key Guidelines

- Follow Astro's Islands Architecture - server-render by default, hydrate selectively
- Use TypeScript for all new code with strict type checking
- Implement responsive, mobile-first design with Tailwind CSS
- Maintain SEO best practices for professional web presence
- Write accessible HTML with proper semantic structure
- Keep components focused and reusable

## File-Specific Instructions

Refer to the specialized instruction files in `.github/instructions/` for detailed guidelines:

- [Astro Guidelines][astroGuidelinesRef] - Astro-specific development standards
- [TypeScript Guidelines][typescriptGuidelinesRef] - TypeScript best practices
- [Testing Guidelines][testingGuidelinesRef] - Testing standards
- [Documentation Guidelines][documentationGuidelinesRef] - Documentation requirements
- [Security Guidelines][securityGuidelinesRef] - Security best practices
- [Performance Guidelines][performanceGuidelinesRef] - Performance optimization
- [Code Review Guidelines][codeReviewGuidelinesRef]

## Common Tasks

Use the prompt files in `.github/prompts/` for common development tasks:

- `setup-component.prompt.md` - Create new Astro components
- `write-tests.prompt.md` - Generate comprehensive tests
- `code-review.prompt.md` - Assist with code reviews
- `refactor-code.prompt.md` - Refactor existing code
- `generate-docs.prompt.md` - Create documentation
- `debug-issue.prompt.md` - Debug and troubleshoot issues

## Chat Modes

Use specialized chat modes in `.github/chatmodes/` for focused development work:

- `architect.chatmode.md` - Architecture and planning discussions
- `reviewer.chatmode.md` - Code review and quality assurance
- `debugger.chatmode.md` - Debugging and troubleshooting

[astroGuidelinesRef]: ./instructions/astro.instructions.md
[typescriptGuidelinesRef]: ./instructions/typescript.instructions.md
[testingGuidelinesRef]: ./instructions/testing.instructions.md
[documentationGuidelinesRef]: ./instructions/documentation.instructions.md
[securityGuidelinesRef]: ./instructions/security.instructions.md
[performanceGuidelinesRef]: ./instructions/performance.instructions.md
[codeReviewGuidelinesRef]: ./instructions/code-review.instructions.md