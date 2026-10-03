from bs4 import BeautifulSoup

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

scripts = soup.find_all('script')
for i, s in enumerate(scripts):
    print(f"--- Script {i} ---")
    print(s.string)
