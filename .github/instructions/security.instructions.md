---
applyTo: "**/*"
description: "Security best practices for the Middle Coast website"
---

# Security Guidelines

## General Security Principles
- Follow the principle of least privilege
- Validate all inputs and sanitize outputs
- Keep dependencies updated and monitor for vulnerabilities
- Use HTTPS for all external communications
- Never commit secrets or sensitive data to version control

## Content Security
- Sanitize user-generated content before rendering
- Use proper HTML encoding for dynamic content
- Validate markdown content and frontmatter
- Ensure all external links are safe and appropriate
- Monitor for malicious content in form submissions

## Data Protection
- Handle sensitive financial information according to industry standards
- Implement proper data retention policies
- Use secure methods for any data transmission
- Ensure compliance with relevant privacy regulations
- Protect user privacy in analytics and tracking

## Application Security

### Input Validation
- Validate all form inputs on both client and server side
- Use TypeScript types and schema validation
- Sanitize file uploads and user content
- Implement proper error handling without exposing sensitive information

### Authentication & Authorization
- Use secure authentication methods if user accounts are implemented
- Implement proper session management
- Use secure cookies with appropriate flags
- Implement CSRF protection for forms

### API Security
- Validate API inputs and sanitize outputs
- Implement rate limiting to prevent abuse
- Use proper HTTP methods and status codes
- Log security-relevant events for monitoring

## Infrastructure Security
- Use environment variables for configuration
- Keep build and deployment processes secure
- Monitor for security vulnerabilities in dependencies
- Implement proper backup and recovery procedures

## Client-Side Security
- Minimize JavaScript execution for reduced attack surface
- Use Content Security Policy (CSP) headers
- Implement proper CORS policies
- Validate any client-side data processing

## Financial Services Compliance
- Ensure compliance with financial industry regulations
- Implement proper disclosure and disclaimer practices
- Protect investor information and communications
- Follow SEC guidelines for investment firm websites

## Security Monitoring
- Log security-relevant events
- Monitor for unusual activity patterns
- Keep security patches up to date
- Regularly review access controls and permissions

## Incident Response
- Have a plan for security incident response
- Know how to quickly disable compromised functionality
- Maintain contact information for security reporting
- Document any security incidents and lessons learned