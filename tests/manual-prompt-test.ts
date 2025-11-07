import type { URLAnalysis } from "../cli/commands/analyze-url.js";
import { MIDDLE_COAST_CONFIG } from "../src/config/site-config.js";
import middleCoastContent from "../src/content/middle-coast.json" with {
	type: "json",
};
import { buildGeneratePrompt } from "../src/lib/agents/prompts/generate.js";

/**
 * Manual test script to verify prompt generation with real data
 * Run with: tsx tests/manual-prompt-test.ts
 */

// Mock URL analysis (would come from analyze-url.ts in real usage)
const mockAnalysis: URLAnalysis = {
	url: "https://www.mwncapital.com/",
	sections: [
		{
			name: "Hero",
			purpose: "Main headline with investment focus and call-to-action",
			elements: [
				"hero-headline",
				"subheading",
				"cta-button",
				"background-image",
			],
			hierarchy: 1,
		},
		{
			name: "About",
			purpose: "Company overview and investment philosophy",
			elements: ["section-heading", "body-text", "team-image"],
			hierarchy: 2,
		},
		{
			name: "Investment Approach",
			purpose: "Detailed methodology and value proposition",
			elements: ["section-heading", "pillar-grid", "description-text"],
			hierarchy: 2,
		},
		{
			name: "Contact",
			purpose: "Contact information and meeting scheduling",
			elements: ["contact-heading", "contact-form", "email-link"],
			hierarchy: 3,
		},
	],
	layoutPatterns: [
		{
			type: "hero",
			structure: "Full-width hero with centered content and dark background",
		},
		{
			type: "text-block",
			structure: "Alternating content blocks with text and images",
		},
		{
			type: "card-grid",
			structure: "4-column grid for investment approach pillars",
		},
		{
			type: "form",
			structure: "Contact form with email integration",
		},
	],
	colorUsage: {
		background: ["dark navy", "white", "light gray"],
		text: ["white", "dark gray", "navy"],
		accents: ["blue", "gold"],
	},
};

// Test the prompt generation
const prompt = buildGeneratePrompt({
	urlAnalysis: mockAnalysis,
	middleCoastContent,
	brandConfig: {
		name: MIDDLE_COAST_CONFIG.brand.name,
		tagline: MIDDLE_COAST_CONFIG.brand.tagline,
		colors: MIDDLE_COAST_CONFIG.colors,
		typography: MIDDLE_COAST_CONFIG.typography,
	},
});

console.log("=".repeat(80));
console.log("GENERATED PROMPT");
console.log("=".repeat(80));
console.log(prompt);
console.log("=".repeat(80));
console.log(`Prompt length: ${prompt.length} characters`);
console.log("✅ Prompt generated successfully!");
