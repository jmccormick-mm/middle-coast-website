/// <reference types="vitest/config" />
import { getViteConfig } from "astro/config";

export default getViteConfig({
	test: {
		// Test environment configuration
		environment: "happy-dom", // Faster alternative to jsdom for most cases

		// Test files patterns
		include: [
			"src/**/*.{test,spec}.{js,ts,jsx,tsx}",
			"tests/**/*.{test,spec}.{js,ts,jsx,tsx}",
			"__tests__/**/*.{test,spec}.{js,ts,jsx,tsx}",
		],

		// Setup files to run before each test
		setupFiles: ["./src/test/setup.ts"],

		// Global test configuration
		globals: true, // Enable global test functions like describe, it, expect

		// Coverage configuration for TDD workflow
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "json"],
			reportsDirectory: "./coverage",
			exclude: [
				"node_modules/",
				"dist/",
				"coverage/",
				"**/*.d.ts",
				"**/*.config.*",
				"**/setup.ts",
			],
			// Thresholds for TDD (start conservative, increase over time)
			thresholds: {
				statements: 80,
				branches: 70,
				functions: 80,
				lines: 80,
			},
		},

		// Output configuration
		outputFile: {
			junit: "./test-results/junit.xml",
		},

		// Test timeout configuration
		testTimeout: 10000, // 10 seconds default timeout
		hookTimeout: 10000, // 10 seconds for setup/teardown hooks

		// Pool configuration for better performance
		pool: "threads",
	},
});
