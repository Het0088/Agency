from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\Final Home Page.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

print("--- Final Home Page.html Sections ---")
for s in soup.find_all(['header', 'section', 'footer']):
    sid = s.get('id', '')
    scls = " ".join(s.get('class', []))
    h = s.find(['h1', 'h2', 'h3'])
    htxt = h.get_text(" ", strip=True) if h else ""
    print(f"[{s.name} id='{sid}' class='{scls}'] -> {htxt[:80]}")
