# Middle Coast Website Generator

A flexible static site generator for creating professional investor websites. Generate multiple design mockups from a single content source with different themes and layouts.

## Features

- 🎨 **Multiple Theme Variations** - Generate 3 different design mockups (Professional, Modern, Elegant)
- 📝 **Markdown Content** - Manage content in simple markdown files with frontmatter
- 🎯 **Component-Based** - Flexible, reusable components that accept content via props
- 🚀 **Fast & Modern** - Built with Astro and Tailwind CSS for optimal performance
- 📱 **Responsive** - Mobile-first design that works on all devices

## Prerequisites

### Required VS Code Extensions

This project includes automatic extension recommendations. When you open the project in VS Code, you'll be prompted to install:

- **Astro** (`astro-build.astro-vscode`) - Language support and IntelliSense for Astro files
- **Tailwind CSS IntelliSense** (`bradlc.vscode-tailwindcss`) - Autocomplete and syntax highlighting for Tailwind
- **Prettier** (`esbenp.prettier-vscode`) - Code formatting
- **TypeScript and JavaScript Language Features** - Enhanced TypeScript support

### MCP (Model Context Protocol) Configuration

The project includes Astro MCP server configuration in `.vscode/mcp.json` for enhanced AI assistance with Astro-specific development.

## Quick Start

```bash
# Install dependencies and check setup
npm run setup

# Check required extensions
npm run check-extensions

# Generate mockups for a site
npm run generate-mockups middle-coast

# Preview different themes
npm run dev
# Then visit:
# - http://localhost:4321/ (default site)
# - http://localhost:4321/preview?theme=professional
# - http://localhost:4321/preview?theme=modern
# - http://localhost:4321/preview?theme=elegant

# Build for production
npm run build
```

## Content Structure

Content is organized in `content/sites/[site-name]/`:

```
content/
└── sites/
    └── middle-coast/
        ├── config.json      # Site configuration
        ├── about.md         # About section content
        └── approach.md      # Investment approach content
```

### Example: config.json

```json
{
  "name": "Middle Coast",
  "tagline": "Midwest Real Estate Investment Firm",
  "description": "Building lasting value...",
  "theme": "professional",
  "colors": {
    "primary": "#1E1F1D",
    "secondary": "#F5F4EF",
    "accent": "#A76D3E"
  },
  "fonts": {
    "heading": "DM Serif Display",
    "body": "Montserrat"
  }
}
```

### Example: about.md

```markdown
---
title: "About Middle Coast"
---

Middle Coast is a Midwest-focused real estate investment firm...
```

## Generating Mockups

Run the mockup generator to create theme variations:

```bash
npm run generate-mockups [site-name]
```

This creates:
- `mockups/[site-name]/config-[theme].json` - Config for each theme
- `mockups/[site-name]/tailwind.[theme].mjs` - Tailwind config for each theme

## Available Themes

1. **Professional** - Classic charcoal/copper with serif headers
2. **Modern** - Clean navy/blue with contemporary sans-serif
3. **Elegant** - Sophisticated gray/gold with traditional fonts

## Future Enhancements

- 🔌 External content integration (Notion, CMS)
- 🎨 Custom theme builder
- 📊 Analytics and CRM integration
- 🖼️ Image management
- 📄 Multi-page support

## Development

```bash
# Start dev server
npm run dev

# Type check
npm run build

# Preview production build
npm run preview
```
