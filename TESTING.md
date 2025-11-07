# Testing & TDD Workflow

This document outlines the test-driven development (TDD) workflow for the Middle Coast Website project using Vitest.

## Overview

The project uses **Vitest** for unit and integration testing, chosen because:
- Native Vite integration (Astro uses Vite under the hood)
- TypeScript support out of the box
- Fast test execution with ESM support
- Astro Container API support for component testing
- Excellent VS Code integration

## Quick Start

```bash
# Install dependencies (already done if you ran npm install)
npm install

# Run tests in watch mode (TDD mode)
npm run test:tdd

# Run all tests once
npm run test:run

# Run tests with coverage report
npm run test:coverage

# Open Vitest UI for visual test management
npm run test:ui
```

## Project Structure

```
├── src/
│   ├── test/
│   │   ├── setup.ts                 # Global test setup
│   │   ├── helpers/
│   │   │   └── astro-test-utils.ts  # Astro testing utilities
│   │   └── example.test.ts          # Example tests
│   └── components/                  # Your components (tests alongside)
├── tests/                           # Integration & E2E tests
│   ├── fixtures/                    # Test data
│   └── integration/                 # Integration tests
├── vitest.config.ts                 # Vitest configuration
└── coverage/                        # Coverage reports (generated)
```

## TDD Workflow

### 1. Red-Green-Refactor Cycle

```bash
# Start TDD mode (watches files and re-runs tests)
npm run test:tdd
```

**Red**: Write a failing test first
```typescript
// src/components/Hero.test.ts
import { describe, it, expect } from 'vitest';
import { createAstroTestRenderer } from '../test/helpers/astro-test-utils';
import Hero from './Hero.astro';

describe('Hero Component', () => {
  it('should render hero title', async () => {
    const renderer = createAstroTestRenderer();
    await renderer.setup();
    
    const result = await renderer.renderToString(Hero, {
      name: 'Middle Coast',
      tagline: 'Real Estate Investment'
    });
    
    expect(result).toContain('Middle Coast');
    expect(result).toContain('Real Estate Investment');
    
    await renderer.cleanup();
  });
});
```

**Green**: Write minimal code to make the test pass
```astro
---
// src/components/Hero.astro
interface Props {
  name: string;
  tagline: string;
}

const { name, tagline } = Astro.props;
---

<section>
  <h1>{name}</h1>
  <p>{tagline}</p>
</section>
```

**Refactor**: Improve the code while keeping tests passing
```astro
---
interface Props {
  name: string;
  tagline: string;
  description?: string;
}

const { name, tagline, description } = Astro.props;
---

<section class="hero bg-charcoal text-soft-white py-24">
  <div class="container mx-auto px-6">
    <h1 class="text-5xl md:text-7xl font-heading mb-6">{name}</h1>
    <p class="text-xl md:text-2xl mb-8">{tagline}</p>
    {description && <p class="text-lg opacity-90">{description}</p>}
  </div>
</section>
```

### 2. Testing Patterns

#### Component Testing with Astro Container API
```typescript
import { createAstroTestRenderer } from '../test/helpers/astro-test-utils';
import MyComponent from './MyComponent.astro';

const renderer = createAstroTestRenderer();
await renderer.setup();

const result = await renderer.renderToString(MyComponent, {
  // props
}, {
  // slots
  default: '<p>Slot content</p>'
});

expect(result).toContain('expected content');
await renderer.cleanup();
```

#### Testing with Mock Data
```typescript
import { mockData } from '../test/helpers/astro-test-utils';

const config = mockData.siteConfig();
const pillars = mockData.investmentPillars(4);

// Use in your tests
const result = await renderer.renderToString(Component, { config, pillars });
```

#### Custom Assertions
```typescript
import { astroAssertions } from '../test/helpers/astro-test-utils';

// Check if HTML contains text
expect(astroAssertions.toContainText(html, 'Middle Coast')).toBe(true);

// Check if HTML contains element
expect(astroAssertions.toContainElement(html, 'section')).toBe(true);

// Check if element has CSS class
expect(astroAssertions.toHaveClass(html, 'hero')).toBe(true);
```

### 3. File Organization

#### Unit Tests (Component Level)
Place tests next to components:
```
src/components/
├── Hero.astro
├── Hero.test.ts
├── About.astro
├── About.test.ts
└── ui/
    ├── Button.astro
    └── Button.test.ts
```

#### Integration Tests
Place in `tests/` directory:
```
tests/
├── integration/
│   ├── page-rendering.test.ts
│   ├── navigation.test.ts
│   └── content-loading.test.ts
└── fixtures/
    └── site-data.json
```

## VS Code Integration

