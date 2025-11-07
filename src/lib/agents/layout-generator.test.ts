import { beforeEach, describe, expect, it, vi } from "vitest";
import type { URLAnalysis } from "../../../cli/commands/analyze-url.js";
import {
	generateLayout,
	type LayoutGeneratorParams,
	parseComponentsFromResponse,
} from "./layout-generator.js";

// Mock Anthropic SDK
const mockMessages = {
	create: vi.fn(),
};

const mockAnthropicClient = {
	messages: mockMessages,
};

vi.mock("@anthropic-ai/sdk", () => ({
	default: vi.fn(() => mockAnthropicClient),
}));

// Mock console methods
const consoleSpy = vi.spyOn(console, "log").mockImplementation(() => {});
const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
const consoleWarnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});

// Test data fixtures
const mockUrlAnalysis: URLAnalysis = {
	url: "https://example.com",
	sections: [
		{
			name: "Hero",
			hierarchy: 1,
			purpose: "Main introduction and call to action",
			elements: ["headline", "subtext", "button"],
		},
		{
			name: "About",
			hierarchy: 2,
			purpose: "Company information",
			elements: ["title", "description"],
		},
	],
	layoutPatterns: [
		{
			type: "Full-width hero",
			structure: "Centered content with background",
		},
	],
	colorUsage: {
		background: ["white", "gray-100"],
		text: ["black", "gray-700"],
		accents: ["blue-500"],
	},
};

const mockMiddleCoastContent = {
	hero: {
		headline: "Strategic Real Estate Investment",
		subheadline: "Building wealth through Midwest opportunities",
		cta: { text: "Get Started", link: "/contact" },
	},
	about: {
		headline: "About Middle Coast",
		body: ["We are real estate experts.", "We focus on the Midwest."],
	},
	approach: {
		headline: "Our Approach",
		subheadline: "Disciplined investing",
		pillars: [
			{
				title: "Market Selection",
				description: "We target growing markets",
			},
		],
	},
	contact: {
		headline: "Contact Us",
		email: "info@middlecoast.com",
	},
};

const mockBrandConfig = {
	name: "Middle Coast",
	tagline: "Strategic Real Estate Investment",
	colors: {
		primary: { charcoal: "#1E1F1D", softWhite: "#F5F4EF" },
		accent: { copper: "#A76D3E" },
		supporting: { deepOlive: "#2D5A27", warmGray: "#8B8680" },
	},
	typography: {
		fonts: { serif: "DM Serif Display", sans: "Montserrat", alt: "Inter" },
	},
};

const mockParams: LayoutGeneratorParams = {
	urlAnalysis: mockUrlAnalysis,
	middleCoastContent: mockMiddleCoastContent,
	brandConfig: mockBrandConfig,
};

