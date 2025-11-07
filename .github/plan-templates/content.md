---
title: [Content Update Description]
version: 1.0
date_created: [YYYY-MM-DD]
last_updated: [YYYY-MM-DD]
type: Content Update
---

# Content Update Plan: [Update Description]

## TL;DR

[1-2 sentence summary of what content is being updated and why]

## Content Changes

### Files to Update

- [ ] `content/sites/middle-coast/[file].md` - [What's changing]
- [ ] `content/sites/middle-coast/config.json` - [What's changing]
- [ ] Other files as needed

### Content Scope

**Sections Affected:**
- [ ] Hero section
- [ ] About section
- [ ] Investment Approach section
- [ ] Contact section
- [ ] Other: [specify]

## Detailed Changes

### Change 1: [Section/File Name]

**Current Content:**
```markdown
[Existing content to be replaced]
```

**New Content:**
```markdown
[New content to be added]
```

**Rationale:** [Why this change is needed]

### Change 2: [Section/File Name]

**Current Content:**
```markdown
[Existing content to be replaced]
```

**New Content:**
```markdown
[New content to be added]
```

**Rationale:** [Why this change is needed]

## Tasks

### Pre-Update

- [ ] Review current content in dev environment
- [ ] Validate new content against brand guidelines
- [ ] Check for spelling/grammar
- [ ] Ensure all links are valid

### Content Updates

- [ ] Update markdown file(s)
- [ ] Update frontmatter if needed
- [ ] Update config.json if needed
- [ ] Update any referenced assets (images, etc.)

### Post-Update

- [ ] Preview changes in dev server (`npm run dev`)
- [ ] Verify responsive behavior (mobile/desktop)
- [ ] Check all internal links work
- [ ] Validate SEO metadata (titles, descriptions)
- [ ] Run production build (`npm run build`)

### Deployment

- [ ] Commit changes with descriptive message
- [ ] Deploy to staging/preview environment
- [ ] Get stakeholder approval
- [ ] Deploy to production

## Open Questions

1. **Question:** [Any uncertainties about content?]
   - **Context:** [Background]
   - **Resolution needed by:** [Date/timeline]

## Brand Compliance Checklist

- [ ] Tone matches Middle Coast brand voice (professional, confident, approachable)
- [ ] No jargon or overly complex language
- [ ] Consistent terminology with existing content
- [ ] Midwest focus maintained
- [ ] Investment philosophy clearly communicated

## SEO Considerations

- [ ] Keywords naturally integrated
- [ ] Headings use proper hierarchy (H1 → H2 → H3)
- [ ] Meta descriptions updated if needed
- [ ] Image alt text descriptive and relevant

## Stakeholder Review

**Reviewers:**
- [ ] [Name/Role] - Reviewed on [Date]
- [ ] [Name/Role] - Reviewed on [Date]

**Feedback:**
[Summary of feedback received and how it was addressed]

---

## Rollback Plan

If issues are discovered after deployment:

1. Revert to previous commit: `git revert [commit-hash]`
2. Redeploy from known-good commit
3. Document issue and plan corrective update

## Documentation Updates

- [ ] Update change log (if maintained)
- [ ] Note any content strategy changes in team wiki/docs
