---
applyTo: "**/*.test.ts,**/*.test.js,**/*.spec.ts,**/*.spec.js"
description: "Testing standards and practices for the Middle Coast website"
---

# Testing Guidelines

## Testing Philosophy
- Write tests that verify business logic and user-facing behavior
- Prefer integration tests over unit tests for better confidence
- Test the public interface, not implementation details
- Write tests that are easy to understand and maintain

## Test Organization
- Place test files adjacent to the code they test
- Use descriptive test names that explain the expected behavior
- Group related tests using `describe` blocks
- Follow the Arrange-Act-Assert (AAA) pattern

## Testing Standards

### Unit Testing
- Test pure functions and utility modules
- Mock external dependencies appropriately
- Use meaningful assertions with descriptive error messages
- Test both happy path and error conditions

### Component Testing
- Test Astro components by rendering and asserting on output
- Verify proper prop handling and default values
- Test accessibility features and semantic HTML structure
- Ensure responsive behavior works correctly

### Integration Testing
- Test data fetching and content collection integration
- Verify proper page routing and navigation
- Test form submissions and user interactions
- Ensure SEO metadata is generated correctly

### Content Testing
- Validate markdown content structure and frontmatter
- Test content collection schema validation
- Verify proper content transformation and rendering
- Ensure content links and references are valid

## Test Quality
- Keep tests focused and atomic - one concern per test
- Use factories or builders for complex test data setup
- Avoid test interdependencies - each test should run independently
- Clean up resources and state after tests complete

## Performance Testing
- Test build performance for large content collections
- Verify image optimization and lazy loading
- Monitor bundle size and loading performance
- Test accessibility performance metrics

## Testing Tools
- Use project's configured testing framework
- Leverage TypeScript for test type safety
- Use appropriate matchers for clearer assertions
- Mock external services and APIs consistently

## Continuous Testing
- Run tests before committing changes
- Include tests in CI/CD pipeline
- Monitor test coverage for critical paths
- Update tests when requirements change