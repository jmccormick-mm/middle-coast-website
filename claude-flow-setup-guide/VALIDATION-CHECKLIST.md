# SPARC + TDD Workflow Setup - Validation Checklist

Use this checklist to validate that your setup is complete and working correctly.

## Phase 1: Core Installation ✓

- [ ] Node.js 18+ installed and verified (`node --version`)
- [ ] npm 9+ installed and verified (`npm --version`)
- [ ] Git installed (`git --version`)
- [ ] Claude Code CLI installed globally
- [ ] claude-flow installed (via npx, global, or plugin)
- [ ] `claude-flow --version` or `npx claude-flow@alpha --version` works

**Validation Command:**
```bash
node --version && npm --version && git --version && npx claude-flow@alpha --version
```

**Expected Result:** All commands return version numbers without errors.

---

## Phase 2: MCP Server Setup ✓

- [ ] MCP server added to Claude Code
- [ ] `claude mcp list` shows claude-flow as "Running"
- [ ] Optional servers (ruv-swarm, flow-nexus) added if desired
- [ ] No errors in MCP server logs

**Validation Command:**
```bash
claude mcp list
```

**Expected Result:**
```
claude-flow - Running
```

---

## Phase 3: Project Scaffolding ✓

- [ ] `.roo/` directory created with subdirectories
- [ ] `.roo/workflows/basic-tdd.json` exists
- [ ] `.roomodes` configuration file exists
- [ ] `CLAUDE.md` file created
- [ ] `.claude/` directory with commands, agents, settings.json
- [ ] `.swarm/memory.db` database file exists
- [ ] `.claude-flow/hive-mind.db` database file exists
- [ ] `tests/integration/` directory created

**Validation Commands:**
```bash
ls -la .roo/
ls -la .claude/
ls -la .swarm/
ls -la .claude-flow/
cat .roomodes
cat CLAUDE.md
```

**Expected Result:** All directories and files exist and are readable.

---

## Phase 4: Persistent Workflows ✓

- [ ] Auto-save enabled in `.claude/settings.json`
- [ ] Hooks configured in settings.json
- [ ] Can create a test session: `npx claude-flow@alpha session save "test"`
- [ ] Can list sessions: `npx claude-flow@alpha session list`
- [ ] Can restore test session
- [ ] Workflow JSON is valid (test with `jq` or JSON validator)

**Validation Commands:**
```bash
# Test session management
npx claude-flow@alpha session save "validation-test"
npx claude-flow@alpha session list
# Note the session ID from list output
npx claude-flow@alpha session restore <session-id-from-list>

# Validate workflow JSON
cat .roo/workflows/basic-tdd.json | jq .
```

**Expected Result:** Session commands work without errors, JSON is valid.

---

## Phase 5: Integration Testing Setup ✓

- [ ] `tests/integration/` directory exists
- [ ] Can create a sample test file
- [ ] `coverage/` directory exists
- [ ] `docs/testing/` directory exists
- [ ] CI/CD configuration file created (if applicable)

**Validation Commands:**
```bash
ls -la tests/integration/
mkdir -p coverage docs/testing
```

**Expected Result:** Directories exist and are writable.

---

## Workflow Execution Tests ✓

### Test 1: Run Individual SPARC Phase

- [ ] Specification phase works

**Test Command:**
```bash
npx claude-flow@alpha sparc run spec-pseudocode "create a simple hello world function"
```

**Expected Result:** Output shows specification and pseudocode generation without errors.

---

### Test 2: Run Full SPARC TDD Workflow

- [ ] Full workflow executes all phases

**Test Command:**
```bash
npx claude-flow@alpha sparc tdd "implement a function that adds two numbers"
```

**Expected Result:** Workflow progresses through:
1. Specification & Pseudocode
2. Red Phase (failing tests)
3. Green Phase (implementation)
4. Refactor Phase (optimization)
5. Integration (verification)

---

### Test 3: Run Custom Workflow

- [ ] Custom workflow file is valid
- [ ] Workflow executes successfully

**Test Command:**
```bash
npx claude-flow@alpha workflow run .roo/workflows/basic-tdd.json --dry-run
```

