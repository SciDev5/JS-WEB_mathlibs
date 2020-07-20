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


# Axis-Aligned Bounding Box Library

All functions/classes will automatically be put into `window.mathLibs_AxisAlignedBB`.

## AxisAlignedBB2

```
Constructor:
new AxisAlignedBB2(x0,y0,x1,y1);
```
#### Fields
- minX: minimum x-coord;
- maxX: maximum x-coord;
- minY: minimum y-coord;
- maxY: maximum y-coord;
- width: width of the box (READ ONLY);
- height: height of the box (READ ONLY);
- centerX: center x-coord of box (READ ONLY);
- centerY: center y-coord of box (READ ONLY);
#### Functions
- intersectingAABB(aabb): See if this aabb intersects another AABB;
- intersectingRay(x,y,dx,dy,?intersectNormals): See if a ray intersects this AABB;
- dynamicIntersectingAABB(aabb,thisDx,thisDy): Check if the path of this AABB intersects with another AABB (returns object contianing whether or not there was a collission, times of intersection, 0 at ray origin, 1 at (x+dx,y+dy), and intersectNormals has the normals of the intersections put in it);
- expand(dx,dy): Expand the dimensions of this AABB by dx on the x and dy on the y;
#### Static Functions
- expand(v): Expand the dimensions of an AABB by dx on the x and dy on the y;
