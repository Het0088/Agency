with open(r"d:\Ideas\Agency\refrence\genranq-cms-dashboard.html", "r", encoding="utf-8", errors="ignore") as f:
    text = f.read()

import re
print("API / fetch occurrences:")
fetches = re.findall(r'fetch\([^\)]+\)', text)
print(f"Total fetches: {len(fetches)}")
for ft in fetches[:15]:
    print(" -", ft[:120])

print("\nMODE occurrences:")
modes = re.findall(r'MODE\s*=\s*[^;\n]+', text)
print(modes)

print("\nStore / localstorage:")
stores = re.findall(r'localStorage\.[a-zA-Z]+', text)
print(set(stores))
