import os
import re
from bs4 import BeautifulSoup

ref_dir = r"d:\Ideas\Agency\refrence"

for fname in os.listdir(ref_dir):
    if not fname.endswith(".html"):
        continue
    fpath = os.path.join(ref_dir, fname)
    size = os.path.getsize(fpath)
    with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
        content = f.read()
    
    soup = BeautifulSoup(content[:150000], "html.parser")
    print(f"\n==========================================")
    print(f"FILE: {fname} ({size:,} bytes)")
    print(f"TITLE: {soup.title.string.strip() if soup.title and soup.title.string else 'None'}")
    
    # Check mega menu / nav
    nav = soup.find('nav') or soup.find(class_=re.compile(r'nav|header', re.I))
    if nav:
        print("NAV FOUND:", [a.get_text(strip=True) for a in nav.find_all('a')][:10])
    
    # Check fonts / css links
    links = [l.get('href') for l in soup.find_all('link', rel='stylesheet')]
    print("CSS/FONTS:", links[:5])

    # Check key sections
    sections = soup.find_all(['section', 'header', 'footer'])
    print(f"SECTIONS COUNT: {len(sections)}")
    sec_names = []
    for s in sections:
        cls = " ".join(s.get('class', []))
        sid = s.get('id', '')
        tag = s.name
        sec_names.append(f"<{tag} id='{sid}' class='{cls}'>")
    print("SECTIONS:", sec_names[:15])
