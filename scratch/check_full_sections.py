import re
from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

svg_sprite = str(soup.find('svg'))

# Extract sections
sections_html = []
for child in soup.body.children:
    if not child.name:
        continue
    if child.name in ['header', 'section']:
        sections_html.append(str(child))

full_content = "\n".join(sections_html)

# We can render this as a clean, complete client component in React with useEffect for interactivity
# or convert tags to JSX.
print(f"Total HTML length of sections: {len(full_content):,} chars")