### Extensions
Install the Vitest VS Code extension for enhanced experience:
- **Vitest** (vitest.explorer) - Test explorer and inline results

### Features Available
- **Test Explorer**: View and run tests from sidebar
- **Inline Results**: See test results directly in editor
- **Debug Tests**: Set breakpoints and debug tests
- **Auto Run**: Automatically run tests on file changes

### Shortcuts
- `Ctrl+Shift+P` → "Test: Run All Tests"
- `Ctrl+Shift+P` → "Test: Debug Test"
- Click the play button next to individual tests

## Testing Strategies

### 1. Component Testing Priority
1. **Props handling** - Does component accept and use props correctly?
2. **Content rendering** - Does component render expected content?
3. **Conditional rendering** - Are optional elements shown/hidden correctly?
4. **CSS classes** - Are correct Tailwind classes applied?
5. **Accessibility** - Are ARIA attributes and semantic HTML correct?

### 2. What to Test
✅ **Do Test:**
- Component prop handling
- Content rendering
- Conditional logic
- CSS class application
- Accessibility attributes
- Error states

❌ **Don't Test:**
- Tailwind CSS itself
- Browser APIs
- Third-party libraries (unless integration)
- Implementation details

### 3. Test Data Management
Use the provided fixtures and mock data helpers:
```typescript
// Load from fixtures
import siteData from '../../tests/fixtures/site-data.json';

// Use mock data generators
const config = mockData.siteConfig({ name: 'Custom Name' });
const pillars = mockData.investmentPillars(3);
```

## Configuration Details

### Vitest Config (`vitest.config.ts`)
- Uses `getViteConfig()` from Astro for proper configuration
- Happy DOM environment for faster tests
- Global test functions enabled
- Coverage configured with V8 provider
- Watch mode optimized for TDD

### Coverage Thresholds
- **Statements**: 80%
- **Branches**: 70%
- **Functions**: 80%
- **Lines**: 80%

Adjust these in `vitest.config.ts` as your project matures.

## Common Patterns

### Testing Forms
```typescript
it('should handle form submission', async () => {
  const result = await renderer.renderToString(ContactForm, {
    action: '/submit',
    method: 'POST'
  });
  
  expect(astroAssertions.toContainElement(result, 'form')).toBe(true);
  expect(astroAssertions.toHaveAttribute(result, 'form', 'action', '/submit')).toBe(true);
});
```

### Testing Conditional Content
```typescript
it('should show CTA button when calendlyUrl provided', async () => {
  const withUrl = await renderer.renderToString(Hero, {
    name: 'Test',
    tagline: 'Test',
    calendlyUrl: 'https://calendly.com/test'
  });
  
  const withoutUrl = await renderer.renderToString(Hero, {
    name: 'Test',
    tagline: 'Test'
  });
  
  expect(astroAssertions.toContainText(withUrl, 'Schedule')).toBe(true);
  expect(astroAssertions.toContainText(withoutUrl, 'Schedule')).toBe(false);
});
```

### Testing Lists/Arrays
```typescript
it('should render all investment pillars', async () => {
  const pillars = mockData.investmentPillars(4);
  const result = await renderer.renderToString(InvestmentApproach, { pillars });
  
  for (const pillar of pillars) {
    expect(astroAssertions.toContainText(result, pillar.title)).toBe(true);
    expect(astroAssertions.toContainText(result, pillar.description)).toBe(true);
  }
});
```

## Troubleshooting

### Common Issues

**1. "Cannot find module" errors**
```bash
# Ensure all dependencies are installed
npm install

# Check if types are properly configured
npm run astro sync
```

**2. Astro Container API errors**
Make sure you're using Astro 4.9.0 or later and properly setting up/cleaning up the renderer.

**3. TypeScript errors in tests**
Ensure `vitest/config` types are referenced at the top of `vitest.config.ts`:
```typescript
/// <reference types="vitest/config" />
```

### Debug Mode
Run tests with debug output:
```bash
npm run test -- --reporter=verbose
```

Or use VS Code debugger with the provided launch configurations.

## Next Steps

1. **Start with existing components**: Write tests for `Hero.astro`, `About.astro`, etc.
2. **Follow TDD for new features**: Red-Green-Refactor for any new components
3. **Add integration tests**: Test how components work together
4. **Consider E2E tests**: Add Playwright for full browser testing

## Resources

- [Vitest Documentation](https://vitest.dev/)
- [Astro Container API](https://docs.astro.build/en/reference/container-reference/)
- [Testing Library Documentation](https://testing-library.com/)
- [TDD Best Practices](https://martinfowler.com/bliki/TestDrivenDevelopment.html)