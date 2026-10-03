import sys
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for s in soup.find_all(['header', 'section']):
    sid = s.get('id', '')
    cls = " ".join(s.get('class', []))
    print(f"\n--- {s.name} id='{sid}' class='{cls}' ---")
    h = s.find(['h1', 'h2', 'h3'])
    if h:
        print("Heading:", h.get_text(" ", strip=True))
    p = s.find('p')
    if p:
        print("P:", p.get_text(" ", strip=True)[:120])
