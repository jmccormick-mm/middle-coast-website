import { readFile } from "node:fs/promises";
import { MIDDLE_COAST_CONFIG } from "../../src/config/site-config.js";
import { generateLayout } from "../../src/lib/agents/layout-generator.js";
import { writeLayoutFiles } from "../../src/lib/utils/file-writer.js";
import type { URLAnalysis } from "./analyze-url.js";

/**
 * Generates layout components from URL analysis and writes them to disk
 * For MVP: generates single faithful layout directly to production folder
 */
export async function generateLayouts(
	analysis: URLAnalysis,
	outputPath: string,
): Promise<void> {
	try {
		console.log("  Generating faithful layout recreation...");

		// Load Middle Coast content at runtime
		const contentPath = "src/content/middle-coast.json";
		const contentFile = await readFile(contentPath, "utf-8");
		const middleCoastContent = JSON.parse(contentFile);

		// Generate single layout using the prompt template
		const generatedLayout = await generateLayout({
			urlAnalysis: analysis,
			middleCoastContent,
			brandConfig: {
				name: MIDDLE_COAST_CONFIG.brand.name,
				tagline: MIDDLE_COAST_CONFIG.brand.tagline,
				colors: MIDDLE_COAST_CONFIG.colors,
				typography: MIDDLE_COAST_CONFIG.typography,
			},
		});

		// For MVP: write directly to production folder
		const productionPath = "src/layouts/production";
		console.log(`  Writing components to ${productionPath}...`);

		// Write all generated files to disk
		await writeLayoutFiles(generatedLayout, productionPath);

		console.log("  ✅ Layout generation complete!");
		console.log(
			`  Generated ${Object.keys(generatedLayout).length} components`,
		);
	} catch (error) {
		console.error("  ❌ Layout generation failed:", error);
		throw error;
	}
}
