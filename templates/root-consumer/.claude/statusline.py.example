#!/usr/bin/env python3
"""Claude Code status line — zero dependencies."""
import json, sys, os

data = json.load(sys.stdin)

# --- Parse ---
model = data.get("model", {}).get("display_name", "?")
cwd = data.get("workspace", {}).get("current_dir") or data.get("cwd", "?")
pct = data.get("context_window", {}).get("used_percentage")
usage = data.get("context_window", {}).get("current_usage", {})
in_tok = usage.get("input_tokens")
out_tok = usage.get("output_tokens")
cache_tok = usage.get("cache_read_input_tokens", 0)

# --- Colors ---
R = "\033[0m"
BOLD = "\033[1m"
DIM = "\033[2m"
C_MODEL = "\033[38;5;75m"
C_GREEN = "\033[38;5;71m"
C_ORANGE = "\033[38;5;214m"
C_RED = "\033[38;5;196m"
C_EMPTY = "\033[38;5;238m"
C_TOK = "\033[38;5;180m"
C_BRANCH = "\033[38;5;183m"
C_CWD = "\033[38;5;251m"
C_SEP = "\033[38;5;240m"
SEP = f"{C_SEP} | {R}"

def fmt(n):
    if n is None: return "0"
    return f"{n/1000:.1f}k" if n >= 1000 else str(n)

# --- Model ---
parts = [f"{C_MODEL}{BOLD}{model}{R}"]

# --- Context bar ---
if pct is not None:
    W = 20
    filled = int(pct * W / 100)
    empty = W - filled
    c = C_RED if pct >= 90 else C_ORANGE if pct >= 70 else C_GREEN
    bar = f"{c}[{'█' * filled}{C_EMPTY}{'░' * empty}{c}]{R} {c}{pct:.0f}%{R}"
    parts.append(bar)

# --- Tokens ---
if in_tok is not None:
    parts.append(f"{C_TOK}in:{fmt(in_tok)} out:{fmt(out_tok)} cache:{fmt(cache_tok)}{R}")
else:
    parts.append(f"{DIM}{C_TOK}no msgs{R}")

# --- Git branch ---
try:
    import subprocess
    branch = subprocess.run(
        ["git", "-C", cwd, "symbolic-ref", "--short", "HEAD"],
        capture_output=True, text=True, timeout=2,
        env={**os.environ, "GIT_OPTIONAL_LOCKS": "0"}
    )
    b = branch.stdout.strip()
    if not b:
        branch = subprocess.run(
            ["git", "-C", cwd, "rev-parse", "--short", "HEAD"],
            capture_output=True, text=True, timeout=2,
            env={**os.environ, "GIT_OPTIONAL_LOCKS": "0"}
        )
        b = branch.stdout.strip()
    if b:
        parts.append(f"{C_BRANCH} {b}{R}")
except Exception:
    pass

# --- CWD ---
home = os.path.expanduser("~")
display = cwd.replace(home, "~", 1) if cwd.startswith(home) else cwd
parts.append(f"{C_CWD}{display}{R}")

print(SEP.join(parts))
