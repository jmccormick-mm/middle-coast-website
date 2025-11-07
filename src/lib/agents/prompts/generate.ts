import type { URLAnalysis } from "../../../../cli/commands/analyze-url.js";

/**
 * Parameters for generating layout prompt
 */
export interface GeneratePromptParams {
	/** Analysis results from reference URL */
	urlAnalysis: URLAnalysis;
	/** Middle Coast content from JSON file */
	middleCoastContent: {
		hero: {
			headline: string;
			subheadline: string;
			cta: { text: string; link: string };
		};
		about: {
			headline: string;
			body: string[];
		};
		approach: {
			headline: string;
			subheadline: string;
			pillars: Array<{ title: string; description: string }>;
		};
		contact: {
			headline: string;
			email: string;
		};
	};
	/** Middle Coast brand configuration */
	brandConfig: {
		name: string;
		tagline: string;
		colors: {
			primary: { charcoal: string; softWhite: string };
			accent: { copper: string };
			supporting: { deepOlive: string; warmGray: string };
		};
		typography: {
			fonts: { serif: string; sans: string; alt: string };
		};
	};
}

/**
 * Builds the prompt for Claude to generate React/TypeScript layout components
 * that faithfully recreate the reference URL structure with Middle Coast branding
 */
export function buildGeneratePrompt(params: GeneratePromptParams): string {
	const { urlAnalysis, middleCoastContent, brandConfig } = params;

	return `# Layout Generation Task

You are an expert React/TypeScript developer tasked with creating a professional website layout that faithfully recreates the structural patterns from a reference URL while applying specific branding and content.

## Reference URL Analysis
**URL**: ${urlAnalysis.url}

**Structural Sections**:
${urlAnalysis.sections
	.map(
		(
			section,
			i,
		) => `${i + 1}. **${section.name}** (Priority ${section.hierarchy})
   - Purpose: ${section.purpose}
   - Elements: ${section.elements.join(", ")}`,
	)
	.join("\n")}

**Layout Patterns Identified**:
${urlAnalysis.layoutPatterns
	.map((pattern) => `- **${pattern.type}**: ${pattern.structure}`)
	.join("\n")}

**Visual Style Patterns**:
- Background colors: ${urlAnalysis.colorUsage.background.join(", ")}
- Text colors: ${urlAnalysis.colorUsage.text.join(", ")}
- Accent colors: ${urlAnalysis.colorUsage.accents.join(", ")}

## Middle Coast Brand Requirements

**Brand Identity**:
- Company: ${brandConfig.name}
- Tagline: ${brandConfig.tagline}

**Color Palette** (USE THESE EXACT VALUES):
- Primary Charcoal: ${brandConfig.colors.primary.charcoal}
- Soft White: ${brandConfig.colors.primary.softWhite}
- Copper Accent: ${brandConfig.colors.accent.copper}
- Deep Olive: ${brandConfig.colors.supporting.deepOlive}
- Warm Gray: ${brandConfig.colors.supporting.warmGray}

**Typography**:
- Headlines: ${brandConfig.typography.fonts.serif}
- Body Text: ${brandConfig.typography.fonts.sans}
- Alternative: ${brandConfig.typography.fonts.alt}

## Content to Use (EXACT TEXT)

**Hero Section**:
- Headline: "${middleCoastContent.hero.headline}"
- Subheadline: "${middleCoastContent.hero.subheadline}"
- CTA Button: "${middleCoastContent.hero.cta.text}" (links to "${middleCoastContent.hero.cta.link}")

**About Section**:
- Headline: "${middleCoastContent.about.headline}"
- Content: ${middleCoastContent.about.body.map((paragraph, i) => `\n  Paragraph ${i + 1}: "${paragraph}"`).join("")}

**Approach Section**:
- Headline: "${middleCoastContent.approach.headline}"
- Subheadline: "${middleCoastContent.approach.subheadline}"
- Pillars:${middleCoastContent.approach.pillars.map((pillar, i) => `\n  ${i + 1}. ${pillar.title}: "${pillar.description}"`).join("")}

**Contact Section**:
- Headline: "${middleCoastContent.contact.headline}"
- Email: "${middleCoastContent.contact.email}"

## Technical Requirements

### React/TypeScript Standards
- Use TypeScript with strict typing
- Define interfaces for all component props
- Use kebab-case for filenames, PascalCase for components
- Prefer functional components with explicit return types
- Use meaningful prop destructuring with default values

### Tailwind CSS Standards
- Use utility-first approach with semantic class names
- Implement mobile-first responsive design
- Use exact brand colors via arbitrary value syntax: \`bg-[${brandConfig.colors.primary.charcoal}]\`
- Follow consistent spacing scale: py-24 px-6 for sections, max-w-4xl mx-auto for containers
- Use semantic HTML5 elements (section, header, main, footer)

### Accessibility Requirements
- Proper heading hierarchy (h1 > h2 > h3)
- ARIA labels for interactive elements
- Semantic HTML structure
- Proper alt text for images (use descriptive placeholders)
- Keyboard navigation support

### Performance Requirements
- No client-side JavaScript (server-rendered components only)
- Optimized for static site generation
- Minimal CSS footprint using Tailwind utilities
- Fast loading with proper image optimization hints

## Output Format

Generate a complete layout system with the following components. Wrap each component in XML tags with the component name:

<Component name="Layout">
// Main layout component that composes all sections
// Import and render Hero, About, Approach, Contact components
// Include proper TypeScript interfaces
</Component>

<Component name="Hero">
// Hero section component based on reference URL pattern
// Use Middle Coast hero content and branding
// Include CTA button functionality
</Component>

<Component name="About">
// About section component based on reference URL pattern  
// Use Middle Coast about content and branding
// Handle multi-paragraph content properly
</Component>

<Component name="Approach">
// Approach/Services section based on reference URL pattern
// Use Middle Coast approach content with 4 pillars
// Create visually appealing pillar layout
</Component>

<Component name="Contact">
// Contact section component based on reference URL pattern
// Use Middle Coast contact content
// Include proper form structure if reference has forms
</Component>

## Critical Guidelines

1. **Faithful Structure Recreation**: Study the reference URL's layout patterns and recreate the STRUCTURE and COMPOSITION, not the visual styling
2. **Brand Consistency**: Apply Middle Coast colors, fonts, and content throughout - never use reference URL content
3. **Content Accuracy**: Use the exact Middle Coast content provided - do not modify headlines, body text, or CTAs
4. **Professional Quality**: Generate production-ready code that compiles without errors
5. **Responsive Design**: Ensure components work across mobile, tablet, and desktop viewports
6. **Type Safety**: All components must have proper TypeScript interfaces and type definitions

## Example Component Structure

\`\`\`tsx
interface HeroProps {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

export default function Hero({ headline, subheadline, ctaText, ctaLink }: HeroProps) {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[${brandConfig.colors.primary.charcoal}] text-[${brandConfig.colors.primary.softWhite}]">
      {/* Component implementation */}
    </section>
  );
}
\`\`\`

Generate all components now, ensuring they follow the structural patterns from the reference URL while applying Middle Coast branding consistently.`;
}
