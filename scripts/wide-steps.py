# Heuristic: estimate rendered width of worked-example step latex; flag steps likely wider than ~300px on a 390px phone.
import re, glob, sys
def est(l):
    s = l
    s = re.sub(r'\\(t|d)?frac\{([^{}]*)\}\{([^{}]*)\}', lambda m: 'x'*max(len(m.group(2)),len(m.group(3))), s)
    s = re.sub(r'\\text\{([^{}]*)\}', lambda m: m.group(1), s)
    s = re.sub(r'\\(left|right|displaystyle|quad|qquad)', '', s)
    s = re.sub(r'\\[a-zA-Z]+', 'x', s)
    s = re.sub(r'[{}_^\\]', '', s)
    return len(s)
lim = int(sys.argv[1]) if len(sys.argv) > 1 else 34
for f in sorted(glob.glob('content/lessons/*.ts')):
    src = open(f).read()
    for m in re.finditer(r'\[r`((?:[^`])*)`,\s*(?:r?`[^`]*`|"[^"]*")\]', src):
        if est(m.group(1)) > lim:
            print(f"{f.split('/')[-1]}: {est(m.group(1))}: {m.group(1)[:90]}")
