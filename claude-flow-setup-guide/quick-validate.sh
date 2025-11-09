#!/usr/bin/env bash
# quick-validate.sh
# Quick validation script for SPARC + TDD Workflow Setup

echo "=== SPARC + TDD Workflow Validation Script ==="
echo ""

echo "Phase 1: Core Installation"
node --version && echo "✓ Node.js installed" || echo "✗ Node.js missing"
npm --version && echo "✓ npm installed" || echo "✗ npm missing"
git --version && echo "✓ Git installed" || echo "✗ Git missing"
npx claude-flow@alpha --version && echo "✓ claude-flow accessible" || echo "✗ claude-flow missing"
echo ""

echo "Phase 2: MCP Server"
claude mcp list | grep "claude-flow" && echo "✓ MCP server running" || echo "✗ MCP server not running"
echo ""

echo "Phase 3: Project Scaffolding"
[ -d .roo ] && echo "✓ .roo directory exists" || echo "✗ .roo directory missing"
[ -f .roomodes ] && echo "✓ .roomodes config exists" || echo "✗ .roomodes missing"
[ -f CLAUDE.md ] && echo "✓ CLAUDE.md exists" || echo "✗ CLAUDE.md missing"
[ -d .claude ] && echo "✓ .claude directory exists" || echo "✗ .claude directory missing"
[ -f .swarm/memory.db ] && echo "✓ memory database exists" || echo "✗ memory database missing"
[ -f .claude-flow/hive-mind.db ] && echo "✓ hive-mind database exists" || echo "✗ hive-mind database missing"
echo ""

echo "Phase 4: Workflow Files"
[ -f .roo/workflows/basic-tdd.json ] && echo "✓ basic TDD workflow exists" || echo "✗ basic TDD workflow missing"
cat .roo/workflows/basic-tdd.json | jq . > /dev/null 2>&1 && echo "✓ workflow JSON is valid" || echo "✗ workflow JSON invalid"
echo ""

echo "Phase 5: Integration Testing"
[ -d tests/integration ] && echo "✓ integration tests directory exists" || echo "✗ integration tests directory missing"
echo ""

echo "=== Validation Complete ==="
echo "Review the output above. All items should show ✓"
echo "If any show ✗, refer to the main guide's troubleshooting section"
