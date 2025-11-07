# Implementation Plan: Complete Generate CLI Tool (MVP - Single Layout)

**Feature**: AI-powered layout generation from reference URLs with Middle Coast branding  
**Status**: In Progress (15% complete)  
**Priority**: High  
**Estimated Effort**: 1-2 weeks (MVP), then iterate

---

## 1. Overview

### Problem Statement
The `generate` CLI tool currently only analyzes reference URLs but cannot generate actual layout components. The workflow stops after URL analysis, leaving 80% of the AI-powered functionality unimplemented.

### Goals (MVP - Simplified)
1. Complete the generation pipeline: URL analysis → layout generation → file writing → production deployment
2. Generate **ONE faithful layout** that recreates the reference URL structure with Middle Coast branding
3. Apply Middle Coast branding (colors, typography, content) to the generated layout
4. Deploy directly to production layout (skip preview/variation system for now)
5. **Future**: Extend to multiple variations once single layout workflow is proven

### Success Metrics
- [ ] `npm run generate -- <url>` completes without errors
- [ ] Single complete layout generated in `src/layouts/production/`
- [ ] All generated TypeScript/React code compiles without errors
- [ ] Production page (`/`) renders the generated layout correctly
- [ ] Generated layout respects Middle Coast brand guidelines
- [ ] Layout structure faithfully recreates reference URL patterns

---

## 2. Technical Approach

### Architecture Changes
**Current State**: CLI → analyze-url.ts → (stops)

**Target State (MVP)**: 
```
CLI (generate.ts)
  ├─> analyze-url.ts (✅ complete)
  └─> generate-layouts.ts (❌ empty)
      ├─> layout-generator.ts (❌ stub)
      │   └─> prompts/generate.ts (❌ empty)
      └─> file-writer.ts (❌ stub)
```

**Note**: Removed `variation-engine.ts` from MVP - single layout only

### Key Components

#### 1. Prompt System (`src/lib/agents/prompts/generate.ts`)
- **Purpose**: Define Claude API prompt for layout generation
- **Input**: URLAnalysis + variation parameters + Middle Coast content
- **Output**: Prompt string with structured instructions
- **Key Requirements**:
  - Include React + TypeScript + Tailwind guidelines
  - Specify Middle Coast brand colors/fonts
  - Provide content from `middle-coast.json`
  - Request structured output (XML tags or code blocks)

#### 2. Layout Generator (`src/lib/agents/layout-generator.ts`)
- **Purpose**: Call Claude API to generate React components
- **Input**: URLAnalysis, variation parameters, output path
- **Output**: Generated component code as strings
- **Key Requirements**:
  - Construct prompt using prompt templates
  - Call Anthropic SDK (similar to analyze-url.ts)
  - Parse Claude response to extract component code
  - Validate extracted code (syntax check)
  - Return map of { filename: code }
#### 3. File Writer (`src/lib/utils/file-writer.ts`)
#### 4. File Writer (`src/lib/utils/file-writer.ts`)
- **Purpose**: Write generated components to disk
- **Input**: Map of { filename: code }, output directory
- **Output**: Files written to `src/layouts/generated/option-X/`
- **Key Requirements**:
  - Create directories if missing
  - Handle overwrite scenarios
  - Validate file paths
  - Log written files

#### 5. Generate Layouts Command (`cli/commands/generate-layouts.ts`)
- **Purpose**: Write generated components to disk
- **Input**: Map of { filename: code }, output directory
- **Output**: Files written to `src/layouts/production/`
- **Key Requirements**:
  - Create directories if missing
  - Handle overwrite scenarios
  - Validate file paths
  - Log written files

#### 4. Generate Layouts Command (`cli/commands/generate-layouts.ts`)
- **Purpose**: Orchestrate the generation workflow (simplified for MVP)
- **Input**: URLAnalysis, output path
- **Output**: Single complete layout in production folder
- **Workflow**:
  1. Call layout-generator with URLAnalysis
  2. Write files to `src/layouts/production/` using file-writer
  3. Update `src/pages/index.astro` to import production layout
  4. Log success/errorsode
  ↓
file-writer.ts → Disk (option-1/, option-2/, ...)
  ↓
### Data Flow (MVP - Simplified)
```
Reference URL (user input)
  ↓
analyze-url.ts → URLAnalysis JSON
  ↓
layout-generator.ts → Component code (single faithful layout)
  ↓
file-writer.ts → Disk (src/layouts/production/)
  ↓
index.astro → Browser (production site)
```

