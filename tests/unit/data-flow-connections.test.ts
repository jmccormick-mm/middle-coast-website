import { describe, expect, it } from "vitest";
import type { URLAnalysis } from "../../cli/commands/analyze-url.js";
import { MIDDLE_COAST_CONFIG } from "../../src/config/site-config.js";
import { parseComponentsFromResponse } from "../../src/lib/agents/layout-generator.js";
import { buildGeneratePrompt } from "../../src/lib/agents/prompts/generate.js";

describe("Data Flow Connection Verification", () => {
	const mockAnalysis: URLAnalysis = {
		url: "https://example.com",
		sections: [
			{
				name: "Hero",
				purpose: "Main headline and CTA",
				elements: ["heading", "subheading", "button"],
				hierarchy: 1,
			},
		],
		layoutPatterns: [
			{
				type: "hero",
				structure: "Full-width hero with centered text",
			},
		],
		colorUsage: {
			background: ["white"],
			text: ["black"],
			accents: ["blue"],
		},
	};

	const mockMiddleCoastContent = {
		hero: {
			headline: "Test Headline",
			subheadline: "Test Subheadline",
			cta: { text: "Get Started", link: "#contact" },
		},
		about: {
			headline: "About Us",
			body: ["Test paragraph"],
		},
		approach: {
			headline: "Our Approach",
			subheadline: "How we work",
			pillars: [{ title: "Trust", description: "We build trust" }],
		},
		contact: {
			headline: "Contact Us",
			email: "test@example.com",
		},
	};

	it("should connect CLI analysis to prompt generation", () => {
		// Test that URL analysis flows correctly into prompt template
		const prompt = buildGeneratePrompt({
			urlAnalysis: mockAnalysis,
			middleCoastContent: mockMiddleCoastContent,
			brandConfig: {
				name: MIDDLE_COAST_CONFIG.brand.name,
				tagline: MIDDLE_COAST_CONFIG.brand.tagline,
				colors: MIDDLE_COAST_CONFIG.colors,
				typography: MIDDLE_COAST_CONFIG.typography,
			},
		});

		// Verify the prompt contains analysis data
		expect(prompt).toContain("https://example.com");
		expect(prompt).toContain("Hero");
		expect(prompt).toContain("Main headline and CTA");
		expect(prompt).toContain("Test Headline");
	});

	it("should verify component parsing from simulated Claude response", () => {
		// Test with a simulated Claude response
		const mockClaudeResponse = `
<Component name="Layout">
interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <main className="min-h-screen">
      {children}
    </main>
  );
}
</Component>

<Component name="Hero">
interface HeroProps {
  headline: string;
  subheadline: string;
}

export default function Hero({ headline, subheadline }: HeroProps) {
  return (
    <section className="hero">
      <h1>{headline}</h1>
      <p>{subheadline}</p>
    </section>
  );
}
</Component>
		`;

		// Test the actual parsing function
		const components = parseComponentsFromResponse(mockClaudeResponse);

		expect(Object.keys(components)).toHaveLength(2);
		expect(components["Layout.tsx"]).toContain(
			"export default function Layout",
		);
		expect(components["Hero.tsx"]).toContain("export default function Hero");
	});

	it("should verify complete data transformation pipeline", () => {
		// Test the complete transformation from URL analysis to ready-to-write files

		// 1. Analysis → Prompt
		const prompt = buildGeneratePrompt({
			urlAnalysis: mockAnalysis,
			middleCoastContent: mockMiddleCoastContent,
			brandConfig: {
				name: MIDDLE_COAST_CONFIG.brand.name,
				tagline: MIDDLE_COAST_CONFIG.brand.tagline,
				colors: MIDDLE_COAST_CONFIG.colors,
				typography: MIDDLE_COAST_CONFIG.typography,
			},
		});

		// 2. Verify prompt quality
		expect(prompt.length).toBeGreaterThan(1000);
		expect(prompt).toContain("Reference URL Analysis");
		expect(prompt).toContain("Middle Coast Brand Requirements");
		expect(prompt).toContain("<Component name=");

		// 3. Simulate Claude response and parsing
		const mockResponse = `
<Component name="Layout">
export default function Layout() { return <div>Layout</div>; }
</Component>
		`;

		const componentRegex = /<Component name="([^"]+)">([\s\S]*?)<\/Component>/g;
		const match = componentRegex.exec(mockResponse);

		expect(match).not.toBeNull();
		expect(match![1]).toBe("Layout");
		expect(match![2].trim()).toContain("export default function Layout");
	});
});
