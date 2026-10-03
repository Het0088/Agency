from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\final news.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

style = soup.find('style')
if style:
    print(f"Style length in final news.html: {len(style.string):,} chars")
