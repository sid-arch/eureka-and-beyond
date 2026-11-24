"""Extract practice questions with empty hint lists, and apply hints from a JSON file.
usage: hints.py dump <course> [limit]   -> prints id | prompt | answer | solution
       hints.py apply <json>            -> {id: [hint, ...]}"""
import re, glob, json, sys, collections
import os
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
def course_lessons(course):
    cur=None; out=[]; seen=set()
    first={}
    for f in sorted(glob.glob(f"{ROOT}/content/outlines/*.txt")):
        for line in open(f):
            if line.startswith("@course"): cur=line.split()[1]
            m=re.search(r"=> ([a-z0-9-]+)\s*$", line)
            if m: first.setdefault(m.group(1), cur)
    return [s for s,c in first.items() if c==course]
def items(slug):
    p=f"{ROOT}/content/lessons/{slug}.ts"; s=open(p).read(); res=[]
    for k,m in enumerate(re.finditer(r", \[\], r`", s)):
        start=max(s.rfind("num(",0,m.start()), s.rfind("mc(",0,m.start()))
        end=s.index("`", m.end())
        res.append((f"{slug}#{m.start()}", s[start:m.start()], s[m.end():end]))
    return res
if sys.argv[1]=="dump":
    lim=int(sys.argv[3]) if len(sys.argv)>3 else 10**9; n=0
    for slug in course_lessons(sys.argv[2]):
        for i,q,sol in items(slug):
            if n>=lim: sys.exit()
            q=re.sub(r"\s+"," ",q); print(f"{i} || {q[:420]} || SOL: {sol[:260]}"); n+=1
else:
    H=json.load(open(sys.argv[2])); by=collections.defaultdict(dict)
    for k,v in H.items(): slug,off=k.split("#"); by[slug][int(off)]=v
    done=0
    for slug,offs in by.items():
        p=f"{ROOT}/content/lessons/{slug}.ts"; s=open(p).read()
        for off in sorted(offs, reverse=True):
            assert s[off:off+8]==", [], r`", (slug,off)
            arr="[" + ", ".join(json.dumps(h, ensure_ascii=False) for h in offs[off]) + "]"
            s=s[:off]+", "+arr+", r`"+s[off+8:]; done+=1
        open(p,"w").write(s)
    print("applied", done)
