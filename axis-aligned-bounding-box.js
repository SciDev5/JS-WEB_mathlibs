class AxisAlignedBB2 {
  constructor(x0,y0,x1,y1) {
    this.minX = Math.min(x0,x1);
    this.minY = Math.min(y0,y1);
    this.maxX = Math.max(x0,x1);
    this.maxY = Math.max(y0,y1);
  }
  // AABB width
  get width() {
    return this.maxX-this.minX;
  }
  // AABB height
  get height() {
    return this.maxY-this.minY;
  }
  // Center x-coordinate
  get centerX() {
    return (this.maxX+this.minX)/2;
  }
  // Center y-coordinate
  get centerY() {
    return (this.maxY+this.minY)/2;
  }
  // See if this aabb intersects another aabb.
  intersectingAABB(aabb) {
    if ((aabb instanceof AxisAlignedBB2))
      throw new TypeError("aabb not of type AxisAlignedBB2!");
    return (this.maxX > aabb.minX || this.minX < aabb.maxX) && (this.maxY > aabb.minY || this.minY < aabb.maxY);
  }
  // See if a ray intersects this aabb.
  intersectingRay(x,y,dx,dy,intersectionNormals) {
    var minXint = (this.minX - x)/dx;
    var maxXint = (this.maxX - x)/dx;
    var minYint = (this.minY - y)/dy;
    var maxYint = (this.maxY - y)/dy;
    var nearX = Math.min(minXint,maxXint);
    var farX = Math.max(minXint,maxXint);
    var nearY = Math.min(minYint,maxYint);
    var farY = Math.max(minYint,maxYint);
    if (nearX > farY || nearY > farX)
      return [];
    var intersectionTimes = [minXint,maxXint,minYint,maxYint].sort().splice(1,2).filter(t => (t >= 0));
    if (intersectionTimes[0] == intersectionTimes[1]) intersectionTimes.splice(1);
    if (intersectionNormals instanceof Array) {
      for (var t of intersectionTimes) {
        if (t == minYint)
          intersectionNormals.push({x:0,y:-1});
        else if (t == maxYint)
          intersectionNormals.push({x:0,y:1});
        else if (t == minXint)
          intersectionNormals.push({x:-1,y:0});
        else if (t == maxXint)
          intersectionNormals.push({x:1,y:0});
      }
    }
    return intersectionTimes;
  }
  // Expand the dimensions of this AABB by dx on the x and dy on the y.
  expand(dx,dy) {
    this.minX -= dx;
    this.minY -= dy;
    this.maxX += dx;
    this.maxY += dy;
  }
  // Expand the dimensions of an AABB by dx on the x and dy on the y (Copies).
  static expand(aabb,dx,dy) {
    return new AxisAlignedBB2(aabb.minX-dx,aabb.minY-dy,aabb.maxX+dx,aabb.maxY+dy);
  }
  // Check if the path of this AABB intersects with another AABB.
  dynamicIntersectingAABB(aabb,thisDx,thisDy) {
    if ((aabb instanceof AxisAlignedBB2))
      throw new TypeError("aabb not of type AxisAlignedBB2!");
    if (!isFinite(thisDx) || !isFinite(thisDy))
      throw new TypeError("Change in this pos not finite.");
    var otherExpanded = AxisAlignedBB2.expand(aabb,this.width,this.height);
    var intersectionNormals = [];
    var intersectionTimes = otherExpanded.intersectRay(this.centerX,this.centerY,thisDx,thisDy,intersectionNormals);
    for (var i = intersectionTimes.length-1; i >= 0; i--) {
      if (intersectionTimes[i] > 1) {
        intersectionTimes.splice(i);
        intersectionNormals.splice(i);
      }
    }
    if (intersectionTimes.length == 0) 
      return {collided: false};
    return {collided: true, intersectionTimes, intersectionNormals}
  }
}

window.mathLibs_AxisAlignedBB = {};
Object.freeze(window.mathLibs_AxisAlignedBB);
