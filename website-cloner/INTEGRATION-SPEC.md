# CLI Integration Specification

**Purpose**: Enhance the existing CLI workflow (`/cli`) with proven patterns from the website-cloner  
**Goal**: Create a best-of-both-worlds solution with TypeScript, Astro components, and superior UX  
**Status**: Draft Specification  
**Date**: 2024-11-08

---

## Overview

The website-cloner has proven to be a well-designed reference implementation with excellent:
- Prompt engineering for Claude API
- User experience and progress feedback
- Error handling and validation
- Modular architecture

The existing CLI has advantages in:
- TypeScript type safety
- Astro component output format
- Build system integration
- URL parameterization

This specification outlines how to merge the best aspects of both.

---

## Phase 1: Enhanced Analysis

### Goal
Improve `cli/commands/analyze-url.ts` with website-cloner's comprehensive analysis approach.

### Current State
```typescript
// Minimal analysis with basic sections and layout patterns
const prompt = `Analyze this website structure and extract key information...`;
```

### Target State
```typescript
// Comprehensive content-focused analysis with visual style and brand voice
const prompt = `Analyze this real estate investment website and extract CONTENT structure...`;
```

### Changes Required

#### 1.1 Update URLAnalysis Interface
**File**: `cli/commands/analyze-url.ts`

**Add new properties**:
```typescript
export interface URLAnalysis {
  url: string;
  sections: Section[];           // Enhanced below
  layoutPatterns: LayoutPattern[];
  colorUsage: ColorUsage;
  visualStyle: VisualStyle;      // NEW
  navigation: Navigation;         // NEW
  companyFocus: string;          // NEW
  targetAudience: string;        // NEW
}

export interface Section {
  name: string;
  purpose: string;
  elements: string[];
  hierarchy: number;
  layoutPattern: string;         // NEW - e.g., "hero-banner", "card-grid"
  contentType: string;           // NEW - e.g., "headline+cta", "about-text"
  keyMessages: string[];         // NEW - main content themes
}

export interface VisualStyle {
  colors: string;                // Color palette description
  typography: string;            // Font style description
  imagery: string;               // Image usage description
  feeling: string;               // Overall aesthetic
}

export interface Navigation {
  mainPages: string[];           // Main nav items
  cta: string;                   // Primary call-to-action
}
```

#### 1.2 Enhance Analysis Prompt
**File**: `cli/commands/analyze-url.ts`

**Replace current prompt** with website-cloner inspired version:

```typescript
const prompt = `Analyze this real estate investment website HTML and extract its CONTENT structure (not technical implementation).

Look past any frameworks and focus on what actual content sections a visitor sees.

HTML CONTENT:
${bodyText}

HEADINGS FOUND:
${headings.join("\n")}

URL: ${url}

Please analyze and return a JSON object describing the CONTENT STRUCTURE (what sections visitors see):

