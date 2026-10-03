from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

svgs = soup.find_all('svg')
print(f"Total SVGs: {len(svgs)}")
if svgs:
    first_svg = svgs[0]
    symbols = first_svg.find_all('symbol')
    print("Symbols in first SVG sprite:", [s.get('id') for s in symbols])
