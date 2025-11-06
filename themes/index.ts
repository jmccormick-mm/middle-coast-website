export interface Theme {
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  style: 'professional' | 'modern' | 'elegant';
}

export const themes: Record<string, Theme> = {
  professional: {
    name: 'Professional',
    colors: {
      primary: '#1E1F1D',      // Charcoal
      secondary: '#F5F4EF',    // Soft White
      accent: '#A76D3E',       // Copper
    },
    fonts: {
      heading: 'DM Serif Display',
      body: 'Montserrat',
    },
    style: 'professional',
  },
  modern: {
    name: 'Modern',
    colors: {
      primary: '#0A0E27',      // Deep Navy
      secondary: '#F8F9FA',    // Light Gray
      accent: '#3B82F6',       // Bright Blue
    },
    fonts: {
      heading: 'Inter',
      body: 'Inter',
    },
    style: 'modern',
  },
  elegant: {
    name: 'Elegant',
    colors: {
      primary: '#2C2C2C',      // Dark Gray
      secondary: '#FAFAFA',    // Off White
      accent: '#D4AF37',       // Gold
    },
    fonts: {
      heading: 'Playfair Display',
      body: 'Lora',
    },
    style: 'elegant',
  },
};
