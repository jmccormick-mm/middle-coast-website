---
agent: 'agent'
model: Claude Sonnet 4
tools: ['search/codebase', 'githubRepo']
description: 'Generate a new Astro component for the Middle Coast website'
---

# Setup Astro Component

Generate a new Astro component based on the Middle Coast website patterns and requirements.

## Component Requirements

When creating a new component, ensure:

### Astro Component Structure
- Use proper frontmatter with TypeScript interfaces for props
- Follow Islands Architecture - server-first with selective hydration
- Include proper TypeScript prop validation
- Use semantic HTML structure
- Implement proper accessibility attributes

### Styling
- Use Tailwind CSS utility classes for styling
- Follow mobile-first responsive design
- Ensure professional appearance suitable for financial services
- Use consistent spacing and typography from the design system
- Implement proper color contrast for accessibility

### Content Integration
- Support content from Content Collections when appropriate
- Handle markdown content properly if needed
- Implement proper SEO metadata if component renders pages
- Use Astro's Image component for any images

### Performance
- Default to zero JavaScript unless interactivity is required
- Use appropriate client directives if hydration is needed
- Optimize for Core Web Vitals
- Implement lazy loading for below-the-fold content

## Component Generation Process

1. **Ask for component details if not provided:**
   - Component name and purpose
   - Required props and their types
   - Whether interactivity is needed
   - Where the component will be used

2. **Create the component file:**
   - Use PascalCase naming convention
   - Place in appropriate directory (`src/components/`)
   - Include proper file extension (`.astro`)

3. **Generate component code:**
   - Frontmatter with TypeScript interfaces
   - Proper prop destructuring and defaults
   - Semantic HTML structure
   - Tailwind CSS styling
   - Accessibility attributes

4. **Include usage example:**
   - Show how to import and use the component
   - Include example props
   - Demonstrate different usage scenarios

## Template Structure

```astro
---
// Component interface and props
interface Props {
  // Define props with types
}

const { /* destructure props with defaults */ } = Astro.props;
---

<!-- Semantic HTML with Tailwind styling -->
<div class="/* responsive utility classes */">
  <!-- Component content -->
</div>
```

Generate components that follow the established patterns in the codebase and maintain consistency with the professional financial services brand.