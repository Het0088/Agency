with open(r"d:\Ideas\Agency\refrence\genranq-cms-dashboard.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re

# Find scripts
scripts = re.findall(r'<script[^>]*>(.*?)</script>', text, re.DOTALL)
print(f"Number of scripts: {len(scripts)}")
if scripts:
    js = scripts[-1]
    print(f"Main script length: {len(js):,} chars")
    # find screen definitions or routes
    routes = re.findall(r'case\s+[\'"]([^\'"]+)[\'"]\s*:', js)
    print("Switch cases / routes:", routes)
    # find functions that render screens
    renders = re.findall(r'function\s+(render[A-Za-z0-9_]+)', js)
    print("Render functions:", renders)
    # find nav definitions
    nav_matches = re.findall(r'\{[^{}]*id:\s*[\'"]([^\'"]+)[\'"][^{}]*label:\s*[\'"]([^\'"]+)[\'"][^{}]*\}', js)
    print("Nav matches:", nav_matches[:25])