**Future Extension**: Add variation-engine → preview system → promote workflow
## 3. Implementation Steps (MVP - Single Layout)

#### Step 1.1: Implement Generate Prompt Template
**File**: `src/lib/agents/prompts/generate.ts`

**Tasks**:
- [ ] Create `GeneratePromptParams` interface (URLAnalysis, content only - no variations)
- [ ] Define prompt template function for **faithful recreation**
- [ ] Include React/TypeScript/Tailwind guidelines
- [ ] Include Middle Coast branding requirements (colors, fonts from site-config.ts)
- [ ] Include content from `middle-coast.json`
- [ ] Request structured output format (XML tags: `<Component name="X">...</Component>`)
- [ ] Emphasize: "Recreate the structure/patterns from reference URL, apply Middle Coast branding"
- [ ] Add example of expected component output

**Acceptance Criteria**:
- Function exports `buildGeneratePrompt(params): string`
- Prompt includes URLAnalysis sections, Middle Coast brand, and content
- Prompt requests faithful structural recreation
- Manual testing: paste prompt into Claude, verify output quality

**Dependencies**: None  
**Estimated Time**: 3 hours

---

#### Step 1.2: Implement Layout Generator
**File**: `src/lib/agents/layout-generator.ts`

**Tasks**:
- [ ] Create `LayoutGeneratorParams` interface (URLAnalysis, content)
- [ ] Create `GeneratedLayout` interface (map of filename → code)
- [ ] Implement `generateLayout()` async function
- [ ] Call Anthropic SDK (use same pattern as analyze-url.ts)
- [ ] Use Claude Sonnet 4 model
- [ ] Parse Claude response to extract components (look for XML tags: `<Component name="Hero">...</Component>`)
- [ ] Validate extracted code (basic syntax check - no TypeScript compiler needed yet)
- [ ] Return structured component map: `{ 'Layout.tsx': '...', 'Hero.tsx': '...', etc. }`
- [ ] Add error handling (retry once on failure)
- [ ] Add logging for debugging

**Acceptance Criteria**:
- Function exports `generateLayout(params): Promise<GeneratedLayout>`
- Successfully calls Claude API
- Reliably extracts component code from responses
- Returns valid React/TypeScript code strings
- Manual testing: call function directly, log output, verify structure

**Dependencies**: Step 1.1 (prompt template)  
**Estimated Time**: 6 hours

---

#### Step 1.3: Implement File Writer Utility
**File**: `src/lib/utils/file-writer.ts`

**Tasks**:
- [ ] Implement `writeLayoutFiles(files, outputDir)` async function
- [ ] Use Node.js `fs.promises` for async operations
- [ ] Create directories recursively (`fs.mkdir(path, { recursive: true })`)
- [ ] Write each file in component map to disk
- [ ] Overwrite existing files (no confirmation for MVP - can add later)
- [ ] Validate file paths (basic check - no `..` traversal)
- [ ] Log each written file with size
- [ ] Add error handling (permissions, disk space)

**Acceptance Criteria**:
- Function exports `writeLayoutFiles(files, outputDir): Promise<void>`
- Creates `src/layouts/production/` if missing
- Writes all files successfully
- Clear error messages for failures
- Manual testing: write test files, verify on disk

**Dependencies**: None  
**Estimated Time**: 2 hours

---

### Phase 2: CLI Integration (Days 4-5)

#### Step 2.1: Implement Generate Layouts Command
**File**: `cli/commands/generate-layouts.ts`

**Tasks**:
- [ ] Import layout-generator, variation-engine, file-writer
- [ ] Create `generateLayouts(analysis, outputPath)` async function
- [ ] Get 4 variations from variation-engine
- [ ] Loop through each variation:
  - Log "Generating option N..."
  - Call layout-generator with variation params
  - Create output directory path (`option-1/`, etc.)
  - Call file-writer to persist components
  - Log success/failure
- [ ] Collect and report errors
- [ ] Return summary (files written, errors)

**Acceptance Criteria**:
- Function exports `generateLayouts(analysis, outputPath): Promise<void>`
- Successfully generates all 4 options
- Proper error handling (continue on partial failure)
- Clear console logging for progress
- Manual testing: run command, verify 4 folders created

**Dependencies**: Steps 1.1-1.4 (all core components)  
**Estimated Time**: 4 hours

---

#### Step 2.2: Implement Production Index Page
**Tasks**:
- [ ] Import BaseLayout
- [ ] Import Layout from `../layouts/production/Layout`
- [ ] Render production layout
- [ ] Add proper meta tags for SEO
- [ ] Set title and description
- [ ] Add Open Graph tags
- [ ] Add favicon reference
- [ ] Test build output

