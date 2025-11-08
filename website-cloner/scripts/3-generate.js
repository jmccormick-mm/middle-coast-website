#!/usr/bin/env node

/**
 * Step 3: Generate Rebranded Website
 *
 * Uses Claude API to generate a rebranded HTML website based on:
 * - The structure analysis from step 2
 * - Middle Coast branding configuration
 *
 * Creates a clean, modern HTML/CSS page with Middle Coast branding
 * that mirrors the structure of the reference site.
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const ANALYSIS_FILE = path.join(__dirname, '..', 'output', 'analysis.json');
const BRANDING_FILE = path.join(__dirname, '..', 'config', 'middle-coast-branding.json');
const ORIGINAL_FILE = path.join(__dirname, '..', 'output', 'original.html');
const OUTPUT_FILE = path.join(__dirname, '..', 'output', 'rebranded.html');

async function generateWebsite() {
  console.log('🎨 Step 3: Generating rebranded website with Claude...');

  // Check if required files exist
  if (!fs.existsSync(ANALYSIS_FILE)) {
    throw new Error(`Analysis file not found: ${ANALYSIS_FILE}. Run 'npm run analyze' first.`);
  }
  if (!fs.existsSync(BRANDING_FILE)) {
    throw new Error(`Branding file not found: ${BRANDING_FILE}`);
  }

  // Read the files
  const analysis = JSON.parse(fs.readFileSync(ANALYSIS_FILE, 'utf-8'));
  const branding = JSON.parse(fs.readFileSync(BRANDING_FILE, 'utf-8'));
  const originalHtml = fs.readFileSync(ORIGINAL_FILE, 'utf-8');

  console.log('   📄 Loaded analysis and branding configuration');
  console.log(`   🎯 Target company: ${branding.company.name}`);

  // Initialize Anthropic client
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable not set');
  }

  const anthropic = new Anthropic({ apiKey });

  // Create generation prompt
  const prompt = `Generate a complete, professional HTML website for Middle Coast real estate investment company.

REFERENCE SITE ANALYSIS:
${JSON.stringify(analysis, null, 2)}

MIDDLE COAST BRANDING:
${JSON.stringify(branding, null, 2)}

REFERENCE HTML (for structure inspiration):
${originalHtml.substring(0, 50000)}...

REQUIREMENTS:
1. Create a COMPLETE, self-contained HTML file with embedded CSS
2. Mirror the structure of the reference site (header, hero, content sections, footer)
3. Apply Middle Coast branding:
   - Colors: Charcoal (#1E1F1D), Copper (#A76D3E), Soft White (#F5F4EF)
   - Company name: Middle Coast
   - Tagline: ${branding.company.tagline}
4. Write original content (do NOT copy MWN Capital content):
   - Focus on regional expertise and personalized approach
   - Emphasize strategic partnerships and community impact
   - Professional yet approachable tone
5. Make it responsive and modern:
   - Mobile-friendly
   - Clean, professional design
   - Smooth transitions
   - Professional typography
6. Include these sections:
   - Header with navigation (Home, About, Approach, Contact)
   - Hero section with compelling value proposition
   - About section highlighting Middle Coast's regional focus
   - Investment Approach section with strategic differentiators
   - Contact section with call-to-action

IMPORTANT:
- Return ONLY the complete HTML (no explanations, no markdown code blocks)
- The HTML must be ready to save and open in a browser
- Use semantic HTML5
- Include all CSS inline in a <style> tag
- Make it look professional and polished
- Content should feel authentic to Middle Coast (not a copy of MWN)

Generate the complete HTML now:`;

  try {
    console.log('   🤖 Sending generation request to Claude...');
    console.log('   ⏳ This may take 30-60 seconds...');

    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 16384,  // Large output for complete HTML
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Extract the response
    let html = message.content[0].text;
    console.log('   ✅ Received generated HTML from Claude');

    // Clean up the response (remove markdown code blocks if present)
    html = html.replace(/```html\n/, '').replace(/\n```$/, '').trim();

    // Verify it looks like HTML
    if (!html.toLowerCase().includes('<!doctype') && !html.toLowerCase().includes('<html')) {
      console.warn('   ⚠️  Generated content may not be valid HTML');
    }

    // Save the HTML
    fs.writeFileSync(OUTPUT_FILE, html, 'utf-8');
    const sizeKB = Math.round(html.length / 1024);
    console.log(`   📄 Saved rebranded website: ${OUTPUT_FILE} (${sizeKB}KB)`);

    // Show preview
    const preview = html.substring(0, 300).replace(/\s+/g, ' ');
    console.log(`   Preview: ${preview}...`);

    return {
      success: true,
      file: OUTPUT_FILE,
      size: html.length
    };

  } catch (error) {
    console.error('❌ Error generating website:', error.message);
    throw error;
  }
}

// Main execution
if (require.main === module) {
  generateWebsite()
    .then(result => {
      console.log('\n✨ Generation complete!');
      console.log(`\n🌐 Open this file in your browser:`);
      console.log(`   file://${result.file}`);
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Generation failed:', error.message);
      process.exit(1);
    });
}

module.exports = { generateWebsite };
