---
applyTo: "**/*"
description: "Code review standards and GitHub review guidelines"
---

# Code Review Guidelines

## Code Review Philosophy
- Code reviews are for knowledge sharing and quality improvement
- Focus on code clarity, maintainability, and correctness
- Be constructive and specific in feedback
- Consider the business context and user impact
- Ensure code follows project standards and best practices

## Review Checklist

### General Code Quality
- Code follows TypeScript and Astro best practices
- Functions and components have clear, single responsibilities
- Code is readable and well-documented
- Error handling is appropriate and comprehensive
- Performance implications have been considered

### Astro-Specific Reviews
- Components use Islands Architecture appropriately
- Client-side hydration is justified and optimized
- Content collections are properly typed and validated
- SEO metadata is complete and accurate
- Image optimization is implemented correctly

### TypeScript Reviews
- Types are properly defined and used throughout
- No use of `any` without justification
- Interfaces and types are reusable and well-structured
- Error handling includes proper type guards
- Async operations are handled correctly

### Security Reviews
- Input validation is implemented where needed
- No sensitive data is exposed in client code
- External dependencies are secure and up-to-date
- HTTPS is used for all external communications
- Content Security Policy considerations are addressed

### Performance Reviews
- Code changes don't negatively impact build times
- Bundle size increases are justified
- Images and assets are optimized
- Client-side JavaScript is minimized
- Database queries and content loading are efficient

## Review Process

### Before Requesting Review
- Ensure all tests pass
- Run linting and formatting tools
- Test the changes in multiple browsers
- Verify accessibility requirements are met
- Update documentation as needed

### During Review
- Review the entire change, not just individual lines
- Consider the user experience impact
- Check for potential edge cases and error conditions
- Verify that the solution addresses the requirements
- Ensure code follows established patterns

### Providing Feedback
- Be specific about issues and suggest solutions
- Explain the reasoning behind feedback
- Use a respectful and professional tone
- Distinguish between blocking issues and suggestions
- Acknowledge good practices and improvements

### Addressing Feedback
- Respond to all review comments
- Ask for clarification when feedback is unclear
- Make requested changes promptly
- Re-request review after addressing feedback
- Update tests and documentation as needed

## GitHub Review Standards

### Pull Request Requirements
- Clear, descriptive title and description
- Reference related issues or requirements
- Include screenshots for UI changes
- List any breaking changes or migration steps
- Ensure CI checks pass before requesting review

### Review Assignments
- Assign appropriate reviewers based on expertise
- Include at least one team member familiar with the codebase
- Request additional reviews for significant changes
- Ensure timely review response (within 1-2 business days)

### Merge Standards
- Require approval from at least one reviewer
- All CI checks must pass before merging
- Use squash and merge for clean commit history
- Delete feature branches after merging
- Update related documentation and issues

## Financial Services Considerations
- Ensure all financial information is accurate and compliant
- Review legal disclaimers and regulatory requirements
- Verify that changes don't impact user data protection
- Consider the professional image and brand representation