import sys
import re

# Set stdout encoding
sys.stdout.reconfigure(encoding='utf-8')

with open(r"d:\Ideas\Agency\refrence\genranq-cms-dashboard.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

# Let's find where the sidebar groups are defined
idx = text.rfind('nav-g')
if idx != -1:
    print("\n--- Context around nav-g (last occurrence) ---")
    print(text[idx-400:idx+2500])