**Acceptance Criteria**:
- Page renders at `/` (root)
- Uses production layout
- SEO tags complete
- Builds without errors
- Visual inspection matches selected option

**Dependencies**: Step 4.1  
**Estimated Time**: 2 hours

---

#### Step 2.3: End-to-End Testing & Iteration
**File**: N/A (integration testing)

**Tasks**:
- [ ] Ensure `.env.local` has `ANTHROPIC_API_KEY`
- [ ] Test complete workflow: `npm run generate -- https://www.mwncapital.com/`
- [ ] Verify analysis completes
- [ ] Verify files written to `src/layouts/production/`
- [ ] Check files: `Layout.tsx`, section components (Hero, About, etc.)
- [ ] Run `npm run build` to check for TypeScript errors
- [ ] Fix any compilation errors in generated code
- [ ] Test `/` page in browser (`npm run dev`)
- [ ] Verify layout looks correct and uses Middle Coast branding
- [ ] Document common issues and fixes
- [ ] Iterate on prompts if output quality is poor
- [ ] Test with 2-3 different reference URLs

**Acceptance Criteria**:
- CLI completes without crashes
- Generated code compiles (no TS errors)
- Production page renders correctly
- Layout structure matches reference URL
- Middle Coast branding applied (colors, fonts, content)
- No major visual bugs

**Dependencies**: Steps 2.1-2.2  
**Estimated Time**: 4 hours (includes debugging/iteration)

---

### Phase 3: Polish & Documentation (Day 6)

#### Step 3.1: Update Documentation
**Files**: README.md, ARCHITECTURE.md

**Tasks**:
- [ ] Update README with generate workflow instructions
- [ ] Add usage examples: `npm run generate -- <url>`
- [ ] Update ARCHITECTURE.md with implemented features
- [ ] Create troubleshooting section (common errors)
- [ ] Document how to tweak prompts if needed
- [ ] Add "Next Steps" section for future variations feature

**Dependencies**: Step 2.3 (workflow tested)  
**Estimated Time**: 2 hours

---

### Phase 4: Future Enhancements (Post-MVP)

**After MVP is working, consider adding**:
- [ ] Variation engine (4 design options)
- [ ] Preview page with layout switcher
- [ ] Promote command to select winner
- [ ] Retry logic with better error recovery
- [ ] TypeScript compiler validation before writing files
- [ ] Parallel generation of multiple layouts
- [ ] Netlify preview deployments
- [ ] Automated tests

---

## 4. Testing Strategy

### Unit Tests
- **Prompt generation**: Verify prompt includes all required elements
- **Code extraction**: Test parsing Claude responses (various formats)
- **File writing**: Test directory creation, file writes, error handling
- **Variation engine**: Verify 4 distinct configs returned

### Integration Tests
- **CLI workflow**: Test generate command end-to-end
- **Preview system**: Test layout switching, rendering
- **Promotion**: Test file copying, index.astro updates

### Manual Testing Checklist
- [ ] Generate from 3 different reference URLs
- [ ] Verify brand consistency across all outputs
- [ ] Check responsive design on mobile/tablet/desktop
- [ ] Test TypeScript compilation
- [ ] Test production build
- [ ] Verify SEO meta tags
- [ ] Check accessibility (ARIA labels, keyboard nav)
- [ ] Performance testing (Lighthouse scores)

---

## 5. Risks & Mitigations

### Risk 1: Claude Output Variability
**Impact**: High  
**Probability**: High  
**Mitigation**:
- Use structured output (XML tags or JSON)
- Add validation and retry logic
- Include examples in prompt
- Test with multiple URLs to identify patterns
- Consider fallback templates for failures

### Risk 2: Generated Code Has TypeScript Errors
**Impact**: High  
**Probability**: Medium  
**Mitigation**:
- Include strict TypeScript guidelines in prompt
- Validate code before writing to disk
- Add retry with error message in prompt
- Manual review and iteration on prompts
- Consider post-processing step to fix common errors

### Risk 3: Reference URL Content Doesn't Map to Middle Coast Content
**Impact**: Medium  
**Probability**: High  
**Mitigation**:
- Focus on structural patterns, not content
- Clearly separate "structure analysis" from "content application"
- Provide Middle Coast content explicitly in prompt
- Emphasize "use provided content, not reference content"

### Risk 4: Variations Look Too Similar
**Impact**: Medium  
**Probability**: Medium  
**Mitigation**:
- Define clear, measurable differences in variation-engine
- Use separate Claude calls (not single "give me 4" prompt)
- Test with visual comparison tool
- Iterate on variation parameters based on results

