import Anthropic from "@anthropic-ai/sdk";
import {
	buildGeneratePrompt,
	type GeneratePromptParams,
} from "./prompts/generate.js";

/**
 * Parameters for layout generation
 */
export interface LayoutGeneratorParams {
	urlAnalysis: GeneratePromptParams["urlAnalysis"];
	middleCoastContent: GeneratePromptParams["middleCoastContent"];
	brandConfig: GeneratePromptParams["brandConfig"];
}

/**
 * Generated layout result - map of filename to component code
 */
export interface GeneratedLayout {
	[filename: string]: string;
}

/**
 * Generates React/TypeScript layout components using Claude API
 * Returns a map of filename to component code
 */
export async function generateLayout(
	params: LayoutGeneratorParams,
): Promise<GeneratedLayout> {
	try {
		console.log("    Calling Claude API for layout generation...");

		// Initialize Anthropic client
		const client = new Anthropic({
			apiKey: process.env.ANTHROPIC_API_KEY,
		});

		// Build the comprehensive prompt
		const prompt = buildGeneratePrompt(params);
		console.log(`    Prompt length: ${prompt.length} characters`);

		// Call Claude API
		const message = await client.messages.create({
			model: "claude-3-5-sonnet-20241022",
			max_tokens: 8000,
			messages: [
				{
					role: "user",
					content: prompt,
				},
			],
		});

		// Extract response text
		const responseText =
			message.content[0].type === "text" ? message.content[0].text : "";

		console.log("    ✅ Claude response received");
		console.log(`    Response length: ${responseText.length} characters`);

		// Parse components from XML tags
		const generatedLayout = parseComponentsFromResponse(responseText);

		console.log(
			`    Extracted ${Object.keys(generatedLayout).length} components`,
		);

		return generatedLayout;
	} catch (error) {
		console.error("    ❌ Layout generation error:", error);
		throw new Error(`Layout generation failed: ${error.message}`);
	}
}

/**
 * Parses Claude's response to extract component code from XML tags
 * Expected format: <Component name="ComponentName">code here</Component>
 * @public for testing
 */
export function parseComponentsFromResponse(response: string): GeneratedLayout {
	const components: GeneratedLayout = {};

	// Regular expression to match XML component tags
	const componentRegex = /<Component name="([^"]+)">([\s\S]*?)<\/Component>/g;

	let match;
	while ((match = componentRegex.exec(response)) !== null) {
		const [, componentName, componentCode] = match;
		const filename = `${componentName}.tsx`;

		// Clean up the component code (remove extra whitespace, etc.)
		const cleanCode = componentCode.trim();

		// Basic validation - ensure it looks like TypeScript/React code
		if (
			cleanCode.includes("interface") ||
			cleanCode.includes("export default function") ||
			cleanCode.includes("return")
		) {
			components[filename] = cleanCode;
			console.log(`      ✓ Extracted ${filename} (${cleanCode.length} chars)`);
		} else {
			console.warn(
				`      ⚠ Skipping ${filename} - doesn't look like valid code`,
			);
		}
	}

	// Ensure we got at least some components
	if (Object.keys(components).length === 0) {
		throw new Error(
			"No valid components extracted from Claude response. Response format may be incorrect.",
		);
	}

	return components;
}
