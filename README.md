# JS-WEB_mathlibs
Basic math libraries for client side browser JavaScript.

# Linear Algebra Library

All functions/classes will automatically be put into `window.mathLibs_LinearAlgebra`.

## Vector2

```
Constructor:
new Vector2(x,y);
```

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

## Matrix2x2
 
```
Constructor:
new Matrix2x2(a,b,c,d);

[ a b ]
[ c d ]
```

#### Functions
- mul(o): Multiply the matrix with another Matrix2x2, Vector2, or scalar.
- toString(): Display as string.
- det(): Determinant, "area scaling factor"
#### Static Functions
- identity(): Create an identity matrix.
- rotate(a): Create a rotation matrix with angle a.
- scale(f): Crate a scaling matrix.
- shearX(f): Create a x-shear matrix.
- shearY(f): Create a y-shear matrix.
