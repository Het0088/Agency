import sys
sys.stdout.reconfigure(encoding='utf-8')

with open(r"d:\Ideas\Agency\refrence\genranq-cms-dashboard.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

idx = text.find('function buildNav')
if idx != -1:
    print(text[idx:idx+3500])
else:
    idx = text.find('buildNav')
    print(text[idx:idx+3500])
