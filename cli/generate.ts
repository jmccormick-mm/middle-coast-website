#!/usr/bin/env tsx

import { Command } from "commander";
import { analyzeURL } from "./commands/analyze-url.js";
import { generateLayouts } from "./commands/generate-layouts.js";

const program = new Command();

program
	.name("generate")
	.description("Generate layout variations from a reference URL")
	.argument(
		"<url>",
		"Reference URL to analyze (e.g., https://www.mwncapital.com/)",
	)
	.option("-o, --output <path>", "Output directory", "src/layouts/generated")
	.action(async (url: string, options) => {
		try {
			console.log("🔍 Step 1: Analyzing reference URL...");
			const analysis = await analyzeURL(url);
			console.log("✅ Analysis complete!");
			console.log(JSON.stringify(analysis, null, 2));

			console.log("\n🤖 Step 2: Generating 4 layout variations...");
			await generateLayouts(analysis, options.output);

			console.log("\n✅ Done! Check", options.output);
			console.log("\nNext steps:");
			console.log("  1. Run: npm run dev");
			console.log("  2. Visit: http://localhost:4321/preview");
		} catch (error) {
			console.error("❌ Error:", error.message);
			process.exit(1);
		}
	});

program.parse();
