---
applyTo: "**/*"
description: "Performance optimization guidelines for the Middle Coast website"
---

# Performance Guidelines

## Performance Philosophy
- Default to static generation for best performance
- Minimize JavaScript bundle size
- Optimize for Core Web Vitals (LCP, FID, CLS)
- Prioritize above-the-fold content loading
- Design for fast perceived performance

## Astro Performance Optimization

### Islands Architecture
- Use server-side rendering by default
- Add client-side hydration only when necessary
- Choose appropriate hydration strategies (`client:load`, `client:idle`, `client:visible`)
- Minimize the number of interactive islands per page

### Content Loading
- Use Astro's Content Layer API for efficient content processing
- Implement lazy loading for below-the-fold content
- Optimize content collection queries
- Cache expensive content transformations

### Static Asset Optimization
- Use Astro's built-in image optimization
- Implement responsive images with proper srcset
- Compress and optimize images at build time
- Use modern image formats (WebP, AVIF) when supported

## Build Performance
- Optimize build times for large content collections
- Use incremental builds when possible
- Monitor build performance and bundle sizes
- Implement efficient content processing pipelines

## Runtime Performance

### JavaScript Optimization
- Minimize client-side JavaScript execution
- Use code splitting for large interactive components
- Implement proper error boundaries
- Avoid heavy computations on the main thread

### CSS Performance
- Use Tailwind's purge functionality to remove unused styles
- Implement critical CSS inlining for above-the-fold content
- Minimize CSS bundle size
- Use efficient CSS selectors

### Loading Performance
- Implement proper preloading for critical resources
- Use service workers for caching when appropriate
- Optimize font loading with font-display strategies
- Minimize render-blocking resources

## Content Performance
- Optimize markdown processing and rendering
- Implement efficient content search and filtering
- Cache processed content when possible
- Use pagination for large content lists

## Network Performance
- Minimize HTTP requests
- Use CDN for static asset delivery
- Implement proper caching headers
- Optimize for slow network connections

## Monitoring & Measurement
- Use Lighthouse for performance auditing
- Monitor Core Web Vitals in production
- Track build times and bundle sizes
- Implement performance budgets

## Mobile Performance
- Design mobile-first for better performance
- Optimize for touch interactions
- Minimize data usage for mobile users
- Test on actual mobile devices

## Financial Services Performance Requirements
- Ensure fast loading for investment information
- Optimize forms for quick data entry
- Maintain performance under high traffic
- Ensure accessibility doesn't compromise performance