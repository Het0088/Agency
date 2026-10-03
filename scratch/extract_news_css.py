import os
from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\final news.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

style = soup.find('style')
css_content = style.string if style else ""

os.makedirs(r"d:\Ideas\Agency\src\app\resources\news", exist_ok=True)
with open(r"d:\Ideas\Agency\src\app\resources\news\news.css", "w", encoding="utf-8") as f:
    f.write("/* ── GENRANQ News & Press Releases Styles ── */\n")
    f.write(css_content)

print(f"Written news.css ({len(css_content):,} chars)")