{
  "sections": [
    {
      "name": "section name (e.g., hero, about-us, investment-approach, portfolio, team, contact)",
      "purpose": "what this section communicates to visitors",
      "layoutPattern": "visual layout (e.g., hero-banner, two-column-text-image, card-grid, testimonials, contact-form)",
      "contentType": "headline+subheadline+cta, about-text, services-list, team-bios, contact-form, etc",
      "keyMessages": ["main", "messages", "or", "content", "themes"],
      "elements": ["key UI elements in this section"],
      "hierarchy": 1-5 (importance level)
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
  "layoutPatterns": [
    {
      "type": "hero | text-block | card-grid | form | footer",
      "structure": "brief description of layout"
    }
  ],
  "colorUsage": {
    "background": ["likely background colors"],
    "text": ["likely text colors"],
    "accents": ["likely accent colors"]
  },
  "companyFocus": "what does this company do and emphasize?",
  "targetAudience": "who is this website targeting?"
}

IMPORTANT:
- Look for actual text content, headings, and sections visible to users
- Ignore technical framework details
- Focus on the investment/real estate content
- Identify the narrative arc of the site (hero → about → approach → contact, etc.)
- Return ONLY valid JSON, no markdown code blocks`;
```

#### 1.3 Update Model Version (Optional)
Consider updating to match website-cloner:
```typescript
model: "claude-sonnet-4-5-20250929"  // Latest version
```

**Testing**: Compare output quality between versions first.

---

## Phase 2: Orchestrator Pattern

### Goal
Add a coordinating script that provides better UX like website-cloner's orchestrator.

### New File: `cli/orchestrate.ts`

```typescript
#!/usr/bin/env tsx

import { Command } from "commander";
import { analyzeURL } from "./commands/analyze-url.js";
import { generateLayouts } from "./commands/generate-layouts.js";

const program = new Command();

program
  .name("orchestrate")
  .description("Run complete analysis → generation pipeline with progress feedback")
  .argument("<url>", "Reference URL to analyze (e.g., https://www.mwncapital.com/)")
  .option("-o, --output <path>", "Output directory", "src/layouts/production")
  .action(async (url: string, options) => {
    console.log('🚀 Middle Coast Layout Generator - Complete Pipeline\n');
    console.log('═══════════════════════════════════════════════════════\n');

    const startTime = Date.now();
    let results: any = {};

    try {
      // Step 1: Analyze
      console.log('STEP 1: ANALYZE REFERENCE WEBSITE');
      console.log('───────────────────────────────────────────────────────');
      console.log(`  🔍 Fetching ${url}...`);
      
      const analysis = await analyzeURL(url);
      results.analysis = analysis;
      
      console.log('  ✅ Analysis complete!');
      console.log(`  📊 Found ${analysis.sections.length} sections`);
      if (analysis.sections) {
        analysis.sections.forEach((section: any) => {
          console.log(`     - ${section.name}: ${section.layoutPattern || section.purpose}`);
        });
      }
      console.log('');

      // Step 2: Generate
      console.log('STEP 2: GENERATE ASTRO COMPONENTS');
      console.log('───────────────────────────────────────────────────────');
      console.log('  🤖 Generating layouts with Claude...');
      console.log('  ⏳ This may take 30-60 seconds...');
      
      await generateLayouts(analysis, options.output);
      results.outputPath = options.output;
      
      console.log('');

      // Summary
      const duration = Math.round((Date.now() - startTime) / 1000);
      console.log('═══════════════════════════════════════════════════════');
      console.log('✨ PIPELINE COMPLETE!\n');
      console.log(`⏱️  Total time: ${duration} seconds\n`);
      console.log('📊 Results:');
      console.log(`   • Analyzed URL: ${url}`);
      console.log(`   • Sections found: ${analysis.sections.length}`);
      console.log(`   • Output location: ${options.output}`);
      console.log('');
      console.log('🌐 Next Steps:');
      console.log('   1. Run: npm run dev');
      console.log('   2. Visit: http://localhost:4321/');
      console.log('   3. Review generated components in:', options.output);
      console.log('');

    } catch (error: any) {
      console.error('\n═══════════════════════════════════════════════════════');
      console.error('💥 PIPELINE FAILED\n');
      console.error(`Error: ${error.message}\n`);

      // Helpful debugging
      if (error.message.includes('ANTHROPIC_API_KEY')) {
        console.error('💡 Make sure ANTHROPIC_API_KEY environment variable is set');
      } else if (error.message.includes('fetch')) {
        console.error('💡 Check that the URL is accessible and valid');
      }

      if (error.stack) {
        console.error('\nStack trace:');
        console.error(error.stack);
      }

      process.exit(1);
    }
  });

program.parse();
```

### Update package.json Scripts
**File**: `/cli/package.json` (or root `package.json` if CLI integrated there)

```json
{
  "scripts": {
    "generate": "tsx generate.ts",
    "orchestrate": "tsx orchestrate.ts"
  }
}
```

**Usage**:
```bash
# Old way (still works)
npm run generate https://www.mwncapital.com/

# New way (better UX)
npm run orchestrate https://www.mwncapital.com/
```

---

## Phase 3: Enhanced Logging & Error Handling

### Goal
Add emoji, better formatting, and helpful error messages throughout.

### 3.1 Update `analyze-url.ts`

**Before**:
```typescript
console.log(`  Fetching ${url}...`);
console.log(`  Found ${sections} sections, ${headings.length} headings`);
console.log("  Analyzing structure with Claude...");
```

**After**:
```typescript
console.log(`  🔍 Fetching ${url}...`);
console.log(`  ✅ Found ${sections} sections, ${headings.length} headings`);
console.log("  🤖 Analyzing structure with Claude...");
console.log("  ⏳ Please wait...");
// After success:
console.log("  ✅ Analysis complete!");
```

### 3.2 Update `generate-layouts.ts`

**Before**:
```typescript
console.log("  Generating faithful layout recreation...");
console.log(`  Writing components to ${productionPath}...`);
console.log("  ✅ Layout generation complete!");
```

**After**:
```typescript
console.log("  🎨 Generating faithful layout recreation...");
console.log(`  📝 Writing components to ${productionPath}...`);
console.log("  ✅ Layout generation complete!");
console.log(`  📊 Generated ${Object.keys(generatedLayout).length} components`);

// List generated files
Object.keys(generatedLayout).forEach(filename => {
  const size = Math.round(generatedLayout[filename].length / 1024);
  console.log(`     - ${filename} (${size}KB)`);
});
```

### 3.3 Better Error Handling Pattern

**Apply to all CLI files**:

```typescript
try {
  // ... operation
} catch (error: any) {
  console.error('❌ Error [operation name]:', error.message);
  
  // Context-specific help
  if (error.message.includes('ANTHROPIC_API_KEY')) {
    console.error('   💡 Set your API key: export ANTHROPIC_API_KEY=sk-...');
  } else if (error.message.includes('fetch')) {
    console.error('   💡 Verify the URL is accessible and valid');
  } else if (error.message.includes('JSON')) {
    console.error('   💡 Claude response may not be valid JSON');
    console.error('   💡 Try running again or check the model output');
  }
  
  throw error;  // Re-throw to allow caller to handle
}
```

---

## Phase 4: Configuration Management

### Goal
Centralize branding configuration similar to website-cloner.

### Option A: JSON Configuration (website-cloner style)
**New File**: `cli/config/branding.json`

```json
{
  "company": {
    "name": "Middle Coast",
    "tagline": "Strategic Real Estate Investment",
    "description": "Middle Coast brings sophisticated real estate investment strategies to the heartland."
  },
  "colors": {
    "primary": { "charcoal": "#1E1F1D" },
    "accent": { "copper": "#A76D3E" },
    "background": { "softWhite": "#F5F4EF" }
  },
  "typography": {
    "primary": "Inter, system-ui, sans-serif",
    "headings": "Georgia, serif"
  },
  "brandVoice": {
    "tone": "Professional yet approachable",
    "keywords": ["strategic", "sophisticated", "trusted", "regional focus"]
  }
}
```

**Load in** `generate-layouts.ts`:
```typescript
import brandingConfig from '../config/branding.json';

// Use in generation:
const generatedLayout = await generateLayout({
  urlAnalysis: analysis,
  middleCoastContent,
  brandConfig: brandingConfig
});
```

### Option B: Keep TypeScript Config (current approach)
**Keep using**: `src/config/site-config.ts`

**Advantage**: Type safety  
**Disadvantage**: Less portable than JSON

**Recommendation**: Stick with TypeScript config but ensure it's comprehensive.

---

## Phase 5: Additional Improvements

### 5.1 Add Retry Logic
For API calls that may timeout or fail intermittently:

```typescript
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries = 3,
  baseDelay = 1000
): Promise<T> {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (error) {
      if (i === maxRetries - 1) throw error;
      
      const delay = baseDelay * Math.pow(2, i);
      console.log(`   ⚠️  Attempt ${i + 1} failed, retrying in ${delay}ms...`);
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
  throw new Error('Max retries reached');
}

// Usage:
const message = await retryWithBackoff(() =>
  anthropic.messages.create({
    model: "claude-sonnet-4-20250514",
    max_tokens: 4000,
    messages: [{ role: "user", content: prompt }]
  })
);
```

### 5.2 Add Caching (Optional)
Cache analysis results to avoid re-analyzing unchanged URLs:

```typescript
import { createHash } from 'crypto';
import { readFile, writeFile } from 'fs/promises';

async function getCachedAnalysis(url: string, html: string): Promise<URLAnalysis | null> {
  const cacheDir = '.cache/analyses';
  const hash = createHash('md5').update(html).digest('hex');
  const cachePath = `${cacheDir}/${hash}.json`;
  
  try {
    const cached = await readFile(cachePath, 'utf-8');
    console.log('  ⚡ Using cached analysis');
    return JSON.parse(cached);
  } catch {
    return null;
  }
}

async function cacheAnalysis(html: string, analysis: URLAnalysis): Promise<void> {
  const cacheDir = '.cache/analyses';
  const hash = createHash('md5').update(html).digest('hex');
  await mkdir(cacheDir, { recursive: true });
  await writeFile(`${cacheDir}/${hash}.json`, JSON.stringify(analysis, null, 2));
}
```

### 5.3 Add HTML Validation
Validate generated components with basic checks:

```typescript
function validateAstroComponent(content: string, filename: string): boolean {
  const issues: string[] = [];
  
  if (!content.includes('---')) {
    issues.push('Missing frontmatter section (---)');
  }
  
  if (!content.includes('<')) {
    issues.push('No HTML tags found');
  }
  
  if (filename.endsWith('.astro') && !content.match(/export\s+interface\s+Props/)) {
    console.warn(`   ⚠️  ${filename}: No Props interface defined`);
  }
  
  if (issues.length > 0) {
    console.error(`   ❌ ${filename} validation failed:`);
    issues.forEach(issue => console.error(`      - ${issue}`));
    return false;
  }
  
  return true;
}
```

---

## Implementation Roadmap

### Priority 1: Core Improvements (Immediate)
- [ ] Enhance analysis prompt (Phase 1.2)
- [ ] Update URLAnalysis interface (Phase 1.1)
- [ ] Add emoji logging (Phase 3.1, 3.2)
- [ ] Improve error messages (Phase 3.3)

### Priority 2: UX Enhancements (Short-term)
- [ ] Create orchestrator script (Phase 2)
- [ ] Add progress indicators
- [ ] Show component summaries
- [ ] Display file sizes and counts

### Priority 3: Reliability (Medium-term)
- [ ] Add retry logic (Phase 5.1)
- [ ] Implement better JSON parsing
- [ ] Add input validation
- [ ] Improve error recovery

### Priority 4: Advanced Features (Long-term)
- [ ] Add caching (Phase 5.2)
- [ ] Add component validation (Phase 5.3)
- [ ] Consider configuration format (Phase 4)
- [ ] Add integration tests

---

## Testing Plan

### Unit Tests
Create tests for each phase:

```typescript
// tests/cli/analyze-url.test.ts
describe('analyzeURL', () => {
  it('should parse enhanced analysis response', async () => {
    const mockResponse = { /* ... */ };
    // Test new fields exist
    expect(result.visualStyle).toBeDefined();
    expect(result.navigation).toBeDefined();
    expect(result.sections[0].layoutPattern).toBeDefined();
  });
});
```

### Integration Tests
Test full pipeline:

```typescript
// tests/cli/orchestrate.test.ts
describe('orchestrate command', () => {
  it('should run full pipeline successfully', async () => {
    // Mock API responses
    // Run orchestrator
    // Verify output files created
  });
});
```

### Manual Testing Checklist
- [ ] Run orchestrator with real URL
- [ ] Verify all log messages display correctly
- [ ] Check emoji render in terminal
- [ ] Validate error messages are helpful
- [ ] Confirm component files generated
- [ ] Test with invalid URL
- [ ] Test without API key
- [ ] Test with network error

---

## Migration Strategy

### Backwards Compatibility
Keep both approaches working during transition:

```json
{
  "scripts": {
    "generate": "tsx generate.ts",           // Old way
    "orchestrate": "tsx orchestrate.ts",     // New way
    "generate:legacy": "tsx generate.ts"     // Explicit legacy
  }
}
```

### Deprecation Timeline
1. **Week 1-2**: Implement Phase 1 (enhanced analysis)
2. **Week 2-3**: Add Phase 2 (orchestrator) as alternative
3. **Week 3-4**: Add Phase 3 (logging improvements)
4. **Week 4+**: Monitor usage, eventually deprecate old `generate` command

---

## Success Metrics

### Quantitative
- [ ] Analysis extracts 5+ additional fields
- [ ] Error messages include helpful suggestions 90%+ of time
- [ ] Pipeline completion time displayed
- [ ] Generated component count shown
- [ ] File sizes reported

### Qualitative
- [ ] Developers report better understanding of pipeline
- [ ] Error debugging is faster
- [ ] Generated components meet quality standards
- [ ] CLI output is more professional

---

## Documentation Updates Required

### README Updates
Document new orchestrator command:

```markdown
## Usage

### Quick Start (Recommended)
\`\`\`bash
npm run orchestrate https://www.example.com/
\`\`\`

### Step-by-Step
\`\`\`bash
# Analyze only
npm run generate https://www.example.com/ --analyze-only

# Generate from existing analysis
npm run generate --from-cache
\`\`\`
```

### Architecture Docs
Update ARCHITECTURE.md to reflect:
- Enhanced analysis fields
- Orchestrator pattern
- Error handling strategy
- Configuration approach

---

## Risks & Mitigation

### Risk 1: Breaking Changes
**Mitigation**: Keep old interfaces working, add new fields as optional

### Risk 2: API Response Changes
**Mitigation**: Robust JSON parsing with fallbacks

### Risk 3: Performance Regression
**Mitigation**: Benchmark before/after, optimize if needed

### Risk 4: User Confusion
**Mitigation**: Clear documentation and migration guide

---

## Open Questions

1. **Model Version**: Should we update to `claude-sonnet-4-5-20250929`?
   - **Decision**: Test both, compare quality vs. cost

2. **Configuration Format**: TypeScript or JSON?
   - **Decision**: Keep TypeScript for type safety

3. **Caching**: Worth the complexity?
   - **Decision**: Add in Phase 4 if users request it

4. **HTML Truncation**: Current limits OK?
   - **Decision**: Monitor, adjust if needed

---

## Conclusion

This specification provides a clear path to enhance the CLI workflow with proven patterns from website-cloner while maintaining TypeScript benefits and Astro component output.

The phased approach allows incremental improvement with testing at each stage.

**Next Steps**:
1. Review this spec with stakeholders
2. Prioritize phases
3. Begin implementation with Phase 1
4. Test each phase thoroughly
5. Update documentation
6. Deploy incrementally

---

**Status**: Draft Specification  
**Author**: GitHub Copilot Agent  
**Date**: 2024-11-08  
**Version**: 1.0