describe("layout-generator", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		// Mock environment variable
		process.env.ANTHROPIC_API_KEY = "test-api-key";
	});

	describe("parseComponentsFromResponse", () => {
		it("should extract valid components from XML response", () => {
			const response = `
				Some intro text
				<Component name="Hero">
					interface HeroProps {
						title: string;
					}
					export default function Hero({ title }: HeroProps) {
						return <div>{title}</div>;
					}
				</Component>
				<Component name="About">
					export default function About() {
						return <section>About content</section>;
					}
				</Component>
				Some trailing text
			`;

			const result = parseComponentsFromResponse(response);

			expect(Object.keys(result)).toHaveLength(2);
			expect(result["Hero.tsx"]).toContain("interface HeroProps");
			expect(result["Hero.tsx"]).toContain("export default function Hero");
			expect(result["About.tsx"]).toContain("export default function About");
		});

		it("should handle components with complex code including JSX", () => {
			const response = `
				<Component name="ComplexComponent">
					interface Props {
						items: Array<{ id: string; name: string }>;
					}
					
					export default function ComplexComponent({ items }: Props) {
						return (
							<div className="container">
								{items.map(item => (
									<div key={item.id}>{item.name}</div>
								))}
							</div>
						);
					}
				</Component>
			`;

			const result = parseComponentsFromResponse(response);

			expect(result["ComplexComponent.tsx"]).toContain("interface Props");
			expect(result["ComplexComponent.tsx"]).toContain("items.map");
			expect(result["ComplexComponent.tsx"]).toContain("className=");
		});

		it("should skip invalid components that don't look like code", () => {
			const response = `
				<Component name="ValidComponent">
					export default function ValidComponent() {
						return <div>Valid</div>;
					}
				</Component>
				<Component name="InvalidComponent">
					This is just text, not code.
				</Component>
			`;

			const result = parseComponentsFromResponse(response);

			expect(Object.keys(result)).toHaveLength(1);
			expect(result["ValidComponent.tsx"]).toBeDefined();
			expect(result["InvalidComponent.tsx"]).toBeUndefined();
			expect(consoleWarnSpy).toHaveBeenCalledWith(
				expect.stringContaining("Skipping InvalidComponent.tsx"),
			);
		});

		it("should throw error if no valid components found", () => {
			const response = "No components here at all!";

			expect(() => parseComponentsFromResponse(response)).toThrow(
				"No valid components extracted from Claude response",
			);
		});

		it("should handle nested angle brackets in component code", () => {
			const response = `
				<Component name="TestComponent">
					export default function TestComponent() {
						const condition = 5 > 3 && 10 < 20;
						return <div>Test</div>;
					}
				</Component>
			`;

			const result = parseComponentsFromResponse(response);

			expect(result["TestComponent.tsx"]).toContain("5 > 3 && 10 < 20");
		});
	});

	describe("generateLayout", () => {
		it("should successfully generate layout when Claude returns valid response", async () => {
			const mockClaudeResponse = `
				<Component name="Layout">
					export default function Layout() {
						return <div>Layout</div>;
					}
				</Component>
				<Component name="Hero">
					export default function Hero() {
						return <section>Hero</section>;
					}
				</Component>
			`;

			// Mock Anthropic SDK
			const Anthropic = await import("@anthropic-ai/sdk");
			const mockCreate = vi.fn().mockResolvedValue({
				content: [{ type: "text", text: mockClaudeResponse }],
			});

			(Anthropic.default as any).mockImplementation(() => ({
				messages: { create: mockCreate },
			}));

			const result = await generateLayout(mockParams);

			expect(result).toHaveProperty("Layout.tsx");
			expect(result).toHaveProperty("Hero.tsx");
			expect(Object.keys(result)).toHaveLength(2);

			// Verify API call
			expect(mockCreate).toHaveBeenCalledWith({
				model: "claude-3-5-sonnet-20241022",
				max_tokens: 8000,
				messages: [
					{
						role: "user",
						content: expect.stringContaining("Layout Generation Task"),
					},
				],
			});
		});

		it("should handle Claude API errors gracefully", async () => {
			const Anthropic = await import("@anthropic-ai/sdk");
			const mockCreate = vi.fn().mockRejectedValue(new Error("API Error"));

			(Anthropic.default as any).mockImplementation(() => ({
				messages: { create: mockCreate },
			}));

			await expect(generateLayout(mockParams)).rejects.toThrow(
				"Layout generation failed: API Error",
			);
		});

		it("should handle non-text response from Claude", async () => {
			const Anthropic = await import("@anthropic-ai/sdk");
			const mockCreate = vi.fn().mockResolvedValue({
				content: [{ type: "image", source: {} }],
			});

			(Anthropic.default as any).mockImplementation(() => ({
				messages: { create: mockCreate },
			}));

			await expect(generateLayout(mockParams)).rejects.toThrow(
				"No valid components extracted from Claude response",
			);
		});

		it("should require ANTHROPIC_API_KEY environment variable", async () => {
			delete process.env.ANTHROPIC_API_KEY;

			const Anthropic = await import("@anthropic-ai/sdk");
			const mockCreate = vi
				.fn()
				.mockRejectedValue(new Error("API key required"));

			(Anthropic.default as any).mockImplementation(() => ({
				messages: { create: mockCreate },
			}));

			await expect(generateLayout(mockParams)).rejects.toThrow(
				"Layout generation failed: API key required",
			);
		});

		it("should log progress messages during generation", async () => {
			const mockClaudeResponse = `
				<Component name="Hero">
					export default function Hero() {
						return <div>Hero</div>;
					}
				</Component>
			`;

			const Anthropic = await import("@anthropic-ai/sdk");
			const mockCreate = vi.fn().mockResolvedValue({
				content: [{ type: "text", text: mockClaudeResponse }],
			});

			(Anthropic.default as any).mockImplementation(() => ({
				messages: { create: mockCreate },
			}));

			await generateLayout(mockParams);

			expect(consoleSpy).toHaveBeenCalledWith(
				"    Calling Claude API for layout generation...",
			);
			expect(consoleSpy).toHaveBeenCalledWith(
				"    ✅ Claude response received",
			);
			expect(consoleSpy).toHaveBeenCalledWith("    Extracted 1 components");
		});
	});

	describe("interface compliance", () => {
		it("should export required interfaces", () => {
			// Type-only test to ensure interfaces are properly exported
			const params: LayoutGeneratorParams = mockParams;
			expect(params.urlAnalysis).toBeDefined();
			expect(params.middleCoastContent).toBeDefined();
			expect(params.brandConfig).toBeDefined();
		});

		it("should return GeneratedLayout interface", async () => {
			const mockClaudeResponse = `
				<Component name="Test">
					export default function Test() {
						return <div>Test</div>;
					}
				</Component>
			`;

			const Anthropic = await import("@anthropic-ai/sdk");
			const mockCreate = vi.fn().mockResolvedValue({
				content: [{ type: "text", text: mockClaudeResponse }],
			});

			(Anthropic.default as any).mockImplementation(() => ({
				messages: { create: mockCreate },
			}));

			const result = await generateLayout(mockParams);

			// Type assertion to ensure return type compliance
			const generatedLayout: Record<string, string> = result;
			expect(typeof generatedLayout["Test.tsx"]).toBe("string");
		});
	});
});