### Risk 5: Performance (4 Claude API Calls)
**Impact**: Low  
**Probability**: High  
**Mitigation**:
- Expect 2-5 minutes total generation time
- Add progress indicators
- Consider parallel API calls (if rate limits allow)
- Document expected wait time in CLI output

---

## 6. Dependencies

### External Dependencies
- ✅ Anthropic API key (required in `.env.local`)
- ✅ All npm packages already installed
- ✅ Claude Sonnet 4 API access

### Internal Dependencies
- ✅ `analyze-url.ts` command (already working)
- ✅ `middle-coast.json` content (complete)
- ✅ `site-config.ts` brand guidelines (complete)
- ✅ `BaseLayout.astro` (complete)
- ✅ `LayoutSwitcher.tsx` (basic version exists)

### Blocking Issues
- None currently identified

---

## 7. Success Criteria

### Functional Requirements (MVP)
- [x] URL analysis extracts layout structure ✅ (already working)
- [ ] Generate single faithful layout with Middle Coast branding
- [ ] Write generated components to `src/layouts/production/`
- [ ] Production page (`/`) renders generated layout
- [ ] All generated code compiles without errors
- [ ] Layout structure matches reference URL patterns

**Future Requirements**:
- [ ] Generate 4 distinct layout variations
- [ ] Preview page with layout switcher
- [ ] Promote selected option to production

### Non-Functional Requirements
- [ ] Generation completes in < 5 minutes
- [ ] Generated code follows TypeScript best practices
- [ ] Layouts are responsive (mobile, tablet, desktop)
- [ ] Accessibility standards met (WCAG AA)
- [ ] Lighthouse performance score > 90
- [ ] CLI provides clear progress feedback
- [ ] Error messages are actionable

### User Acceptance
- [ ] Non-technical user can run generate command
- [ ] Preview system is intuitive (no training needed)
- [ ] Generated layouts look professional (client-ready)
- [ ] Variations offer meaningful choices
- [ ] Documentation is clear and complete

---

## 8. Timeline (MVP - Simplified)

### Days 1-3: Core Generation
- **Day 1**: Steps 1.1-1.2 (prompt template + layout generator) - 9 hours
- **Day 2**: Step 1.3 (file writer) - 2 hours
- **Day 3**: Step 2.1 (generate-layouts command) - 2 hours

### Days 4-5: Integration & Testing
- **Day 4**: Steps 2.2-2.3 (index page + testing) - 5 hours
- **Day 5**: Iteration and refinement - 4 hours

### Day 6: Documentation
- **Day 6**: Step 3.1 (update docs) - 2 hours

**Total Estimated Time**: 24 hours (1 week at focused work, or 1-2 weeks part-time)

**Future**: Add variation system (additional 2-3 weeks)

---

## 9. Open Questions

### Technical Questions (MVP)
1. **Code extraction format**: XML tags `<Component name="X">...</Component>` (Decision: Yes - most reliable)
2. **Retry logic**: Retry once on API failure for MVP (can enhance later)
3. **Validation**: Basic syntax check only (no TS compiler for MVP - rely on build step)

### Future Questions (Post-MVP)
1. **Variation count**: How many variations? (Recommended: 4)
2. **Variation types**: What categories? (Proposed: Faithful/Warm/Spacious/Bold)
3. **Preview deployment**: Auto-deploy previews to Netlify?
4. **Testing strategy**: Add automated tests?

---

## 10. Related Documentation

- **[PRODUCT.md](PRODUCT.md)** - Product vision and current state
- **[ARCHITECTURE.md](ARCHITECTURE.md)** - System architecture details
- **[ROADMAP.md](ROADMAP.md)** - Future enhancements roadmap
- **[CONTRIBUTING.md](CONTRIBUTING.md)** - Developer guidelines
- **[.github/instructions/astro.instructions.md]** - Astro coding standards
- **[.github/instructions/typescript.instructions.md]** - TypeScript coding standards

---

## Next Steps

1. **Review this plan** with stakeholders (estimated: 30 minutes)
2. **Start with Phase 1, Step 1.1** (implement generate prompt)
3. **Daily standups** to track progress and blockers
4. **Weekly demos** to show generated layouts
5. **Iterate on prompts** based on output quality

---

**Plan Created**: 2025-11-07  
**Last Updated**: 2025-11-07  
**Plan Owner**: Development Team  
**Status**: Ready for Implementation
