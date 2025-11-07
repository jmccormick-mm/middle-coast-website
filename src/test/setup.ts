import { vi } from "vitest";
import "@testing-library/jest-dom";

// Mock Astro runtime globals
(globalThis as typeof globalThis & { Astro: unknown }).Astro = {
	props: {},
	request: new Request("http://localhost:4321/"),
	url: new URL("http://localhost:4321/"),
	redirect: vi.fn(),
	site: new URL("http://localhost:4321/"),
	generator: "Astro v5.15.3",
	slots: {},
	params: {},
	cookies: {
		delete: vi.fn(),
		get: vi.fn(),
		has: vi.fn(),
		set: vi.fn(),
		merge: vi.fn(),
		headers: vi.fn(),
	},
	locals: {},
	preferredLocale: "en",
	preferredLocaleList: ["en"],
	currentLocale: "en",
	clientAddress: "127.0.0.1",
	response: {
		headers: new Headers(),
		status: 200,
	},
	self: globalThis,
};

// Global test utilities
global.testUtils = {
	// Helper to create mock Astro props
	createMockProps: (overrides: Record<string, unknown> = {}) => ({
		...overrides,
	}),

	// Helper to create mock site config
	createMockSiteConfig: (overrides: Record<string, unknown> = {}) => ({
		name: "Test Site",
		tagline: "Test Tagline",
		description: "Test Description",
		calendlyUrl: "https://calendly.com/test",
		colors: {
			primary: "#000000",
			secondary: "#ffffff",
			accent: "#cccccc",
		},
		fonts: {
			heading: "Test Heading Font",
			body: "Test Body Font",
		},
		...overrides,
	}),
};

// Global type definitions for test utilities
declare global {
	var testUtils: {
		createMockProps: (
			overrides?: Record<string, unknown>,
		) => Record<string, unknown>;
		createMockSiteConfig: (
			overrides?: Record<string, unknown>,
		) => Record<string, unknown>;
	};
}

// Mock environment variables that might be used in tests
vi.stubEnv("NODE_ENV", "test");
