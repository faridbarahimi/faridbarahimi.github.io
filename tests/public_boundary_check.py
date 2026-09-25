#!/usr/bin/env python3
"""Fail closed if internal AICP material enters the public showcase."""

from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
SKIP_DIRS = {".git", ".github"}
SKIP_SUFFIXES = {".ui-backup"}
MARKERS = [
    re.compile(r"faridbarahimi/AICP-Core-Platform", re.I),
    re.compile(r"tokenrouter", re.I),
    re.compile(r"api[_-]?key", re.I),
    re.compile(r"/home/ubuntu", re.I),
    re.compile(r"BEGIN (?:RSA|OPENSSH|EC) PRIVATE KEY", re.I),
]
BAD_FILES = {".env", ".env.local", ".env.production"}

violations = []
SELF = Path(__file__).resolve()

for path in ROOT.rglob("*"):
    if path.resolve() == SELF:
        continue
    if not path.is_file():
        continue
    if any(part in SKIP_DIRS for part in path.parts):
        continue
    if path.suffix in SKIP_SUFFIXES or path.name in BAD_FILES:
        violations.append(f"forbidden file: {path.relative_to(ROOT)}")
        continue
    try:
        data = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        continue
    for marker in MARKERS:
        if marker.search(data):
            violations.append(f"{path.relative_to(ROOT)} matches {marker.pattern}")

if violations:
    print("PUBLIC BOUNDARY CHECK: FAIL")
    print("\n".join(violations))
    sys.exit(1)

print("PUBLIC BOUNDARY CHECK: PASS")
