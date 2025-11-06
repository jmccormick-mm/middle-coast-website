---
agent: 'agent'
model: Claude Sonnet 4
tools: ['search/codebase', 'search']
description: 'Refactor existing code to improve quality, performance, and maintainability'
---

# Refactor Code

Refactor existing code in the Middle Coast website to improve quality, performance, maintainability, and adherence to best practices.

## Refactoring Process

### Analysis Phase
1. **Understand the current code:**
   - Analyze the existing implementation and its purpose
   - Identify areas for improvement
   - Understand dependencies and usage patterns
   - Review any existing tests

2. **Identify refactoring opportunities:**
   - Code duplication that can be eliminated
   - Complex functions that can be simplified
   - Performance bottlenecks that can be optimized
   - TypeScript improvements for better type safety
   - Astro-specific optimization opportunities

### Refactoring Categories

#### Code Structure Improvements
- Extract reusable components and utilities
- Simplify complex functions and logic
- Improve component composition and reusability
- Enhance TypeScript type definitions
- Organize imports and dependencies

#### Performance Optimizations
- Optimize Astro Islands Architecture usage
- Reduce client-side JavaScript bundle size
- Improve content loading and processing
- Optimize image usage and loading
- Enhance build performance

#### Maintainability Enhancements
- Improve code readability and documentation
- Standardize naming conventions
- Enhance error handling and validation
- Improve test coverage and quality
- Update dependencies and remove unused code

#### Astro-Specific Refactoring
- Migrate to modern Astro v5 patterns
- Optimize Content Collections usage
- Improve Islands Architecture implementation
- Enhance SEO and metadata handling
- Optimize content processing workflows

## Refactoring Guidelines

### Safety First
- Ensure all existing functionality is preserved
- Maintain backward compatibility when possible
- Update or create tests for refactored code
- Verify no breaking changes are introduced
- Test thoroughly across different scenarios

### Best Practices
- Follow the single responsibility principle
- Prefer composition over inheritance
- Use meaningful names for functions and variables
- Keep functions small and focused
- Eliminate code duplication

### TypeScript Improvements
- Strengthen type definitions and interfaces
- Remove any usage of `any` type
- Add proper JSDoc documentation
- Use utility types for better type safety
- Implement proper error handling with types

## Refactoring Process

1. **Prepare for refactoring:**
   - Create or run existing tests to establish baseline
   - Document current behavior and requirements
   - Identify all usage points of the code to be refactored

2. **Implement refactoring:**
   - Make small, incremental changes
   - Test after each significant change
   - Maintain git history with meaningful commits
   - Update documentation as you go

3. **Validate refactoring:**
   - Run all tests to ensure functionality is preserved
   - Check performance hasn't regressed
   - Verify accessibility requirements are still met
   - Test in multiple browsers and devices

4. **Clean up:**
   - Remove any dead code or unused imports
   - Update documentation and comments
   - Ensure code style is consistent
   - Update or add tests for new structure

## Financial Services Considerations
- Ensure all financial calculations remain accurate
- Preserve any regulatory compliance features
- Maintain professional appearance and functionality
- Verify no sensitive data handling is compromised

Focus on improving code quality while maintaining the professional standards expected for a financial services website.