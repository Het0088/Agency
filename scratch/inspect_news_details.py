from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\final news.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

for s in soup.find_all(['header', 'article', 'section', 'footer']):
    sid = s.get('id', '')
    cls = " ".join(s.get('class', []))
    print(f"<{s.name} id='{sid}' class='{cls}'> (length: {len(str(s)):,} chars)")
