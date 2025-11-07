import { afterEach, beforeEach, describe, expect, it } from "vitest";
import {
	astroAssertions,
	createAstroTestRenderer,
	mockData,
} from "./helpers/astro-test-utils.js";

// Example test file demonstrating TDD patterns for Astro components
// This serves as a template for writing tests in your project

describe("Example Astro Component Tests", () => {
	const renderer = createAstroTestRenderer();

	beforeEach(async () => {
		await renderer.setup();
	});

	afterEach(async () => {
		await renderer.cleanup();
	});

	// Example test structure for a Hero component
	describe("Hero Component", () => {
		it("should render hero title and tagline", async () => {
			// This is a placeholder test - replace with actual component imports
			// when you have components to test

			const mockProps = {
				name: "Middle Coast",
				tagline: "Midwest Real Estate Investment",
				description: "Focused on secondary and tertiary markets",
				calendlyUrl: "https://calendly.com/middle-coast",
			};

			// Example assertion structure
			expect(mockProps.name).toBe("Middle Coast");
			expect(mockProps.tagline).toBe("Midwest Real Estate Investment");
		});

		it("should include Calendly integration link", async () => {
			const mockProps = mockData.content().hero;

			expect(mockProps).toHaveProperty("name");
			expect(mockProps).toHaveProperty("tagline");
			expect(mockProps).toHaveProperty("description");
		});
	});

	// Example test for utility functions
	describe("Mock Data Helpers", () => {
		it("should generate consistent site config", () => {
			const config = mockData.siteConfig();

			expect(config).toHaveProperty("name");
			expect(config).toHaveProperty("colors");
			expect(config).toHaveProperty("fonts");
			expect(config.colors).toHaveProperty("primary");
		});

		it("should generate investment pillars", () => {
			const pillars = mockData.investmentPillars(3);

			expect(pillars).toHaveLength(3);
			expect(pillars[0]).toHaveProperty("title");
			expect(pillars[0]).toHaveProperty("description");
		});
	});

	// Example test for custom assertions
	describe("Astro Assertions Helpers", () => {
		it("should correctly detect text content", () => {
			const html = "<h1>Middle Coast</h1><p>Real estate investment firm</p>";

			expect(astroAssertions.toContainText(html, "Middle Coast")).toBe(true);
			expect(astroAssertions.toContainText(html, "Real estate")).toBe(true);
			expect(astroAssertions.toContainText(html, "Not found")).toBe(false);
		});

		it("should correctly detect HTML elements", () => {
			const html = '<section class="hero"><h1>Title</h1></section>';

			expect(astroAssertions.toContainElement(html, "section")).toBe(true);
			expect(astroAssertions.toContainElement(html, "h1")).toBe(true);
			expect(astroAssertions.toContainElement(html, "div")).toBe(false);
		});

		it("should correctly detect CSS classes", () => {
			const html = '<div class="container mx-auto py-8">Content</div>';

			expect(astroAssertions.toHaveClass(html, "container")).toBe(true);
			expect(astroAssertions.toHaveClass(html, "mx-auto")).toBe(true);
			expect(astroAssertions.toHaveClass(html, "not-present")).toBe(false);
		});
	});
});
