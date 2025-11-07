import Anthropic from "@anthropic-ai/sdk";
import * as cheerio from "cheerio";

export interface URLAnalysis {
	url: string;
	sections: Section[];
	layoutPatterns: LayoutPattern[];
	colorUsage: ColorUsage;
}

export interface Section {
	name: string;
	purpose: string;
	elements: string[];
	hierarchy: number;
}

export interface LayoutPattern {
	type: "hero" | "text-block" | "card-grid" | "form" | "footer";
	structure: string;
}

export interface ColorUsage {
	background: string[];
	text: string[];
	accents: string[];
}

export async function analyzeURL(url: string): Promise<URLAnalysis> {
	console.log(`  Fetching ${url}...`);

	// 1. Fetch the HTML
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error(`Failed to fetch URL: ${response.statusText}`);
	}

	const html = await response.text();
	const $ = cheerio.load(html);

	// 2. Extract text content and structure
	const bodyText = $("body").text().slice(0, 5000); // First 5000 chars
	const headings = $("h1, h2, h3")
		.map((_, el) => $(el).text())
		.get();
	const sections = $('section, .section, [class*="section"]').length;

	console.log(`  Found ${sections} sections, ${headings.length} headings`);

	// 3. Send to Claude for structural analysis
	const client = new Anthropic({
		apiKey: process.env.ANTHROPIC_API_KEY,
	});

	console.log("  Analyzing structure with Claude...");

	const prompt = `Analyze this website structure and extract key information:

URL: ${url}

HEADINGS:
${headings.join("\n")}

CONTENT SAMPLE:
${bodyText}

Provide a JSON response with:
1. sections: Array of distinct sections (likely: hero, about, services/approach, contact, footer)
   For each section provide:
   - name: short descriptive name
   - purpose: what this section does
   - elements: key UI elements (heading, text, CTA, etc)
   - hierarchy: importance level 1-5

2. layoutPatterns: Array describing layout types used
   - type: hero | text-block | card-grid | form | footer
   - structure: brief description

3. colorUsage: Guess the general color strategy
   - background: likely background colors
   - text: likely text colors  
   - accents: likely accent colors

Return ONLY valid JSON, no markdown formatting.`;

	const message = await client.messages.create({
		model: "claude-sonnet-4-20250514",
		max_tokens: 4000,
		messages: [
			{
				role: "user",
				content: prompt,
			},
		],
	});

	const responseText =
		message.content[0].type === "text" ? message.content[0].text : "";

	// Extract JSON from response (handle markdown code blocks if present)
	let jsonText = responseText.trim();
	if (jsonText.startsWith("```json")) {
		jsonText = jsonText.replace(/```json\n?/g, "").replace(/```\n?/g, "");
	} else if (jsonText.startsWith("```")) {
		jsonText = jsonText.replace(/```\n?/g, "");
	}

	const analysis = JSON.parse(jsonText);

	return {
		url,
		...analysis,
	};
}
