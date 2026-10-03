import os
import re
import sys
sys.stdout.reconfigure(encoding='utf-8')

emoji_pattern = re.compile(
    '[\U00010000-\U0010ffff]|[\u2600-\u27bf]|[\u2300-\u23ff]|[\u2b50-\u2b55]|[\u203c\u2049\u2139\u2122\u3030\u303d\u3297\u3299]'
)

src_dir = r'd:\Ideas\Agency\src'
matches = []
for root, _, files in os.walk(src_dir):
    for f in files:
        if f.endswith(('.ts', '.tsx', '.json', '.css')):
            p = os.path.join(root, f)
            with open(p, 'r', encoding='utf-8', errors='ignore') as fp:
                for idx, line in enumerate(fp, 1):
                    found = emoji_pattern.findall(line)
                    if found:
                        matches.append((f, idx, found, line.strip()))

print(f'Total matches: {len(matches)}')
for m in matches:
    print(m)
