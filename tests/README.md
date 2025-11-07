# Test Directory

This directory is for integration tests, end-to-end tests, and other tests that don't fit within the `src/` directory structure.

## Directory Structure

```
tests/
├── integration/     # Integration tests
├── e2e/            # End-to-end tests (if using Playwright)
├── fixtures/       # Test data and fixtures
└── utils/          # Test utilities specific to this directory
```

## Types of Tests

### Integration Tests (`tests/integration/`)
- Test multiple components working together
- Test data flow between components
- Test API integrations (when implemented)

### End-to-End Tests (`tests/e2e/`)
- Full browser testing
- User journey testing
- Cross-browser compatibility testing

### Fixtures (`tests/fixtures/`)
- Mock data files
- Test configuration files
- Sample content for testing

## Running Tests from This Directory

```bash
# Run all tests in this directory
npm run test tests/

# Run specific test suites
npm run test tests/integration/
npm run test tests/e2e/
```

## Best Practices

1. Keep test data in fixtures directory
2. Use descriptive test file names
3. Group related tests in subdirectories
4. Document complex test setups
5. Clean up after tests (especially for E2E tests)