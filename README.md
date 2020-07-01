# JS-WEB_mathlibs
Basic math libraries for client side browser JavaScript.

# Classes

## Vector2

#### Functions
- nor(): return this = this/|this|;
- add(v): return this += v;
- sub(v): return this -= v;
- dot(v) return this = this · v;
- cross(v) return this = this × v;
- mul(n) return this *= n;
- copy(): return this;
- set(v):  return this = v;
- projectTo(v): return this = (this · v̂) v̂;
#### Static Functions
- nor(v): return v/|v|;
- add(a,b): return a + b;
- sub(a,b): return a - b;
- dot(a,b) return a · b;
- cross(a,b) return a × b;
- mul(v,n) return v * n;
- set(v):  return this = v;
- project(a,b): return (a · b̂) b̂;
