import os
from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

style = soup.find('style')
css_content = style.string if style else ""

os.makedirs(r"d:\Ideas\Agency\src\app\hire-resource", exist_ok=True)
with open(r"d:\Ideas\Agency\src\app\hire-resource\hire-resource.css", "w", encoding="utf-8") as f:
    f.write("/* ── Hire Dedicated Developers Page Styles ── */\n")
    f.write(css_content)

print(f"Written hire-resource.css ({len(css_content):,} chars)")
