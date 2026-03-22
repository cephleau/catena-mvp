#!/bin/bash
# Launch Octo desktop companion
pkill -f "octo-avatar.py" 2>/dev/null
sleep 0.5
cd "$(dirname "$0")"
/tmp/octo-venv2/bin/python3 octo-avatar.py &
echo "🐙 Octo launched!"
