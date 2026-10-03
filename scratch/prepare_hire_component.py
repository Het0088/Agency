import sys
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Get SVG defs
svg_sprite = soup.find('svg')

# Get all sections from hero to contact
sections = []
for child in soup.body.children:
    if not child.name:
        continue
    if child.name in ['header', 'section'] or (child.name == 'div' and child.get('class') and 'topbar' not in child.get('class')):
        sections.append(child)

print(f"Total sections to render: {len(sections)}")
for s in sections:
    print(f" - <{s.name} id='{s.get('id', '')}' class='{' '.join(s.get('class', []))}'>")
