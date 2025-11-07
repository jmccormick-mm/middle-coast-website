export const MIDDLE_COAST_CONFIG = {
	brand: {
		name: "Middle Coast",
		tagline: "Quiet Strength. Real Returns.",
	},

	colors: {
		primary: {
			charcoal: "#1E1F1D",
			softWhite: "#F5F4EF",
		},
		accent: {
			copper: "#A76D3E",
		},
		supporting: {
			deepOlive: "#3C4037",
			warmGray: "#7A7F78",
		},
	},

	typography: {
		fonts: {
			serif: '"DM Serif Display", serif',
			sans: '"Montserrat", sans-serif',
			alt: '"Lora", serif',
		},
	},

	sections: ["Hero", "About", "Approach", "Contact"],
} as const;

export type SectionName = (typeof MIDDLE_COAST_CONFIG.sections)[number];
