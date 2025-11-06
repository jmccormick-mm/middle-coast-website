---
agent: 'agent'
model: Claude Sonnet 4
tools: ['search/codebase', 'search', 'usages']
description: 'Debug and troubleshoot issues in the Middle Coast website'
---

# Debug Issue

Debug and troubleshoot issues in the Middle Coast website, providing systematic problem-solving and resolution guidance.

## Debugging Process

### Issue Analysis
1. **Understand the problem:**
   - Identify the specific issue and its symptoms
   - Determine when the issue occurs (build time, runtime, specific conditions)
   - Understand the expected vs. actual behavior
   - Gather error messages, logs, and reproduction steps

2. **Context gathering:**
   - Review recent changes that might have caused the issue
   - Check related components, dependencies, and configuration
   - Identify the scope of the issue (local, staging, production)
   - Determine if it's a regression or new issue

### Debugging Categories

#### Build Issues
- Astro compilation errors
- TypeScript type errors
- Content collection validation failures
- Asset optimization problems
- Dependency conflicts

#### Runtime Issues
- Component rendering problems
- Client-side JavaScript errors
- Content loading failures
- Performance issues  
- Accessibility problems

#### Content Issues
- Markdown processing errors
- Frontmatter validation failures
- Content collection schema mismatches
- Image optimization problems
- SEO metadata issues

#### Styling Issues
- Tailwind CSS compilation problems
- Responsive design inconsistencies
- Layout and positioning issues
- Theme and color problems
- Mobile compatibility issues

## Debugging Methodology

### Systematic Approach
1. **Reproduce the issue consistently**
2. **Isolate the problem area**
3. **Check logs and error messages**
4. **Use debugging tools and techniques**
5. **Test hypotheses systematically**
6. **Verify the fix doesn't break other functionality**

### Common Debugging Techniques

#### Astro-Specific Debugging
- Check Astro dev server console output
- Verify component frontmatter syntax
- Test client directive usage and hydration
- Review content collection configuration
- Validate TypeScript types with `astro sync`

#### TypeScript Debugging
- Use TypeScript compiler directly for type checking
- Review type definitions and interfaces
- Check for type mismatches in props and parameters
- Validate import/export statements
- Review any type assertion usage

#### Content Debugging
- Validate markdown frontmatter syntax
- Check content collection schema definitions
- Test content queries and data access
- Verify image paths and optimization
- Review content transformation logic

#### Performance Debugging
- Use browser dev tools for performance profiling
- Check network requests and loading times
- Review bundle sizes and optimization
- Test on different devices and connections
- Monitor Core Web Vitals metrics

## Debugging Tools and Resources

### Browser Developer Tools
- Console for JavaScript errors and logging
- Network tab for request analysis
- Performance tab for profiling
- Lighthouse for performance and accessibility audits
- Application tab for storage and service workers

### Astro Development Tools
- Astro dev server with hot reload
- TypeScript language server integration
- Astro check command for validation
- Build output analysis and debugging
- Content collection type generation

### Debugging Techniques
- Add console.log statements strategically
- Use debugger statements for breakpoints
- Implement error boundaries and proper error handling
- Create minimal reproduction cases
- Use version control to bisect issues

## Issue Resolution Process

### Fix Implementation
1. **Develop a targeted fix:**
   - Address the root cause, not just symptoms
   - Ensure the fix doesn't introduce new issues
   - Follow established coding standards and patterns
   - Include appropriate error handling

2. **Test the resolution:**
   - Verify the original issue is resolved
   - Test related functionality for regressions
   - Check different browsers and devices
   - Validate accessibility and performance impact

3. **Document the solution:**
   - Explain the root cause and resolution
   - Update documentation if needed
   - Add tests to prevent regression
   - Share knowledge with the team

### Prevention Strategies
- Implement proper error handling and validation
- Add comprehensive tests for critical functionality
- Use TypeScript for better compile-time error detection
- Follow established patterns and best practices
- Regular dependency updates and security monitoring

## Financial Services Considerations
- Ensure debugging doesn't expose sensitive financial data
- Maintain professional appearance during troubleshooting
- Test thoroughly to prevent issues affecting user trust
- Consider regulatory and compliance implications of changes

Provide systematic, thorough debugging assistance that identifies root causes and implements reliable solutions while maintaining code quality and professional standards.