import re
from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\genranq-cms-dashboard.html", "r", encoding="utf-8", errors="ignore") as f:
    html = f.read()

soup = BeautifulSoup(html, "html.parser")

print("DASHBOARD TITLE:", soup.title.string if soup.title else "")

# Find all sidebar nav items
sidebar = soup.find('aside') or soup.find(class_=re.compile(r'sidebar|adm-side', re.I))
if sidebar:
    items = sidebar.find_all(['a', 'button', 'li'])
    print("\nSIDEBAR ITEMS:")
    for it in items:
        txt = it.get_text(strip=True)
        ds = it.get('data-screen') or it.get('data-tab') or it.get('data-view') or it.get('href') or ''
        if txt and len(txt) < 40:
            print(f" - {txt} (target: {ds})")

# Find all screen / page containers
screens = soup.find_all(attrs={"data-screen": True}) or soup.find_all(attrs={"id": re.compile(r'screen-|view-|tab-')})
print("\nSCREENS / VIEWS FOUND:", len(screens))
for s in screens:
    sid = s.get('id') or s.get('data-screen')
    h = s.find(['h1', 'h2', 'h3'])
    htxt = h.get_text(strip=True) if h else ""
    print(f" * Screen: {sid} -> Heading: {htxt}")
