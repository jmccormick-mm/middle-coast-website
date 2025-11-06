import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  theme: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  contact: {
    calendlyUrl?: string;
  };
  sections: string[];
}

export interface AboutContent {
  title: string;
  content: string;
}

export interface Pillar {
  title: string;
  description: string;
}

export interface ApproachContent {
  title: string;
  pillars: Pillar[];
}

export function loadSiteConfig(siteName: string): SiteConfig {
  const configPath = path.join(process.cwd(), 'content', 'sites', siteName, 'config.json');
  const configData = fs.readFileSync(configPath, 'utf-8');
  return JSON.parse(configData);
}

export function loadAboutContent(siteName: string): AboutContent {
  const aboutPath = path.join(process.cwd(), 'content', 'sites', siteName, 'about.md');
  const fileContent = fs.readFileSync(aboutPath, 'utf-8');
  const { data, content } = matter(fileContent);
  
  return {
    title: data.title || 'About',
    content: content.trim()
  };
}

export function loadApproachContent(siteName: string): ApproachContent {
  const approachPath = path.join(process.cwd(), 'content', 'sites', siteName, 'approach.md');
  const fileContent = fs.readFileSync(approachPath, 'utf-8');
  const { data } = matter(fileContent);
  
  return {
    title: data.title || 'Our Approach',
    pillars: data.pillars || []
  };
}
