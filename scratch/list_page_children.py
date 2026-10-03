from bs4 import BeautifulSoup

for fname in ['final news.html', 'final blog.html']:
    print(f"\n=== {fname} ===")
    with open(f"d:\\Ideas\\Agency\\refrence\\{fname}", "r", encoding="utf-8", errors="ignore") as f:
        soup = BeautifulSoup(f.read(), "html.parser")
    for c in soup.body.children:
        if not c.name:
            continue
        cls = " ".join(c.get('class', []))
        if c.name in ['nav', 'footer', 'script', 'svg'] or 'topbar' in cls:
            continue
        print(f" - <{c.name} id='{c.get('id', '')}' class='{cls}'> (length: {len(str(c)):,} chars)")
