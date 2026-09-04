# -*- coding: utf-8 -*-
"""HANDOFF.md の進捗ログ末尾に新バッチの記述を追記する。
usage: py scripts/handoff-append.py <prev_total> <prev_cases> <prev_thin> <prev_next> <body_file> <new_total> <new_cases> <new_thin> <new_next>
"""
import io, sys

pt, pc, pth, pnext, bodyf, nt, nc, nth, nnext = sys.argv[1:10]
p = "HANDOFF.md"
s = io.open(p, encoding="utf-8").read()
old = u"→**%s問**/%sケース、5問未満%s段(次は%s〜)。" % (pt, pc, pth, pnext)
if s.count(old) != 1:
    print("PATTERN NOT FOUND (count=%d)" % s.count(old))
    sys.exit(1)
body = io.open(bodyf, encoding="utf-8").read().strip()
head = u"→**%s問**/%sケース、5問未満%s段。 " % (pt, pc, pth)
tail = u"→**%s問**/%sケース、5問未満%s段(次は%s〜)。" % (nt, nc, nth, nnext)
io.open(p, "w", encoding="utf-8", newline="\n").write(s.replace(old, head + body + u" " + tail))
print("ok")
