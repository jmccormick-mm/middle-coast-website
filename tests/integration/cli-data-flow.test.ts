import { promises as fs } from "node:fs";
import { beforeEach, describe, expect, it } from "vitest";
import type { URLAnalysis } from "../../cli/commands/analyze-url.js";
import { generateLayouts } from "../../cli/commands/generate-layouts.js";

describe("Complete CLI Data Flow Integration", () => {
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
			background: ["white", "gray"],
			text: ["black", "dark-gray"],
			accents: ["blue", "green"],
		},
	};

	const testOutputPath = "test-output";

	beforeEach(async () => {
		// Clean up test directory
		try {
			await fs.rm(testOutputPath, { recursive: true, force: true });
		} catch {
			// Directory doesn't exist, ignore
		}
	});

	it("should complete the full data flow from analysis to file generation", async () => {
		// Skip if no API key (for CI/CD)
		if (!process.env.ANTHROPIC_API_KEY) {
			console.log("⚠️ Skipping integration test - no ANTHROPIC_API_KEY");
			return;
		}

		// Test the complete workflow
		await expect(
			generateLayouts(mockAnalysis, testOutputPath),
		).resolves.not.toThrow();

		// Verify files were written
		const files = await fs.readdir(testOutputPath);
		expect(files.length).toBeGreaterThan(0);

		// Verify at least one file contains React/TypeScript code
		const firstFile = await fs.readFile(
			`${testOutputPath}/${files[0]}`,
			"utf-8",
		);
		expect(firstFile).toContain("export default function");
	}, 30000); // 30 second timeout for API call

	it("should handle API errors gracefully", async () => {
		// Temporarily remove API key to test error handling
		const originalKey = process.env.ANTHROPIC_API_KEY;
		delete process.env.ANTHROPIC_API_KEY;

		await expect(
			generateLayouts(mockAnalysis, testOutputPath),
		).rejects.toThrow();

		// Restore API key
		if (originalKey) {
			process.env.ANTHROPIC_API_KEY = originalKey;
		}
	});
});
