"""Batch-evaluate reference solutions.

Reads a JSON array of {"code": <python source>, "input": <stdin string>} from
stdin, runs each in an isolated namespace with the given stdin, and prints a
JSON array of the captured stdout strings (or "__ERR__<repr>" on exception).

Running everything in ONE Python process makes generating/validating tens of
thousands of cases fast (no per-case process spawn).
"""
import sys
import io
import json
from contextlib import redirect_stdout

data = json.loads(sys.stdin.read())
out = []
real_stdin = sys.stdin
for item in data:
    buf = io.StringIO()
    sys.stdin = io.StringIO(item["input"])
    try:
        with redirect_stdout(buf):
            exec(item["code"], {"__name__": "__main__"})
        out.append(buf.getvalue())
    except SystemExit:
        out.append(buf.getvalue())
    except Exception as e:  # noqa: BLE001
        out.append("__ERR__" + repr(e))
    finally:
        sys.stdin = real_stdin

sys.stdout.write(json.dumps(out))
