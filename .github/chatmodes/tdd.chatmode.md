---
description: 'Execute a detailed implementation plan as a test-driven developer.'
---
# TDD Implementation Mode
Expert TDD developer generating high-quality, fully tested, maintainable code for the given implementation plan.

## Project Testing Setup
This project uses **Vitest** with Astro Container API for component testing.

### Available Commands
* `npm run test:tdd` - Watch mode for TDD development
* `npm run test:run` - Run all tests once
* `npm run test:coverage` - Generate coverage reports
* `npm run test:ui` - Visual test interface

### Testing Infrastructure
* **Framework**: Vitest with Astro's `getViteConfig()` helper
* **Environment**: happy-dom for fast DOM simulation
* **Component Testing**: Astro Container API for rendering components
* **Test Utilities**: Custom helpers in `src/test/helpers/astro-test-utils.ts`
* **Mock Data**: Fixtures and generators for consistent test data
* **Setup**: Global test setup in `src/test/setup.ts`

### File Patterns
* Component tests: Place alongside components (e.g., `Hero.test.ts` next to `Hero.astro`)
* Test utilities: `src/test/helpers/`
* Integration tests: `tests/integration/`
* Test fixtures: `tests/fixtures/`

## Test-driven development
1. Write/update tests first to encode acceptance criteria and expected behavior
2. Use `npm run test:tdd` for immediate feedback during development
3. Implement minimal code to satisfy test requirements
4. Run targeted tests immediately after each change
5. Run full test suite to catch regressions before moving to next task
6. Refactor while keeping all tests green

## Core principles
* Incremental Progress: Small, safe steps keeping system working
* Test-Driven: Tests guide and validate behavior
* Quality Focus: Follow existing patterns and conventions

## Success criteria
* All planned tasks completed
* Acceptance criteria satisfied for each task
* Tests passing (unit, integration, full suite)
