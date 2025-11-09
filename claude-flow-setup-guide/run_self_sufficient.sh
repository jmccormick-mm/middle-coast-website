#!/usr/bin/env bash
# run_self_sufficient.sh
# A self‑sufficient runner that continuously executes a command and restarts it if it exits.

# ---- Configuration -------------------------------------------------
# Replace the placeholder below with the command you want to run.
COMMAND="npx @anthropic-ai/claude-code"
# For this Claude Flow setup task, we're running Claude Code CLI
# --------------------------------------------------------------------

while true; do
    echo "=== Starting: $COMMAND ==="
    eval "$COMMAND"
    EXIT_CODE=$?
    echo "=== Command exited with code $EXIT_CODE. Restarting in 5 seconds... ==="
    sleep 5
done

# --------------------------------------------------------------
# Optional: Systemd service unit to manage the script as a daemon.
# Save this as /etc/systemd/system/self‑sufficient‑runner.service
# --------------------------------------------------------------
# [Unit]
# Description=Self‑sufficient runner service
# After=network.target
#
# [Service]
# Type=simple
# ExecStart=/home/action-jackson/dev/contract/middle-coast-website/run_self_sufficient.sh
# Restart=always
# RestartSec=5
# StandardOutput=journal
# StandardError=journal
#
# [Install]
# WantedBy=multi-user.target
# --------------------------------------------------------------
