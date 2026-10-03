import sys
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')

with open(r"d:\Ideas\Agency\refrence\Final Web Development.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

style = soup.find('style')
if style:
    print(f"Style length in Final Web Development.html: {len(style.string):,} chars")

sections = []
for child in soup.body.children:
    if not child.name:
        continue
    if child.name in ['header', 'section']:
        sections.append(child)

print(f"Total sections: {len(sections)}")
for s in sections:
    sid = s.get('id', '')
    cls = " ".join(s.get('class', []))
    print(f" - <{s.name} id='{sid}' class='{cls}'>")
