with open(r"d:\Ideas\Agency\refrence\genranq-cms-dashboard.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re

# Find html inside body
body_match = re.search(r'<body[^>]*>(.*?)<script', text, re.DOTALL)
if body_match:
    print("BODY HTML (before script):")
    print(body_match.group(1)[:2000])

# Find where sidebar is defined in JS
side_matches = re.findall(r'nav-g.*?</div>', text, re.DOTALL)
print(f"nav-g occurrences: {len(side_matches)}")
for s in side_matches[:10]:
    print("NAV GROUP SNIPPET:", s[:200].replace('\n', ' '))
