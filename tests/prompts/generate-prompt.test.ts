import { describe, expect, it } from "vitest";
import type { URLAnalysis } from "../../cli/commands/analyze-url.js";
import {
	buildGeneratePrompt,
	type GeneratePromptParams,
} from "../../src/lib/agents/prompts/generate.js";

describe("Generate Prompt Template", () => {
	const mockUrlAnalysis: URLAnalysis = {
		url: "https://example.com",
		sections: [
			{
				name: "Hero",
				purpose: "Main headline and CTA",
				elements: ["heading", "subheading", "button"],
				hierarchy: 1,
			},
			{
				name: "About",
				purpose: "Company information",
				elements: ["heading", "text", "image"],
				hierarchy: 2,
			},
		],
		layoutPatterns: [
			{
				type: "hero",
				structure: "Full-width hero with centered text",
			},
			{
				type: "text-block",
				structure: "Two-column text with heading",
			},
		],
		colorUsage: {
			background: ["white", "gray"],
			text: ["black", "dark-gray"],
			accents: ["blue", "green"],
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
			body: ["Paragraph 1", "Paragraph 2"],
		},
		approach: {
			headline: "Our Approach",
			subheadline: "How we work",
			pillars: [
				{ title: "Trust", description: "We build trust" },
				{ title: "Quality", description: "We deliver quality" },
			],
		},
		contact: {
			headline: "Contact Us",
			email: "test@example.com",
		},
	};

	const mockBrandConfig = {
		name: "Middle Coast",
		tagline: "Test Tagline",
		colors: {
			primary: { charcoal: "#1E1F1D", softWhite: "#F5F4EF" },
			accent: { copper: "#A76D3E" },
			supporting: { deepOlive: "#3C4037", warmGray: "#7A7F78" },
		},
		typography: {
			fonts: {
				serif: '"DM Serif Display", serif',
				sans: '"Montserrat", sans-serif',
				alt: '"Lora", serif',
			},
		},
	};

	const validParams: GeneratePromptParams = {
		urlAnalysis: mockUrlAnalysis,
		middleCoastContent: mockMiddleCoastContent,
		brandConfig: mockBrandConfig,
	};

	it("should build a complete prompt with all required sections", () => {
		const prompt = buildGeneratePrompt(validParams);

		// Check that prompt contains key sections
		expect(prompt).toContain("# Layout Generation Task");
		expect(prompt).toContain("Reference URL Analysis");
		expect(prompt).toContain("Middle Coast Brand Requirements");
		expect(prompt).toContain("Content to Use (EXACT TEXT)");
		expect(prompt).toContain("Technical Requirements");
		expect(prompt).toContain("Output Format");
	});

	it("should include URL analysis data", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain("https://example.com");
		expect(prompt).toContain("Hero");
		expect(prompt).toContain("Main headline and CTA");
		expect(prompt).toContain("Full-width hero with centered text");
	});

	it("should include Middle Coast brand colors with exact values", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain("#1E1F1D"); // charcoal
		expect(prompt).toContain("#F5F4EF"); // soft white
		expect(prompt).toContain("#A76D3E"); // copper
		expect(prompt).toContain("#3C4037"); // deep olive
		expect(prompt).toContain("#7A7F78"); // warm gray
	});

	it("should include exact Middle Coast content", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain('"Test Headline"');
		expect(prompt).toContain('"Test Subheadline"');
		expect(prompt).toContain('"Get Started"');
		expect(prompt).toContain('"About Us"');
		expect(prompt).toContain('"Paragraph 1"');
		expect(prompt).toContain('"Our Approach"');
		expect(prompt).toContain('"Contact Us"');
		expect(prompt).toContain("test@example.com");
	});

	it("should include typography requirements", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain('"DM Serif Display", serif');
		expect(prompt).toContain('"Montserrat", sans-serif');
		expect(prompt).toContain('"Lora", serif');
	});

	it("should include technical requirements for React/TypeScript", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain("TypeScript with strict typing");
		expect(prompt).toContain("Define interfaces for all component props");
		expect(prompt).toContain("kebab-case for filenames");
		expect(prompt).toContain("PascalCase for components");
	});

	it("should include Tailwind CSS guidelines", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain("utility-first approach");
		expect(prompt).toContain("mobile-first responsive design");
		expect(prompt).toContain("arbitrary value syntax");
		expect(prompt).toContain("py-24 px-6");
		expect(prompt).toContain("max-w-4xl mx-auto");
	});

	it("should include accessibility requirements", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain("Proper heading hierarchy");
		expect(prompt).toContain("ARIA labels");
		expect(prompt).toContain("Semantic HTML structure");
		expect(prompt).toContain("Keyboard navigation support");
	});

	it("should specify component output format with XML tags", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain('<Component name="Layout">');
		expect(prompt).toContain('<Component name="Hero">');
		expect(prompt).toContain('<Component name="About">');
		expect(prompt).toContain('<Component name="Approach">');
		expect(prompt).toContain('<Component name="Contact">');
	});

	it("should include example component structure", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain("interface HeroProps");
		expect(prompt).toContain("export default function Hero");
		expect(prompt).toContain("className=");
	});

	it("should emphasize faithful structure recreation", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain("Faithful Structure Recreation");
		expect(prompt).toContain("recreate the STRUCTURE and COMPOSITION");
		expect(prompt).toContain("not the visual styling");
	});

	it("should emphasize content accuracy", () => {
		const prompt = buildGeneratePrompt(validParams);

		expect(prompt).toContain("Content Accuracy");
		expect(prompt).toContain("exact Middle Coast content provided");
		expect(prompt).toContain("do not modify headlines");
	});
});
