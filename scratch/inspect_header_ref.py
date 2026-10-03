import sys
from bs4 import BeautifulSoup
sys.stdout.reconfigure(encoding='utf-8')

with open(r"d:\Ideas\Agency\refrence\Final Home Page.html", "r", encoding="utf-8", errors="ignore") as f:
    soup = BeautifulSoup(f.read(), "html.parser")

# Find nav or header
h = soup.find('div', class_='nav') or soup.find('nav') or soup.find(class_=lambda c: c and 'nav' in c)
if h:
    print(h.prettify()[:4000])
else:
    # let's look at the first 100 lines of body
    body = soup.body
    print(str(body)[:3000])
