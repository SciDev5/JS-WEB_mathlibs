// 2D Vector
class Vector2 {
  constructor(x,y) {
    this.x = x;
    this.y = y;
  }
  // Return a duplicate of this vector.
  copy() { 
    return new Vector2(this.x,this.y);
  }
  // Redefine coordinates of this to the coordinates of another vector.
  set(other) {
    this.x = other.x;
    this.y = other.y;
    return this;
  }
  // Squared length of this vector. (Same as Vector2.dot(this,this))
  sqr() {
    return this.x*this.x+this.y*this.y; 
  }
  // Length of the vector.
  len() {
    return Math.sqrt(this.sqr());
  }
  // Normalize this vector. (Changes this vector)
  nor() {
    return this.div(this.len());
  }
  // Return a normalized copy of a vector v.
  static nor(v) {
    return Vector2.div(v,v.len());
  }
  // Dot product between a and b.
  static dot(a,b) {
    return a.x*b.x+a.y*b.y;
  }
  // Cross product between a and b.
  static cross(a,b) {
    return a.x*b.y-a.y*b.x;
  }
  // Add another vector to this. (Changes this vector)
  add(other) {
    this.x += other.x;
    this.y += other.y;
    return this;
  }
  // Add two vectors a + b.
  static add(a,b) {
    return new Vector2(a.x+b.x,a.y+b.y);
  }
  // Subtract another vector from this. (Changes this vector)
  sub(other) {
    this.x -= other.x;
    this.y -= other.y;
    return this;
  }
  // Subtract two vectors a - b.
  static sub(a,b) {
    return new Vector2(a.x-b.x,a.y-b.y);
  }
  // Scale this vector by factor n. (Changes this vector)
  mul(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  // Scale a vector v by factor n.
  static mul(v,n) {
    return new Vector2(v.x*n,v.y*n);
  }
  // Project vector a onto the axis of vector b.  (a ⋅ b̂) b̂
  static project(a,b) { // project a onto b's axis.
    return Vector2.nor(b).mul(Vector2.dot(a,Vector2.nor(b)));
  }
  projectTo(v) { // Project this onto the axis of vector b.  this = (this ⋅ v̂) v̂
    return this.set(Vector2.project(this,v));
  }
}

class MatrixNxM {
  constructor(li,lj,values) {
    this.li = li;
    this.lj = lj;
    this.values = values;
  }
  // Multiply the matrix with another Matrix2x2, Vector2, or scalar.
  mul(o) {
    switch(o.constructor) {
      case MatrixNxM:
        if (this.li != o.lj || this.lj != o.li) break;
        var newValues = [];
        var lm = this.li;
        var lsum = this.lj;
        for (var i = 0; i < lm; i++) {
          for (var j = 0; j < lm; j++) {
            var sum = 0;
            for (var k = 0; k < lsum; k++) {
              sum += this.values[(k)+(j)*this.li] * o.values[(i)+(k)*o.li];
            }
            newValues.push(sum);
          }
        }
        return new MatrixNxN(lm, lm, newValues);
        break;
      case VectorN:
        if (this.li != o.values.length) break;
        var vecValues = new Array(this.lj).fill(0);
        for (var i = 0; i < this.li; i++) {
          for (var j = 0; j < this.lj; j++) {
            vecValues[j] += o.values[i] * this.values[i+j*this.li];
          }
        }
        return new VectorN(vecValues);
        break;
      case Number:
        var newValues = [];
        for (var i = 0; i < values.length; i++) newValues.push(values[i] * o);
        return new MatrixNxM(this.li,this.lj,newValues);
        break;
    }
  }
  // Create an identity matrix.
  static identity(dim) {
    var arr = new Array(dim*dim).fill(0);
    for (var i = 0; i < dim; i++) {
      arr[i*(1+dim)] = 1;
    }
    return new MatrixNxM(dim,dim,arr);
  }
  // Create a scaling matrix.
  static scale(dim,f) {
    var arr = new Array(dim*dim).fill(0);
    for (var i = 0; i < dim; i++) {
      arr[i*(1+dim)] = f;
    }
    return new MatrixNxM(dim,dim,arr);
  }
  // Convert to string.
  toString() {
    return "MATRIX "+JSON.stringify(this.values);
  }
  // Determinant, "area scaling factor"
  /*det() { NEEDS FIXING
    return this.values[0]*this.values[3]-this.values[1]*this.values[2];
  }*/
}

class Matrix2x2 {
  constructor(a,b,c,d) {
    this.values = [a,b,c,d];
  }
  // Multiply the matrix with another Matrix2x2, Vector2, or scalar.
  mul(o) {
    switch(o.constructor) {
      case Matrix2x2:
        return new Matrix2x2(
          o.values[0]*this.values[0]+o.values[1]*this.values[2],
          o.values[0]*this.values[1]+o.values[1]*this.values[3],
          o.values[2]*this.values[0]+o.values[3]*this.values[2],
          o.values[2]*this.values[1]+o.values[3]*this.values[3]
        );
        break;
      case Vector2:
        return new Vector2(
          this.values[0]*o.x+this.values[1]*o.y,
          this.values[2]*o.x+this.values[3]*o.y
        );
        break;
      case Number:
        return new Matrix2x2(this.values[0]*o,this.values[1]*o,this.values[2]*o,this.values[3]*o);
        break;
    }
  }
  // Create an identity matrix.
  static identity() {
    return new Matrix2x2(1,0,0,1);
  }
  // Create a rotation matrix.
  static rotate(a) {
    return new Matrix2x2(Math.cos(a),-Math.sin(a),Math.sin(a),Math.cos(a));
  }
  // Create a scaling matrix.
  static scale(f) {
    return new Matrix2x2(f,0,0,f);
  }
  // Create a shear matrix along the X axis.
  static shearX(f) {
    return new Matrix2x2(1,f,0,1)
  }
  // Create a shear matrix along the Y axis.
  static shearY(f) {
    return new Matrix2x2(1,0,f,1)
  }
  // Convert to string.
  toString() {
    return "MATRIX "+JSON.stringify(this.values);
  }
  // Determinant, "area scaling factor"
  det() {
    return this.values[0]*this.values[3]-this.values[1]*this.values[2];
  }
}

window.mathLibs_LinearAlgebra = {Vector2, Matrix2x2};
Object.freeze(window.mathLibs_LinearAlgebra);
