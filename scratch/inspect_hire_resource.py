import sys
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

print("TITLE:", soup.title.string if soup.title else "")

sections = soup.find_all(['header', 'section', 'footer'])
print(f"Total sections: {len(sections)}")
for s in sections:
    sid = s.get('id', '')
    scls = " ".join(s.get('class', []))
    h = s.find(['h1', 'h2', 'h3'])
    htxt = h.get_text(" ", strip=True) if h else ""
    print(f"[{s.name} id='{sid}' class='{scls}'] -> {htxt[:80]}")
