# Website Cloner

Clone and rebrand websites using Claude API.

## Purpose

This tool fetches a reference website (mwncapital.com), analyzes its structure using Claude AI, and generates a rebranded version with Middle Coast branding.

## Quick Start

```bash
# Install dependencies
npm install

# Run complete pipeline
npm run clone

# Or run individual steps
npm run fetch      # Fetch reference website
npm run analyze    # Analyze structure with Claude
npm run generate   # Generate rebranded version
```

## Architecture

```
website-cloner/
├── config/
│   └── middle-coast-branding.json  # Brand colors, fonts, voice
├── scripts/
│   ├── 1-fetch.js                  # Fetch reference HTML
│   ├── 2-analyze.js                # Claude: extract structure
│   ├── 3-generate.js               # Claude: generate rebrand
│   └── orchestrator.js             # Run all steps
└── output/
    ├── original.html               # Fetched source
    ├── analysis.json               # Structure analysis
    └── rebranded.html              # Final output
```

## Environment Variables

```bash
export ANTHROPIC_API_KEY=your_key_here
```

## How It Works

### 1. Fetch (scripts/1-fetch.js)
- Fetches https://www.mwncapital.com/ HTML
- Saves to `output/original.html`
- Handles errors gracefully

### 2. Analyze (scripts/2-analyze.js)
- Uses Claude API to analyze the HTML structure
- Extracts:
  - Page sections (hero, about, approach, contact, etc.)
  - Layout patterns
  - Color scheme
  - Content types
  - Navigation structure
- Saves analysis to `output/analysis.json`

### 3. Generate (scripts/3-generate.js)
- Uses Claude API with analysis + branding config
- Generates rebranded HTML that:
  - Keeps the original structure and layout patterns
  - Applies Middle Coast colors, fonts, and visual style
  - Replaces content with Middle Coast messaging
  - Maintains responsive design
- Saves to `output/rebranded.html`

### 4. Orchestrator (scripts/orchestrator.js)
- Runs all three steps in sequence
- Handles errors and logging
- Provides progress feedback

## Middle Coast Branding

- **Primary Color:** #1E1F1D (charcoal)
- **Accent:** #A76D3E (copper)
- **Background:** #F5F4EF (soft white)
- **Tone:** Professional yet approachable
- **Focus:** Regional expertise, strategic partnerships

See `config/middle-coast-branding.json` for complete brand guidelines.

## Output

Open `output/rebranded.html` in a browser to see the result.

## Development Notes

This tool was built as part of the `claude/clone-rebrand-mwn-capital` task. See:
- `../DECISION-LOG.md` - Why this approach was chosen
- `../SESSION-LOG.md` - Complete development timeline
- `../BLOCKER-REPORT.md` - Technical challenges encountered

## Testing

Manual testing:
1. Run `npm run clone`
2. Open `output/rebranded.html` in browser
3. Verify:
   - Middle Coast branding applied
   - Structure matches reference site
   - Content is differentiated
   - Colors are correct
   - Layout is clean and functional
