#!/usr/bin/env tsx

import { Command } from "commander";
import { analyzeURL } from "./commands/analyze-url";
import { generateLayouts } from "./commands/generate-layouts";

const program = new Command();

program
	.name("generate")
	.description("Generate layout variations from a reference URL")
	.argument("<url>", "Reference URL to analyze")
	.option("-o, --output <path>", "Output directory", "src/layouts/generated")
	.action(async (url: string, options) => {
		console.log("🔍 Analyzing reference URL...");
		const analysis = await analyzeURL(url);

		console.log("🤖 Generating 4 layout variations...");
		await generateLayouts(analysis, options.output);

		console.log("✅ Done! Check src/layouts/generated/");
	});
program.parse();
