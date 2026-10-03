import sys
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')

for name in ["Final SEO.html", "Final Web Development.html"]:
    with open(f"d:\\Ideas\\Agency\\refrence\\{name}", "r", encoding="utf-8", errors="ignore") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    print(f"\n=== {name} ===")
    print("TITLE:", soup.title.string if soup.title else "")
    for s in soup.find_all(['header', 'section', 'footer']):
        sid = s.get('id', '')
        scls = " ".join(s.get('class', []))
        h = s.find(['h1', 'h2', 'h3'])
        htxt = h.get_text(" ", strip=True) if h else ""
        print(f"[{s.name} id='{sid}' class='{scls}'] -> {htxt[:70]}")
