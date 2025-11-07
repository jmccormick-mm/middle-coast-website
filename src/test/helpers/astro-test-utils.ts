import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

/**
 * Test helper for rendering Astro components in tests
 * Uses Astro's Container API as recommended in the documentation
 */
export class AstroTestRenderer {
	private container?: Awaited<ReturnType<typeof AstroContainer.create>>;

	/**
	 * Initialize the Astro container for testing
	 */
	async setup() {
		this.container = await AstroContainer.create();
	}

	/**
	 * Cleanup the container after tests
	 */
	async cleanup() {
		// Container cleanup is handled automatically
		this.container = undefined;
	}

	/**
	 * Render an Astro component to string
	 */
	async renderToString(
		component: AstroComponentFactory,
		props: Record<string, unknown> = {},
		slots: Record<string, string> = {},
	): Promise<string> {
		if (!this.container) {
			throw new Error("AstroTestRenderer not initialized. Call setup() first.");
		}

		return await this.container.renderToString(component, {
			props,
			slots,
		});
	}

	/**
	 * Render an Astro component and return a DOM-like object for testing
	 */
	async render(
		component: AstroComponentFactory,
		props: Record<string, unknown> = {},
		slots: Record<string, string> = {},
	) {
		const html = await this.renderToString(component, props, slots);

		// For more complex DOM testing, you might want to use jsdom here
		// or return a parsed DOM object using a library like cheerio
		return {
			html,
			// Add more helper methods as needed
			querySelector: (selector: string) => {
				// Basic implementation - you might want to enhance this
				const matches = html.match(
					new RegExp(`<[^>]*${selector}[^>]*>.*?</[^>]*>`, "g"),
				);
				return matches ? matches[0] : null;
			},
			textContent: html.replace(/<[^>]*>/g, ""),
		};
	}
}

/**
 * Create a reusable test renderer instance
 */
export function createAstroTestRenderer(): AstroTestRenderer {
	return new AstroTestRenderer();
}

/**
 * Test utilities for common assertions on Astro components
 */
export const astroAssertions = {
	/**
	 * Assert that rendered HTML contains specific text
	 */
	toContainText: (html: string, text: string): boolean => {
		return html.includes(text);
	},

	/**
	 * Assert that rendered HTML contains specific HTML element
	 */
	toContainElement: (html: string, element: string): boolean => {
		const regex = new RegExp(`<${element}[^>]*>`, "i");
		return regex.test(html);
	},

	/**
	 * Assert that rendered HTML has specific attribute
	 */
	toHaveAttribute: (
		html: string,
		element: string,
		attribute: string,
		value?: string,
	): boolean => {
		const regex = value
			? new RegExp(
					`<${element}[^>]*\\s${attribute}=["']${value}["'][^>]*>`,
					"i",
				)
			: new RegExp(`<${element}[^>]*\\s${attribute}[^>]*>`, "i");
		return regex.test(html);
	},

	/**
	 * Assert that rendered HTML has specific CSS class
	 */
	toHaveClass: (html: string, className: string): boolean => {
		const regex = new RegExp(
			`class=["'][^"']*\\b${className}\\b[^"']*["']`,
			"i",
		);
		return regex.test(html);
	},
};

/**
 * Mock data generators for testing
 */
export const mockData = {
	/**
	 * Generate mock site configuration
	 */
	siteConfig: (overrides: Record<string, unknown> = {}) => ({
		name: "Test Middle Coast",
		tagline: "Test Real Estate Investment",
		description: "Test investment firm focused on Midwest markets",
		calendlyUrl: "https://calendly.com/test-middle-coast",
		colors: {
			primary: "#1E1F1D",
			secondary: "#F5F4EF",
			accent: "#A76D3E",
			charcoal: "#1E1F1D",
			"soft-white": "#F5F4EF",
			copper: "#A76D3E",
			"deep-olive": "#4A4B3A",
			"warm-gray": "#8B8680",
		},
		fonts: {
			heading: "DM Serif Display",
			body: "Montserrat",
		},
		contact: {
			email: "test@middlecoast.com",
			phone: "+1 (555) 123-4567",
		},
		...overrides,
	}),

	/**
	 * Generate mock investment approach pillars
	 */
	investmentPillars: (count: number = 4) => {
		const pillars = [
			{
				title: "Market Selection",
				description:
					"We target Midwest markets with strong economic fundamentals and growth potential.",
			},
			{
				title: "Rigorous Diligence",
				description:
					"Every investment undergoes comprehensive financial and operational analysis.",
			},
			{
				title: "Value Creation",
				description:
					"We actively improve properties through strategic renovations and management.",
			},
			{
				title: "Risk Management",
				description:
					"Disciplined approach to managing downside risk while maximizing returns.",
			},
		];
		return pillars.slice(0, count);
	},

	/**
	 * Generate mock content data
	 */
	content: (overrides: Record<string, unknown> = {}) => ({
		about: {
			title: "About Middle Coast",
			content:
				"Test content about Middle Coast. This is a test description of the investment firm and its focus on Midwest real estate markets.",
		},
		approach: {
			title: "Investment Approach",
			pillars: mockData.investmentPillars(),
		},
		hero: {
			name: "Middle Coast",
			tagline: "Test Midwest Real Estate Investment",
			description: "Test description of Middle Coast investment strategy.",
		},
		...overrides,
	}),
};
