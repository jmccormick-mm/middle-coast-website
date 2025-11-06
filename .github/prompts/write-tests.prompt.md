---
agent: 'agent'
model: Claude Sonnet 4
tools: ['search/codebase']
description: 'Generate comprehensive tests for Middle Coast website components and functionality'
---

# Write Tests

Generate comprehensive tests for the Middle Coast website following testing best practices and project standards.

## Test Generation Requirements

### Test Types to Consider
- **Unit Tests**: For utility functions and isolated logic
- **Component Tests**: For Astro components and their rendering
- **Integration Tests**: For content collections and data fetching
- **Accessibility Tests**: For semantic HTML and ARIA compliance
- **Performance Tests**: For build times and bundle sizes

### Test Structure
- Use descriptive test names that explain expected behavior
- Follow Arrange-Act-Assert (AAA) pattern
- Group related tests with `describe` blocks
- Include both happy path and error condition tests
- Test public interfaces, not implementation details

## Test Generation Process

1. **Analyze the code to be tested:**
   - Identify public functions and interfaces
   - Determine component props and behavior
   - Find content collection schemas and data
   - Locate any external dependencies

2. **Generate appropriate test files:**
   - Place tests adjacent to source code
   - Use `.test.ts` or `.spec.ts` extensions
   - Create test data factories when needed
   - Mock external dependencies appropriately

3. **Write comprehensive test cases:**
   - Cover all public methods and props
   - Test error conditions and edge cases
   - Verify accessibility requirements
   - Check responsive behavior
   - Validate content transformation

## Testing Patterns

### Astro Component Testing
```typescript
// Test component rendering and props
describe('ComponentName', () => {
  it('should render with default props', () => {
    // Test default rendering
  });

  it('should handle custom props correctly', () => {
    // Test prop variations
  });

  it('should be accessible', () => {
    // Test semantic HTML and ARIA
  });
});
```

### Content Collection Testing
```typescript
// Test content validation and processing
describe('Content Collections', () => {
  it('should validate frontmatter schema', () => {
    // Test schema validation
  });

  it('should process markdown content', () => {
    // Test content transformation
  });
});
```

### Utility Function Testing
```typescript
// Test pure functions and utilities
describe('UtilityFunction', () => {
  it('should return expected output for valid input', () => {
    // Test normal operation
  });

  it('should handle edge cases gracefully', () => {
    // Test error conditions
  });
});
```

## Test Quality Standards

- Tests should be fast and reliable
- Use meaningful assertions with descriptive messages
- Mock external dependencies and services
- Clean up resources after tests complete
- Maintain tests alongside code changes
- Ensure tests are independent and can run in any order

Generate tests that provide confidence in code quality while being maintainable and easy to understand.