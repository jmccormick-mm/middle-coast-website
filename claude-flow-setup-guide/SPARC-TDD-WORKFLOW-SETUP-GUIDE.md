# Complete SPARC + TDD Workflow Setup Guide

**For: Developers new to Claude Flow**
**Goal: Rock-solid, repeatable development workflow from installation to production**

---

## Table of Contents

1. [What You're Building](#what-youre-building)
2. [Prerequisites](#prerequisites)
3. [Phase 1: Core Installation](#phase-1-core-installation)
4. [Phase 2: MCP Server Setup](#phase-2-mcp-server-setup)
5. [Phase 3: Project Scaffolding](#phase-3-project-scaffolding)
6. [Phase 4: Configure Persistent Workflows](#phase-4-configure-persistent-workflows)
7. [Phase 5: Integration Testing Setup](#phase-5-integration-testing-setup)
8. [Using the SPARC + TDD Workflow](#using-the-sparc-tdd-workflow)
9. [Session Management & Persistence](#session-management--persistence)
10. [Troubleshooting](#troubleshooting)
11. [Quick Reference](#quick-reference)

---

## What You're Building

By the end of this guide, you'll have:

- ✅ Claude Flow installed and integrated with Claude Code CLI
- ✅ MCP servers configured for orchestration and coordination
- ✅ Persistent, orchestrated SPARC + TDD workflow
- ✅ Automated hooks for pre/post operations
- ✅ Session management with auto-save and resume capabilities
- ✅ Integration testing infrastructure
- ✅ A repeatable process you can apply to any project

**The SPARC Methodology:**
- **S**pecification - Define requirements and constraints
- **P**seudocode - Create detailed logic flows
- **A**rchitecture - Design system structure
- **R**efinement - Implement with TDD (Red-Green-Refactor)
- **C**ompletion - Integration, documentation, validation

---

## Prerequisites

### Required Software

1. **Node.js 18+ (LTS 20+ recommended)**
   ```bash
   node --version  # Should be v18.x or higher
   ```

2. **npm 9+**
   ```bash
   npm --version  # Should be v9.x or higher
   ```

3. **Git** (for GitHub integration features)
   ```bash
   git --version
   ```

4. **Claude Code CLI**
   ```bash
   npm install -g @anthropic-ai/claude-code
   ```

### Permissions Needed
- Read/write permissions in your project directory
- Ability to install global npm packages
- Network access for downloading packages

### Recommended Environment
- **Terminal**: Any modern terminal (bash, zsh, etc.)
- **Editor**: VS Code, Cursor, or any editor with markdown support
- **OS**: Linux, macOS, or WSL2 on Windows

---

## Phase 1: Core Installation

Choose ONE of the three installation methods below based on your use case.

---

### Option A: NPX (Recommended - Always Latest Alpha)

**When to Use:**
- You want the absolute latest version every time
- You don't want global installations cluttering your system
- You're just trying out claude-flow
- You work on multiple projects with different versions

**Starting State:**
- Node.js 18+ and npm 9+ are installed
- You have terminal access
- No claude-flow installation exists

**Commands:**
```bash
# Initialize and install latest alpha version
npx claude-flow@alpha init --force

# Verify installation
npx claude-flow@alpha --version
npx claude-flow@alpha --help
```

**What Happens:**
- Downloads and runs the latest alpha version from npm
- Creates `.claude/` directory structure in current directory
- Sets up initial configuration files
- No global installation (runs on-demand)

**End State Verification:**
```bash
# Should show version number
npx claude-flow@alpha --version

# Should show help menu with available commands
npx claude-flow@alpha --help

# Check .claude directory was created
ls -la .claude/
```

**Expected Output:**
```
$ npx claude-flow@alpha --version
2.0.0-alpha.XX

$ ls -la .claude/
drwxr-xr-x .claude/
```

**Success Criteria:**
- ✅ Version number displays without errors
- ✅ Help menu shows available commands
- ✅ `.claude/` directory exists

---

### Option B: Global Installation

**When to Use:**
- You want `claude-flow` available everywhere as a command
- You'll use it frequently across many projects
- You prefer not typing `npx` every time
- You want faster execution (no download on each run)

**Starting State:**
- Node.js 18+ and npm 9+ are installed
- You have permissions to install global npm packages
- No global claude-flow installation exists

**Commands:**
```bash
# Install globally
npm install -g claude-flow@alpha

# Verify installation
claude-flow --version
claude-flow --help
```

**What Happens:**
- Installs claude-flow to your global npm modules directory
- Creates `claude-flow` command available system-wide
- Version stays fixed until you manually update

**End State Verification:**
```bash
# Should show version without npx
claude-flow --version

# Should show global installation path
npm list -g claude-flow

# Check command is in PATH
which claude-flow
```

**Expected Output:**
```
$ claude-flow --version
2.0.0-alpha.XX

$ which claude-flow
/usr/local/bin/claude-flow
```

**Success Criteria:**
- ✅ `claude-flow` command works without `npx`
- ✅ Version displays correctly
- ✅ Command is in your PATH

**To Update Later:**
```bash
npm update -g claude-flow@alpha
```

---

### Option C: Claude Code Plugin Installation (Best for Full Integration)

**When to Use:**
- You're already using Claude Code CLI
- You want automatic MCP server setup
- You want hooks and agents pre-configured
- You want the tightest integration with Claude Code

**Starting State:**
- Claude Code CLI is installed and running
- You're in a Claude Code session
- No claude-flow plugin is installed

**Commands:**
```bash
# From within Claude Code environment
/plugin add ruvnet/claude-flow
/restart
```

**What Happens:**
1. Clones `ruvnet/claude-flow` repository to `.claude/plugins/`
2. Installs slash commands in `.claude/commands/`
3. Configures agents in `.claude/agents/`
4. Automatically sets up MCP servers
5. Configures hooks in `.claude/settings.json`
6. Restarts Claude Code to load everything

**End State Verification:**
```bash
# Check plugin directory exists
ls -la .claude/plugins/claude-flow/

# Check commands installed
ls -la .claude/commands/

# Check agents configured
ls -la .claude/agents/

# Verify settings.json has claude-flow config
cat .claude/settings.json | grep -A 10 "claudeFlow"

# Check MCP server (covered in Phase 2)
claude mcp list
```

**Expected Output:**
```
$ ls -la .claude/plugins/
drwxr-xr-x claude-flow/

$ ls -la .claude/commands/
-rw-r--r-- sparc.md
-rw-r--r-- workflow.md
...

$ cat .claude/settings.json | grep "claudeFlow"
"claudeFlow": {
  "autoSave": true,
  ...
```

**Success Criteria:**
- ✅ `.claude/plugins/claude-flow/` directory exists
- ✅ Commands and agents are installed
- ✅ `.claude/settings.json` contains claudeFlow configuration
- ✅ MCP server appears in `claude mcp list` (verify in Phase 2)

---

**Installation Complete!** Choose your preferred method and proceed to Phase 2.

---

## Phase 2: MCP Server Setup

**What are MCP Servers?**
MCP (Model Context Protocol) servers enable coordination between claude-flow and Claude Code CLI. They act as the communication layer that allows agents to orchestrate workflows.

---

### Step 1: Verify or Add Core MCP Server

#### If You Used Plugin Installation (Option C):

**Starting State:**
- Plugin installation from Phase 1 completed
- Claude Code has restarted
- MCP server should be auto-configured

**Verification Command:**
```bash
claude mcp list
```

**Expected Output:**
```
claude-flow - Running
```

**Success Criteria:**
- ✅ `claude-flow` appears in the list
- ✅ Status shows "Running"

**If Server is NOT Running:**
Go to "Manual MCP Server Setup" below.

---

#### If You Used NPX or Global Installation (Options A or B):

**Starting State:**
- claude-flow installed from Phase 1
- Claude Code CLI is installed
- No MCP servers configured yet
- Running `claude mcp list` shows empty or missing `claude-flow`

**Command:**
```bash
# Add core claude-flow MCP server
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

**What Happens:**
- Registers claude-flow as an MCP server with Claude Code
- Configures the server to start via `npx claude-flow@alpha mcp start`
- Server becomes available for agent coordination

**End State Verification:**
```bash
# List all MCP servers
claude mcp list

# Should show claude-flow as Running
```

**Expected Output:**
```
$ claude mcp list
claude-flow - Running
```

**Success Criteria:**
- ✅ `claude-flow` appears in MCP server list
- ✅ Status is "Running" (not "Stopped" or "Error")

**If Server Shows as "Stopped":**
```bash
# Restart the server
claude mcp restart claude-flow

# Or restart Claude Code entirely
/restart
```

---

### Step 2: Optional Enhanced MCP Servers

**When to Add These:**
- You need advanced multi-agent orchestration (ruv-swarm)
- You want cloud platform integration (flow-nexus)
- You're working on complex projects with multiple coordinated agents

**Starting State:**
- Core `claude-flow` MCP server is running
- You want additional capabilities beyond basic SPARC + TDD

---

#### Add ruv-swarm (Advanced Multi-Agent Orchestration)

**Command:**
```bash
claude mcp add ruv-swarm npx ruv-swarm mcp start
```

**What This Provides:**
- Advanced swarm intelligence for agent coordination
- Enhanced distributed task processing
- Better handling of complex multi-agent workflows

**Verification:**
```bash
claude mcp list | grep ruv-swarm
```

**Expected Output:**
```
ruv-swarm - Running
```

---

#### Add flow-nexus (Cloud Platform Integration)

**Command:**
```bash
claude mcp add flow-nexus npx flow-nexus@latest mcp start
```

**What This Provides:**
- Cloud platform deployment capabilities
- Remote workflow execution
- Team collaboration features

**Verification:**
```bash
claude mcp list | grep flow-nexus
```

**Expected Output:**
```
flow-nexus - Running
```

---

### Step 3: Verify All MCP Servers

**Starting State:**
- You've added one or more MCP servers

**Verification Command:**
```bash
claude mcp list
```

**Expected Output (Minimum):**
```
claude-flow - Running
```

**Expected Output (With Optional Servers):**
```
claude-flow - Running
ruv-swarm - Running
flow-nexus - Running
```

**Success Criteria:**
- ✅ All added servers show "Running" status
- ✅ No servers show "Stopped" or "Error"
- ✅ At minimum, `claude-flow` is present and running

---

### Troubleshooting MCP Servers

#### Problem: Server Shows as "Stopped"

**Diagnosis:**
```bash
claude mcp list
# Shows: claude-flow - Stopped
```

**Solution 1: Restart the Server**
```bash
claude mcp restart claude-flow

# Verify it's now running
claude mcp list
```

**Solution 2: Restart Claude Code**
```bash
/restart

# After restart, verify
claude mcp list
```

**End State:**
- Server shows as "Running"

---

#### Problem: Server is Missing from List

**Diagnosis:**
```bash
claude mcp list
# claude-flow is not in the output
```

**Solution: Add the Server**
```bash
# Add the server
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Verify it was added
claude mcp list
```

**End State:**
- `claude-flow` appears in list with "Running" status

---

#### Problem: Server Errors or Won't Start

**Diagnosis:**
```bash
claude mcp list
# Shows: claude-flow - Error
```

**Solution: Remove and Re-add**
```bash
# Remove the problematic server
claude mcp remove claude-flow

# Re-add with correct configuration
claude mcp add claude-flow npx claude-flow@alpha mcp start

# Verify
claude mcp list
```

**End State:**
- Server shows as "Running" without errors

---

**MCP Server Setup Complete!** All servers should show "Running" status. Proceed to Phase 3.

---

## Phase 3: Project Scaffolding

This phase creates the complete directory structure and configuration files needed for SPARC + TDD workflows.

---

### Step 1: Initialize SPARC Development Environment

**When to Do This:**
- Starting a new project from scratch
- Adding SPARC + TDD to an existing project
- Setting up the foundational structure

**Starting State:**
- Phase 1 (installation) complete
- Phase 2 (MCP servers) running
- You're in your project directory
- No `.roo/` or SPARC structure exists yet

**Commands:**
```bash
# Navigate to your project directory
cd /path/to/your/project

# Initialize SPARC structure
npx claude-flow@alpha init --sparc

# Or if installed globally
claude-flow init --sparc
```

**What Happens:**
Creates a complete SPARC development environment with:
- Configuration directories
- Workflow templates
- Mode definitions
- Project documentation
- Database files for persistence

**End State Verification:**
```bash
# Check .roo directory structure
ls -la .roo/

# Verify key files exist
ls .roo/workflows/basic-tdd.json
cat .roomodes
cat CLAUDE.md

# Check database directories
ls -la .swarm/
ls -la .claude-flow/
```

**Expected Directory Structure:**
```
your-project/
├── .roo/                          # SPARC configuration root
│   ├── README.md                  # SPARC methodology guide
│   ├── templates/                 # Template files for common patterns
│   ├── workflows/
│   │   └── basic-tdd.json        # Predefined TDD workflow
│   ├── modes/                     # Custom SPARC mode definitions
│   └── configs/                   # SPARC configuration files
├── .roomodes                      # Main SPARC modes configuration
├── CLAUDE.md                      # AI-readable project instructions
├── .claude/                       # Claude Code configuration
│   ├── commands/                  # Custom slash commands
│   │   └── hooks/                 # Hook documentation
│   ├── agents/                    # Specialized agent definitions
│   └── settings.json              # Claude Code settings with hooks
├── .swarm/
│   └── memory.db                  # SQLite database for memory persistence
├── .claude-flow/
│   ├── hive-mind.db              # Multi-agent coordination state
│   └── metrics/                   # Performance metrics (JSON)
└── tests/
    └── integration/               # Integration tests directory
```

**Expected Output:**
```bash
$ ls -la .roo/
drwxr-xr-x README.md
drwxr-xr-x templates/
drwxr-xr-x workflows/
drwxr-xr-x modes/
drwxr-xr-x configs/

$ ls .roo/workflows/
basic-tdd.json

$ cat .roomodes
{
  "modes": [
    "spec-pseudocode",
    "architect",
    "tdd",
    "code",
    "integration"
  ]
}
```

**Success Criteria:**
- ✅ `.roo/` directory exists with all subdirectories
- ✅ `.roomodes` configuration file exists
- ✅ `CLAUDE.md` file exists
- ✅ `.roo/workflows/basic-tdd.json` exists
- ✅ `.swarm/memory.db` database file exists
- ✅ `.claude-flow/hive-mind.db` database file exists

---

### Step 2: Initialize Hooks System

**What are Hooks?**
Hooks automate coordination, formatting, and learning from operations. They execute at key points in your workflow:
- **Before tasks start** (pre-task)
- **After file modifications** (post-edit)
- **When sessions end** (session-end)

**Starting State:**
- SPARC structure from Step 1 exists
- `.claude/` directory exists
- Hooks are not yet configured

**Command:**
```bash
npx claude-flow@alpha init --hooks
```

**What Happens:**
1. Creates or updates `.claude/settings.json` with hook configurations
2. Generates hook documentation in `.claude/commands/hooks/`
3. Enables automatic coordination between agents
4. Sets up default hook behaviors

**End State Verification:**
```bash
# Check settings.json has hooks configured
cat .claude/settings.json

# Verify hooks directory exists
ls -la .claude/commands/hooks/

# Look for hook-related configuration
cat .claude/settings.json | grep -A 15 "hooks"
```

**Expected Output:**
```bash
$ cat .claude/settings.json
{
  "hooks": {
    "pre-task": {
      "enabled": true,
      "command": "npx claude-flow@alpha hook pre-task"
    },
    "post-edit": {
      "enabled": true,
      "command": "npx claude-flow@alpha hook post-edit"
    },
    "session-end": {
      "enabled": true,
      "command": "npx claude-flow@alpha hook session-end"
    }
  },
  "claudeFlow": {
    "autoSave": true,
    "autoSaveInterval": 30000
  }
}

$ ls .claude/commands/hooks/
pre-task.md
post-edit.md
session-end.md
```

**Hook Types Configured:**

1. **pre-task Hook**
   - **When it runs**: Before a task starts
   - **What it does**: Auto-spawns agents, loads context
   - **Why it matters**: Ensures agents are ready before work begins

2. **post-edit Hook**
   - **When it runs**: After file modifications
   - **What it does**: Auto-formats code, stores changes in memory
   - **Why it matters**: Maintains code quality and tracks changes

3. **session-end Hook**
   - **When it runs**: At session end
   - **What it does**: Saves state and metrics
   - **Why it matters**: Preserves work for later resumption

**Success Criteria:**
- ✅ `.claude/settings.json` contains hooks configuration
- ✅ `.claude/commands/hooks/` directory exists
- ✅ Hook documentation files are present
- ✅ `autoSave` is enabled in settings

---

### Step 3: Verify Complete Project Structure

**Starting State:**
- Steps 1 and 2 complete
- All directories and files should be in place

**Verification Commands:**
```bash
# Comprehensive structure check
ls -la .roo/
ls -la .claude/
ls -la .swarm/
ls -la .claude-flow/
ls -la tests/integration/

# Verify critical files
cat .roomodes
cat CLAUDE.md
cat .roo/README.md
cat .roo/workflows/basic-tdd.json

# Check databases are writable
touch .swarm/test && rm .swarm/test && echo "✅ .swarm/ writable"
touch .claude-flow/test && rm .claude-flow/test && echo "✅ .claude-flow/ writable"
```

**Expected Output:**
```bash
$ ls -la .roo/
total 24
drwxr-xr-x  6 user user 4096 Jan  8 10:00 .
drwxr-xr-x 10 user user 4096 Jan  8 10:00 ..
-rw-r--r--  1 user user 2048 Jan  8 10:00 README.md
drwxr-xr-x  2 user user 4096 Jan  8 10:00 templates
drwxr-xr-x  2 user user 4096 Jan  8 10:00 workflows
drwxr-xr-x  2 user user 4096 Jan  8 10:00 modes
drwxr-xr-x  2 user user 4096 Jan  8 10:00 configs

$ cat .roomodes
{
  "modes": [...],
  "tdd": {
    "description": "Test-driven development mode"
  }
}

✅ .swarm/ writable
✅ .claude-flow/ writable
```

**Complete Success Checklist:**
- ✅ `.roo/` - SPARC configuration root exists
- ✅ `.roo/README.md` - Methodology guide present
- ✅ `.roo/templates/` - Template directory exists
- ✅ `.roo/workflows/basic-tdd.json` - Basic workflow exists
- ✅ `.roo/modes/` - Custom modes directory exists
- ✅ `.roo/configs/` - Configs directory exists
- ✅ `.roomodes` - Main configuration file exists
- ✅ `CLAUDE.md` - AI-readable instructions exist
- ✅ `.claude/` - Claude Code configuration exists
- ✅ `.claude/settings.json` - Settings with hooks configured
- ✅ `.claude/commands/hooks/` - Hook documentation exists
- ✅ `.swarm/memory.db` - Memory database exists and writable
- ✅ `.claude-flow/hive-mind.db` - Hive-mind database exists and writable
- ✅ `tests/integration/` - Integration test directory exists

**If Any Directory is Missing:**
```bash
# Create missing directories manually
mkdir -p .roo/templates .roo/workflows .roo/modes .roo/configs
mkdir -p .claude/commands/hooks .claude/agents
mkdir -p .swarm .claude-flow/metrics
mkdir -p tests/integration

# Re-run initialization
npx claude-flow@alpha init --sparc --hooks --force
```

---

**Project Scaffolding Complete!** Your project now has the complete SPARC + TDD infrastructure. Proceed to Phase 4.

---

## Phase 4: Configure Persistent Workflows

**What is Workflow Persistence?**
Persistence ensures your work, agent states, and decisions survive across sessions. You can stop work, come back days later, and resume exactly where you left off.

**Three Persistence Mechanisms:**
1. **Memory Persistence** - SQLite database (`.swarm/memory.db`) - Stores decisions, patterns, embeddings
2. **Session State** - Hive-Mind database (`.claude-flow/hive-mind.db`) - Multi-agent coordination state
3. **Checkpoints** - Point-in-time snapshots (`.claude/checkpoints/*.json`) - Recovery points

---

### Step 1: Verify Basic Workflow Exists

**Starting State:**
- Phase 3 (scaffolding) complete
- `.roo/workflows/` directory exists
- You haven't verified the basic workflow yet

**Verification Commands:**
```bash
# Check basic workflow exists
ls -la .roo/workflows/

# View the workflow contents
cat .roo/workflows/basic-tdd.json

# Validate JSON is well-formed
cat .roo/workflows/basic-tdd.json | jq .
```

**Expected Output:**
```bash
$ ls -la .roo/workflows/
-rw-r--r-- basic-tdd.json

$ cat .roo/workflows/basic-tdd.json | jq .
{
  "name": "Basic TDD Workflow",
  "description": "Red-Green-Refactor cycle",
  "tasks": [
    {
      "id": "spec-task",
      "type": "specification",
      ...
    }
  ]
}
```

**Success Criteria:**
- ✅ `basic-tdd.json` file exists
- ✅ JSON is valid (jq parses it without errors)
- ✅ Workflow contains task definitions

**If Workflow is Missing or Invalid:**
```bash
# Re-initialize SPARC to recreate workflows
npx claude-flow@alpha init --sparc --force
```

---

### Step 2: Create a Custom Workflow (Optional)

**When to Do This:**
- The basic workflow doesn't fit your project needs
- You want specific agents for specific tasks
- You need custom task dependencies
- You want to optimize the workflow for your team

**Starting State:**
- Basic workflow exists and is valid
- You understand your project's workflow needs
- You want to create a custom workflow

**Option A: Create from History**

**Command:**
```bash
npx claude-flow@alpha workflow create
```

**What Happens:**
- Analyzes your recent command history
- Identifies patterns in your workflow
- Generates a workflow JSON based on your actual usage
- Saves to `.roo/workflows/generated-workflow.json`

**End State Verification:**
```bash
# Check generated workflow exists
ls -la .roo/workflows/

# View and validate
cat .roo/workflows/generated-workflow.json | jq .
```

---

**Option B: Create Interactively**

**Command:**
```bash
npx claude-flow@alpha workflow create --interactive
```

**What Happens:**
- Prompts you for workflow name
- Asks for task definitions
- Requests agent assignments
- Configures task dependencies
- Saves custom workflow

**During Interactive Creation, You'll Be Asked:**
1. Workflow name (e.g., "My SPARC TDD Workflow")
2. Agent types needed (architect, coder, tester, etc.)
3. Tasks to perform (spec, design, implement, test, etc.)
4. Dependencies (which tasks depend on others)

**End State Verification:**
```bash
# Your custom workflow should exist
ls .roo/workflows/my-sparc-tdd-workflow.json

# Validate it
cat .roo/workflows/my-sparc-tdd-workflow.json | jq .
```

---

**Option C: Create Manually**

**Starting State:**
- You know exactly what workflow structure you need
- You're comfortable editing JSON

**Action:**
Create `.roo/workflows/custom-sparc-tdd.json`:

**Example Custom Workflow:**

```json
{
  "name": "Custom SPARC + TDD Workflow",
  "description": "Multi-stage development workflow with automated testing",
  "agents": [
    {
      "id": "architect",
      "type": "architect",
      "description": "Designs system architecture"
    },
    {
      "id": "developer",
      "type": "coder",
      "description": "Implements features with TDD"
    },
    {
      "id": "tester",
      "type": "tester",
      "description": "Creates and runs integration tests"
    }
  ],
  "tasks": [
    {
      "id": "spec-task",
      "type": "specification",
      "description": "Define requirements and create pseudocode",
      "assignTo": "architect"
    },
    {
      "id": "arch-task",
      "type": "architecture",
      "description": "Design system structure",
      "assignTo": "architect",
      "depends": ["spec-task"]
    },
    {
      "id": "red-phase",
      "type": "tdd-red",
      "description": "Write failing tests",
      "assignTo": "developer",
      "depends": ["arch-task"]
    },
    {
      "id": "green-phase",
      "type": "tdd-green",
      "description": "Implement minimal code to pass tests",
      "assignTo": "developer",
      "depends": ["red-phase"]
    },
    {
      "id": "refactor-phase",
      "type": "tdd-refactor",
      "description": "Optimize and clean code",
      "assignTo": "developer",
      "depends": ["green-phase"]
    },
    {
      "id": "integration-task",
      "type": "integration",
      "description": "Integration testing and validation",
      "assignTo": "tester",
      "depends": ["refactor-phase"]
    }
  ]
}
```

**End State Verification:**
```bash
# Verify file was created
ls .roo/workflows/custom-sparc-tdd.json

# Validate JSON syntax
cat .roo/workflows/custom-sparc-tdd.json | jq .

# Should parse without errors
echo $?  # Should output: 0
```

**Success Criteria:**
- ✅ Custom workflow file exists
- ✅ JSON is valid
- ✅ Contains agents, tasks, and dependencies

---

### Step 3: Configure Auto-Save and Persistence

**Starting State:**
- `.claude/settings.json` exists (from Phase 3)
- Auto-save may not be configured yet
- You want automatic session persistence

**Action:**
Edit `.claude/settings.json` to enable auto-save:

**Command:**
```bash
# Open settings.json in your editor
nano .claude/settings.json
# or
code .claude/settings.json
```

**Add or Update Configuration:**
```json
{
  "claudeFlow": {
    "autoSave": true,
    "autoSaveInterval": 30000,
    "enableHiveMind": true,
    "persistMemory": true,
    "maxCheckpoints": 10
  }
}
```

**Configuration Explained:**
- `autoSave: true` - Automatically saves session state
- `autoSaveInterval: 30000` - Saves every 30 seconds (30000ms)
- `enableHiveMind: true` - Enables multi-agent coordination persistence
- `persistMemory: true` - Stores agent memory to database
- `maxCheckpoints: 10` - Keeps last 10 checkpoints (older ones are deleted)

**End State Verification:**
```bash
# Verify settings were saved
cat .claude/settings.json

# Check for claudeFlow configuration
cat .claude/settings.json | jq '.claudeFlow'

# Verify auto-save is enabled
cat .claude/settings.json | jq '.claudeFlow.autoSave'
```

**Expected Output:**
```bash
$ cat .claude/settings.json | jq '.claudeFlow'
{
  "autoSave": true,
  "autoSaveInterval": 30000,
  "enableHiveMind": true,
  "persistMemory": true,
  "maxCheckpoints": 10
}

$ cat .claude/settings.json | jq '.claudeFlow.autoSave'
true
```

**Success Criteria:**
- ✅ `settings.json` contains `claudeFlow` section
- ✅ `autoSave` is set to `true`
- ✅ `autoSaveInterval` is configured (recommend 30000-60000ms)
- ✅ `enableHiveMind` and `persistMemory` are `true`

---

### Step 4: Test Persistence is Working

**Starting State:**
- Auto-save configured in Step 3
- Databases exist from Phase 3
- You want to verify persistence actually works

**Test Commands:**
```bash
# Test 1: Store something in memory
npx claude-flow@alpha memory store test_key "test value for persistence"

# Test 2: Verify it was stored
npx claude-flow@alpha memory retrieve test_key

# Test 3: Check database file size increased
ls -lh .swarm/memory.db .claude-flow/hive-mind.db
```

**Expected Output:**
```bash
$ npx claude-flow@alpha memory store test_key "test value for persistence"
✓ Stored test_key in memory

$ npx claude-flow@alpha memory retrieve test_key
"test value for persistence"

$ ls -lh .swarm/memory.db
-rw-r--r-- 1 user user 12K Jan 8 10:00 .swarm/memory.db
# Size should be > 0 and growing with usage
```

**Success Criteria:**
- ✅ Can store data in memory
- ✅ Can retrieve stored data
- ✅ Database files exist and have non-zero size
- ✅ No errors when reading/writing

**If Persistence Doesn't Work:**
```bash
# Check database permissions
chmod 644 .swarm/memory.db .claude-flow/hive-mind.db

# Verify directories are writable
touch .swarm/test && rm .swarm/test
touch .claude-flow/test && rm .claude-flow/test

# Re-initialize if needed
npx claude-flow@alpha init --sparc --hooks --force
```

---

**Persistent Workflows Configured!** Your workflows are now persistent, auto-saving every 30 seconds. Proceed to Phase 5.

---

## Phase 5: Integration Testing Setup

Integration testing verifies that components work together correctly. This phase sets up the infrastructure for automated integration tests.

---

### Step 1: Create Integration Testing Directories

**Starting State:**
- Phases 1-4 complete
- Project root directory exists
- No integration testing structure yet

**Commands:**
```bash
# Create integration test directory
mkdir -p tests/integration

# Create coverage and docs directories
mkdir -p coverage
mkdir -p docs/testing
```

**What Gets Created:**
```
your-project/
├── tests/
│   └── integration/      # Integration tests go here
├── coverage/             # Test coverage reports
└── docs/
    └── testing/          # Testing documentation
```

**End State Verification:**
```bash
# Verify directories exist
ls -la tests/integration/
ls -la coverage/
ls -la docs/testing/

# Check they're writable
touch tests/integration/test && rm tests/integration/test && echo "✅ tests/integration/ writable"
touch coverage/test && rm coverage/test && echo "✅ coverage/ writable"
touch docs/testing/test && rm docs/testing/test && echo "✅ docs/testing/ writable"
```

**Expected Output:**
```bash
$ ls -la tests/integration/
drwxr-xr-x 2 user user 4096 Jan 8 10:00 .

$ ls -la coverage/
drwxr-xr-x 2 user user 4096 Jan 8 10:00 .

✅ tests/integration/ writable
✅ coverage/ writable
✅ docs/testing/ writable
```

**Success Criteria:**
- ✅ `tests/integration/` directory exists
- ✅ `coverage/` directory exists
- ✅ `docs/testing/` directory exists
- ✅ All directories are writable

---

### Step 2: Create Sample Integration Test

**Starting State:**
- `tests/integration/` directory exists
- No test files exist yet
- You want a working example test

**Action:**
Create `tests/integration/example.test.js`:

```javascript
/**
 * Integration Test Example
 * Following SPARC + TDD best practices
 */

const { expect } = require('chai');

describe('Integration Test Suite', () => {
  // Setup: Use fixtures and factories
  before(async () => {
    // Initialize test environment
    // Mock external dependencies at boundaries
  });

  // Teardown
  after(async () => {
    // Clean up test data
  });

  // Test behavior, not implementation
  it('should handle user authentication flow', async () => {
    // Arrange
    const testUser = {
      username: 'testuser',
      password: 'securepassword'
    };

    // Act
    const result = await authenticateUser(testUser);

    // Assert
    expect(result).to.have.property('token');
    expect(result.success).to.be.true;
  });

  // Maintain test independence
  it('should handle invalid credentials independently', async () => {
    const invalidUser = {
      username: 'invalid',
      password: 'wrong'
    };

    const result = await authenticateUser(invalidUser);

    expect(result.success).to.be.false;
    expect(result.error).to.exist;
  });
});
```

**End State Verification:**
```bash
# Verify test file exists
ls tests/integration/example.test.js

# Check syntax (if you have Node.js linting)
node -c tests/integration/example.test.js

# Count lines
wc -l tests/integration/example.test.js
```

**Expected Output:**
```bash
$ ls tests/integration/example.test.js
tests/integration/example.test.js

$ wc -l tests/integration/example.test.js
45 tests/integration/example.test.js
```

**Success Criteria:**
- ✅ Test file exists
- ✅ Syntax is valid
- ✅ Contains setup/teardown hooks
- ✅ Contains example test cases

---

### Step 3: Review Integration Testing Best Practices

**What Makes Good Integration Tests:**

From claude-flow SPARC methodology, follow these principles:

1. **✅ Avoid hardcoding secrets**
   - Use environment variables or .env files
   - Never commit credentials to git
   ```javascript
   const apiKey = process.env.API_KEY;
   ```

2. **✅ Use test fixtures and factories**
   - Create reusable test data generators
   - Keep test data consistent
   ```javascript
   const createTestUser = () => ({ username: 'test', password: 'test123' });
   ```

3. **✅ Mock external dependencies at boundaries**
   - Mock APIs, databases, external services
   - Don't mock internal application code
   ```javascript
   nock('https://api.example.com').get('/users').reply(200, { ... });
   ```

4. **✅ Test behavior, not implementation**
   - Focus on what the code does, not how
   - Avoid testing internal methods directly

5. **✅ Maintain test independence**
   - Each test should run in isolation
   - No test should depend on another test's state

6. **✅ Use descriptive test names**
   - Names should explain what's being tested
   - Good: `it('should return 401 when token is expired')`
   - Bad: `it('test1')`

---

### Step 4: Set Up CI/CD (Optional)

**When to Do This:**
- You're using GitHub or GitLab
- You want automated testing on every commit
- You want CI/CD pipeline integration

**Starting State:**
- You have a Git repository
- You're using GitHub (for this example)
- No CI/CD configuration exists yet

**Action:**
Create `.github/workflows/sparc-tdd.yml`:

```yaml
name: SPARC + TDD Workflow

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v3

    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'

    - name: Install dependencies
      run: npm ci

    - name: Run unit tests
      run: npm test

    - name: Run integration tests
      run: npm run test:integration

    - name: Generate coverage report
      run: npm run coverage

    - name: Upload coverage
      uses: codecov/codecov-action@v3
```

**What This Does:**
- Runs tests on every push to `main` or `develop`
- Runs tests on every pull request
- Sets up Node.js 20
- Installs dependencies
- Runs unit and integration tests
- Generates and uploads coverage reports

**End State Verification:**
```bash
# Verify CI config exists
ls .github/workflows/sparc-tdd.yml

# Validate YAML syntax
cat .github/workflows/sparc-tdd.yml | grep "name:"

# Check it's valid YAML (requires yamllint)
yamllint .github/workflows/sparc-tdd.yml || echo "Install yamllint or verify manually"
```

**Expected Output:**
```bash
$ ls .github/workflows/sparc-tdd.yml
.github/workflows/sparc-tdd.yml

$ cat .github/workflows/sparc-tdd.yml | grep "name:"
name: SPARC + TDD Workflow
```

**Success Criteria:**
- ✅ Workflow file exists in `.github/workflows/`
- ✅ YAML syntax is valid
- ✅ Workflow triggers are configured
- ✅ Test steps are defined

**After Pushing to GitHub:**
- Go to your repository's "Actions" tab
- Verify the workflow appears
- Watch it run on the next commit

---

**Integration Testing Setup Complete!** Your project now has integration testing infrastructure and optional CI/CD. Proceed to using the workflow.

---

## Using the SPARC + TDD Workflow

Now that setup is complete, this section shows you how to actually USE the workflow for development.

---

### Quick Start: Run Full SPARC + TDD Workflow

**When to Use This:**
- You have a complete feature to implement
- You want the full SPARC methodology applied
- You're starting a new feature from scratch
- You want automated progression through all phases

**Starting State:**
- Phases 1-5 complete
- MCP servers running
- SPARC structure initialized
- You have a feature idea to implement

**Command:**
```bash
# Execute complete SPARC + TDD workflow for a feature
npx claude-flow@alpha sparc tdd "implement user authentication system"
```

**What Happens (Automatic Progression Through 5 Phases):**

1. **Specification & Pseudocode Phase**
   - Analyzes your feature description
   - Generates detailed requirements document
   - Creates user stories and acceptance criteria
   - Produces pseudocode for key algorithms

2. **Architecture Phase**
   - Designs system structure
   - Defines component interfaces
   - Plans data flows
   - Creates architectural diagrams

3. **Red Phase (TDD)**
   - Writes failing tests based on specifications
   - Creates test fixtures and mocks
   - Sets up test environment

4. **Green Phase (TDD)**
   - Implements minimal code to pass tests
   - Focuses on making tests pass
   - No optimization yet

5. **Refactor Phase**
   - Cleans up code
   - Optimizes performance
   - Improves readability
   - Ensures tests still pass

6. **Integration & Completion**
   - Runs integration tests
   - Verifies end-to-end functionality
   - Generates documentation
   - Validates against original requirements

**End State Verification:**
```bash
# Check if specification files were created
ls .roo/specs/

# Check if tests were generated
ls tests/

# Check if source code was created
ls src/  # or your source directory

# Run the tests to verify they pass
npm test  # or your test command
```

**Expected Output:**
```bash
$ ls .roo/specs/
authentication-spec.md
authentication-pseudocode.md

$ ls tests/
auth.test.js
auth-integration.test.js

$ ls src/
auth.js
auth-service.js

$ npm test
✓ should authenticate valid user
✓ should reject invalid credentials
✓ should generate JWT token
All tests passing
```

**Success Criteria:**
- ✅ Specification documents exist in `.roo/specs/`
- ✅ Test files were created
- ✅ Source code was implemented
- ✅ All tests pass
- ✅ Feature is complete and validated

---

### Run Individual SPARC Phases

**When to Use Individual Phases:**
- You want granular control over each step
- You're iterating on a specific phase
- You're learning the SPARC methodology
- Your project doesn't need the full workflow at once
- You need to refine one phase before proceeding

---

#### Specification & Pseudocode Phase

**When to Use:**
- Starting a new feature
- No formal specification exists yet
- You need to clarify requirements

**Starting State:**
- You have a feature idea or requirement
- No specification document exists
- No pseudocode written

**Command:**
```bash
npx claude-flow@alpha sparc run spec-pseudocode "Define user authentication requirements"
```

**What Happens:**
- Generates detailed requirements document
- Creates user stories and acceptance criteria
- Produces pseudocode for key algorithms
- Identifies data structures and flows
- Saves to `.roo/specs/`

**End State Verification:**
```bash
# Check spec files were created
ls .roo/specs/

# View the generated spec
cat .roo/specs/authentication-spec.md

# Should contain sections like:
grep -E "Requirements|User Stories|Acceptance Criteria|Pseudocode" .roo/specs/authentication-spec.md
```

**Expected Output:**
```bash
$ ls .roo/specs/
authentication-spec.md

$ cat .roo/specs/authentication-spec.md
# User Authentication Specification

## Requirements
- User can register with email/password
- Password must be hashed with bcrypt
- JWT tokens for session management

## User Stories
- As a user, I want to register with email/password
- As a user, I want to log in securely

## Pseudocode
```
function authenticate(email, password):
  user = findUserByEmail(email)
  if not user: return error
  if validatePassword(password, user.hash):
    return generateJWT(user)
  return error
```
```

**Success Criteria:**
- ✅ Specification file exists in `.roo/specs/`
- ✅ Contains requirements, user stories, and acceptance criteria
- ✅ Pseudocode is present and logical
- ✅ You understand what needs to be built

---

#### Architecture Phase

**When to Use:**
- Specification is complete
- You need to design system structure
- Planning component interactions

**Starting State:**
- Specification from previous phase exists
- No architecture design yet
- You're ready to design the system

**Command:**
```bash
npx claude-flow@alpha sparc run architect "Design authentication service architecture"
```

**What Happens:**
- Designs system structure and components
- Defines API contracts and interfaces
- Creates data models
- Plans for scalability and security
- Generates architecture diagrams
- Saves to `.roo/architecture/`

**End State Verification:**
```bash
# Check architecture files were created
ls .roo/architecture/

# View the architecture design
cat .roo/architecture/authentication-architecture.md

# Look for key sections
grep -E "Components|Data Models|API Endpoints|Security" .roo/architecture/authentication-architecture.md
```

**Expected Output:**
```bash
$ ls .roo/architecture/
authentication-architecture.md
authentication-diagram.mermaid

$ cat .roo/architecture/authentication-architecture.md
# Authentication Service Architecture

## Components
- AuthController: Handles HTTP requests
- AuthService: Business logic
- UserRepository: Data access layer
- JWTService: Token generation/validation

## API Endpoints
POST /api/auth/register
POST /api/auth/login
POST /api/auth/verify

## Data Models
User: { id, email, passwordHash, createdAt }
```

**Success Criteria:**
- ✅ Architecture documents exist
- ✅ Components and interfaces are defined
- ✅ Data models are specified
- ✅ API contracts are clear
- ✅ Security considerations are addressed

---

#### TDD Phase (Red-Green-Refactor)

**When to Use:**
- Architecture is complete
- You're ready to implement
- You want test-driven development

**Starting State:**
- Specification and architecture exist
- No tests or implementation yet
- TDD workflow ready to begin

**Command:**
```bash
npx claude-flow@alpha sparc run tdd "implement user authentication service"
```

**What Happens (Full Red-Green-Refactor Cycle):**

1. **RED**: Writes failing tests
   - Creates test files
   - Defines test cases from specifications
   - Tests fail (no implementation yet)

2. **GREEN**: Implements minimal code
   - Writes just enough code to pass tests
   - Focuses on functionality, not optimization

3. **REFACTOR**: Cleans and optimizes
   - Improves code quality
   - Optimizes performance
   - Maintains passing tests

**End State Verification:**
```bash
# Check tests were created
ls tests/ | grep -i auth

# Check implementation was created
ls src/ | grep -i auth

# Run tests to verify they pass
npm test

# Check test coverage
npm run coverage
```

**Expected Output:**
```bash
$ ls tests/
auth.test.js
auth-service.test.js

$ ls src/
auth.js
auth-service.js
jwt-service.js

$ npm test
 PASS  tests/auth.test.js
  ✓ should authenticate valid user (15ms)
  ✓ should reject invalid credentials (8ms)
  ✓ should generate JWT token (12ms)
  ✓ should validate JWT token (10ms)

Tests: 4 passed, 4 total
```

**Success Criteria:**
- ✅ Test files exist and are comprehensive
- ✅ Implementation exists
- ✅ All tests pass
- ✅ Code is clean and optimized
- ✅ Test coverage is good (>80%)

---

#### Integration Phase

**When to Use:**
- Implementation is complete
- All unit tests pass
- Ready for end-to-end verification

**Starting State:**
- TDD phase complete
- Unit tests passing
- Need to verify complete flow

**Command:**
```bash
npx claude-flow@alpha sparc run integration "verify authentication flow end-to-end"
```

**What Happens:**
- Creates integration tests
- Tests complete user flows
- Verifies component interactions
- Validates against original requirements
- Generates integration test report

**End State Verification:**
```bash
# Check integration tests exist
ls tests/integration/ | grep -i auth

# Run integration tests
npm run test:integration

# Check integration test report
cat coverage/integration-report.txt
```

**Expected Output:**
```bash
$ ls tests/integration/
auth-integration.test.js
auth-flow.test.js

$ npm run test:integration
 PASS  tests/integration/auth-integration.test.js
  ✓ should complete full registration flow (45ms)
  ✓ should complete full login flow (38ms)
  ✓ should handle complete logout flow (25ms)

Integration Tests: 3 passed, 3 total
```

**Success Criteria:**
- ✅ Integration tests exist
- ✅ All integration tests pass
- ✅ End-to-end flows work correctly
- ✅ Feature meets original requirements

---

### Execute Custom Workflows

**When to Use:**
- You created a custom workflow in Phase 4
- You want to run a specific workflow file
- You need custom task sequencing

**Starting State:**
- Custom workflow file exists (e.g., `.roo/workflows/custom-sparc-tdd.json`)
- Workflow JSON is valid
- You're ready to execute it

---

#### Basic Workflow Execution

**Command:**
```bash
# Run your custom workflow
npx claude-flow@alpha workflow run .roo/workflows/custom-sparc-tdd.json
```

**What Happens:**
- Loads workflow definition
- Spawns agents defined in workflow
- Executes tasks in dependency order
- Completes all tasks automatically

**End State Verification:**
```bash
# Check workflow execution log
ls .claude-flow/logs/

# Verify tasks completed
npx claude-flow@alpha workflow status
```

---

#### Workflow Execution with Monitoring

**Command:**
```bash
# With real-time monitoring
npx claude-flow@alpha workflow run .roo/workflows/custom-sparc-tdd.json --watch
```

**What Happens:**
- Runs workflow with live progress display
- Shows real-time task completion
- Displays agent activity
- Updates terminal with status

**During Execution You'll See:**
```
[Agent: architect] Starting spec-task...
[Agent: architect] ✓ spec-task complete
[Agent: architect] Starting arch-task...
[Agent: developer] Waiting for arch-task...
[Agent: architect] ✓ arch-task complete
[Agent: developer] Starting red-phase...
```

---

#### Dry Run (Preview Mode)

**Command:**
```bash
# Dry run to preview steps
npx claude-flow@alpha workflow run .roo/workflows/custom-sparc-tdd.json --dry-run
```

**What Happens:**
- Parses workflow file
- Shows what WOULD happen
- Doesn't execute anything
- Validates workflow structure

**Expected Output:**
```bash
Workflow: Custom SPARC + TDD Workflow
Tasks to execute:
  1. spec-task (assign to: architect)
  2. arch-task (assign to: architect, depends on: spec-task)
  3. red-phase (assign to: developer, depends on: arch-task)
  4. green-phase (assign to: developer, depends on: red-phase)
  5. refactor-phase (assign to: developer, depends on: green-phase)
  6. integration-task (assign to: tester, depends on: refactor-phase)

Dry run complete. Use without --dry-run to execute.
```

**Success Criteria:**
- ✅ Workflow structure is valid
- ✅ Task dependencies are correct
- ✅ Agent assignments are clear

---

#### Interactive Mode

**Command:**
```bash
# Interactive mode (wait for user input between phases)
npx claude-flow@alpha workflow run .roo/workflows/custom-sparc-tdd.json --interactive
```

**What Happens:**
- Executes one task at a time
- Pauses between tasks
- Waits for your confirmation
- Allows you to review before proceeding

**During Execution:**
```bash
[Agent: architect] ✓ spec-task complete

Review the specification in .roo/specs/
Press Enter to continue to next task, or Ctrl+C to stop...

[User presses Enter]

[Agent: architect] Starting arch-task...
```

**When to Use Interactive Mode:**
- You want to review each phase before proceeding
- You're learning the workflow
- You want to make adjustments between tasks

**Success Criteria:**
- ✅ Can pause between tasks
- ✅ Can review output at each step
- ✅ Can stop workflow at any point

---

### Using Hooks During Development

**What are Hooks?**
Hooks run automatically at specific points in your workflow to automate common tasks.

---

#### Pre-Task Hook

**When It Runs:**
- Before any task starts
- Automatically triggered by workflow

**What It Does:**
- Auto-spawns required agents
- Loads project context
- Prepares environment

**Manual Invocation (Optional):**
```bash
npx claude-flow@alpha hook pre-task --description "Implement authentication"
```

**What Happens:**
- Analyzes task description
- Spawns appropriate agents
- Loads relevant context from memory
- Prepares workspace

**End State:**
- ✅ Agents are spawned and ready
- ✅ Context is loaded
- ✅ Ready to start work

---

#### Post-Edit Hook

**When It Runs:**
- After you edit any file
- Automatically triggered by file save

**What It Does:**
- Auto-formats code
- Stores changes in memory
- Updates metrics

**Manual Invocation (Optional):**
```bash
npx claude-flow@alpha hook post-edit --file "src/auth.js" --memory-key "auth/login"
```

**What Happens:**
- Formats the specified file
- Stores file changes in memory database
- Associates with memory key for retrieval
- Updates change metrics

**End State:**
- ✅ File is formatted
- ✅ Changes stored in memory
- ✅ Metrics updated

---

#### Session-End Hook

**When It Runs:**
- When you end a development session
- Before closing your work

**What It Does:**
- Saves complete session state
- Exports metrics
- Creates recovery checkpoint

**Manual Invocation:**
```bash
npx claude-flow@alpha hook session-end --session-id "dev-session" --export-metrics
```

**What Happens:**
- Saves all agent states
- Saves task queue
- Exports metrics to `.claude-flow/metrics/`
- Creates checkpoint in `.claude/checkpoints/`

**End State Verification:**
```bash
# Check session was saved
npx claude-flow@alpha session list | grep "dev-session"

# Check metrics were exported
ls .claude-flow/metrics/

# Check checkpoint exists
ls .claude/checkpoints/
```

**Success Criteria:**
- ✅ Session state is saved
- ✅ Metrics are exported
- ✅ Checkpoint created
- ✅ Can resume later

---

## Session Management & Persistence

One of claude-flow's most powerful features is persistent, resumable sessions. Stop work at any time and resume exactly where you left off - even days later.

---

### Save Your Current Session

**When to Do This:**
- End of your workday
- Before switching to a different feature
- After completing a major milestone
- Before risky operations (as a backup)

**Starting State:**
- You're in the middle of work
- Agents are active or tasks are in progress
- You want to preserve current state

**Command:**
```bash
# Save current work state with a descriptive name
npx claude-flow@alpha session save "feature-auth-implementation"
```

**What Gets Saved:**
- All active agents and their configurations
- Current task queue (pending and completed)
- Agent memory and decisions
- System configuration
- Implementation notes and context
- File change history
- Checkpoint data

**End State Verification:**
```bash
# List sessions to verify save
npx claude-flow@alpha session list

# Should show your session
npx claude-flow@alpha session list | grep "feature-auth-implementation"

# Check session details
npx claude-flow@alpha session info <session-id>
```

**Expected Output:**
```bash
$ npx claude-flow@alpha session list
Session ID: abc123
Name: feature-auth-implementation
Created: 2025-01-08 14:30:00
Agents: 3 active
Tasks: 5 pending, 12 completed
Memory size: 2.3 MB
```

**Success Criteria:**
- ✅ Session appears in session list
- ✅ Session has a unique ID
- ✅ Agent count matches your active agents
- ✅ Task counts are correct

---

### List All Saved Sessions

**When to Do This:**
- You want to see all available sessions
- You need to find a specific session ID
- You want to review session details

**Starting State:**
- One or more sessions have been saved
- You need to find a session to restore

**Command:**
```bash
npx claude-flow@alpha session list
```

**What You'll See:**
- List of all saved sessions
- Session IDs, names, and creation dates
- Agent counts and task statistics
- Memory/storage sizes

**Expected Output:**
```
Session ID: abc123
Name: feature-auth-implementation
Created: 2025-01-08 14:30:00
Agents: 3 active
Tasks: 5 pending, 12 completed

Session ID: def456
Name: bugfix-login-redirect
Created: 2025-01-07 10:15:00
Agents: 2 active
Tasks: 3 pending, 8 completed
```

**Success Criteria:**
- ✅ All saved sessions are listed
- ✅ Session details are visible
- ✅ Can identify the session you want to restore

---

### Restore a Session

**When to Do This:**
- Resuming work after a break
- Recovering from a crash
- Switching back to a previous feature
- Reviewing past work

**Starting State:**
- A session was previously saved
- You have the session ID (from `session list`)
- You want to resume work

**Basic Restore:**
```bash
# Restore complete session
npx claude-flow@alpha session restore abc123
```

**What Happens:**
- Loads all saved agents
- Restores agent configurations
- Loads task queue
- Restores system state
- Ready to continue work

**Advanced Restore with Options:**
```bash
# Restore with specific options
npx claude-flow@alpha session restore abc123 --load-memory --resume-tasks
```

**Restore Options:**
- `--load-memory` - Load agent memory and decisions
- `--resume-tasks` - Resume pending tasks automatically
- `--agents-only` - Only restore agents, not tasks
- `--tasks-only` - Only restore tasks, not agents

**End State Verification:**
```bash
# Check agents are active
npx claude-flow@alpha agent list

# Check tasks are loaded
npx claude-flow@alpha task list

# Verify memory was loaded
npx claude-flow@alpha memory list | head -5
```

**Expected Output:**
```bash
$ npx claude-flow@alpha agent list
Agent: architect (active)
Agent: developer (active)
Agent: tester (active)

$ npx claude-flow@alpha task list
Tasks restored: 5 pending, 12 completed
```

**Success Criteria:**
- ✅ Agents are active
- ✅ Tasks are loaded
- ✅ Memory state is restored
- ✅ Can continue work immediately

---

### Export/Import Sessions

**Why Export Sessions:**
- Backup before risky changes
- Share workflow with team members
- Move work between machines
- Archive completed features

---

#### Export a Session

**Starting State:**
- Session exists and is saved
- You want to create a portable backup

**Command:**
```bash
# Export for backup or sharing
npx claude-flow@alpha session export abc123 session-backup.json
```

**What Gets Exported:**
- Complete session state as JSON
- All agents, tasks, and memory
- Portable file you can transfer

**End State Verification:**
```bash
# Check export file exists
ls -lh session-backup.json

# View export structure (first 20 lines)
cat session-backup.json | jq . | head -20
```

**Expected Output:**
```bash
$ ls -lh session-backup.json
-rw-r--r-- 1 user user 2.5M Jan 8 15:00 session-backup.json

$ cat session-backup.json | jq .
{
  "sessionId": "abc123",
  "name": "feature-auth-implementation",
  "agents": [...],
  "tasks": [...],
  "memory": {...}
}
```

**Success Criteria:**
- ✅ Export file exists
- ✅ File size is reasonable (> 0 bytes)
- ✅ JSON is valid

---

#### Import a Session

**Starting State:**
- You have an exported session JSON file
- File is accessible on current machine

**Command:**
```bash
# Import from file
npx claude-flow@alpha session import session-backup.json
```

**What Happens:**
- Parses JSON file
- Creates new session from exported data
- Assigns new session ID
- Makes session available for restore

**End State Verification:**
```bash
# List sessions to see imported session
npx claude-flow@alpha session list

# Should show a new session (with new ID)
```

**Expected Output:**
```bash
$ npx claude-flow@alpha session import session-backup.json
✓ Session imported successfully
New Session ID: xyz789

$ npx claude-flow@alpha session list
Session ID: xyz789
Name: feature-auth-implementation (imported)
Created: 2025-01-08 15:05:00
...
```

**Success Criteria:**
- ✅ Session imported successfully
- ✅ New session ID assigned
- ✅ Session appears in list
- ✅ Can restore imported session

---

### Create Checkpoints During Work

**What are Checkpoints:**
- Point-in-time snapshots of your work
- Lighter weight than full sessions
- Quick recovery points during development

**When to Create Checkpoints:**
- Before making risky changes
- After completing a working feature
- Periodically during long work sessions
- Before refactoring

**Starting State:**
- You're in the middle of work
- Want to create a recovery point
- Don't want to save full session

**Create a Checkpoint:**
```bash
# Create a state snapshot
npx claude-flow@alpha memory store checkpoint_name "development-checkpoint-1"
```

**What Gets Stored:**
- Current memory state
- Recent decisions and context
- Stored under a named key

**End State Verification:**
```bash
# List memory keys to see checkpoint
npx claude-flow@alpha memory list | grep checkpoint

# Retrieve checkpoint to verify
npx claude-flow@alpha memory retrieve checkpoint_name
```

**Expected Output:**
```bash
$ npx claude-flow@alpha memory list | grep checkpoint
checkpoint_name: "development-checkpoint-1"

$ npx claude-flow@alpha memory retrieve checkpoint_name
"development-checkpoint-1"
```

---

**Restore from Checkpoint:**

**When to Restore:**
- Something went wrong
- You want to revert to a known-good state
- Experimenting with changes

**Command:**
```bash
# Restore from checkpoint
npx claude-flow@alpha memory restore checkpoint_name
```

**What Happens:**
- Loads checkpoint data
- Restores memory state
- Reverts to checkpoint point

**Success Criteria:**
- ✅ Checkpoint can be retrieved
- ✅ State is restored
- ✅ Can continue from checkpoint

---

### Auto-Save Configuration

**What is Auto-Save:**
- Automatic session saving at regular intervals
- Enabled by default (every 30 seconds)
- Prevents data loss from crashes

**Current Configuration:**
Auto-save is enabled by default. To verify or modify:

**View Current Settings:**
```bash
cat .claude/settings.json | jq '.claudeFlow'
```

**Expected Output:**
```json
{
  "autoSave": true,
  "autoSaveInterval": 30000,
  "maxCheckpoints": 10,
  "enableHiveMind": true
}
```

---

**Modify Auto-Save Settings:**

**Starting State:**
- `.claude/settings.json` exists
- You want to change auto-save behavior

**Action:**
Edit `.claude/settings.json`:

```json
{
  "claudeFlow": {
    "autoSave": true,
    "autoSaveInterval": 60000,  // 60 seconds (increase interval)
    "maxCheckpoints": 10,
    "enableHiveMind": true
  }
}
```

**Configuration Options:**
- `autoSave` - Enable/disable auto-save (true/false)
- `autoSaveInterval` - Milliseconds between saves (30000 = 30 seconds)
- `maxCheckpoints` - Number of checkpoints to keep (older ones deleted)
- `enableHiveMind` - Enable multi-agent persistence (true/false)

**Recommended Settings:**
- **Frequent saves**: `autoSaveInterval: 30000` (30 seconds)
- **Balanced**: `autoSaveInterval: 60000` (60 seconds)
- **Minimal overhead**: `autoSaveInterval: 300000` (5 minutes)

**End State Verification:**
```bash
# Verify settings were saved
cat .claude/settings.json | jq '.claudeFlow.autoSaveInterval'

# Should show your new interval
```

**Expected Output:**
```bash
$ cat .claude/settings.json | jq '.claudeFlow.autoSaveInterval'
60000
```

**Success Criteria:**
- ✅ Settings file updated
- ✅ Auto-save interval changed
- ✅ Configuration valid

---

## Troubleshooting

### MCP Server Issues

**Problem**: `claude mcp list` shows servers as "Stopped"

**Solution**:
```bash
# Restart Claude Code
/restart

# Or manually restart MCP
claude mcp restart claude-flow
```

---

**Problem**: MCP tools not available

**Solution**:
```bash
# Verify installation
claude mcp list

# Re-add if missing
claude mcp remove claude-flow
claude mcp add claude-flow npx claude-flow@alpha mcp start
```

### Workflow Execution Issues

**Problem**: Workflow fails to start

**Solution**:
```bash
# Verify workflow JSON is valid
cat .roo/workflows/basic-tdd.json | jq .

# Check for syntax errors
npx claude-flow@alpha workflow validate .roo/workflows/basic-tdd.json

# Run in dry-run mode to debug
npx claude-flow@alpha workflow run .roo/workflows/basic-tdd.json --dry-run
```

---

**Problem**: Agents not coordinating properly

**Solution**:
```bash
# Verify hooks are configured
cat .claude/settings.json

# Re-initialize hooks
npx claude-flow@alpha init --hooks --force
```

### Session Persistence Issues

**Problem**: Sessions not saving

**Solution**:
```bash
# Check database exists
ls -la .swarm/memory.db
ls -la .claude-flow/hive-mind.db

# Verify permissions
chmod 644 .swarm/memory.db
chmod 644 .claude-flow/hive-mind.db

# Check auto-save configuration
cat .claude/settings.json | grep -A 5 "autoSave"
```

---

**Problem**: Can't restore session

**Solution**:
```bash
# List all sessions to verify ID
npx claude-flow@alpha session list

# Try export/import instead
npx claude-flow@alpha session export <session-id> backup.json
npx claude-flow@alpha session import backup.json
```

### Common Installation Issues

**Problem**: `claude-flow` command not found

**Solution**:
```bash
# If using global install
npm install -g claude-flow@alpha

# Or always use npx
npx claude-flow@alpha --version

# Check npm global path
npm config get prefix
```

---

**Problem**: Permission errors during init

**Solution**:
```bash
# Check directory permissions
ls -la

# Fix permissions
chmod 755 .
sudo chown -R $USER:$USER .

# Run without sudo
npx claude-flow@alpha init --sparc
```

---

## Quick Reference

### Essential Commands

```bash
# Installation
npm install -g @anthropic-ai/claude-code
npm install -g claude-flow@alpha

# MCP Setup
claude mcp add claude-flow npx claude-flow@alpha mcp start
claude mcp list

# Project Initialization
npx claude-flow@alpha init --sparc
npx claude-flow@alpha init --hooks

# SPARC Workflows
npx claude-flow@alpha sparc tdd "feature description"
npx claude-flow@alpha sparc run spec-pseudocode "task"
npx claude-flow@alpha sparc run architect "task"
npx claude-flow@alpha sparc run tdd "task"
npx claude-flow@alpha sparc run integration "task"

# Custom Workflows
npx claude-flow@alpha workflow create
npx claude-flow@alpha workflow run <workflow-file> --watch

# Session Management
npx claude-flow@alpha session save "session-name"
npx claude-flow@alpha session list
npx claude-flow@alpha session restore <session-id>
npx claude-flow@alpha session export <session-id> <file>
npx claude-flow@alpha session import <file>

# Hooks
npx claude-flow@alpha hook pre-task --description "task"
npx claude-flow@alpha hook post-edit --file "path" --memory-key "key"
npx claude-flow@alpha hook session-end --session-id "id"
```

### Key File Locations

```
.roo/                      # SPARC configuration
.roo/workflows/            # Workflow definitions
.roomodes                  # SPARC modes config
CLAUDE.md                  # AI-readable instructions
.claude/settings.json      # Claude Code settings
.swarm/memory.db          # Memory persistence
.claude-flow/hive-mind.db # Multi-agent state
.claude/checkpoints/      # State snapshots
tests/integration/        # Integration tests
```

### SPARC Methodology Phases

1. **Specification** - Requirements, constraints, user stories
2. **Pseudocode** - Algorithmic logic, data flows, TDD anchors
3. **Architecture** - System structure, component interfaces
4. **Refinement** - TDD cycle (Red → Green → Refactor)
5. **Completion** - Integration, E2E testing, documentation

### TDD Cycle (Within Refinement Phase)

1. **Red** - Write failing test
2. **Green** - Write minimal code to pass
3. **Refactor** - Optimize while keeping tests green
4. **Repeat** - Continue until feature complete

---

## Next Steps

Now that you have a complete SPARC + TDD workflow setup:

1. **Start with a simple feature** to test the workflow
2. **Use the full SPARC TDD command** for your first implementation
3. **Save your session** regularly to avoid losing work
4. **Create custom workflows** for your specific project needs
5. **Set up CI/CD** to automate testing and deployment

### Example First Feature

```bash
# Start a new session
npx claude-flow@alpha session save "my-first-feature"

# Run full SPARC + TDD workflow
npx claude-flow@alpha sparc tdd "implement a simple calculator with add and subtract functions"

# This will guide you through all phases:
# - Specification: Define calculator requirements
# - Pseudocode: Create algorithm flows
# - Architecture: Design calculator structure
# - Red: Write failing tests for add/subtract
# - Green: Implement add/subtract functions
# - Refactor: Optimize the code
# - Integration: Verify complete solution

# Save your completed work
npx claude-flow@alpha session save "my-first-feature-complete"
```

---

## Additional Resources

- **Claude Flow GitHub**: https://github.com/ruvnet/claude-flow
- **Documentation**: Check `.roo/README.md` after initialization
- **SPARC Methodology**: See `CLAUDE.md` for AI-readable instructions
- **Community**: GitHub Issues and Discussions

---

**You're now ready to use Claude Flow's SPARC + TDD workflow for rock-solid, repeatable development!**
