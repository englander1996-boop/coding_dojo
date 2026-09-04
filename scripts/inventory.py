# -*- coding: utf-8 -*-
"""レベル帯の既出問題を棚卸しする。

PROBLEMS.md を読むのが要点。src/data/generated.json だけを見ると
手書き問題(src/data/problems/*.ts の約209問)を見落とす。

usage: py scripts/inventory.py <lo> <hi> <out.txt>
"""
import io,re,sys
lo,hi=int(sys.argv[1]),int(sys.argv[2])
s=io.open("PROBLEMS.md",encoding="utf-8").read().split("\n")
cur=None
buf={}
concept=None
for line in s:
    m=re.match(r"^### lv(\d+) ",line)
    if m:
        cur=int(m.group(1))
        if lo<=cur<=hi: buf[cur]=[]
        concept=None
        continue
    if cur is None or cur not in buf: continue
    m=re.match(r"^- \*\*(.+?)\*\* \(\d+\)",line)
    if m:
        concept=m.group(1); continue
    m=re.match(r"^  - `[^`]+` (.+?)(?: _\(.*)?$",line)
    if m and concept:
        buf[cur].append(concept+" / "+m.group(1))
out=[]
for lv in sorted(buf):
    out.append("lv%03d (%d) "%(lv,len(buf[lv]))+" | ".join(buf[lv]))
io.open(sys.argv[3],"w",encoding="utf-8").write("\n".join(out))
print("wrote",len(buf),"levels")
