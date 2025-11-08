#!/usr/bin/env node

/**
 * Step 2: Analyze Website Structure
 *
 * Uses Claude API to analyze the fetched HTML and extract:
 * - Page sections and their purpose
 * - Layout patterns
 * - Color scheme
 * - Content types and hierarchy
 * - Navigation structure
 *
 * Saves analysis to output/analysis.json
 */

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');

const INPUT_FILE = path.join(__dirname, '..', 'output', 'original.html');
const OUTPUT_FILE = path.join(__dirname, '..', 'output', 'analysis.json');

async function analyzeWebsite() {
  console.log('🔍 Step 2: Analyzing website structure with Claude...');

  // Check if input file exists
  if (!fs.existsSync(INPUT_FILE)) {
    throw new Error(`Input file not found: ${INPUT_FILE}. Run 'npm run fetch' first.`);
  }

  // Read the HTML
  const html = fs.readFileSync(INPUT_FILE, 'utf-8');
  console.log(`   📄 Read ${Math.round(html.length / 1024)}KB of HTML`);

  // Initialize Anthropic client
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new Error('ANTHROPIC_API_KEY environment variable not set');
  }

  const anthropic = new Anthropic({ apiKey });

  // Create the analysis prompt
  const prompt = `Analyze this real estate investment website HTML and extract its CONTENT structure (not technical implementation).

This is a Wix-based site. Look past the framework and focus on what actual content sections a visitor sees.

HTML:
${html.substring(0, 150000)} ${html.length > 150000 ? '...(truncated)' : ''}

Please analyze and return a JSON object describing the CONTENT STRUCTURE (what sections visitors see):

{
  "sections": [
    {
      "name": "section name (e.g., hero, about-us, investment-approach, portfolio, team, contact)",
      "purpose": "what this section communicates to visitors",
      "layoutPattern": "visual layout (e.g., hero-banner, two-column-text-image, card-grid, testimonials, contact-form)",
      "contentType": "headline+subheadline+cta, about-text, services-list, team-bios, contact-form, etc",
      "keyMessages": ["main", "messages", "or", "content", "themes"]
    }
  ],
  "visualStyle": {
    "colors": "describe the color palette (e.g., dark blues, gold accents, white backgrounds)",
    "typography": "describe font style (e.g., serif headings, sans-serif body, professional)",
    "imagery": "what kind of images are used (e.g., office photos, building photos, team photos)",
    "feeling": "overall visual feeling (e.g., professional, trustworthy, sophisticated, corporate)"
  },
  "navigation": {
    "mainPages": ["list", "of", "main", "navigation", "items"],
    "cta": "main call-to-action text/theme"
  },
  "companyFocus": "what does this company do and emphasize?",
  "targetAudience": "who is this website targeting?"
}

IMPORTANT:
- Look for actual text content, headings, and sections visible to users
- Ignore technical Wix framework details
- Focus on the investment/real estate content
- Identify the narrative arc of the site (hero → about → approach → contact, etc.)
- Return ONLY the JSON object, no other text`;


  try {
    console.log('   🤖 Sending to Claude API...');
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: prompt
      }]
    });

    // Extract the response
    const response = message.content[0].text;
    console.log('   ✅ Received analysis from Claude');

    // Try to parse the JSON from the response
    let analysis;
    try {
      // Claude might wrap JSON in markdown code blocks
      const jsonMatch = response.match(/```json\n([\s\S]+?)\n```/) || response.match(/```\n([\s\S]+?)\n```/);
      if (jsonMatch) {
        analysis = JSON.parse(jsonMatch[1]);
      } else {
        // Try to parse the whole response as JSON
        analysis = JSON.parse(response);
      }
    } catch (parseError) {
      console.warn('   ⚠️  Response is not pure JSON, wrapping it');
      analysis = {
        rawResponse: response,
        parsedAt: new Date().toISOString(),
        note: 'Claude response was not pure JSON, stored as rawResponse'
      };
    }

    // Add metadata
    analysis.metadata = {
      analyzedAt: new Date().toISOString(),
      sourceFile: INPUT_FILE,
      model: 'claude-sonnet-4-5-20250929'
    };

    // Save analysis
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(analysis, null, 2), 'utf-8');
    console.log(`   📄 Saved analysis to: ${OUTPUT_FILE}`);

    // Show summary
    if (analysis.sections) {
      console.log(`   📊 Found ${analysis.sections.length} sections:`);
      analysis.sections.forEach(section => {
        console.log(`      - ${section.name}: ${section.layoutPattern}`);
      });
    }

    return {
      success: true,
      file: OUTPUT_FILE,
      analysis
    };

  } catch (error) {
    console.error('❌ Error analyzing website:', error.message);
    throw error;
  }
}

// Main execution
if (require.main === module) {
  analyzeWebsite()
    .then(result => {
      console.log('\n✨ Analysis complete!');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Analysis failed:', error.message);
      process.exit(1);
    });
}

module.exports = { analyzeWebsite };
