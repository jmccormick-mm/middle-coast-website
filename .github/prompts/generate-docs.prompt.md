---
agent: 'agent' 
model: Claude Sonnet 4
tools: ['search/codebase', 'githubRepo']
description: 'Generate comprehensive documentation for the Middle Coast website'
---

# Generate Documentation

Generate comprehensive, clear, and maintainable documentation for the Middle Coast website components, features, and processes.

## Documentation Types

### Code Documentation
- **Component Documentation**: Document Astro components, their props, usage, and examples
- **API Documentation**: Document any API routes, endpoints, and data structures
- **Utility Documentation**: Document helper functions, utilities, and shared logic
- **Content Schema Documentation**: Document content collection schemas and data structures

### Project Documentation
- **Architecture Documentation**: Explain system design, patterns, and decisions
- **Setup and Development**: Installation, development workflow, and contribution guidelines
- **Deployment Documentation**: Build processes, deployment steps, and environment configuration
- **Content Management**: How to create, edit, and manage website content

## Documentation Standards

### Writing Guidelines
- Use clear, professional language appropriate for financial services
- Write for your audience - developers, content creators, or end users
- Include practical examples and use cases
- Keep documentation up-to-date with code changes
- Use consistent formatting and structure

### Technical Documentation
- Include code examples that are tested and functional
- Document all parameters, return values, and side effects
- Explain complex business logic and algorithms
- Include troubleshooting information for common issues
- Reference related documentation and external resources

## Documentation Generation Process

### Analysis Phase
1. **Identify documentation needs:**
   - Review existing code and identify undocumented areas
   - Understand the audience for each piece of documentation
   - Determine the appropriate level of detail needed

2. **Gather information:**
   - Analyze component interfaces and usage patterns
   - Review business requirements and user stories
   - Understand system architecture and data flow
   - Collect examples and use cases

### Content Creation

#### Component Documentation Template
```markdown
# ComponentName

Brief description of the component's purpose and use case.

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| propName | string | undefined | Description of the prop |

## Usage

\`\`\`astro
<ComponentName propName="value" />
\`\`\`

## Examples

### Basic Usage
[Include practical examples]

### Advanced Usage
[Include complex scenarios]

## Accessibility
[Document accessibility features and requirements]

## Notes
[Any important implementation details or limitations]
```

#### API Documentation Template
```markdown
# API Endpoint

## Endpoint: `GET /api/example`

Description of what this endpoint does.

### Parameters
- `param1` (string, required): Description
- `param2` (number, optional): Description

### Response
\`\`\`json
{
  "example": "response"
}
\`\`\`

### Error Responses
[Document possible error conditions]
```

### Content Organization
- Organize documentation logically by feature or component
- Use clear navigation and cross-references
- Include a table of contents for longer documents
- Link related documentation sections
- Maintain consistency in structure and formatting

## Special Considerations

### Financial Services Context
- Include any regulatory or compliance information
- Document security considerations and best practices
- Explain any financial calculations or business logic
- Include appropriate disclaimers and legal information

### Astro-Specific Documentation
- Explain Islands Architecture decisions
- Document content collection usage and schemas
- Include SEO and performance considerations
- Explain build and deployment processes

### Maintenance
- Review documentation during code reviews
- Update documentation with feature changes
- Remove outdated information promptly
- Ensure examples remain functional

Generate documentation that helps team members understand, use, and maintain the Middle Coast website effectively while meeting professional standards for financial services.