**Expected Result:** Dry-run shows all workflow steps without errors.

---

## Hooks Functionality ✓

- [ ] Pre-task hook works

**Test Command:**
```bash
npx claude-flow@alpha hook pre-task --description "test task"
```

**Expected Result:** Hook executes without errors.

---

- [ ] Post-edit hook works

**Test Command:**
```bash
# Create a test file first
echo "test content" > test-file.txt
npx claude-flow@alpha hook post-edit --file "test-file.txt" --memory-key "test/key"
rm test-file.txt
```

**Expected Result:** Hook executes and stores data in memory.

---

- [ ] Session-end hook works

**Test Command:**
```bash
npx claude-flow@alpha hook session-end --session-id "validation-session"
```

**Expected Result:** Session state saved successfully.

---

## Memory & Persistence ✓

- [ ] Memory database is writable
- [ ] Can store and retrieve data

**Test Commands:**
```bash
# Test memory storage
npx claude-flow@alpha memory store test_key "test value"

# Verify databases have content (file size > 0)
ls -lh .swarm/memory.db
ls -lh .claude-flow/hive-mind.db
```

**Expected Result:** Memory commands work, databases are non-empty.

---

## Session Persistence ✓

- [ ] Session save works
- [ ] Session list shows saved sessions
- [ ] Session restore works
- [ ] Session export/import works

**Test Commands:**
```bash
# Save session
npx claude-flow@alpha session save "final-validation"

# List to get ID
npx claude-flow@alpha session list

# Export (use actual session ID from list)
npx claude-flow@alpha session export <session-id> validation-backup.json

# Verify export file exists
ls -la validation-backup.json

# Import
npx claude-flow@alpha session import validation-backup.json

# Cleanup
rm validation-backup.json
```

**Expected Result:** All session operations complete successfully.

---

## Final Integration Test ✓

Run a complete end-to-end workflow to validate everything works together:

```bash
# 1. Save starting state
npx claude-flow@alpha session save "integration-test-start"

# 2. Run a simple SPARC TDD workflow
npx claude-flow@alpha sparc tdd "create a function that returns the square of a number"

# 3. Verify the workflow created tests and implementation
# (Check your project for generated files)

# 4. Save completed state
npx claude-flow@alpha session save "integration-test-complete"

# 5. List sessions to verify both exist
npx claude-flow@alpha session list

# 6. Restore to starting state
npx claude-flow@alpha session restore integration-test-start
```

**Expected Result:**
- Workflow completes all SPARC phases
- Tests are generated
- Implementation is created
- Sessions are saved and restorable
- No errors throughout the process

---

## Troubleshooting Validation Failures

If any validation step fails, refer to the Troubleshooting section in the main guide:

**Common Issues:**
- MCP servers not running → Restart with `/restart` or `claude mcp restart claude-flow`
- Permission errors → Check directory permissions with `ls -la`
- Database errors → Verify `.swarm/` and `.claude-flow/` directories exist and are writable
- Workflow errors → Validate JSON syntax with `jq`
- Session errors → Check auto-save configuration in `.claude/settings.json`

---

## Success Criteria

Your setup is complete and validated when:

✅ All checkboxes above are checked
✅ All validation commands execute without errors
✅ Final integration test completes successfully
✅ You can save, list, and restore sessions
✅ SPARC TDD workflow runs from start to finish
✅ MCP servers are running and responsive

**Congratulations! You now have a rock-solid, repeatable SPARC + TDD development workflow!**

---

## Next Steps After Validation

1. **Create your first real feature** using the workflow
2. **Customize workflows** for your specific project needs
3. **Set up CI/CD** integration for automated testing
4. **Explore advanced features** like multi-agent orchestration
5. **Join the community** and share your experiences

---

## Quick Validation Script

For convenience, here's a bash script to run all core validations:

```bash
#!/usr/bin/env bash
# quick-validate.sh

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
```

Save this as `quick-validate.sh`, make it executable with `chmod +x quick-validate.sh`, and run it with `./quick-validate.sh`.
