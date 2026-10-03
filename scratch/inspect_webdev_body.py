from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\Final Web Development.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

body = soup.find('body')
if body:
    children = [c for c in body.children if c.name]
    print(f"Body direct children: {len(children)}")
    for c in children:
        sid = c.get('id', '')
        scls = " ".join(c.get('class', []))
        print(f"Tag: <{c.name} id='{sid}' class='{scls}'> (length: {len(str(c)):,} chars)")
