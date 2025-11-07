---
agent: plan
description: Create a detailed implementation plan using the planning workflow.
---

Analyze my request and create a comprehensive implementation plan following these steps:

1. **Research Phase:** Use runSubagent to autonomously gather context from the codebase about relevant components, existing patterns, and dependencies. Work without pausing for feedback.

2. **Template Selection:** Choose the appropriate planning template based on the task type:
   - Feature implementation → use feature template
   - Content update → use content template
   - Bug fix → use bugfix template
   - General task → use base template

3. **Plan Creation:** Structure a detailed plan including:
   - TL;DR summary
   - Architecture and design considerations
   - Task breakdown with checkboxes
   - Open questions that need clarification

4. **Validation:** Verify the plan against:
   - Actual codebase (not aspirational README features)
   - TypeScript and Astro guidelines
   - Current dependencies in package.json
   - ARCHITECTURE.md documentation

5. **Presentation:** Present the plan and offer to hand off to implementation mode or iterate based on feedback.

**Important:** Always verify that referenced files/features actually exist in the codebase before planning to modify them. Check ROADMAP.md for implementation status of features mentioned in README.
