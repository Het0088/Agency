import re

with open(r"d:\Ideas\Agency\refrence\Hire Resource.html", "r", encoding="utf-8", errors="ignore") as f:
    hire_html = f.read()

with open(r"d:\Ideas\Agency\src\app\globals.css", "r", encoding="utf-8", errors="ignore") as f:
    globals_css = f.read()

# Extract all classes from Hire Resource.html
classes_in_hire = set(re.findall(r'class=[\'"]([^\'"]+)[\'"]', hire_html))
individual_classes = set()
for c in classes_in_hire:
    individual_classes.update(c.split())

missing = []
for c in sorted(individual_classes):
    pattern = rf'\.{re.escape(c)}\b'
    if not re.search(pattern, globals_css):
        missing.append(c)

print(f"Total classes in Hire Resource: {len(individual_classes)}")
print(f"Classes missing from globals.css: {len(missing)}")
print("Sample missing classes:", missing[:30])
