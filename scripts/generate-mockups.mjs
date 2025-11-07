#!/usr/bin/env node

import fs from "fs";
import path from "path";

const themes = {
	professional: {
		name: "Professional",
		colors: {
			primary: "#1E1F1D",
			secondary: "#F5F4EF",
			accent: "#A76D3E",
		},
		fonts: {
			heading: "DM Serif Display",
			body: "Montserrat",
		},
	},
	modern: {
		name: "Modern",
		colors: {
			primary: "#0A0E27",
			secondary: "#F8F9FA",
			accent: "#3B82F6",
		},
		fonts: {
			heading: "Inter",
			body: "Inter",
		},
	},
	elegant: {
		name: "Elegant",
		colors: {
			primary: "#2C2C2C",
			secondary: "#FAFAFA",
			accent: "#D4AF37",
		},
		fonts: {
			heading: "Playfair Display",
			body: "Lora",
		},
	},
};

function generateMockups(siteName) {
	console.log(`\n🎨 Generating mockups for: ${siteName}\n`);

	const siteDir = path.join(process.cwd(), "content", "sites", siteName);

	if (!fs.existsSync(siteDir)) {
		console.error(`❌ Error: Site "${siteName}" not found in content/sites/`);
		process.exit(1);
	}

	// Read the site config
	const configPath = path.join(siteDir, "config.json");
	const config = JSON.parse(fs.readFileSync(configPath, "utf-8"));

	// Create mockup directory
	const mockupDir = path.join(process.cwd(), "mockups", siteName);
	if (!fs.existsSync(mockupDir)) {
		fs.mkdirSync(mockupDir, { recursive: true });
	}

	// Generate a config for each theme
	Object.entries(themes).forEach(([themeKey, themeData]) => {
		const mockupConfig = {
			...config,
			theme: themeKey,
			colors: themeData.colors,
			fonts: themeData.fonts,
		};

		const mockupPath = path.join(mockupDir, `config-${themeKey}.json`);
		fs.writeFileSync(mockupPath, JSON.stringify(mockupConfig, null, 2));

		console.log(
			`✅ Generated ${themeData.name} theme: mockups/${siteName}/config-${themeKey}.json`,
		);
	});

	// Generate a tailwind config for each theme
	Object.entries(themes).forEach(([themeKey, themeData]) => {
		const tailwindConfig = `/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        charcoal: '${themeData.colors.primary}',
        'soft-white': '${themeData.colors.secondary}',
        copper: '${themeData.colors.accent}',
      },
      fontFamily: {
        serif: ['${themeData.fonts.heading}', 'serif'],
        sans: ['${themeData.fonts.body}', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
`;

		const tailwindPath = path.join(mockupDir, `tailwind.${themeKey}.mjs`);
		fs.writeFileSync(tailwindPath, tailwindConfig);

		console.log(
			`✅ Generated Tailwind config: mockups/${siteName}/tailwind.${themeKey}.mjs`,
		);
	});

	console.log(`\n🎉 Generated ${Object.keys(themes).length} theme variations!`);
	console.log(`\n📝 To preview a theme:`);
	console.log(
		`   1. Copy mockups/${siteName}/tailwind.<theme>.mjs to tailwind.config.mjs`,
	);
	console.log(`   2. Run: npm run dev\n`);
}

// Parse command line arguments
const args = process.argv.slice(2);
const siteName = args[0] || "middle-coast";

generateMockups(siteName);
