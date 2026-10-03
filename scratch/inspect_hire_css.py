from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

style = soup.find('style')
if style:
    print(f"Style tag length: {len(style.string):,} characters")
    lines = style.string.splitlines()
    print("First 30 lines of CSS:")
    for l in lines[:30]:
        print(l)
